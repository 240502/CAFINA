
const urlApiGetProductById = "https://localhost:7284/api-customer/Product/Get_ByID"
console.log($(".item.active"))
$(".des").on("click",()=>{
    $(".des p").toggle(100)
    console.log(document.querySelector(".des.active"))
    if(document.querySelector(".des.active"))
    {
        document.querySelector(".des.active").classList.remove("active")
        document.querySelector(".des i").classList.add("fa-minus")
        document.querySelector(".des i").classList.remove("fa-plus")

    }
    else
    {
        document.querySelector(".des").classList.add("active")
        document.querySelector(".des i").classList.remove("fa-minus")
        document.querySelector(".des i").classList.add("fa-plus")

    }
});

$(".chat-lieu").on("click",()=>{
    $(".chat-lieu p").toggle(100)
    if(document.querySelector(".chat-lieu.active"))
    {
        document.querySelector(".chat-lieu.active").classList.remove("active")
        document.querySelector(".chat-lieu i").classList.remove("fa-minus")
        document.querySelector(".chat-lieu i").classList.add("fa-plus")

    }
    else
    {
        document.querySelector(".chat-lieu").classList.add("active")
        document.querySelector(".chat-lieu i").classList.add("fa-minus")
        document.querySelector(".chat-lieu i").classList.remove("fa-plus")

    }
});


$(".hd").on("click",()=>{
    $(".hd p").toggle(100)
    if(document.querySelector(".hd.active"))
    {
        document.querySelector(".hd.active").classList.remove("active")
        document.querySelector(".hd i").classList.remove("fa-minus")
        document.querySelector(".hd i").classList.add("fa-plus")

    }
    else
    {
        document.querySelector(".hd").classList.add("active")
        document.querySelector(".hd i").classList.add("fa-minus")
        document.querySelector(".hd i").classList.remove("fa-plus")

    }
});


const productId =JSON.parse(localStorage.getItem('productId'));

$.get(urlApiGetProductById+'?id='+productId)
.done(res=>{
    console.log(res);
})
.fail(err=>{
    console.log(err.statusCode);
})
