
const urlApiGetCateDetails = "https://localhost:7284/api-customer/CategoryDetails/Get_CateDetails";
const urlApiGetListCate = "https://localhost:7284/api-customer/Category/GetCate_ByObId";
const urlApiGetOrder = "https://localhost:7284/api-customer/Order/Get_Order_ByUsId"
const urlGetProductById = "https://localhost:7284/api-customer/Product/Get_ByID"
const urlApiGetByProductId ="https://localhost:7284/api-customer/Galery/GetByProductId";
const urlApiSearchProduct = "https://localhost:7284/api-customer/Product/Search";
const minicartClose = $(".minicart-close");
const iconUserHeader =$(".header-account.header-icon");
const searchClose = $(".search-close");
const searchBtn = $(".search-btn");
const searchInputHeader = $(".search-input");
const searchInputModel = $(".form-search .search-input");
const btnPageNext  = $("#btn-page-next")
const btnPagePrev  = $("#btn-page-prev")

const  subMenuImage = $(".sub-menu-image");



let isSearchContent = false;
let isMainContent = true;


const iconShopping = $(".shopping-cart")
const logOut = $(".logout")
logOut.on("click",()=>{
  alert("bạn chắc chán muốn đăng xuất")
  window.location = './index.html'
  localStorage.setItem("login",null)
})
const infoUsLocal = JSON.parse(localStorage.getItem("login"));

function ActiveModelSearch(){
  isSearch=true;
  $(".header-search").toggleClass("opened",isSearch);
};

function CloseModelSearch(){

  isSearch = false;
  $(".header-search").toggleClass("opened",isSearch);
};



function ActiveMainContent() {
  isMainContent = true;
  $(".main-content").toggleClass("active",isMainContent)
};

function HiddeMainContent() {
  isMainContent = false;
  $(".main-content").toggleClass("active",isMainContent)
};

function ActiveSiteMain(){
  isSearchContent =true;
  $(".site-main").toggleClass("active",isSearchContent)

};

function HiddeSiteMain() {
  isSearchContent =false;
  $(".site-main").toggleClass("active",isSearchContent)

};




async function Run (){
    getCategory();
    if(infoUsLocal !==null){
      hanleNavManager();
      ActiveMainContent();
      HiddeSiteMain();
      await getListOrder();
      await renderListOrder();
   
    }
  };
Run();

subMenuImage.slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  infinite: true,
  arrows: false,
  draggable: false,
  dots: true,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        arrows: false,
        infinite: false,
      },
    },
  ],
  // autoplay: true,
  // autoplaySpeed: 1000,
});




function handleSearchProduct(productName){
  
  var data = {
    page: thisPage,
    pageSize: 8,
    ProductName : productName
  }
  SearchProduct(data)

}
searchBtn.on('click', () => {
  var value = searchInputModel.val();
  handleSearchProduct(value);
  ActiveSiteMain();
  HiddeMainContent();
  
});


searchClose.on('click', ()=>{
  CloseModelSearch();
});

searchInputHeader.on('click', ()=>{
 ActiveModelSearch();
});
searchInputHeader.on('keypress',(e)=>{
  if(e.key ==='Enter')
  {
    var value  =searchInputModel.val();
    if(thisPage >1){
      thisPage =1
    }
    if( value ===''){
      CloseModelSearch();
    }
    else{
      searchInputHeader.val(searchInputModel.val());
      CloseModelSearch();
      handleSearchProduct(value);
      ActiveSiteMain();
      HiddeMainContent();

    }
  }

});


function hanleNavManager(){
  if(infoUsLocal["role_id"]==1){
    openNavManage();
  }else{
      hiddleNavManage();
  }
};


$(".block-minicart").on("click", (e)=>{
  e.stopPropagation();

});
function hiddleNavManage(){
  $(".content .nav").removeClass("active");
};

function openNavManage(){
    $(".content .nav").addClass("active");
};

function CloseMinicart(){
  $(".container-minicart").removeClass("opened")
};

function OpenMinicart(){

  $(".container-minicart").addClass("opened")
};

iconShopping.on("click", ()=> {
  OpenMinicart();
});

$(".container-minicart").on("click", (e)=> {
  CloseMinicart();
});
minicartClose.on("click",()=>{
  CloseMinicart();
});

function getListOrder(){
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
};

function handleProduct(data){
  $(".count").html(data["totalItems"])
  var html = data["data"].forEach(item=>{
    getProductById(item["productId"])
    
  })
};

function SearchProduct(data){
  $.post({
    url:urlApiSearchProduct,
    data:JSON.stringify(data),
    contentType : 'application/json'
  })
  .done(res=>{
    renderProductSearch(res);
  })
};

function renderProductSearch(response) {
  var totalItems = response["totalItems"]
  const countPage = Math.ceil(response["totalItems"]/8)
  renderListPage(countPage);
  $(".site-main .total-items span").text(totalItems)
  var html = response["data"].map(product=>{
    return `
    <div class="product-item col-4">
        <div class="item__image">
            <a href="#">
                <img src="${GetLinkImgBSTHome(product["productId"])}" alt="">
            </a>
            <div class="product-item-button-tocart">
                <span>Thêm nhanh vào giỏ</span>
            </div>    
        </div>
        <div class="item__details">
            <div class="colors">
                <div class="color__option selected" style="background-image: url(https://media.canifa.com/attribute/swatch/images/sp234.png);">
                </div>

                <div class="color__option selected" style="background-image: url(https://media.canifa.com/attribute/swatch/images/sa010.png)">
                </div>

                <div class="color__option selected" style="background-image: url(https://media.canifa.com/attribute/swatch/images/sk010.png)">
                </div>
            </div>
            <h3 class="product-item-name">

                <a href="#">
                    ${product["title"]}
                </a>
            </h3>
            <div class="price-box">
                <div class="normal-price">${
                  product["price"].toString().length>5 ? product["price"].toString().slice(0,3)+"."+product["price"].toString().slice(3,6): product["price"].toString().slice(0,2)+"."+product["price"].toString().slice(2,5)
                } </div>
            </div>
        </div>
    </div>
    `
  });
  $(".site-main .product-items").html(html)

};

iconUserHeader.on("click",()=>{
  if(infoUsLocal){
    if(infoUsLocal){
      window.location="./infoUser.html"
      
    }
  }
  else{
    window.location = './login.html';
  }
});

function getProductById(productid){
  listproductOrder = [];
  $.get(urlGetProductById+"?id="+productid)
  .done(res=>{
    listproductOrder.push(res)
    localStorage.setItem("ListProductOrder",JSON.stringify(listproductOrder));
  })
};

function getGalaryProductOrder(productid){
  ListGaleryOrder= [];
    $.get(urlApiGetByProductId+"?productId="+productid)
    .done(res=>{
      ListGaleryOrder.push(res)
      localStorage.setItem("galaryProductOrder",JSON.stringify(ListGaleryOrder));
    })
    .fail(err=>{
    })
};

function getLinkProductOrder(productid){
  var ListGaleryOrder = JSON.parse(localStorage.getItem("galaryProductOrder"));
  var link= ListGaleryOrder.find(item=>{
    return item["productId"] === productid
  })
  return  typeof link === "undefined" ? "" : link["thumbnail"]
};

function renderListOrder(){
  var listOrder = JSON.parse(localStorage.getItem("listorder"))
  var listProductOrder = JSON.parse(localStorage.getItem("ListProductOrder"))
  var totalprice = 0;
  var html =listProductOrder.map((item,index)=>{
    totalprice += item["price"]
    getGalaryProductOrder(item["productId"])
    return `
        <li class="minicart-item" data-id = ${item["productId"]}>
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
};

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
    console.log(count)
    console.log(thisPage)

    if(count > 1){
      if(thisPage<count )
      {
        if(thisPage>=2)
        {
          for(var i=thisPage-1; i<=thisPage+1; i++){
            html+= `
              <li class="item ${thisPage ==i?"active":""}" onclick= changePage(${i})><span>${i}</span></li>
            `
          }
        }
        else{
          for(var i=1; i<=thisPage+1; i++){
            html+= `
              <li class="item ${thisPage ==i?"active":""}" onclick= changePage(${i})><span>${i}</span></li>
            `
          }
        }
      }
      else{
        for(var i=thisPage-2; i<=thisPage; i++){
          html+= `
            <li class="item ${thisPage ==i?"active":""}" onclick= changePage(${i})><span>${i}</span></li>
          `
        }
      }
      $(".list-page div").html(html);
      $(".page-next").toggleClass("active-button",true)

    }
    else{
      $(".page-next").toggleClass("active-button",false)
      $(".page-prev").toggleClass("active-button",true)
    }
};




async function getCategory(){
  var data ={
      obId:2
    };

  const promise = new Promise((resolve,reject)=>{
    httpGetCateAsync(urlApiGetListCate,resolve,reject,data);
  });
    
  var title = await promise;
  renderTitleSubMenu(title,"Menu_nu");
  renderTitleSubMenu(title,"Menu_be_gai");
  
  const promise1 = new Promise((resolve,reject)=>{
    httpGetCateAsync(urlApiGetListCate,resolve,reject)
  });
  var result = await promise1;
  renderTitleSubMenu(result,"Menu_nam");
  
  renderTitleSubMenu(result,"Menu_be_trai");
  
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
      
   }});
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

let ListGalery = new Array();
const handleGetGalery = async (products)=>{
  var data =  products.map(product=>{
     return {productId:product["productId"]}
  })
   let i = 0;
   while (i<data.length) {
       const promise = new Promise((resolve, reject) => {
         httpGetAsync(urlApiGetByProductId,resolve,reject,data[i])
       });
       var response = await promise;
          i+=1
          ListGalery.push(response)
          localStorage.setItem("GaleryHome",JSON.stringify(ListGalery));
   }

};
function GetLinkImgBSTHome(id){
  let link = ""
  const ImgBSTHome=JSON.parse(localStorage.getItem("GaleryHome"));
  if(ImgBSTHome!=null){
    for (let i=0; i<ImgBSTHome.length;i++) {
      if(ImgBSTHome[i]["productId"] === id)
        link = ImgBSTHome[i]["thumbnail"]
      }
    }
  return link;
};

