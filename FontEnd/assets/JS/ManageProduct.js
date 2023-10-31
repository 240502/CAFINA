
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
const btnSaveOpen = $(".opened .btnSave");
const urlGetListProduct = "https://localhost:7284/api-admin/Product/PhanTrang_DSProduct"
const urlGetListBST = "https://localhost:7284/api-admin/BST/GetListBST"
const urlGetListObject = "https://localhost:7284/api-admin/Object/Get_List_Ob"
const urlCreateProduct = "https://localhost:7284/api-admin/Product/Create_Product"
const urlGetListCategoryDetails = "https://localhost:7284/api-admin/CategoryDetails/GetList_CategoryDetails"
const urlUpdateProduct = "https://localhost:7284/api-admin/Product/Update_Product"
const urlDeleteProduct = "https://localhost:7284/api-admin/Product/Delete_Product"
let thisPage =1;
let pageSize =10;
let isCreate = true;
let isUpdate = false;
function Start(){
    GetListObject();
    GetListBST();
    handleTextSaveBtn();
    handleGetListProduct();
    getListCateDetails();
    handleGetListProduct();

}
Start();

function changePage(index){
    thisPage = index;
    handleGetListProduct();
};


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

function renderListPage(count){
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

function getListCateDetails(){
    $.get(urlGetListCategoryDetails)
    .done(res=>{
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
        renderListBST(res)
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
        data:JSON.stringify(data),
        contentType:"application/json"
    })
    .done(res=>{
        renderListProduct(res);
    })
};

function renderListProduct (data){
    var count = Math.ceil(data["totalItems"] / pageSize);
    renderListPage(count)
    var html = data["data"].map((product,index)=>{
        return `
        <tr class="tb-content" data-id = "${index}">
            <td class="productId" >
               ${product["productId"]}
            </td>
            <td class="product_title">
                ${product["title"]}
            </td>
            <td class="price">
                ${product["price"]}
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
            <td class="cateId">
                ${product["cateId"]}
            </td>
            <td class="object_id">
                ${product["object_id"]}
            </td>
            <td class="bst_id">
                ${product["bst_id"]}
            </td>   
            
            <td>
                 <div class="group-btn">
                     <div class="group-delete">
                         <button type="button" class="btnDelete btn" onclick = "DeleteProduct(${"'"+(product["productId"])+"'"})">Xóa</button>
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
};

function handleCreateProduct() {
    var data = {
        "productId": inputProductId.val().trim(),
        "title": inputTitle.val().trim(),
        "price": Number(inputPrice.val().trim()),
        "discount": 0,
        "description": inputDes.val().trim(),
        "chatLieu": inputChatLieu.val().trim(),
        "huongDanSuDung": inputHd.val().trim(),
        "size": inputSize.val().trim(),
        "color": inputColor.val().trim(),
        "cateId": Number(inputCate.val().trim()),
        "object_id": Number(inputOb.val().trim()),
        "bst_id": Number(inputBst.val().trim()),
    }
    CreateProduct(data);
};

function CreateProduct(data){
    $.post({
        url:urlCreateProduct,
        data:JSON.stringify(data),
        contentType: "application/json"
    }).done(res=>{
       alert(res);
       handleGetListProduct();
       clearDataProduct();

    })
    .fail(err=>{
        alert(err.statusText);
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
     inputChatLieu.val(tb_content.querySelector(".ChatLieu").textContent.trim());
     inputHd.val(tb_content.querySelector(".Hdsd").textContent.trim());
     inputSize.val(tb_content.querySelector(".size").textContent.trim());
     inputColor.val(tb_content.querySelector(".color").textContent.trim());
     inputOb.val(tb_content.querySelector(".object_id").textContent.trim());
     inputCate.val(tb_content.querySelector(".cateId").textContent.trim());
     inputBst.val(tb_content.querySelector(".bst_id").textContent.trim());
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
};

function handleUpdateProduct(id){
    var data = {    
        "productId": id,
        "title": inputTitle.val().trim(),
        "price": Number(inputPrice.val().trim()),
        "discount": 0,
        "description": inputDes.val().trim(),
        "chatLieu": inputChatLieu.val().trim(),
        "huongDanSuDung": inputHd.val().trim(),
        "size": inputSize.val().trim(),
        "color": inputColor.val().trim(),
        "cateId": Number(inputCate.val().trim()),
        "object_id": Number(inputOb.val().trim()),
        "bst_id": Number(inputBst.val().trim()),
    }
    UpdateProduct(data);
};

function UpdateProduct(data){
    $.ajax({
        type: "PUT",
        url: urlUpdateProduct,
        data: JSON.stringify(data),
        contentType: "application/json"
        
    })
    .done(res=>{
        alert(res);
        handleGetListProduct();
        clearDataProduct();
        isCreate = true;
        isUpdate=false;
        handleTextSaveBtn();
    })
    .fail(err=>{
        alert(err.statusText);
    })
};

function DeleteProduct(id){
    console.log(id)
    $.ajax({
        url:urlDeleteProduct +'?productId='+id,
        type:"DELETE"
    })
    .done(res=>{
        alert(res);
        handleGetListProduct();
    })
    .fail(err=>{
        alert(err.statusText);
    })
};

btnSaveOpen.on("click", ()=>{
    if(isCreate)
        handleCreateProduct();
    else if(isUpdate)
    {
        var id = btnSaveOpen.attr("data-id")
        handleUpdateProduct(id);
    }
});