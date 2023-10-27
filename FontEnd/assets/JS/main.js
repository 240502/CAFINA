const iconUser = $(".header-account")
const listProduct = $(".list");
const inputSearch = $(".search-input");
const btnSearch = $(".search-btn");
const totalItemElement =$(".total-item");
const nextBtn = $("#next");
const prevBtn = $("#prev");
const ProductItems = $(".product-items");
const blockBST = $(".block-bst");
const viewAllBST = $(".block-product .viewall");
const  subMenuImage = $(".sub-menu-image");
const searchInputHeader = $(".search-input");
const searchInputModel = $(".form-search .search-input");
const siteMain = $(".site-main");
const searchClose = $(".search-close")
const searchBtn = $(".search-btn");
const headerIcon = $(".header-icon");
const iconShopping = $(".header-icon")
headerIcon.on("click",()=>{
  
})
let thisPage =1;
let pageSize = 10

const urlApiGetByProductId ="https://localhost:7284/api-customer/Galery/GetByProductId";
const urlApiGetRecommended = "https://localhost:7284/api-customer/Product/Recommend";
const urlApiSearchProduct = "https://localhost:7284/api-customer/Product/Search";
const urlApiGetOrder = "https://localhost:7284/api-customer/Order/Get_Order_ByUsId"
const urlGetProductById = "https://localhost:7284/api-customer/Product/Get_ByID"
let isSearch = false;
let isSearchContent = false;
let isMainContent = true;
const infoUs = JSON.parse(localStorage.getItem("login"));


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

iconUser.on("click",()=>{
  if(infoUs){
    if(infoUs["role_id"] ==1){
      window.location="./infoUser.html"

    }
    else{
    }
  }
  else{
    window.location = './login.html';

  }
})

function Start (){
  handleGetRecommended();
  handleGetByBST();
  getOrder();
  renderOrder();
};
Start();
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

function getOrder(){
  listorder = []
  $.get(urlApiGetOrder+'?usid='+infoUs["user_id"])
  .done(res=>{
    handleProduct(res);
    listorder.push(res["data"]);
    localStorage.setItem("listorder",JSON.stringify(listorder))
  })
  .fail(err=>{
    alert(err.statusText);
  })
}

async function getCategory(productid){
  var data ={
    productid:2
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

function handleProduct(data){
  $(".count").html(data["totalItems"])
  var html = data["data"].forEach(item=>{
    getProductById(item["productId"])
    
  })
}
searchBtn.on('click', () => {
  var value = searchInputModel.val();
  handleSearch(value);
  ActiveSiteMain();
  HiddeMainContent();
  
})
searchClose.on('click', ()=>{
  CloseModelSearch();
})

searchInputHeader.on('click', ()=>{
 ActiveModelSearch();
})
searchInputHeader.on('keypress',(e)=>{
  if(e.key ==='Enter')
  {
    var value  =searchInputModel.val();
    if( value ===''){
      CloseModelSearch();
    }
    else{
      searchInputHeader.val(searchInputModel.val());
      CloseModelSearch();
      handleSearch(value);
      ActiveSiteMain();
      HiddeMainContent();
    }
  }

})

viewAllBST.on("click", function(e) { 

});
$(".container-minicart").on("click", (e)=> {
  CloseMinicart();
});
$(".block-minicart").on("click", (e)=>{
  e.stopPropagation();

})
iconShopping.on("click", ()=> {
  OpenMinicart();
});

function CloseMinicart(){
  $(".container-minicart").removeClass("opened")
}
function OpenMinicart(){

  $(".container-minicart").addClass("opened")
}
function handleSearch(productName){
  
  var data = {
    page: thisPage,
    pageSize: 8,
    ProductName : productName
  }
  SearchProduct(data)

}
function SearchProduct(data){
  $.post({
    url:urlApiSearchProduct,
    data:JSON.stringify(data),
    contentType : 'application/json'
  })
  .done(res=>{
    renderSearchProduct(res);
    
  })
}
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
    console.log(link["thumbnail"])

  }
  return  typeof link === "undefined" ? "" : link["thumbnail"]


}
function renderOrder(){
  var listProductOrder = JSON.parse(localStorage.getItem("ListProductOrder"))
  var listOrder = JSON.parse(localStorage.getItem("listorder"))
  var html =listProductOrder.map((item,index)=>{
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
}
function renderSearchProduct(response) {
  var totalItems = response["totalItems"]
  const countPage = Math.ceil(response["totalItems"]/8)
  renderListPage(countPage);
  $(".site-main .total-items span").text(totalItems)
  var html = response["data"].map(product=>{
    return `
    
    <div class="product-item col-4">
        <div class="item__image">
            <a href="#">
                <img src="${GetLinkBSTHome(product["productId"])}" alt="">
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

}




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

  function handleGetByBST(){
    var data = {
      pageIndex:thisPage,
      pageSize,
      TenBST:"Thu đông 2023"
    };
    GetProductByBST(data);
  };
  function GetProductByBST(data){
    $.post({
           url: "https://localhost:7284/api-customer/Product/GetByBst",
           data:JSON.stringify(data),
           contentType:"application/json"
       })
       .done(response=>{
          RenderBST(response);
          if(!localStorage.getItem("GaleryHome")) 
            handleGetGalery(response["data"]);
       })
  };
  function GetLinkBSTHome(id){
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
  function RenderBST(products){
      var html = products["data"].map((product,index)=>{
        return `
  
        <div class="product-item col-4">
                        <div class="item__image">
                            <a href="#">
                                <img src="${GetLinkBSTHome(product["productId"]) != null ? GetLinkBSTHome(product["productId"]):""}" alt="">
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
                                } đ</div>
                            </div>
                        </div>
                    </div>
        `
      })
      blockBST.html(html);
      blockBST.slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      arrows: true,
      draggable: false,
      prevArrow: `<button type='button' class='slick-prev slick-arrow'><ion-icon name="arrow-back-outline"></ion-icon></button>`,
      nextArrow: `<button type='button' class='slick-next slick-arrow'><ion-icon name="arrow-forward-outline"></ion-icon></button>`,
      dots: false,
      responsive: [
        {
          breakpoint: 1025,
          settings: {
            slidesToShow: 3,
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
  };
  
  function handleGetRecommended(){
    var data = {
      pageIndex: thisPage
    }
    GetRecommended(data);
  };
  function GetRecommended(data){
    $.get(urlApiGetRecommended,data)
    .done(res=>renderProductRecommended(res));
  };
  function renderProductRecommended(Products){
    const countPage = Math.ceil(Products["totalItems"]/8)
    renderListPage(countPage);
    var html = Products["data"].map(product =>{
      return `
      <div class="product-item col-4">
                          <div class="item__image">
                              <a href="#">
                                  <img src="${GetLinkBSTHome(product["productId"]) != null ? GetLinkBSTHome(product["productId"]):""}" alt="">
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
    })
    $(".block-new-product .products").html(html.join(''));
  };

  
  function changePage(index){
    thisPage = index;
    if(isMainContent){
      handleGetRecommended();
    }
    if(isSearchContent){
      handleSearch();
    }
   
  }

  
$(".nam").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    draggable: false,
    prevArrow: `<button type='button' class='slick-prev slick-arrow'><ion-icon name="arrow-back-outline"></ion-icon></button>`,
    nextArrow: `<button type='button' class='slick-next slick-arrow'><ion-icon name="arrow-forward-outline"></ion-icon></button>`,
    dots: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
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

$(".nu").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    draggable: false,
    prevArrow: `<button type='button' class='slick-prev slick-arrow'><ion-icon name="arrow-back-outline"></ion-icon></button>`,
    nextArrow: `<button type='button' class='slick-next slick-arrow'><ion-icon name="arrow-forward-outline"></ion-icon></button>`,
    dots: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
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

$(".tre_em").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    draggable: false,
    prevArrow: `<button type='button' class='slick-prev slick-arrow'><ion-icon name="arrow-back-outline"></ion-icon></button>`,
    nextArrow: `<button type='button' class='slick-next slick-arrow'><ion-icon name="arrow-forward-outline"></ion-icon></button>`,
    dots: false,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
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
 