const listProduct = document.querySelector(".list")
const inputSearch = document.querySelector("#search-header")
const btnSearch = document.querySelector("#btnSearch")
console.log(btnSearch)
inputSearch.addEventListener("change",(e)=>{
    inputSearch.value = e.target.value
})
let thisPage = 1;
let pageSize = 5
function SearchProduct(data) {
    var options = {
        method:"POST",
        headers: {
            "Content-Type": "application/json"

        },
        body: JSON.stringify(data)
    }
    fetch("https://localhost:7094/api/Product/Search",options)
    .then(response => response.json())
    .then((products) => {
        renderProduct(products)
        
    }) 
}


function handleSearch(page){
    btnSearch.addEventListener("click",(e)=>{
        e.preventDefault()
        var data ={
            page,
            pageSize:pageSize,
            ProductName:inputSearch.value
        }
        SearchProduct(data)
    })
}

function Start(){
    handleGetProduct()
}
Start();
function getProduct(data) {
    var option = {
        method : "POST",
        headers:{
            "Content-Type": "application/json "
        },
        body: JSON.stringify(data)
    }
    fetch("https://localhost:7094/api/Product/PhanTrang_DSProduct",option)
    .then(response => response.json())
    .then(response=>renderProduct(response))

}
function handleGetProduct(){
    var data = {
        page:thisPage
    }
    getProduct(data)
}
function renderProduct(products){
    totalItem = products["totalItem"]
    pageSize = products["pageSize"]
    var html= products["data"].map(function(product){
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
    listProduct.innerHTML=html.join("")
    listPage(products["totalItems"],products["pageSize"])
}

function listPage(totalItem,pageSize) {
    let numberPage = Math.ceil(totalItem/pageSize)
    document.querySelector(".listPage").innerHTML = ""
    for(i=1;i<=numberPage;i++){
        let newPage = document.createElement("li")
        newPage.innerHTML=i
        if(i==thisPage){

            newPage.className = "active"
        }
        newPage.setAttribute("onclick", "changePage(" + i + ")")
        document.querySelector(".listPage").appendChild(newPage)
    }

}
function changePage(i){
    thisPage=i
    Start()
}