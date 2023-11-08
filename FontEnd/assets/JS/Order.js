
const urlApiGetUsById ='https://localhost:7284/api-admin/User/Get_Us_By_Id';
const urlApiCreateOrder ='https://localhost:7284/api-admin/Order/Create_Oder';
const urlApiUpdateOrder = 'https://localhost:7284/api-admin/Order/Update_Order';
const urlApiGetOrderById = 'https://localhost:7284/api-admin/Order/Get_Order_ById';
const urlApiDeleteOrderById = 'https://localhost:7284/api-admin/Order/Delete_Order';

const minusBtn = $(".btnMinus");
const plusBtn = $(".btnPlus");
let isCreate = false;
let isUpdate = false;
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
                    status: 2
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
                amount:orderdetail["amount"]+1,
                price:orderdetail["price"],
                status: 2
            }
        ]
    }
    UpdateOrder(data);
};

function GetUserByID(){
    $.get(urlApiGetUsById+'?id='+infoUsLocal["user_id"])
    .done(res=>{
        localStorage.setItem('InfoUsOrder',JSON.stringify(res));
    })
    .fail(err=>{
        console.log(err);
    })
};
GetUserByID();
function checkProductInOrder(productId){
    const listOrder =JSON.parse(localStorage.getItem('listorderdetail'));
    var Duplicate = listOrder[0].find(item => {
        return item["productId"] === productId;
    })
    return Duplicate;
}
const infoUsOrder = JSON.parse(localStorage.getItem('InfoUsOrder'));
function handleCreateOrder(productId,price){
    isCreate = true;
    isUpdate=false;
    const product = checkProductInOrder(productId);
    if(infoUsLocal!=null){
        if(infoUsOrder!=null){
           if(product ===undefined){
                const data = {
                    user_Id:infoUsOrder["id"],
                    fullName:infoUsOrder["fullName"],
                    email:infoUsOrder["email"],
                    phone_number:infoUsOrder["phone_number"],
                    address:infoUsOrder["address"],
                    note:"",
                    status:0,
                    order_Details:[
                        {
                            productId:productId,
                            amount:1,
                            price:price,
                        }
                    ]
                }
                CreateOrder(data)
            } 
            else{
                orderdetails = JSON.parse(localStorage.getItem("listorderdetail"));
                var orderdetail = orderdetails[0].find(item=>{
                    return item["productId"] === productId
                })
                GetOrderById(orderdetail["orderId"])
                const order = JSON.parse(localStorage.getItem("order"));

                console.log(orderdetail);
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
                            amount:orderdetail["amount"]+1,
                            price:orderdetail["price"],
                            status: 2
                        }
                    ]
                }
                UpdateOrder(data);
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
        contentType:"application/json"
    })
    .done(async (res)=>{
        try{
            await getListOrder();
            orders = JSON.parse(localStorage.getItem("listorderdetail"));
            totalItems = JSON.parse(localStorage.getItem("totalItemsOrder"));
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
        data: JSON.stringify(data),
        contentType: "application/json"
        
    })
    .done(async (res)=>{
        try{
            await getListOrder();
            orders = JSON.parse(localStorage.getItem("listorderdetail"));
            totalItems = JSON.parse(localStorage.getItem("totalItemsOrder"));
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

function handleRemoveProductOrder(productId){
    orderdetails = JSON.parse(localStorage.getItem("listorderdetail"));
    var orderdetail = orderdetails[0].find(item=>{
        return item["productId"] === productId
    });
 
    DeleteOrder(orderdetail["orderId"]);
   
};

function DeleteOrder(data){
    $.ajax({
        type: "DELETE",
        url: urlApiDeleteOrderById+"?orderId="+data
        
    })
    .done(async (res)=>{
        try{
            await getListOrder();
            orders = JSON.parse(localStorage.getItem("listorderdetail"));
            totalItems = JSON.parse(localStorage.getItem("totalItemsOrder"));
            await getProductById(orders,totalItems);
            renderListOrder();
            OpenMinicart();
            showSuccessToast("Xóa thành công");
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