const listNav = [...document.querySelectorAll(".nav-item")];
const listForm = [...document.querySelectorAll(".form")];
const btnSaveOpen = $(".opened .btnSave");
const inputName = $(".opened #name");
const inputSdt = $(".opened #sdt");
const inputEmail = $(".opened .email");
const inputBirthDay = $(".opened #birthday");
const checkBoxNam = $(".opened #radio1");
const checkBoxNu = $(" .opened #radio2");
const checkBoxKhac = $(".opened #radio3");
const urpApiGetUserById = "https://localhost:7284/api-admin/User/Get_Us_By_Id";

let isFormActive = false;
isUpdate = false;
var infoUs = JSON.parse(localStorage.getItem("login"))
if(document.querySelectorAll(".form_info_us.opened")){
    const listInputFormUs = [...document.querySelectorAll(".form_info_us.opened input ")]
    listInputFormUs.forEach(item=>item.onkeyup  = ()=>{
        isUpdate = true;
        handleTextSaveBtn();
    });
};

function getUser(){
     $.get(urpApiGetUserById+"?id="+infoUs["user_id"])
     .done(res=>{
         console.log(res);
         fillDataToInput(res);
     })
};

getUser();

function fillDataToInput(us){
  if(us["gender"] ==="Nam")
  {
    checkBoxNam.prop("checked",true);
  }
  else if(us["gender"] ==="Nữ")
  {
    checkBoxNu.prop ("checked", true);
  }
  else checkBoxKhac.prop("checked", true);

  inputName.val(us["fullName"]);
  inputSdt.val(us["phone_number"]);
  inputEmail.val(us["email"]);
  inputBirthDay.val(us["birthday"].slice(0,10));
}

function handleTextSaveBtn(){
    
    if(isUpdate){
        btnSaveOpen.toggleClass("active",isUpdate);
    }
}
function FormActive(index){
   for(let i =0 ; i < listForm.length ; i++){
        if(index == Number(listForm[i].dataset.id)){
            return true;
        }
    }
}


