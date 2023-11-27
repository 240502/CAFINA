const urpApiGetUserById = "https://localhost:7284/api-admin/User/Get_Us_By_Id";
const urlApiGetOrderById = 'https://localhost:7284/api-admin/Order/Get_Order_ById';
const urlApiUpdateOrder = 'https://localhost:7284/api-admin/Order/Update_Order';

const inputFullName = $("#fullName");
const inputPhoneNumber = $("#phoneNumber");
const inputAddress = $("#address");
const listButtonAddress = [...document.querySelectorAll(".form-address-type button")]
const listButtonPayMent = [...document.querySelectorAll(".checkout-payment-method-section")]
const Account = JSON.parse( localStorage.getItem("login"));
const listProductOrder = JSON.parse(localStorage.getItem("ListProductOrder"));
const listOrder = JSON.parse(localStorage.getItem("listorderdetail"));

const btnPay = $(".btn-place-order")

function Start(){
    GetUserById();
    renderListProductOrder(listProductOrder);
};

async function GetOrderById(id) {
    var data = {id:id};
    const promise = new Promise((resolve,reject) =>{
        httpGetAsync(urlApiGetOrderById,resolve,reject,data)
    })
    const res = await promise
    localStorage.setItem("order",JSON.stringify(res));
};
Start();
function GetUserById(){
    if(Account!==null){
        $.get({
            url:urpApiGetUserById+"?id="+Account["user_id"],
            headers: { "Authorization": 'Bearer ' + token }
        })
        .done(res=>{
            fillDataToInput(res);
        })
        .fail(err=>{
            console.log(err);
        });
    };
};


function fillDataToInput(data) {
    inputFullName.val(data["fullName"]);
    inputPhoneNumber.val(data["phone_number"]);
    inputAddress.val(data["address"] !=="" ? data["address"] :"");
};

function renderListProductOrder(listproduct){
    let totalPrice = 0;
    let totalDisCount = 0;
    var html =  listproduct.map((product,index)=>{
        totalPrice += ( product["discount"] == 0 ? product["price"] * listOrder[0][index]["amount"]:product["discount"] * listOrder[0][index]["amount"])
        totalDisCount +=(product["discount"] != 0 ? (product["price"]-product["discount"]) * (listOrder[0][index]["amount"]):0)
  
        renderPrice(totalPrice,totalDisCount)
        return `
        <tr class="cart-item">
            <td class="col item">
                <div class="cart-item-info">
                    <div class="cart-item-photo">
                        <img src="${getLinkProductOrder(product["productId"])}" alt="">
                    </div>
                    <div class="cart-item-details">
                        <p class="cart-item-name">${product["title"]}</p>
                        <div class="cart-item-options">
                            <div class="cart-item-option color">
                                <span>${product["color"]}</span>
                            </div>
                            <div class="line"></div>
                            <div class="cart-item-option size">
                                <span>${listOrder[0].length !==0?  listOrder[0][index]["size"]:""}</span>
                            </div>
                        </div>
                    </div>
                </div>


            </td>
            <td class="col price">
                <span class="price" >
                    ${product["discount"]>0 ? handlePrice(product["discount"]):handlePrice(product["price"]) } 
                </span>
                <span class="old-price" style = "display: ${product["discount"]>0 ?"block":"none"};">
                 ${product["discount"]>0 ? handlePrice(product["price"]):handlePrice(product["discount"])} 
                </span>
            </td>
            <td class="col qty">
                <span>Số lượng :${listOrder[0].length !==0 ? listOrder[0][index]["productId"]===product["productId"]?listOrder[0][index]["amount"]:"":""}</span>
            </td>
        </tr>
        
        `
    });
    $(".checkout-cart-items").html(html.join(""));
};

function renderPrice(price,discount){
    var tbody = `
    <tr>
        <td style="padding-right: 15px;">Giá trị đơn hàng</td>
        <td>${handlePrice(price)} </td>
    </tr>
    <tr>
        <td>Tiết kiệm</td>
        <td style="color: rgb(218, 41, 28);"> - ${handlePrice(discount)}  </td>
    </tr>
    `
    $(".checkout-totals tbody").html(tbody)
    var tfoot = `
    <th>
                                                
        Tổng tiền thanh toán   
        <small>
           (Đã bao gồm thuế VAT)
        </small>

    </th>
    <td>

       ${handlePrice(price)}₫

    </td>
   `
   $(".checkout-totals tfoot .grand-totals").html(tfoot)
};

listButtonAddress.forEach(item=>{
    item.onclick = () => {
        if(document.querySelector(".form-address-type button.active")){
            document.querySelector(".form-address-type button.active").classList.remove("active");
            
        }
        item.classList.add("active");


    }
});


listButtonPayMent.forEach(item=>{
    item.onclick = (e) => {
        if(document.querySelector(".checkout-payment-method-section button.active")){
            document.querySelector(".checkout-payment-method-section button.active").classList.remove("active");
            
        }
        e.target.classList.add("active");


    }
});
btnPay.on("click", async()=>{
    let i = 0;
    let j = 0;
    let listOrderPayment= [];
    let count = 0;
    while(i<listOrder[0].length){
        if(listOrderPayment.length  === 0 ){
            listOrderPayment.push(listOrder[0][i]);
            console.log(listOrderPayment.length);
        }
        if(listOrderPayment.length > 0){
            var order = listOrderPayment.find(item=>{
                return item["orderId"] === listOrder[0][i]["orderId"]  
            })
            if(order === undefined){
                listOrderPayment.push(listOrder[0][i]);
            }
        }
        i++;
    }
    console.log(listOrderPayment.length);
    while (j <listOrderPayment.length){
        await GetOrderById(listOrderPayment[j]["orderId"])
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
            status:3,
            order_Details:order["order_Details"]

        }
        UpdateOrder(data);
        j++;
    }
    
});
function UpdateOrder(data){
    $.ajax({
        type: "PUT",
        url: urlApiUpdateOrder,
        headers: { "Authorization": 'Bearer ' + token },
        data: JSON.stringify(data),
        contentType: "application/json"
        
    })
    .done((res)=>{
        window.location="./Notice.html";

    })
    .fail(err=>{
        console.log(err.statusText);
        showErrorToast("Có lỗi vui lòng thao tác lại sau 1p");
    })
};

