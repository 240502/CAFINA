
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


const urlGetListProduct = "https://localhost:7284/api-admin/Product/PhanTrang_DSProduct"
const urlGetListBST = "https://localhost:7284/api-admin/BST/GetListBST"
const urlGetListObject = "https://localhost:7284/api-admin/Object/Get_List_Ob"
const urlCreateProduct = "https://localhost:7284/api-admin/Product/Create_Product"


if(document.querySelector(".form_manage_product.opened"))
{   
    GetListObject();
    GetListBST();
    handleTextSaveBtn();
    handleGetListProduct();
    function renderListCate(listcate){
        var html = listcate.map((cate,index)=>{
            return `
                <option ${index ==0? "selected":""} value="${cate["id"]}">${cate["cateName"]}</option>
            `
        })
        $("#Cate").html(html.join(""));
    }

    function GetListObject(){
        $.get(urlGetListObject)
        .done(res=>{
            renderListOb(res)
        })
    }
    function renderListOb(Listob){
        var html = Listob.map((ob,index)=>{
            return `
                <option ${index ==0? "selected":""} value="${ob["id"]}">${ob["tenDoiTuong"]}</option>
            `
        })
        $("#object").html(html.join(""));
    }

    function GetListBST(){
        $.get(urlGetListBST)
        .done(res=>{
            renderListBST(res)
        })
    }
    function renderListBST(ListBst){
        console.log(ListBst)
       var html = ListBst.map((item,index)=>{
        return `
            <option ${index ==0? "selected":""} value="${item["id"]}">${item["tenBST"]}</option>

        `
       })
       $("#bst").html(html.join(""));

    }
    
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
        console.log(data);
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
                             <button type="button" class="btnDelete btn" onclick = "">Xóa</button>
                         </div>
    
                         <div class="group-update">
                             <button type="button" class="btnUpdate btn" onclick = "">Sửa</button>
                         </div>
                     </div>
                </td>
            </tr>
            `
        })
        $(".opened tbody").html(html.join(""));
    }

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
    }
    function CreateProduct(data){
        $.post({
            url:urlCreateProduct,
            data:JSON.stringify(data),
            contentType: "application/json"
        }).done(res=>{
            console.log(res);
        })
        
    }
    btnSaveOpen.on("click", ()=>{
        if(isCreate)
            handleCreateProduct();
        else if(isUpdate)
        {
            var id = btnSaveOpen.attr("data-id")
            handleUpdateProduct(id);
        }
    })
}
