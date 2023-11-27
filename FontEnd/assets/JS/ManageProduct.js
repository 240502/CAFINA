
const inputProductId = $("#productId");
const inputTitle =$("#title");
const inputDes = $("#description");
const inputPrice =$("#price") ;
const inputChatLieu =$("#chatLieu");
const inputHd =$("#huongDanSuDung");
const inputSize =$("#size");
const inputColor =$("#color");
const inputOb = $("#object");
const inputCate = $("#Cate");
const inputBst= $("#bst");
const inputCreated = $("#created");
const inputDiscount = $("#discount");
const btnSaveOpen = $(".opened .btnSave");
const inputSearchListData  = $(".search-user-input");
const inputFile = $("#file_img")


const urlGetListProduct = "https://localhost:7284/api-admin/Product/PhanTrang_DSProduct";
const urlGetListBST = "https://localhost:7284/api-admin/BST/GetListBST";
const urlGetListObject = "https://localhost:7284/api-admin/Object/Get_List_Ob";
const urlCreateProduct = "https://localhost:7284/api-admin/Product/Create_Product";
const urlGetListCategoryDetails = "https://localhost:7284/api-admin/CategoryDetails/GetList_CategoryDetails";
const urlUpdateProduct = "https://localhost:7284/api-admin/Product/Update_Product";
const urlDeleteProduct = "https://localhost:7284/api-admin/Product/Delete_Product";
const urlApiSearchProductManager= "https://localhost:7284/api-admin/Product/Search";
const urlApiCreateGalery = "https://localhost:7284/api-admin/Galery/Create_Galery"

let thisPage =1;
let pageSize =10;
let isCreate = true;
let isUpdate = false;
let isSearchManage = false;

var listObject  = JSON.parse(localStorage.getItem("listObjectProduct"));
var listCateDetailsProduct = JSON.parse(localStorage.getItem("listCateDetailsProduct"));
var listBSTProduct = JSON.parse(localStorage.getItem("listBSTProduct"));

function Start(){
    GetListObject();
    GetListBST();
    handleTextSaveBtn();
    handleGetListProduct();
    getListCateDetails();
    handleGetListProduct();

}
Start();



async function CreateGalery() {
    console.log()
    const data = {
        productId:inputProductId.val(),
        thumbnail:`./assets/Image/ImageProduct/${$('#file_img')[0].files[0]["name"]}`
    }
    const promise = new Promise((resolve, reject) => {
        httpPostAsyncCate(urlApiCreateGalery,resolve,reject,data)
    });
    try{

        const res = await promise;
    }
    catch(err){
        console.log(err);
    }

};



function changePage(index){
    thisPage = index;
    if(isSearchManage){
        handleSearchProductListData();
    }
    else{

        handleGetListProduct();
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
function handleTextSaveBtn(){
  if(isCreate)
  {
      btnSaveOpen.toggleClass("active",isCreate);
      btnSaveOpen.text("Thêm mới")
  }
  else if(isUpdate){
      btnSaveOpen.text("Lưu")
      btnSaveOpen.toggleClass("active",isUpdate);
  }
};


function getListCateDetails(){
    $.get(urlGetListCategoryDetails)
    .done(res=>{
        localStorage.setItem("listCateDetailsProduct",JSON.stringify(res))
        renderListCateDetails(res)
    })
    .fail(err=>{
        alert("Error: " + err.statusText)
    })
};

function renderListCateDetails(listcate){
    var html = listcate.map((cate,index)=>{
        return `
            <option ${index ==0? "selected":""} value="${cate["id"]}">${cate["detailName"]}</option>
        `
    })
    $("#Cate").html(html.join(""));
};

function GetListObject(){
    $.get(urlGetListObject)
    .done(res=>{
        localStorage.setItem("listObjectProduct",JSON.stringify(res));
        renderListOb(res)
    })
};

function renderListOb(Listob){
    var html = Listob.map((ob,index)=>{
        return `
            <option ${index ==0? "selected":""} value="${ob["id"]}">${ob["tenDoiTuong"]}</option>
        `
    })
    $("#object").html(html.join(""));
};

function GetListBST(){
    $.get(urlGetListBST)
    .done(res=>{
        localStorage.setItem("listBSTProduct",JSON.stringify(res));
        renderListBST(res);
    })
};

function renderListBST(ListBst){
   var html = ListBst.map((item,index)=>{
    return `
        <option ${index ==0? "selected":""} value="${item["id"]}">${item["tenBST"]}</option>
    `
   })
   $("#bst").html(html.join(""));
};

function handleGetListProduct(){
    var data = {
        pageIndex : thisPage,
        pageSize
    };
    GetListProduct(data);
};

function GetListProduct(data) {
    $.post({
        url:urlGetListProduct,
        headers: { "Authorization": 'Bearer ' + token },
        data:JSON.stringify(data),
        contentType:"application/json"
    })
    .done(async (res)=>{
        try{
            await handleGetGalery(res["data"]);
            renderListProduct(res);
        }
        catch(err){
            console.log(err);
            renderListProduct(res); 
        }
      
    })
};

function GetObjectNameById(obid){
    var ob = listObject.find(ob => {
       return ob["id"] === obid;
    });
    return ob;
};

function GetBSTById(id){
    var bst = listBSTProduct.find(bst => {
       return bst["id"] === id;
    });
    return bst;
};

function GetCateDetailById(id){
    var ct = listCateDetailsProduct.find(ct => {
       return ct["id"] === id;
    });
    return ct;
};

inputSearchListData.on("keypress", (e)=>{
    if(e.key === "Enter"){

        handleSearchProductListData();
        isSearchManage =true;
    }
})

function handleSearchProductListData (){
    var data = {
        pageIndex:thisPage > 1 ? 1 : thisPage,
        pageSize:pageSize,
        value : inputSearchListData.val()
    };
    console.log(data);
    SearchProductListData(data);
};

async function SearchProductListData (data) {
    const promise = new Promise((resolve, reject) =>{
        httpPostAsyncCate(urlApiSearchProductManager,resolve,reject,data);

    });
    try{
        const res = await promise;
        console.log(res);
        renderListProduct(res);
    }catch(err){
        console.log(err);
    }

};



async function renderListProduct (data){
    var count = Math.ceil(data["totalItems"] / pageSize);
    renderListPage(count)
    var html = data["data"].map((product,index)=>{
        var cateDetail =GetCateDetailById( product["cateDetailId"]);
        var object = GetObjectNameById(product["object_id"]);
        var bst = GetBSTById( product["bst_id"]);
        return `
        <tr class="tb-content" data-id = "${index}">
            <td class="productId" stylye="width:fit-content" >
               ${product["productId"]}
            </td>
            <td class="product_title" stylye="width:fit-content">
                ${product["title"]}
            </td>
            <td>
                <img style="width:100%;background-color: #fff;" src="${GetLinkImgBSTHome(product["productId"]) != null ? GetLinkImgBSTHome(product["productId"]):""}"" alt="">
            </td>
            <td class="price">
                ${product["price"]}
            </td>
            <td class="discount">
            ${product["discount"]}
            </td>
            <td class="description">
                ${product["description"]}
            </td>
            <td class="ChatLieu">
                ${product["chatLieu"]}
            </td>
            <td class="Hdsd">
                ${product["huongDanSuDung"]}
            </td>
            <td class="size">
                ${product["size"]}
            </td>
            <td class="color">
                ${product["color"]}
            </td>
            <td class="cateId" data-id = ${ cateDetail!==undefined ?cateDetail["id"]:""} >
                ${cateDetail!==undefined ?cateDetail["detailName"]:""}
            </td>
            <td class="object_id" data-id = ${object!==undefined ?object["id"]:""} >
                ${object!==undefined ?object["tenDoiTuong"]:""}
            </td>
            <td class="bst_id" data-id = ${ bst!==undefined?bst["id"]:""} >
                ${bst !==undefined ? bst["tenBST"]:"" }
            </td>  
            <td class="created">
                ${product["created"].slice(0,10)}
            </td>
            
            <td>
                 <div class="group-btn">
                     <div class="group-delete">
                         <button type="button" class="btnDelete btn" onclick = "activeModalConfirm(${"'"+(product["productId"])+"'"})">Xóa</button>
                     </div>

                     <div class="group-update">
                         <button type="button" class="btnUpdate btn" onclick = "fillToInput(${index})">Sửa</button>
                     </div>
                 </div>
            </td>
        </tr>
        `
    })
    $(".opened tbody").html(html.join(""));
    btnPageNext.on("click",()=>{
        if(thisPage === count){
    
        }
        if(thisPage<count){
            thisPage =thisPage + 1;
    
            changePage(thisPage);
        }
      });
};

function handleCreateProduct() {
    var data = {
        "productId": inputProductId.val().trim(),
        "title": inputTitle.val().trim(),
        "price": Number(inputPrice.val().trim()),
        "discount": Number(inputDiscount.val().trim()),
        "description": inputDes.val().trim(),
        "chatLieu": inputChatLieu.val().trim(),
        "huongDanSuDung": inputHd.val().trim(),
        "size": inputSize.val().trim(),
        "color": inputColor.val().trim(),
        "cateDetailId": Number(inputCate.val().trim()),
        "object_id": Number(inputOb.val().trim()),
        "bst_id": Number(inputBst.val().trim())
    }
    CreateProduct(data);
};

function CreateProduct(data){
    $.post({
        url:urlCreateProduct,
        headers: { "Authorization": 'Bearer ' + token },
        data:JSON.stringify(data),
        contentType: "application/json"
    }).done(res=>{
       showSuccessToast("Thêm thành công!");
       handleGetListProduct();
       clearDataProduct();
       isSearchManage =false;


    })
    .fail(err=>{
        showErrorToast("Thêm không thành công!");

    })
    
};

function fillToInput(index){
    isCreate = false;
    isUpdate = true;
    handleTextSaveBtn();
    var tb_content = [...document.querySelectorAll('.tb-content')].find((item)=>{
        if( Number(item.dataset.id) == index)
        return item;
});
    btnSaveOpen.attr("data-id",tb_content.querySelector(".productId").textContent.trim())
    inputProductId.val(tb_content.querySelector(".productId").textContent.trim());
    inputTitle.val(tb_content.querySelector(".product_title").textContent.trim());
    inputDes.val(tb_content.querySelector(".description").textContent.trim());
    inputPrice.val(tb_content.querySelector(".price").textContent.trim());
    inputDiscount.val(tb_content.querySelector(".discount").textContent.trim())
    inputChatLieu.val(tb_content.querySelector(".ChatLieu").textContent.trim());
    inputHd.val(tb_content.querySelector(".Hdsd").textContent.trim());
    inputSize.val(tb_content.querySelector(".size").textContent.trim());
    inputColor.val(tb_content.querySelector(".color").textContent.trim());
    inputOb.val(tb_content.querySelector(".object_id").dataset.id);
    inputCate.val(tb_content.querySelector(".cateId").dataset.id);
    inputBst.val(tb_content.querySelector(".bst_id").dataset.id);
    inputCreated.val(tb_content.querySelector(".created").textContent.trim());
};

function clearDataProduct(){
    inputProductId.val("")
    inputTitle.val("")
    inputDes.val("")
    inputPrice.val("")
    inputChatLieu.val("")
    inputHd.val("")
    inputSize.val("")
    inputColor.val("")
    inputCreated.val(Date.now())
    inputDiscount.val("")
};

function handleUpdateProduct(id){
    var data = {    
        "productId": id,
        "title": inputTitle.val().trim(),
        "price": Number(inputPrice.val().trim()),
        "discount": Number(inputDiscount.val().trim()),
        "description": inputDes.val().trim(),
        "chatLieu": inputChatLieu.val().trim(),
        "huongDanSuDung": inputHd.val().trim(),
        "size": inputSize.val().trim(),
        "color": inputColor.val().trim(),
        "cateDetailId": Number(inputCate.val().trim()),
        "object_id": Number(inputOb.val().trim()),
        "bst_id": Number(inputBst.val().trim()),
        "created":inputCreated.val()
    }
    console.log(data);

    UpdateProduct(data);
};

function UpdateProduct(data){
    $.ajax({
        type: "PUT",
        url: urlUpdateProduct,
        headers: { "Authorization": 'Bearer ' + token },
        data: JSON.stringify(data),
        contentType: "application/json"
        
    })
    .done(res=>{
        showSuccessToast("Cập nhập thông tin sản phẩm thành công");
        handleGetListProduct();
        clearDataProduct();
        isCreate = true;
        isUpdate=false;
        isSearchManage =false;

        handleTextSaveBtn();
    })
    .fail(err=>{
        showErrorToast("Cập nhập thông tin sản phẩm không thành công");
        alert(err.statusText);
    })
};

function activeModalConfirm(id){
    openModalCofirmDelete("Bạn chắc chắn muốn xóa sản phẩm này ?");
    $("#modal-confirm-delete .btnNo").on('click', ()=>{
      closeModalCofirmDelete();
    });
    $("#modal-confirm-delete .btnYes").on('click', ()=>{
        console.log("oe")
        DeleteProduct(id);
    });
};

function DeleteProduct(id){
    console.log(id)
    $.ajax({
        type:"DELETE",
        url:urlDeleteProduct +'?productId='+id,
        headers: { "Authorization": 'Bearer ' + token },
    })
    .done(res=>{
        showSuccessToast("Xóa sản phẩm thành công");
        handleGetListProduct();
        isSearchManage =false;
        closeModalCofirmDelete();

    })
    .fail(err=>{
        showErrorToast("Xóa sản phẩm thất bại")
        alert(err.statusText);
        closeModalCofirmDelete();

    })
};

btnSaveOpen.on("click", ()=>{
    if(isCreate)
    {
        handleCreateProduct();        
        CreateGalery();
    }
    else if(isUpdate)
    {
        var id = btnSaveOpen.attr("data-id")
        handleUpdateProduct(id);
    }
});