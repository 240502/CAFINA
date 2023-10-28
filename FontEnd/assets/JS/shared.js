
const urlApiGetCateDetails = "https://localhost:7284/api-customer/CategoryDetails/Get_CateDetails";
const urlApiGetListCate = "https://localhost:7284/api-customer/Category/GetCate_ByObId";
const urlApiGetOrder = "https://localhost:7284/api-customer/Order/Get_Order_ByUsId"
const urlGetProductById = "https://localhost:7284/api-customer/Product/Get_ByID"
const urlApiGetByProductId ="https://localhost:7284/api-customer/Galery/GetByProductId";
const iconUserHeader =$(".header-account.header-icon")
const iconShopping = $(".shopping-cart")
const logOut = $(".logout")
logOut.on("click",()=>{
  alert("bạn chắc chán muốn đăng xuất")
  window.location = './index.html'
  localStorage.setItem("login",null)
})
const infoUsLocal = JSON.parse(localStorage.getItem("login"));

console.log(infoUsLocal)
async function Run (){
    getCategory();
    if(infoUsLocal !==null){
      hanleNavManager();
      await getOrder();
      await renderOrder();
    }
  };
  Run();
  function hanleNavManager(){
    if(infoUsLocal["role_id"]==1){
      openNavManage();
    }else{
        hiddleNavManage();
    }
}


$(".block-minicart").on("click", (e)=>{
  e.stopPropagation();

})
function hiddleNavManage(){
  $(".content .nav").removeClass("active");
}
function openNavManage(){
    $(".content .nav").addClass("active");
}
iconShopping.on("click", ()=> {
  OpenMinicart();
});
$(".container-minicart").on("click", (e)=> {
  CloseMinicart();
});

function CloseMinicart(){
  $(".container-minicart").removeClass("opened")
}
function OpenMinicart(){

  $(".container-minicart").addClass("opened")
}
  function getOrder(){
    listorder = []
    $.get(urlApiGetOrder+'?usid='+infoUsLocal["user_id"])
    .done(res=>{
      handleProduct(res);
      listorder.push(res["data"]);
      localStorage.setItem("listorder",JSON.stringify(listorder))
    })
    .fail(err=>{
      alert(err.statusText);
    })
  }
  function handleProduct(data){
    $(".count").html(data["totalItems"])
    var html = data["data"].forEach(item=>{
      getProductById(item["productId"])
      
    })
  }
  iconUserHeader.on("click",()=>{
    if(infoUsLocal){
      if(infoUsLocal){
        window.location="./infoUser.html"
        
      }
    }
    else{
      window.location = './login.html';
    }
  })
  function getProductById(productid){
    listproductOrder = [];
    $.get(urlGetProductById+"?id="+productid)
    .done(res=>{
      listproductOrder.push(res)
      localStorage.setItem("ListProductOrder",JSON.stringify(listproductOrder));
    })
  }
  function getGalaryProductOrder(productid){
    ListGaleryOrder= [];
      $.get(urlApiGetByProductId+"?productId="+productid)
      .done(res=>{
        ListGaleryOrder.push(res)
        localStorage.setItem("galaryProductOrder",JSON.stringify(ListGaleryOrder));
      })
      .fail(err=>{
      })
  }
  function getLinkProductOrder(productid){
    var ListGaleryOrder = JSON.parse(localStorage.getItem("galaryProductOrder"));
    var link= ListGaleryOrder.find(item=>{
      return item["productId"] === productid
    })
    if(typeof link !== "undefined"){
    }
    return  typeof link === "undefined" ? "" : link["thumbnail"]
  
  
  }
  function renderOrder(){
    var listOrder = JSON.parse(localStorage.getItem("listorder"))
    var listProductOrder = JSON.parse(localStorage.getItem("ListProductOrder"))
    var totalprice = 0;
    var html =listProductOrder.map((item,index)=>{
      totalprice += item["price"]
      getGalaryProductOrder(item["productId"])
      return `
  
    <li class="minucart-item" data-id = ${item["productId"]}>
    <div class="mini-cart-info">
     <div class="minicart-item-photo">
         <a href="#">
             <img src="${getLinkProductOrder(item["productId"])}" alt="">
         </a>
         <button class="minicart-item-remove"></button>
  
     </div>
     <div class="minicart-item-details">
         <h3 class="minicart-item-name">
             <a href="#">
                ${item["title"]}
             </a>
         </h3>
         <div class="minicart-item-options">
             <div class="minicart-item-option">
                 <div class="colors">
                     <span class="color__option selected" style="background-image: url(https://media.canifa.com/attribute/swatch/images/sp234.png);">
                     </span>
                     <span> ${item["color"]} </span>
                 </div>
             </div>
             <div class="minicart-item-option">
                 L
             </div>
         </div>
         <div class="minicart-item-bottom">
             <div class="minicart-item-price">
                 <div class="normal-price">
                 ${
                  item["price"].toString().length>5 ? item["price"].toString().slice(0,3)+"."+item["price"].toString().slice(3,6): item["price"].toString().slice(0,2)+"."+product["price"].toString().slice(2,5)
                 }
                 đ </div>
             </div>
             <div class="minicart-item-qty">
                 <button class="btn btnMinus"><i class="fa-solid fa-minus"></i></button>
                 <span class="amount">${listOrder[0][index]["amount"]}</span>
                 <button class="btn btnPlus"><i class="fa-solid fa-plus"></i></button>
             </div>
         </div>
     </div>
    </div>
  </li>
    
    `
  
  })
  $(".minicart-items").html(html.join(''))
  var stringTotalPrice= ""
  if(totalprice.toString().length > 5 && totalprice.toString().length <7) {
    stringTotalPrice =  totalprice.toString().slice(0,3)+"."+totalprice.toString().slice(3,6)
  }
  else if (totalprice.toString().length >=7)
  {

      stringTotalPrice =  totalprice.toString().slice(0,1)+"."+totalprice.toString().slice(1,4)+"."+totalprice.toString().slice(4,7)
  }
  else{
    stringTotalPrice =  totalprice.toString().slice(0,2)+"."+totalprice.toString().slice(2,5)
  }
  console.log(totalprice)
  $(".totalPrice").html(stringTotalPrice+' đ')
}
function httpGetCateAsync(url,resolve,reject,data) {
  $.get(url,data)
  .done(response => resolve(response))
  .fail(error => reject(error))
};

function httpGetAsync(url,resolve,reject,data){
  $.get(url,data)
  .done(response => resolve(response))
  .fail(error => reject(error))
};

function httpGetAsync(url,resolve,reject,data){
  $.get(url,data)
  .done(response => resolve(response))
  .fail(error => reject(error))
};

function httpPostAsyncCate(url,resolve,reject,data){
  $.post({
    url: url,
    data:JSON.stringify(data),
    contentType : 'application/json'
  })
  .done((res,status,xhr) => {
    if(xhr.status === 200) {
      resolve(res)
    }
  })
  .fail(err =>{ 
    reject(err)
  });

};
function renderListPage(count){
    $(".list-page div").html("")
    var html = ""
    if(count > 1){
      for(var i=1; i<=count; i++){
        html+= `
        <li class="item ${thisPage ==i?"active":""}" onclick= changePage(${i})><span>${i}</span></li>
        `
      }
      $(".list-page div").html(html);
      $(".page-next").toggleClass("active-next-button",true)
    }
    else{
      $(".page-next").toggleClass("active-next-button",false)
  
    }
  };

  async function getCategory(){
    var data ={
      obId:2
    }
    const promise = new Promise((resolve,reject)=>{
      httpGetCateAsync(urlApiGetListCate,resolve,reject,data)
    })
    
   
    var title = await promise
    renderTitleSubMenu(title,"Menu_nu")
    renderTitleSubMenu(title,"Menu_be_gai")
    
    const promise1 = new Promise((resolve,reject)=>{
      httpGetCateAsync(urlApiGetListCate,resolve,reject)
    })
    var result = await promise1
    renderTitleSubMenu(result,"Menu_nam")
    renderTitleSubMenu(result,"Menu_be_trai")
  
  };

  async function renderTitleSubMenu(title,clasName){
    var group_1 = ''
    title.forEach(item=>{
     if (item["id"] ==1)
     {
         
              group_1 +=`
              <ul class="sub-menu-item" data-id = ${item["id"]}>
                <li class="title">${item["cateName"]}</li>
                <div class="content">
                 
                </div>
              </ul>`
        
     }
   });
    var group_2 = ''
     title.forEach(item=>{
      if (item["id"] >1 && item["id"] <5)
      {
        group_2+= `
            <ul class="sub-menu-item" data-id = ${item["id"]}>
              <li class="title">${item["cateName"]}</li>
              <div class="content">
              </div>
            </ul>
          `
      }
    });
   
    var group_3 = ''
    title.forEach(item=>{
     if (item["id"] >4 && item["id"] <7)
     {
       group_3+= `
           <ul class="sub-menu-item" data-id = ${item["id"]}>
             <li class="title">${item["cateName"]}</li>
             <div class="content">
             </div>
           </ul>
         `
     }
   });
    
    var group_4 = ''
    title.forEach(item=>{
      if (item["id"] >6 )
      {
        group_4+= `
          <ul class="sub-menu-item" data-id = ${item["id"]}>
            <li class="title">${item["cateName"]}</li>
            <div class="content">
            </div>
          </ul>
        `
      }
    });
    $(`.${clasName} .group-1`).html(group_1);
    $(`.${clasName} .group-2`).html(group_2);
    $(`.${clasName} .group-3`).html(group_3);
    $(`.${clasName} .group-4`).html(group_4);
  
    var subMenuContentNu =  [...document.querySelectorAll(".Menu_nu .sub-menu-item")]
    var subMenuContentNam =  [...document.querySelectorAll(".Menu_nam .sub-menu-item")]
    var subMenuContentBeTrai =  [...document.querySelectorAll(".Menu_be_trai .sub-menu-item")]
    var subMenuContentBeGai =  [...document.querySelectorAll(".Menu_be_gai .sub-menu-item")]
     async function renderSubMenuContent(subMenuContent,objectName) {
       let i =0;
       while(i<subMenuContent.length){
         var data = {
           cateId : subMenuContent[i].dataset.id,
           objectName
         }
         const promise = new Promise((resolve,reject)=>{
           httpPostAsyncCate(urlApiGetCateDetails,resolve,reject,data)
         })
         var res = await promise
         var html =""
         res.forEach(item=>{
           html+= ` <li> <a href="#">${item["detailName"]}</a></li>`
         })
         subMenuContent[i].children[1].innerHTML = html
         i++;
       }
     }
     
     renderSubMenuContent(subMenuContentNu,'Nữ')
     renderSubMenuContent(subMenuContentNam,'Nam')
     renderSubMenuContent(subMenuContentBeGai,'Trẻ em gái')
     renderSubMenuContent(subMenuContentBeTrai,'Trẻ em trai')
};

