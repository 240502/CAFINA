const listNav = [...document.querySelectorAll(".nav-item")];
const listForm = [...document.querySelectorAll(".form")]
const btnSaveOpen = $(".opened .btnSave");
let isCreate = true;
let isUpdate = false;
let isFormActive = false;

if(document.querySelectorAll(".form_info_us.opened")){
    const listInputFormUs = [...document.querySelectorAll(".form_info_us.opened input ")]
    listInputFormUs.forEach(item=>item.onkeyup  = ()=>{
        isUpdate = true;
        handleTextSaveBtn();
    });
}
    const urpApiGetUserById = "https://localhost:7284/api-admin/User/Get_Us_By_Id"
    function getUser(){
        $.get(urpApiGetUserById+"?id="+infoUs["user_id"])
        .done(res=>{
            console.log(res);
            fillDataToInput(res);
        })
      }
    for (let i = 0; i < listNav.length;i++)
    {
        listNav[i].onclick =()=>{
            document.querySelector(".nav-item.active").classList.remove("active");
            document.querySelector(".form.opened").classList.remove("opened");
            listNav[i].classList.add("active");
            listForm[i].classList.add("opened");
            $("#link").attr("src","./assets/JS/ManageCustomer.js")
        }
    }
function handleTextSaveBtn(){
    if(isCreate)
    {
        btnSaveOpen.toggleClass("active",isUpdate);
        btnSaveOpen.text("Thêm mới")
    }
    else if(isUpdate){
        btnSaveOpen.text("Lưu")
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
console.log(isFormActive)

