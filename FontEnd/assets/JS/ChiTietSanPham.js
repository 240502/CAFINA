const urlApiGetProductById = "https://localhost:7284/api-customer/Product/Get_ByID";
const urlApiGetCateDetailsByID = "https://localhost:7284/api-customer/CategoryDetails/GetCateDetailById";
const urlApiGetCategoryByID = "https://localhost:7284/api-customer/Category/GetCateById";
const urlApiGetObjectById = "https://localhost:7284/api-customer/Object/Get_ObjectById";
const urlApiGetProductRecommend = "https://localhost:7284/api-customer/Product/GetProductByObjectId_CateDtId";
const urlApiGetProductViewByProductId = "https://localhost:7284/api-admin/ProductView/Get_ProductView_ByProductId";
const urlApiCreateProductView = "https://localhost:7284/api-admin/ProductView/Create_ProductView";
const urlApiUpdateProductView = "https://localhost:7284/api-admin/ProductView/Update_ProductView";
const productId =JSON.parse(localStorage.getItem('productId'));

async function Start(){
    GetProduct();
    
    await Get_ProductView_ByProductId();
    var ProductView = JSON.parse(localStorage.getItem('ProductView'));
    if(ProductView == null){
        handleCreateProductView();
    }
    else{
        const dateNow = new Date();
        const date = dateNow.getFullYear()+"-"+Number(dateNow.getMonth()+1)+"-"+dateNow.getDate();
         if(ProductView["dateView"].slice(0,10) !== date)
         {
             handleCreateProductView();
         }
         else{
             UpdateProductView(ProductView)
         }
    }
    
}
Start();


async function Get_ProductView_ByProductId(){
    const date = new Date();
    var data = { 

        productId : productId,
        date: date.getDate(),
        month: date.getMonth() +1,
        year:date.getFullYear() 
    }
    console.log(date.getDate())
    const promise = new Promise((resolve, reject) =>{
        httpPostAsyncCate(urlApiGetProductViewByProductId,resolve,reject,data)
    })
    try{
        
        const res = await promise;
        localStorage.setItem('ProductView',JSON.stringify(res));
        console.log(res)
    }
    catch(err){
        console.log(err)
        localStorage.setItem('ProductView',JSON.stringify(null))
    }
}
function handleCreateProductView(){
    var data = {
        productId: productId,
        count : 1
    }
    CreateProductView(data);
}
function CreateProductView(data){
  
    $.post({
        url:urlApiCreateProductView,
        headers: { "Authorization": 'Bearer ' + token },
        data:JSON.stringify(data),
        contentType:"application/json"
    })
    .done(res=>{
        console.log(res);

    })
    .fail(err=>{
        console.log(err);
    })
}

function UpdateProductView(data){
    var productView = {
        id: data["id"],
        productId: data["productId"],
       
        count: data["count"]+1,
        dateView: data["dateView"]
    }
    $.ajax({
        type: "PUT",
        url:urlApiUpdateProductView,
        headers: { "Authorization": 'Bearer ' + token },
        data:JSON.stringify(productView),
        contentType: "application/json"
    })
    .done(res=>{
        console.log(res);
    })
    .fail(err=>{
        console.log(err);
    })
}


function GetProduct(){
    $.get(urlApiGetProductById+'?id='+productId)
    .done(async (res)=>{
       try{
            await getGalaryProductDetail(productId);
            await GetObject(res["object_id"])
            await GetCateDetailName(res["cateDetailId"])
            await renderBreadcrumb(res["title"])
            await renderProduct(res)
            GetProductByObjectId_CateDtId(res["object_id"],res["cateDetailId"],res["productId"])
       }catch(err){
        renderProduct(res)
        renderBreadcrumb(res["title"])
        GetCateDetailName(res["cateDetailId"])
        GetObject(res["object_id"])
        GetProductByObjectId_CateDtId(res["object_id"],res["cateDetailId"],res["productId"])
       }
    })
    .fail(err=>{
        console.log(err.statusCode);
    })

};

function getThumbnail(){
    const  thumbnail =  JSON.parse(localStorage.getItem("GaleryProductDetail")) !==null ? JSON.parse(localStorage.getItem("GaleryProductDetail")):null;
    return thumbnail;
}
function GetCateDetailName(id){
    $.get({
        url:urlApiGetCateDetailsByID+"?id="+id,
        headers: { "Authorization": 'Bearer ' + token },
    })
    .done(res=>{
        localStorage.setItem("cateDetail",JSON.stringify(res));
        GetCategory(res["cateId"])
    })
    .fail(err=>{
        console.log(err.statusCode);

    })

};

function GetCategory(id){
    $.get({
        url:urlApiGetCategoryByID+"?id="+id,
        headers: { "Authorization": 'Bearer ' + token },
    })
    .done(res=>{
        localStorage.setItem("Category",JSON.stringify(res));
    })
    .fail(err=>{
        console.log(err.statusCode);

    })
};

async function GetObject(id){
    $.get({
        url:urlApiGetObjectById+"?id="+id,
        headers: { "Authorization": 'Bearer ' + token },
    
    })
    .done(res=>{
        localStorage.setItem("Object",JSON.stringify(res));

    })
    .fail(err=>{
        console.log(err.statusCode);
    });
}
function renderBreadcrumb(productName){
    const Category = JSON.parse(localStorage.getItem("Category"));
    const CategoryDetail = JSON.parse(localStorage.getItem("cateDetail"));
    const Object = JSON.parse(localStorage.getItem("Object"));


    var html = `
        <li class="breadcrumb-item"><a href="./index.html">Trang chủ</a></li>
        <li class="line"></li>
        <li class="breadcrumb-item active" aria-current="page">${Object["tenDoiTuong"]}</li>
        <li class="line"></li>
        <li class="breadcrumb-item active" aria-current="page">${Category["cateName"]}</li>
        <li class="line"></li>
        <li class="breadcrumb-item active" aria-current="page">${CategoryDetail["detailName"]}</li>
        <li class="line"></li>
        <li class="breadcrumb-item active" aria-current="page">${productName}</li>
    `
    $(".breadcrumb").html(html);
}
function  renderSize(listSize){
    var result = listSize.map(size => {
        return `<li>${size}</li>`;
    });
    return result;
};


function renderProduct(product){
    var listSize =product["size"].replaceAll(","," ").split(" ")
    
    let thumbnail =  getLinkThumbnailProductDetail()
    var html = `
    <div class="product-media">
        <div class="img-display">
            <img src="${ thumbnail!==null ? thumbnail["thumbnail"]:"" }" alt="">
        </div>
    
        </div>
    <div class="product-detail">
        <h2 class="product-title">
           ${product["title"]}
        </h2>
        <p class="productId"><span>
            Mã sp:
        </span> <span>${product["productId"]}</span></p>
        <div class="product-price">
            <span class="discount" style = "display: ${product["discount"]==0? "none":"block"}">${
                handlePrice(product["discount"])
            } đ</span>
            <span class="normal-price" style="color:${product["discount"]==0? "#000":"#da291c"};text-decoration:${product["discount"]==0? "none":"line-through"}">${
                handlePrice(product["price"])
            } đ</span>
        </div>
        <div class="color" style="margin-bottom:5px">
            Màu sắc: <span>${product["color"]}</span>
        </div>
        <p>Kích cỡ:</p>
        <ul class="size">
            ${renderSize(listSize).join("")}
        </ul>
        <div class="group-btn">
            <button type="button" class="addtocart">Thêm vào giỏ</button>
            <button type="button" class="findatstore">Tìm tại cửa hàng</button>
        </div>
        <div class="des item active">
            <h4 class="title ">
               <span>Mô tả</span>
                <i class="fa-solid fa-minus" style="color: #000000;"></i>
            </h4>
            <p> 
                ${product["description"]}.
            </p>
        </div>
        <div class="chat-lieu item">
            <h4 class="title">
                <span>Chất liệu</span>
                <i class="fa-solid fa-plus" style="color: #000000;"></i>
            </h4>

            <p>${product["chatLieu"]}</p>
        </div>
        <div class="hd item">
            <h4 class="title">
                <span>Hướng dẫn sử dụng</span>
                <i class="fa-solid fa-plus" style="color: #000000;"></i>

            </h4>
            <p style="display: none;"> ${product["huongDanSuDung"]}</p>
        </div>
    </div>
    `
    $(".product-info").html(html)
    $(".des").on("click",()=>{
        $(".des p").toggle(100)
        if(document.querySelector(".des.active") != null) 
        {
            document.querySelector(".des.active").classList.remove("active")
            document.querySelector(".des i").classList.remove("fa-minus")
            document.querySelector(".des i").classList.add("fa-plus")
    
        }
        else
        {
            document.querySelector(".des").classList.add("active")
            document.querySelector(".des i").classList.add("fa-minus")
            document.querySelector(".des i").classList.remove("fa-plus")
    
        }
    });
    
    $(".chat-lieu").on("click",()=>{
        $(".chat-lieu p").toggle(100)
        if(document.querySelector(".chat-lieu.active") !=null)
        {
            document.querySelector(".chat-lieu.active").classList.remove("active")
            document.querySelector(".chat-lieu i").classList.remove("fa-minus")
            document.querySelector(".chat-lieu i").classList.add("fa-plus")
    
    
        }
        else
        {
            document.querySelector(".chat-lieu").classList.add("active")
            document.querySelector(".chat-lieu i").classList.add("fa-minus")
            document.querySelector(".chat-lieu i").classList.remove("fa-plus")
        }
    });
    
    
    $(".hd").on("click",()=>{
        $(".hd p").toggle(100)
        if(document.querySelector(".hd.active") !=null)
        {
            document.querySelector(".hd.active").classList.remove("active")
            document.querySelector(".hd i").classList.remove("fa-minus")
            document.querySelector(".hd i").classList.add("fa-plus")
    
        }
        else
        {
            document.querySelector(".hd").classList.add("active")
            document.querySelector(".hd i").classList.add("fa-minus")
            document.querySelector(".hd i").classList.remove("fa-plus")
        }
    });
    document.querySelectorAll(".size li").forEach(item=>{
        item.onclick =()=>{
            if(document.querySelector(".size li.selected")){
                document.querySelector(".size li.selected").classList.remove("selected");
                item.classList.add("selected");

            }
            else{
                item.classList.add("selected");
            }
        };
    });
    $(".addtocart").on("click", ()=>{
        const productid = product["productId"];
        const price = product["discount"] !=0 ? product["discount"]: product["price"];
        const size = $(".size li.selected").text().trim();
        if(size)
        {
            console.log(productid)
            console.log(price)
            console.log(size)
            handleCreateOrder(size,productid,price)
        }
        else{
            alert("vui lòng chọn size!")
        }
    });
 
};


function GetProductByObjectId_CateDtId(obid,catedtid,productId){
    $.get(urlApiGetProductRecommend+"?objectId="+obid+"&"+"cateDtId="+catedtid+"&"+"productId="+productId)
    .done( async(res)=>{
        try{
            await handleGetGalery(res);
             renderProductRecommend(res)
        }catch(e){
            renderProductRecommend(res)
        }    
    })
    .fail(err=>{
        console.log(err.status)

    })
}


function renderProductRecommend(products){
   var html = products.map(product=>{
        var listSize =product["size"].replaceAll(","," ").split(" ");

        return `
        <div class="product-item col-4" data-id = ${product["productId"]} >
            <div class="item__image">
                <a href="#">
                    <img  src="${GetLinkImgBSTHome(product["productId"]) != null ? GetLinkImgBSTHome(product["productId"]):""}" alt="">
                </a>
                <div class="product-item-button-tocart" onclick=activeListSize()>
                    <div>Thêm nhanh vào giỏ</div>
                    <ul class="list-size">
                        ${renderListSize(listSize,product).join("")}
                  </ul>
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
                        handlePrice(product["price"])
                    } </div>
                </div>
            </div>
        </div>
        `
    })
    $(".products").html(html.join(""))
    document.querySelectorAll(".product-item .item__image a").forEach(item=>{
        item.onclick= (e)=>{
          localStorage.setItem("productId",JSON.stringify(item.parentElement.parentElement.dataset.id))
          window.location="./ChiTietSanPham.html";
        }
        })
        document.querySelectorAll(".product-item .product-item-name a").forEach(item=>{
          item.onclick= (e)=>{
            localStorage.setItem("productId",JSON.stringify(item.parentElement.parentElement.parentElement.dataset.id))
            window.location="./ChiTietSanPham.html";
          }
       })
    if(products.length<4){

    }else{
        $(".products").slick({
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
    }
}
