const urlApiGetProductAllByBST = "https://localhost:7284/api-customer/Product/GetProductByObjectName_BstName";
const listLink =[... document.querySelectorAll(".link li")];
let thisPage = 1;
let pageSize = 8;

let isInclueObjectName = false;
function Start(){
    handleGetAllProductByBSTName_ObjectName();
}
Start();


listLink.forEach(item=>{
    item.onclick = (e)=>{
        var linkitem =  e.target
        $("li.active").removeClass("active");
        linkitem.parentElement.classList.add("active");
        var data = {
            pageIndex : thisPage,
            pageSize : pageSize,
            bstName : "Thu đông 2023",
            objectName: linkitem.textContent.trim()
        };
        isInclueObjectName =true;
        GetAllProductByBSTName_ObjectName(data);
        localStorage.setItem("ObjectName",JSON.stringify(linkitem.textContent.trim()));
    }
});

function handleGetAllProductByBSTName_ObjectName(){
    var data = {
        pageIndex : thisPage,
        pageSize : pageSize,
        bstName : "Thu đông 2023"
    }
    GetAllProductByBSTName_ObjectName(data);
};
function GetAllProductByBSTName_ObjectName(data) {
    $.post({
        url :urlApiGetProductAllByBST,
        data :JSON.stringify(data),
        contentType :"application/json"
    })
    .done(res=>{
        renderListProduct(res)
        handleGetGalery(res["data"]);
    })
    .fail(err=>{
        console.log(err.statusCode);
    })
};
function renderListProduct(products){
    var totalItems = Math.ceil(products["totalItems"]/pageSize)
    renderListPage(totalItems)
    var html = products["data"].map(product=>{

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
  });
  $(".block-hot-deal-listing .product-items").html(html.join(""))
};

function changePage(index){
    thisPage = index;
    if(isSearchContent){
        handleSearchProduct(searchInputHeader.val());
    }
    else if(isInclueObjectName === false){
        handleGetAllProductByBSTName_ObjectName();
    }
    else if(isInclueObjectName ==true){
        var objectName = JSON.parse(localStorage.getItem("ObjectName"));
        var data={
            pageIndex: thisPage,
            pageSize,
            bstName : "Thu đông 2023",
            objectName

        }
        GetAllProductByBSTName_ObjectName(data);

    }
};

