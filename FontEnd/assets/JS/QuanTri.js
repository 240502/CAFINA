const btnAbc = document.getElementById('btnAbc');
btnAbc.addEventListener('click', ()=>{
    document.querySelector('.form_create_container').style.display = 'block';
})


function Start(){
    getProduct(renderProduct)
}
Start()
function renderProduct(ListProduct){
    var root = document.getElementById("root")
    var html = ListProduct.map(item=>{
        return `
        <ul>
            <li>
                <h3>${item.title}</h3>
            </li>
        </ul>
        `
    })
    console.log(root)
    root.innerHTML = html.join("")
}
function getProduct(render){
    fetch("https://localhost:7140/api/Product/Get_All")
    .then((Response)=>Response.json())
    .then(render)
}
function getAllProduct(){
    var option ={
        method:"POST",
        headers:{
            "Content-Type": "application/json"   
        }
    }
    fetch(`https://localhost:7140/api/Product/PhanTrang_DSProduct?page=`)  
    .then(response => response.json())
    .then(function (response) {
    
        console.log(response)
    })
}
getAllProduct()
console.log("abc")
console.log(Math.ceil(10/5))