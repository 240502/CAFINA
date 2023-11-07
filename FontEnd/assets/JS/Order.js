
const urlApiGetUsById ='https://localhost:7284/api-admin/User/Get_Us_By_Id'
const urlApiCreateOrder ='https://localhost:7284/api-admin/Order/Create_Oder'
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
    const listOrder =JSON.parse(localStorage.getItem('listorder'));
    var Duplicate = listOrder[0].find(item => {
        return item["productId"] === productId;
    })
    return Duplicate;
}
const infoUsOrder = JSON.parse(localStorage.getItem('InfoUsOrder'));
function handleCreateOrder(productId,price){
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
                console.log("oge")
            }      
        }
    }
    else{
        window.location='./login.html';
    }
};
async function handleListOrder(){
    await getListOrder();
    renderListOrder();
}
function CreateOrder(data){
    $.post({
        url:urlApiCreateOrder,
        data:JSON.stringify(data),
        contentType:"application/json"
    })
    .done((res)=>{
        handleListOrder();
       
    })
    .fail(err=>{
        console.log(err);
    })

}