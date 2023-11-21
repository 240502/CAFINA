const inputNameCustomer =$(".opened #FullName");
const inputPhoneNumberUs =$(".opened #Phone_Number");
const inputEmailUs =$(".opened #email");
const inputBirthdaylUs =$(".opened #birthday");
const inputAddressUs = $(".opened #Address");
const checkBoxNam = $(".opened #radio1");
const checkBoxNu = $(" .opened #radio2");
const checkBoxKhac = $(".opened #radio3");
const btnSaveOpen = $(".opened .btnSave");
const searchInputListData = $(".search-user-input")

const urlApiCreateUser = "https://localhost:7284/api-admin/User/Create_User";
const urlApiGetListUser ="https://localhost:7284/api-admin/User/Get_List";
const urlApiDeleteUser = "https://localhost:7284/api-admin/User/Delete_User";
const urlApiUpdateUser = "https://localhost:7284/api-admin/User/Update_User";
const urlApiSearchCustomer = "https://localhost:7284/api-admin/User/Search_Us";
let thisPage = 1;
let pageSize = 10;
let isCreate = true;
let isUpdate = false;
let isSearch = false;
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
hanleNavManager();
handlegetListUs();
handleTextSaveBtn();

function changePage(index){
    thisPage = index;
    if(isSearch){
        handleSearchCustomer();
    }
    else{

        handlegetListUs();
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


function handlegetListUs(){
    var data = {
        pageIndex:thisPage ,
        pageSize:pageSize
    }
    getListUs(data);
};

function getListUs(data){
    $.post({
        url: urlApiGetListUser,
        headers: { "Authorization": 'Bearer ' + token },
        data: JSON.stringify(data),
        contentType: 'application/json'
    }).done(res=>{
       renderListUs(res)
    })
};

searchInputListData.on("keypress",(e)=>{
    if(e.key ==="Enter"){
        handleSearchCustomer();
        isSearch = true;
    };
});

 function handleSearchCustomer(){
    var data = {
        pageIndex: thisPage,
        pageSize:pageSize,
        value : searchInputListData.val()
    }
    SearchCustomer(data);

}
async function SearchCustomer(data){
    const promise = new Promise((resolve, reject) =>{
        httpPostAsyncCate(urlApiSearchCustomer,resolve,reject,data);
    });

    try{
        const response = await promise;
        renderListUs(response);
        console.log(response);
    }
    catch(err){
        console.log(err);
        $(".opened tbody").html("");
        $(".opened tbody").html("Không tìm thấy người dùng");

    }

};

function renderListUs(data){
    var count = Math.ceil(data["totalItems"] / pageSize);
    renderListPage(count)
    var html = data["data"].map(us=>{
        return `
        <tr class="tb-content" data-id = "${us["id"]}">
            <td class="us_id" >
                ${us["id"]}
            </td>
            <td class="fullName">
                ${us["fullName"]}
            </td>
            <td class="phone_number">
               ${us["phone_number"]}
            </td>
            <td class="email">
                ${us["email"]}
            </td>
            <td class="birthday">
                ${ us["birthday"].slice(0,10)}

            </td>
            <td class="gender">
                ${us["gender"]}
            </td>
            <td class="address">
                ${us["address"]}
            </td>
            <td>
                 <div class="group-btn">
                     <div class="group-delete">
                         <button type="button" class="btnDelete btn" onclick = "activeModalConfirm(${us["id"]})">Xóa</button>
                     </div>

                     <div class="group-update">
                         <button type="button" class="btnUpdate btn" onclick = "fillToInput(${us["id"]})">Sửa</button>
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
            thisPage = thisPage + 1;
            changePage(thisPage);
        }
    });
};

function clearDataCustomer(){
    inputNameCustomer.val("");
    inputPhoneNumberUs.val("");
    inputEmailUs.val("");
    inputBirthdaylUs.val("");
    inputAddressUs.val("");
    checkBoxNam.prop("checked", false);
    checkBoxNu.prop("checked", false);
    checkBoxKhac.prop("checked", false);
};

btnSaveOpen.on("click",()=>{
    if(isCreate)
        handleCreateUser();
    else if(isUpdate)
    {
        var id = btnSaveOpen.attr("data-id")
       handleUpdateUser(id);
    }
    
});

function handleCreateUser(){
    var gender = ""
    if(checkBoxNam.prop("checked")){
        gender = checkBoxNam.val();
    }
    else if(checkBoxNu.prop("checked")){
        gender = checkBoxNu.val();
    }
    else gender = checkBoxKhac.val();
    var data = {
        fullName:inputNameCustomer.val(),
        email:inputEmailUs.val(),
        phone_number:inputPhoneNumberUs.val(),
        birthday:inputBirthdaylUs.val(),
        gender:gender,
        address:inputAddressUs.val()
    }
    CreateUser(data);
};

function CreateUser(data){
    $.post({
        url:urlApiCreateUser,
        headers: { "Authorization": 'Bearer ' + token },
        data:JSON.stringify(data),
        contentType:"application/json"
    }).done(res=>{
        isSearch = false;
        showSuccessToast("Thêm thành công");
        handlegetListUs();
        clearDataCustomer();

    })
    .fail(err=>{
        showErrorToast("Thêm không thành công")
        alert(err.statusText)
    })
}; 

function fillToInput(usId){
    isCreate = false;
    isUpdate = true;
    isSearch = false;
    handleTextSaveBtn();
    btnSaveOpen.attr("data-id",usId)
    var tb_content = [...document.querySelectorAll('.tb-content')].find((item)=>{
       if( Number(item.dataset.id) == usId)
        return item;
    });
    inputNameCustomer.val(tb_content.querySelector(".fullName").textContent.trim());
    inputPhoneNumberUs.val(tb_content.querySelector(".phone_number").textContent.trim());
    inputEmailUs.val(tb_content.querySelector(".email").textContent.trim());
    inputBirthdaylUs.val(tb_content.querySelector(".birthday").textContent.trim());
    inputAddressUs.val(tb_content.querySelector(".address").textContent.trim());
    var gender = ""
    if(tb_content.querySelector(".gender").textContent.trim() ==="Nam")
    {
        gender= tb_content.querySelector(".gender").textContent.trim() 
        checkBoxNam.prop("checked",true);
    }
    else if(tb_content.querySelector(".gender").textContent.trim() ==="Nữ")
    {
        gender= tb_content.querySelector(".gender").textContent.trim() 
        checkBoxNu.prop ("checked", true);
    }
    else {
        checkBoxKhac.prop("checked", true);
        gender= tb_content.querySelector(".gender").textContent.trim() 
    }
   
};
 
function activeModalConfirm(usid){
    openModalCofirmDelete("Bạn chắc chắn muốn xóa người dùng này ?");
    btnConfirmNo.on('click', ()=>{
      closeModalCofirmDelete();
    });
    btnConfirmYes.on('click', ()=>{
        DeleteUs(usid);
    });
};


function DeleteUs(UserId){
    $.ajax({
        url: urlApiDeleteUser+'?usId='+UserId,
        headers: { "Authorization": 'Bearer ' + token },
        type: 'DELETE',
    }).done(res=>{
        showSuccessToast("Xóa thành công");
        closeModalCofirmDelete();
        handlegetListUs();
        isSearch = false;
        
    })
    .fail(err=>{
        showErrorToast("Xóa thất bại")
    })
};

function handleUpdateUser(id){
    var gender = ""
    if(checkBoxNam.prop("checked")){
        gender = checkBoxNam.val();
    }
    else if(checkBoxNu.prop("checked")){
        gender = checkBoxNu.val();
    }
    else gender = checkBoxKhac.val();
    var data = {
        id,
        fullName: inputNameCustomer.val(),
        email: inputEmailUs.val(),
        phone_number: inputPhoneNumberUs.val(),
        birthday:inputBirthdaylUs.val(),
        gender,
        address:inputAddressUs.val()
    }
    updateUser(data) ;
};

function updateUser(data){
     $.ajax({
         url : urlApiUpdateUser,
         type :"PUT",
         headers: { "Authorization": 'Bearer ' + token },
         data: JSON.stringify(data),
         contentType:"application/json"
     })
     .done(res =>{
        showSuccessToast("Sửa thành công!");
         handlegetListUs();
         clearDataCustomer();
         isCreate = true;
         isUpdate=false;
         handleTextSaveBtn();
     }).fail(err =>{
        showErrorToast("Sửa thất công!");

        alert(err.statusText)
     })
};