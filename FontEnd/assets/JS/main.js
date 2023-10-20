
const listProduct = $(".list")
const inputSearch = $(".search-input")
const btnSearch = $(".search-btn")
const totalItemElement =$(".total-item")
const nextBtn = $("#next")
const prevBtn = $("#prev")
const ProductItems = $(".product-items")
const blockBST = $(".block-bst")
const viewAllBST = $(".block-product .viewall")
const  subMenuImage = $(".sub-menu-image")

const urlApiGetByProductId ="https://localhost:7284/api-customer/Galery/GetByProductId"
const urlApiGetCateDetails = "https://localhost:7284/api-customer/CategoryDetails/Get_CateDetails"
const urlApiGetListCate = "https://localhost:7284/api-customer/Category/Get_List_Cate"
let thisPage = 1;
let pageSize = 10;
let isSearch = false
function Start (){
  handleGetByBST();
  getCategory();

};
Start();


const list_menu_item =["cate-nu","cate-nam","cate-tre-em"]





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



viewAllBST.on("click", function(e) { 

});

function httpGetCateAsync(url,resolve,reject) {
  $.get(url)
  .done(response => resolve(response))
  .fail(error => reject(error))
}



function httpGetAsync(url,resolve,reject,data){
  $.get(url,data)
  .done(response => resolve(response))
  .fail(error => reject(error))
}
async function getCategory(){
  var dataNu = {
       cateId:1,
       objectName:"nữ"
     }
    //  var dataNam = {
    //    cateName:"Áo",
    //    objectName:"nam"
    //  }
    //  var dataQuanNam = {
    //    cateName:"Quần",
    //    objectName:"nam"
    //  }
     var dataQuanNu = {
      cateId:1,
       objectName:"nữ"
     }
  const promise = new Promise((resolve,reject)=>{
    httpGetCateAsync(urlApiGetListCate,resolve,reject)
  })
  
 
  var title = await promise
  renderTitleSubMenu(title)
}

 function getCateDetails(id) {
  var data ={
    cateId : 1,
    objectName:"Nữ"
  }
  const promise = new Promise((resolve,reject)=>{
    httpPostAsyncCate(urlApiGetCateDetails,resolve,reject,data)
  })
  
  var result=  promise.then(res=>{
    return res
  })
  return result;
}

function renderTitleSubMenu(title){
  var group_1 = ''
  title.forEach(item=>{
   if (item["id"] ==1)
   {
       
            group_1 +=`
            <ul class="sub-menu-item" data-id = ${item["id"]}
            
            >
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

  $(".group-1").html(group_1);
  $(".group-2").html(group_2);
  $(".group-3").html(group_3);
  $(".group-4").html(group_4);

  var subMenuContent =  [...document.querySelectorAll(".Menu_nu .sub-menu-item")]
  console.log(subMenuContent.length)
  async function renderSubMenuContent(){
    let i =0;
    while(i<subMenuContent.length){
      var data = {
        cateId : subMenuContent[i].dataset.id,
        objectName:"Nữ"
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
      // subMenuContent[i].children.html(html)
      i++;
    }
  }
  renderSubMenuContent()
} 
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
// var listObject = ["nam","nữ","trẻ em gái","trẻ em trai"]
// async function hanleGetCate(){
//    
//     const QuanNam = new Promise((resolve,reject)=>{
//       httpPostAsyncCate(urlApiGetCateDetails,resolve,reject,dataQuanNam)
//     })
 
//     const AoNam = new Promise((resolve,reject)=>{
//       httpPostAsyncCate(urlApiGetCateDetails,resolve,reject,dataNam)
//     })
    
   
//     // const TreEmGai = new Promise((resolve,reject)=>{
//     //   httpPostAsyncCate(urlApiGetCate,resolve,reject,data)
//     // })
//     // const TreEmTrao = new Promise((resolve,reject)=>{
//     //   httpPostAsyncCate(urlApiGetCate,resolve,reject,data)
//     // })
//     await AoNu.then(res => renderSubMenuAo(res,"Menu_nu","ao"))
//     .catch(err =>alert(err.message))
//     await QuanNu.then(res =>{
//       renderSubMenuAo(res,"Menu_nu","quan")
//     })
//     .catch(err =>alert(err.message))

//     await AoNam.then(res => renderSubMenuAo(res,"Menu_nam","ao"))
//     .catch(err =>alert(err.message))

//     await QuanNam.then(res => renderSubMenuAo(res,"Menu_nam","quan"))
//     .catch(err =>alert(err.message))

    
// }
// function renderSubMenuAo(data,...rest){
//   console.log(rest)
//   var html = data.map(item=>{
//     return `
//       <li> <a href="#">${item["detailName"]}</a></li>
//     `
//   })
//   $(`.${rest[0]} .${rest[1]}  .content `).html(html)
// }


// function renderSubMenuQuan(data,className){
//   var html = data.map(item=>{
//     return `
//       <li> <a href="#">${item["detailName"]}</a></li>
//     `
//   })
//   $(`.${className} .quan .content`).html(html)
//   console.log(data);
// }
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
}

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

function GetLinkBSTHome (id){
  let link = ""
  const ImgBSTHome=JSON.parse(localStorage.getItem("GaleryHome"));
  if(ImgBSTHome!=null){
  for (let i=0; i<ImgBSTHome.length;i++) {
    if(ImgBSTHome[i]["productId"] === id)
      link = ImgBSTHome[i]["thumbnail"]
    }
  }
  return link;
}
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
 