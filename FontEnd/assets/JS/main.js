const listProduct = $(".list");
const inputSearch = $(".search-input");
const btnSearch = $(".search-btn");
const totalItemElement =$(".total-item");
const nextBtn = $("#next");
const prevBtn = $("#prev");
const ProductItems = $(".product-items");
const blockBST = $(".block-bst");
const viewAllBST = $(".block-product .viewall");
const siteMain = $(".site-main");
let thisPage =1;
let pageSize = 10

const urlApiGetRecommended = "https://localhost:7284/api-customer/Product/Recommend";

let isSearch = false;

const infoUs = JSON.parse(localStorage.getItem("login"));






function Start (){
  handleGetProductRecommended();
  handleGetProductByBST();
 
};
Start();




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




viewAllBST.on("click", function(e) { 
  window.location = './ViewAllBST.html';
});










function handleGetProductByBST(){
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
        RenderProductBST(response);
        if(!localStorage.getItem("GaleryHome")) 
          handleGetGalery(response["data"]);
     })
};



function RenderProductBST(products){
    var html = products["data"].map((product,index)=>{
      return `

      <div class="product-item col-4">
                      <div class="item__image">
                          <a href="#">
                              <img src="${GetLinkImgBSTHome(product["productId"]) != null ? GetLinkImgBSTHome(product["productId"]):""}" alt="">
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
  
function handleGetProductRecommended(){
  var data = {
    pageIndex: thisPage
  }
  GetProductRecommended(data);
};
function GetProductRecommended(data){
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
                                <img src="${GetLinkImgBSTHome(product["productId"]) != null ? GetLinkImgBSTHome(product["productId"]):""}" alt="">
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
  btnPageNext.on("click",()=>{
    if(thisPage === countPage){

    }
    else{
        thisPage = thisPage + 1;

    }
    changePage(thisPage);
  });
};

function changePage(index){
  thisPage = index;
  if(isMainContent){
    handleGetProductRecommended();
  }
  if(isSearchContent){
    handleSearchProduct(searchInputHeader.val());
  }
  if(thisPage !=1){
      $(".page-prev").toggleClass("active-button",true)
  }
  else{
      $(".page-prev").toggleClass("active-button",false)
  }
 
};
btnPagePrev.on("click",()=>{
  if(thisPage === 1){

  }
  else{
      thisPage = thisPage - 1;

  }
  changePage(thisPage);
});
  
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
 