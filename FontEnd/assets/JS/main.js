const listProduct = $(".list")
const inputSearch = $(".search-input")
const btnSearch = $(".search-btn")
const totalItemElement =$(".total-item")
const nextBtn = $("#next")
const prevBtn = $("#prev")
const ProductItems = $(".product-items")
$(document).ready(function () {
    $(".block-bst").slick({
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

  });
 
   
let thisPage = 1;
let pageSize = 8;
let isResultSearch = false
//  function Start(){
//     getProduct(renderProduct)
// }
    
// Start();
// inputSearch.keydown(function (e) { 
//     if(e.keyCode == 13)
//     {
//         handleSearch();
//         isResultSearch  = true;
//     }
// });
// btnSearch.click(()=>{
//     handleSearch();
//     isResultSearch= true;
// });

// function handleSearch() {
//     const data = {
//         page:thisPage,
//         pageSize:pageSize,
//         ProductName:inputSearch.val()
//     }
//     SearchProduct(data);
   

// };
// function SearchProduct(data) {
//     $.post({
//         url: "https://localhost:7284/api-customer/Product/Search",
//         data:JSON.stringify(data),
//         contentType:"application/json"
//     })
//     .done(response=>{
//         renderProduct(response)
        
//         totalItemElement.html("")
//         totalItemElement.html(`<div class="reuslt-search">Kết quả tìm kiếm: ${response["totalItems"]}</div>`)
//     })
// };
// function getProduct(render) {
//     const data = {
//         page:thisPage,
//         pageSize:pageSize
//     }
//     console.log(data);
//     $.post({
//         url: "https://localhost:7284/api-customer/Product/PhanTrang_DSProduct",
//         data: JSON.stringify(data),
//         contentType: 'application/json'
//     })
//         .done(render);
// };
// function renderProduct(products){
//     totalItem = products["totalItems"]
//     pageSize = products["pageSize"]
//     var result= products["data"].map(function(product){
//        var stringPrice = String(product.price)
//        var StartPrice = stringPrice.slice(0,3)
//        var EndPrice = stringPrice.slice(3,6)
//        var price = StartPrice+'.'+EndPrice
//         return `
//         <div class="item">
//             <div class="img">
//                 <img src=${"https://canifa.com/img/1000/1500/resize/6/t/6tw23w007-sp234-2.webp"} alt="">    
//             </div>
//             <div class="list-color">
//                 <span   class="color1 selected" ></span>
//                 <span   class="color2" ></span>
//                 <span   class="color3" ></span>
//             </div>
//             <div class="title">
//                 ${product.title}
//             </div>
//             <div class="price">
//                 ${String(product.price).length == 6 ? price:product.price} đ
//             </div>
//         </div>
//         `
//     })
//     listProduct.html(result.join(''))
//     listPage(products["totalItems"],products["pageSize"])
// };
// function listPage(totalItem,pageSize) {
//    let numberPage = Math.ceil(totalItem/pageSize)
//    var listPage = $(".listPage")
//    listPage.html("")
//    if(numberPage>1)
//    {    let html = ""
//         for(i=1;i<=numberPage;i++){
//             html+= `<button  type="button" class="page-item ${thisPage == i ? "active":""}" onclick = changePage(${i})>${i}</button>`
//         }
//         listPage.html(html);
//    }
// };
// function changePage(i){
//     thisPage=i
//     if(isResultSearch == true){
//         handleSearch()
//     }
//     if(isResultSearch == false){
//         Start()
//     }
//  };

