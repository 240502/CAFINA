const listNav = [...document.querySelectorAll(".nav-item")];
const listForm = [...document.querySelectorAll(".form")]
const btnSaveOpen = $(".opened .btnSave");
let isCreate = true;
let isUpdate = false;
for (let i = 0; i < listNav.length;i++)
{
    listNav[i].onclick =()=>{
        document.querySelector(".nav-item.active").classList.remove("active");
        document.querySelector(".form.opened").classList.remove("opened");


        listNav[i].classList.add("active");
        listForm[i].classList.add("opened");
    }
}
function handleTextSaveBtn(){
    if(isCreate)
    {
        btnSaveOpen.text("Thêm mới")
    }
    else if(isUpdate){
        btnSaveOpen.text("Lưu")
    }
}
