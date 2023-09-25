const listProduct = document.querySelector(".list")
let thisPage = 1;
function Start(){
    var data ={
        page:thisPage
    }
    getProduct(data);
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
    fetch("https://localhost:7140/api/Product/PhanTrang_DSProduct",option)
    .then(response => response.json())
    .then(response=>renderProduct(response))

}
function renderProduct(products){
    totalItem = products["totalItem"]
    pageSize = products["pageSize"]
    var html= products["data"].map(function(product){
        return `
           <div class="item">
                <h3 class="title">
                    ${product.title}
                </h3>
           </div>
          
        `
    })
    listProduct.innerHTML=html.join("")
    listPage(products["totalItem"],products["pageSize"])
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
    thisPage  =i
    Start();
}