const emailInput = $("#email");
const passWordInput = $("#password");
const loginBtn = $("#btnLogin");
const urlApiLogin ="https://localhost:7284/api-admin/Account/Login";

loginBtn.on("click", ()=>{
    handleLogin();
})

function handleLogin(){
    var data={
        UserName:emailInput.val(),
        Password:passWordInput.val()
    }
    Login(data);
}

function Login(data){
    $.post({
        url:urlApiLogin,
        data:JSON.stringify(data),
        contentType:"application/json"
    })
    .done(res=>{
        if(res["email"] !=="undefined"){
            localStorage.setItem("login",JSON.stringify(res));
            OpenFormUs();
            HiddeMainContent();
        }
    })
    .fail(err=>{
        alert("lỗi")
    })
}