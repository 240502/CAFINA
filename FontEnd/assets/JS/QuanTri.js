const listNav = [...document.querySelectorAll(".nav-item")];
const listForm = [...document.querySelectorAll(".form")]
for (let i = 0; i < listNav.length;i++)
{
    listNav[i].onclick =()=>{
        document.querySelector(".nav-item.active").classList.remove("active");
        document.querySelector(".form.opened").classList.remove("opened");


        listNav[i].classList.add("active");
        listForm[i].classList.add("opened");
    }
}

