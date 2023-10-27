const listInput1 = [...document.querySelectorAll("account-main input")]
const inputNameUs =$(".opened #FullName");
const inputPhoneNumberUs =$(".opened #Phone_Number");
const inputEmailUs =$(".opened #email");
const inputBirthdaylUs =$(".opened #birthday");
const inputAddressUs = $(".opened #Address");
const checkBoxNam1 = $(".opened #radio1");
const checkBoxNu1 = $(" .opened #radio2");
const checkBoxKhac1 = $(".opened #radio3");
const urlApiCreateUser = "https://localhost:7284/api-admin/User/Create_User";
const urlApiGetListUser ="https://localhost:7284/api-admin/User/Get_List";
const urlApiDeleteUser = "https://localhost:7284/api-admin/User/Delete_User";
const urlApiUpdateUser = "https://localhost:7284/api-admin/User/Update_User"
let thisPage = 1;
let pageSize = 10;
    handlegetListUs();
    handleTextSaveBtn();
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
            data: JSON.stringify(data),
            contentType: 'application/json'
        }).done(res=>{
           renderListUs(res)
        })
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
                             <button type="button" class="btnDelete btn" onclick = "DeleteUs(${us["id"]})">Xóa</button>
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
    };
    
    function clearDataCustomer(){
        inputNameUs.val("");
        inputPhoneNumberUs.val("");
        inputEmailUs.val("");
        inputBirthdaylUs.val("");
        inputAddressUs.val("");
        checkBoxNam.prop("checked", false);
        checkBoxNu.prop("checked", false);
        checkBoxKhac.prop("checked", false);
    }
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
            fullName:inputNameUs.val(),
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
            data:JSON.stringify(data),
            contentType:"application/json"
        }).done(res=>{
            alert(res)
            handlegetListUs();
            clearDataCustomer();
    
        })
        .fail(err=>{
            alert(err.statusText)
        })
    }; 
   
    
    function fillToInput(usId){
        isCreate = false;
        isUpdate = true;
        handleTextSaveBtn();
        btnSaveOpen.attr("data-id",usId)
        var tb_content = [...document.querySelectorAll('.tb-content')].find((item)=>{
           if( Number(item.dataset.id) == usId)
            return item;
        });
        inputNameUs.val(tb_content.querySelector(".fullName").textContent.trim());
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
       
    }
    
    function DeleteUs(UserId){
        $.ajax({
            url: urlApiDeleteUser+'?usId='+UserId,
            type: 'DELETE',
        }).done(res=>{
            alert(res)
            handlegetListUs();
            
        })
    }
    
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
            fullName: inputNameUs.val(),
            email: inputEmailUs.val(),
            phone_number: inputPhoneNumberUs.val(),
            birthday:inputBirthdaylUs.val(),
            gender,
            address:inputAddressUs.val()
        }
        updateUser(data) ;
    }
    function updateUser(data){
         $.ajax({
             url : urlApiUpdateUser,
             type :"PUT",
             data: JSON.stringify(data),
             contentType:"application/json"
         })
         .done(res =>{
             alert(res)
             handlegetListUs();
             clearDataCustomer();
             isCreate = true;
             isUpdate=false;
             handleTextSaveBtn();
         }).fail(err =>{
            alert(err.statusText)
         })
    }

