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
console.log("abc")