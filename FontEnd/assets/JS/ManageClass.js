const listInput = [...document.querySelectorAll("account-main input")]

const inputNameUs =$(".opened #FullName");
const inputPhoneNumberUs =$(".opened #Phone_Number");
const inputEmailUs =$(".opened #email");
const inputBirthdaylUs =$(".opened #birthday");
const inputAddressUs = $(".opened #Address");
const checkBoxNam = $(".opened #radio1")
const checkBoxNu = $(" .opened #radio2")
const checkBoxKhac = $(".opened #radio3")
const btnSaveOpen = $(".opened .btnSave")
const urlApiCreateUser = "https://localhost:7284/api-admin/User/Create_User"
listInput.forEach(input=>{
    input.onkeyup = ()=>{

    }

});

btnSaveOpen.on("click",()=>{
    handleCreateUser();
})
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
    console.log(data)
    CreateUser(data);
}
function CreateUser(data){
    $.post({
        url:urlApiCreateUser,
        data:JSON.stringify(data),
        contentType:"application/json"
    }).done(res=>{
        console.log(res)
    })
}   



