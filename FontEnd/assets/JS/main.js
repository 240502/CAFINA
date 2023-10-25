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
const formUs = $(".form-us");
const inputName = $("#name")
const inputSdt = $("#sdt")
const inputEmail = $(".email")
const inputBirthDay = $("#birthday")
// const checkBoxNam = $("#radio1")
// const checkBoxNu = $("#radio2")
// const checkBoxKhac = $("#radio3")

const urlApiGetByProductId ="https://localhost:7284/api-customer/Galery/GetByProductId";
const urlApiGetCateDetails = "https://localhost:7284/api-customer/CategoryDetails/Get_CateDetails";
const urlApiGetListCate = "https://localhost:7284/api-customer/Category/GetCate_ByObId";
const urlApiGetRecommended = "https://localhost:7284/api-customer/Product/Recommend";
const urlApiSearchProduct = "https://localhost:7284/api-customer/Product/Search";

let thisPage = 1;
let pageSize = 10;
let isSearch = false;
let isSearchContent = false;
let isMainContent = false;
let isFormUs = false;
function OpenFormUs(){
  isFormUs = true;
  formUs.toggleClass("active",isFormUs)
}
function hiddeFormUs(){
  isFormUs = false;
  formUs.toggleClass("active",isFormUs)
}
const infoUs = JSON.parse(localStorage.getItem("login"));
function fillDataToInput(){
  if(infoUs["gioiTinh"] ==="Nam")
  {
    checkBoxNam.prop("checked",true);
  }
  else if(infoUs["gioiTinh"] ==="Nữ")
  {
    checkBoxNu.prop ("checked", true);
  }
  else checkBoxKhac.prop("checked", true);

  inputName.val(infoUs["fullName"]);
  inputSdt.val(infoUs["phone_number"]);
  inputEmail.val(infoUs["email"]);
  inputBirthDay.val(infoUs["birthDay"].slice(0,10));
}


iconUser.on("click",()=>{
  if(infoUs){
    if(infoUs["role"] ==1){
      HiddeMainContent();
      OpenFormUs();
      fillDataToInput();

    }
    else{

    }
  }
  else{
    window.location = './login.html';

  }
})

function Start (){
  ActiveMainContent();
  HiddeSiteMain();
  handleGetByBST();
  getCategory();
  handleGetRecommended();
  hiddeFormUs();
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

searchBtn.on('click', () => {
  var value = searchInputModel.val();
  handleSearch(value);
  ActiveSiteMain();
  HiddeMainContent();
  
})
searchClose.on('click', ()=>{
  CloseModelSearch();
})
function ActiveModelSearch(){
  isSearch=true;
  $(".header-search").toggleClass("opened",isSearch);
}
function CloseModelSearch(){

  isSearch = false;
  $(".header-search").toggleClass("opened",isSearch);
}
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
function ActiveMainContent() {
  isMainContent = true;
  $(".main-content").toggleClass("active",isMainContent)
} 
function HiddeMainContent() {
  isMainContent = false;
  $(".main-content").toggleClass("active",isMainContent)
} 
function ActiveSiteMain(){
  isSearchContent =true;
  $(".site-main").toggleClass("active",isSearchContent)

}
function HiddeSiteMain() {
  isSearchContent =false;
  $(".site-main").toggleClass("active",isSearchContent)

} 
viewAllBST.on("click", function(e) { 

});
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

  console.log(title)

  
  
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



} ;
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
      i++;
      ListGalery.push(response)
      localStorage.setItem("GaleryHome",JSON.stringify(ListGalery));
  }
};

function handleGetByBST(){
  var data = {
    pageIndex:thisPage,
    pageSize:pageSize,
    TenBST :"Thu đông 2023"
  };
  GetProductByBST(data);
};
function GetProductByBST(data){
  $.post({
         url: "https://localhost:7284/api-customer/Product/Get_By_BST",
         data:JSON.stringify(data),
         contentType:"application/json"
     })
     .done(response=>{
        RenderBST(response);
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
      if(product["price"].toString().length>5)
      {
          var price = product["price"].toString().slice(0,3)+"."+product["price"].toString().slice(3,6);
          console.log(price)
      }
      else{
        var price = product["price"].toString().slice(0,2)+"."+product["price"].toString().slice(2,5);
      }
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
  })
  $(".block-new-product .products").html(html.join(''));
};
function renderListPage(count){
  console.log(count);
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
 