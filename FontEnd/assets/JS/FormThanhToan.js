const urpApiGetUserById = "https://localhost:7284/api-admin/User/Get_Us_By_Id";
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
Start();
function GetUserById(){
    if(Account!==null){
        $.get(urpApiGetUserById+"?id="+Account["user_id"])
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
        totalPrice += product["price"]*listOrder[0][index]["amount"]
        totalDisCount += product["discount"]*listOrder[0][index]["amount"]
        renderPrice(totalPrice,totalDisCount)
        return `
        <tr class="cart-item">
            <td class="col item">
                <div class="cart-item-info">
                    <div class="cart-item-photo">
                        <img src="./assets/Image/ImageNam/DoActive.webp" alt="">
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
                    ${product["discount"]>0 ? handlePrice(product["discount"]):handlePrice(product["price"]) } đ
                </span>
                <span class="old-price" style = "display: ${product["discount"]>0 ?"block":"none"};">
                 ${product["discount"]>0 ? handlePrice(product["discount"]):handlePrice(product["price"])} đ
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
        <td>${handlePrice(price - discount)} đ</td>
    </tr>
    <tr>
        <td>Chiết khấu</td>
        <td style="color: rgb(218, 41, 28);"> - ${handlePrice(discount)} ₫ </td>
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
btnPay.on("click", ()=>{
    
})

