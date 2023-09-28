 const listProduct = $(".list")
 const inputSearch = $("#search-header")
 const btnSearch = $("#btnSearch")

let thisPage = 1;
let pageSize = 5;
function Start(){
    getProduct(renderProduct)
 }
Start();
btnSearch.click(()=>{
    handleSearch();
});
function handleSearch() {
    const data = {
        page:thisPage,
        pageSize:pageSize,
        ProductName:inputSearch.val()
    }
    SearchProduct(data);

};
function SearchProduct(data) {
    $.post({
        url: "https://localhost:7094/api/Product/Search",
        data:JSON.stringify(data),
        contentType:"application/json",
    })
    .done(response=>{
        renderProduct(response)
    })

};
function getProduct(render) {
    const data = {
        page:thisPage,
        pageSize:pageSize
    }
    $.post({
        url: "https://localhost:7094/api/Product/Search",
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8'
    })
        .done(render);
}


function renderProduct(products){
    totalItem = products["totalItem"]
    pageSize = products["pageSize"]
    var result= products["data"].map(function(product){
       var stringPrice = String(product.price)
       var StartPrice = stringPrice.slice(0,3)
       var EndPrice = stringPrice.slice(3,6)
       var price = StartPrice+'.'+EndPrice
        return `
        <div class="item">
            <div class="img">
                <img src=${"https://canifa.com/img/1000/1500/resize/6/t/6tw23w007-sp234-2.webp"} alt="">    
            </div>
            <div class="list-color">
                <span   class="color1 selected" ></span>
                <span   class="color2" ></span>
                <span   class="color3" ></span>
            </div>
            <div class="title">
                ${product.title}
            </div>
            <div class="price">
                ${String(product.price).length == 6 ? price:product.price} đ
            </div>
        </div>
        `
    })
    listProduct.html(result.join(''))
    listPage(products["totalItems"],products["pageSize"])
}
function listPage(totalItem,pageSize) {
   let numberPage = Math.ceil(totalItem/pageSize)
   var listPage = $(".listPage")
   listPage.html("")
   for(i=1;i<=numberPage;i++){
       let newPage = document.createElement("li")
       newPage.innerHTML=i
       if(i==thisPage){
           newPage.classList.add("active")
       }
       newPage.setAttribute("onclick", "changePage("+i+")")

       listPage.append(newPage);
    }
}
function changePage(i){
    thisPage=i
    Start()
 }

// function SearchProduct(data) {
//     var options = {
//         method:"POST",
//         headers: {
//             "Content-Type": "application/json"

//         },
//         body: JSON.stringify(data)
//     }
//     fetch("https://localhost:7094/api/Product/Search",options)
//     .then(response => response.json())
//     .then((products) => {
//         renderProduct(products)
        
//     }) 
// }


// function handleSearch(page){
//     btnSearch.addEventListener("click",(e)=>{
//         e.preventDefault()
//         var data ={
//             page,
//             pageSize:pageSize,
//             ProductName:inputSearch.value
//         }
//         SearchProduct(data)
//     })
// }


// function getProduct(data) {
//     var option = {
//         method : "POST",
//         headers:{
//             "Content-Type": "application/json "
//         },
//         body: JSON.stringify(data)
//     }
//     fetch("https://localhost:7094/api/Product/PhanTrang_DSProduct",option)
//     .then(response => response.json())
//     .then(response=>renderProduct(response))

// }
// function handleGetProduct(){
//     var data = {
//         page:thisPage
//     }
//     getProduct(data)
// }
// 
