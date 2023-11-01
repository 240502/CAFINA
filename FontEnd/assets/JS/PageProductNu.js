const categoryItemsSlide = $(".category-items .block-content .category-item-slide")
const productItemSlide = $(".product-items")
 categoryItemsSlide.slick({
     slidesToShow: 7,
     slidesToScroll: 7,
     infinite: true,
     arrows: true,
     draggable: false,
     prevArrow: `<button type='button' class='slick-prev slick-arrow'><ion-icon name="arrow-back-outline"></ion-icon></button>`,
     nextArrow: `<button type='button' class='slick-next slick-arrow'><ion-icon name="arrow-forward-outline"></ion-icon></button>`,
     dots: true,
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
 })
 productItemSlide.slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: true,
  arrows: true,
  draggable: false,
  prevArrow: `<button type='button' class='slick-prev slick-arrow'><ion-icon name="arrow-back-outline"></ion-icon></button>`,
  nextArrow: `<button type='button' class='slick-next slick-arrow'><ion-icon name="arrow-forward-outline"></ion-icon></button>`,
  dots: true,
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
 })