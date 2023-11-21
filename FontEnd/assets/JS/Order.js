
const urlApiGetUsById ='https://localhost:7284/api-admin/User/Get_Us_By_Id';
const urlApiCreateOrder ='https://localhost:7284/api-admin/Order/Create_Oder';
const urlApiUpdateOrder = 'https://localhost:7284/api-admin/Order/Update_Order';
const urlApiGetOrderById = 'https://localhost:7284/api-admin/Order/Get_Order_ById';
const urlApiDeleteOrderById = 'https://localhost:7284/api-admin/Order/Delete_Order';

const minusBtn = $(".btnMinus");
const plusBtn = $(".btnPlus");
let isCreate = false;
let isUpdate = false;
console.log(infoUsLocal);
function handleReduceAmount(productId){
    isCreate = false;
    isUpdate=true;
    orderdetails = JSON.parse(localStorage.getItem("listorderdetail"));
    var orderdetail = orderdetails[0].find(item=>{
        return item["productId"] === productId
    })
    GetOrderById(orderdetail["orderId"])
    const order = JSON.parse(localStorage.getItem("order"));
    if(orderdetail["amount"]>1){
        const data = {
            id:order["id"],
            user_Id:order["user_Id"],
            fullName:order["fullName"],
            email:order["email"],
            order_Date:order["order_Date"],
            phone_number:order["phone_number"],
            address:order["address"],
            note:"",
            status:order["status"],
            order_Details:[
                {
                    orderId:orderdetail["id"],
                    od_id:orderdetail["od_id"],
                    productId:orderdetail["productId"],
                    amount:orderdetail["amount"]-1,
                    price:orderdetail["price"],
                    size : orderdetail["size"]
                }
            ]
        }
        UpdateOrder(data);
    }
    else{
        showErrorToast("Số lượng sản phẩm đã ở số lượng nhỏ nhất");
    }
    
};

function handleIncreaseAmount(productId){
    isCreate = false;
    isUpdate=true;
    orderdetails = JSON.parse(localStorage.getItem("listorderdetail"));
    var orderdetail = orderdetails[0].find(item=>{
        return item["productId"] === productId
    })
    GetOrderById(orderdetail["orderId"])
    const order = JSON.parse(localStorage.getItem("order"));
    const data = {
        id:orderdetail["orderId"],
        user_Id:order["user_Id"],
        fullName:order["fullName"],
        email:order["email"],
        order_Date:order["order_Date"],
        phone_number:order["phone_number"],
        address:order["address"],
        note:"",
        status:order["status"],
        order_Details:[
            {
                orderId:orderdetail["orderId"],
                od_id:orderdetail["od_id"],
                productId:orderdetail["productId"],
                amount:orderdetail["amount"]+1,
                price:orderdetail["price"],
                size : orderdetail["size"]
            }
        ]
    }
    UpdateOrder(data);
};

function GetUserByID(){
    console.log("oge")
    if(infoUsLocal!==null){
        $.get({
            url :urlApiGetUsById+'?id='+infoUsLocal["user_id"],
            headers: { "Authorization": 'Bearer ' + token }
        })
        .done(res=>{
            localStorage.setItem('InfoUsOrder',JSON.stringify(res));

        })
        .fail(err=>{
            console.log(err);
        })
    }
   
};
GetUserByID();
function checkProductInOrder(productId){
    const listOrder =JSON.parse(localStorage.getItem('listorderdetail'));
    var Duplicate = listOrder[0].find(item => {
        return item["productId"] === productId;
    })
    return Duplicate;
}

function handleCreateOrder(size,productId,price){
    const infoUsOrder = JSON.parse(localStorage.getItem('InfoUsOrder')); 
    orderdetails = JSON.parse(localStorage.getItem("listorderdetail"));
    var orderdetail = orderdetails[0].find(item=>{
        return item["productId"] === productId
    })
    if(orderdetail!==undefined){
        GetOrderById(orderdetail["orderId"])

    }
    const order = JSON.parse(localStorage.getItem("order"));
    const product = checkProductInOrder(productId);
    if(infoUsLocal!=null){
        if(infoUsOrder!=null){
          if(size!==null){
            if((product ===undefined) ||(product !==undefined && orderdetail["size"] !==size ) ){
                const data = {
                    user_Id:infoUsOrder["id"],
                    fullName:infoUsOrder["fullName"],
                    email:infoUsOrder["email"],
                    phone_number:infoUsOrder["phone_number"],
                    address:infoUsOrder["address"],
                    note:"",
                    status:1,
                    order_Details:[
                        {
                            productId:productId,
                            amount:1,
                            price:price,
                            size : size
                        }
                    ]
                }
                isCreate = true;
                isUpdate=false;
                console.log(data)
                CreateOrder(data);


            } 
            else if(product !== undefined && orderdetail["size"] ===size){
                const data = {
                    id:order["id"],
                    user_Id:order["user_Id"],
                    fullName:order["fullName"],
                    email:order["email"],
                    order_Date:order["order_Date"],
                    phone_number:order["phone_number"],
                    address:order["address"],
                    note:"",
                    status:order["status"],
                    order_Details:[
                        {
                            orderId:order["id"],
                            od_id:orderdetail["od_id"],
                            productId:orderdetail["productId"],
                            amount:orderdetail["amount"]+1,
                            price:orderdetail["price"],
                            size :orderdetail["size"]
                        }
                    ]
                };
                isCreate = false;
                isUpdate=true;
                UpdateOrder(data);
            }
          } 
        }
    }
    else{
        window.location='./login.html';
    }
};


async function GetOrderById(id) {
    var data = {id:id};
    const promise = new Promise((resolve,reject) =>{
        httpGetAsync(urlApiGetOrderById,resolve,reject,data)
    })
    const res = await promise
    localStorage.setItem("order",JSON.stringify(res));
};

function CreateOrder(data){
    $.post({
        url:urlApiCreateOrder,
        data:JSON.stringify(data),
        headers: { "Authorization": 'Bearer ' + token },
        contentType:"application/json"
    })
    .done(async (res)=>{
        try{
            await getListOrderDetail();
            orders = JSON.parse(localStorage.getItem("listorderdetail"));
            totalItems = JSON.parse(localStorage.getItem("totalItemsOrder"));
            console.log(orders);
            await getProductById(orders,totalItems);
            renderListOrder();
            OpenMinicart();
            showSuccessToast("Sản phẩm đã được thêm vào giỏ hàng thành công");

        }catch(e){
            renderListOrder();
            OpenMinicart();

        }
    })
    .fail(err=>{
        console.log(err);
        showErrorToast("Có lỗi vui lòng thao tác lại sau 1p");
    })

};


function UpdateOrder(data){
    $.ajax({
        type: "PUT",
        url: urlApiUpdateOrder,
        headers: { "Authorization": 'Bearer ' + token },
        data: JSON.stringify(data),
        contentType: "application/json"
        
    })
    .done(async (res)=>{
        try{
            await getListOrderDetail();
            orders = JSON.parse(localStorage.getItem("listorderdetail"));
            totalItems = JSON.parse(localStorage.getItem("totalItemsOrder"));
            console.log(orders)
            await getProductById(orders,totalItems);
            renderListOrder();
            OpenMinicart();
            if(isCreate){
                showSuccessToast("Sản phẩm đã được thêm vào giỏ hàng thành công");

            }
            if(isUpdate){
                showSuccessToast("Cập nhật số lượng thành công");
            }

        }catch(e){
            renderListOrder();
            OpenMinicart();
        }
    })
    .fail(err=>{
        console.log(err.statusText);
        showErrorToast("Có lỗi vui lòng thao tác lại sau 1p");
    })
};

function activeModalConfirm(orderId){
    openModalCofirmDelete("Bạn chắc chắn muốn xóa sản phẩm này ?");
    btnConfirmNo.on('click', ()=>{
      closeModalCofirmDelete();
    });
    btnConfirmYes.on('click', ()=>{
      DeleteOrder(orderId);
    });
  };

function DeleteOrder(data){
    $.ajax({
        type: "DELETE",
        headers: { "Authorization": 'Bearer ' + token },
        url: urlApiDeleteOrderById+"?orderId="+data
        
    })
    .done(async (res)=>{
        try{
            await getListOrderDetail();
            orders = JSON.parse(localStorage.getItem("listorderdetail"));
            totalItems = JSON.parse(localStorage.getItem("totalItemsOrder"));
            closeModalCofirmDelete();
            showSuccessToast("Xóa thành công");
            await getProductById(orders,totalItems);
            renderListOrder();
            if(totalItems===0){
                $(".container-minicart").removeClass("opened")
            }
            else{
                OpenMinicart();

            }
        }catch(e){
            closeModalCofirmDelete();
            renderListOrder();
            OpenMinicart();
        }
    })
    .fail(err=>{
        console.log(err.statusText);
        closeModalCofirmDelete();
        showErrorToast("Có lỗi vui lòng thao tác lại sau 1p");
    })
};