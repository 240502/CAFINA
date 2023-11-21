


const urlApiGetTotalOrder = "https://localhost:7284/api-admin/Order/Get_Total_Order";
const urlApiThongKeSoLuongDonHangTheoThang = "https://localhost:7284/api-admin/Order/ThongKe_SLDonHangTheoThang";
const urlApiThongKeSoLuongBanSPTheoThang = "https://localhost:7284/api-admin/Product/ThongKeSLBanProduct";
const urlApiGetTop5SPBanChay = "https://localhost:7284/api-admin/Product/Top5SanPhamBanChay";
const urlGetListBST = "https://localhost:7284/api-admin/BST/GetListBST";
const urlGetListObject = "https://localhost:7284/api-admin/Object/Get_List_Ob";
const urlGetListCategoryDetails = "https://localhost:7284/api-admin/CategoryDetails/GetList_CategoryDetails";

const btnThongKe = $("#btnThongKe")
const inputFr_Month = $("#fr_date");
const inputTo_Month = $("#to_date");
const inputYear = $("#year");

var listObject  = JSON.parse(localStorage.getItem("listObjectProduct"));
var listCateDetailsProduct = JSON.parse(localStorage.getItem("listCateDetailsProduct"));
var listBSTProduct = JSON.parse(localStorage.getItem("listBSTProduct"));

const month = [1,2,3,4,5,6,7,8,9,10,11,12];
function Start() {
    getTotalOrder();
    getTotalOrderByMonth();
    getTotalProductSelled();
    GetTop5SpBanChayNhat();
}

Start();
btnThongKe.on("click", ()=>{
  Start();
});

async function getTotalProductSelled(){
  var data = {};
  if(inputFr_Month.val() != "" ||inputTo_Month.val() != ""){
    data={
      fr_date:inputFr_Month.val() ,
      to_date:inputTo_Month.val() 
    }
  }
    const promise = new Promise((resolve, reject) =>{
        httpPostAsyncCate(urlApiThongKeSoLuongBanSPTheoThang,resolve,reject,data)
    });
    try{
        const res = await promise;
        hanleDataTotalProductSelled(res);
        var total = 0 ;
        res.forEach(item=>{
            total += item["total"]
        });
        renderTotalProduct(total);
    }catch(err){
        console.log(err);
    }
    
    
   
};

function renderTotalProduct(totalProduct){
    $(".total-product span").html(totalProduct)
};
function hanleDataTotalProductSelled(data){
  console.log(data);
    var listData = [];
    if(data.length == 1){
      for(var i = 1; i<=12; i++){
        console.log(i == 11)
        if(data[0]["month"] == i){
          listData[i-1] = data[0]["total"];
        }
        if(data[0]["month"] != i)
        listData.push(0);
      }
    }
    if(data.length>=2){
      for(var i=1; i<=12;i++){
        var result =  data.find(item =>{
          return  item["month"]  == i
        })

        if(result === undefined){
          listData[i-1] = 0;
        }
        if(result !== undefined){
          listData[i-1] = result["total"];
        }
      }
    }
    var maxTotalOrder = listData[0];

    for (var j = 0; j < listData.slice(0,12).length-1; j++){
        if(listData.slice(0,12)[j]>maxTotalOrder){

          maxTotalOrder = listData.slice(0,12)[j]
        }
    };
    renderLineProduct(listData.slice(0,12),maxTotalOrder);
  };


function renderLineProduct(listdata,maxTotalOrder){
    let myChart = document.getElementById('lineProduct').getContext('2d');
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';
    new Chart("lineProduct", 
    {
      type: "line",
      data: {
        labels: xLabel(),
        xAxisID:"Tháng",
        datasets: [{
          label:'Sản phẩm',
          data: listdata,
          borderColor: "#0766AD",
          borderWidth:1,
          fill: true,
          hoverBorderWidth:3,
          hoverBorderColor:'#0766AD'
        }]
      },
      options: {
        scales: {
          yAxes: [{
              ticks: {
                min: 0,
                max: maxTotalOrder +1,
              }
          }] 
        },      
        title:{
          display:true,
          text:'Số sản phẩm bán ra theo tháng',
          fontSize:25
        },
        legend: {display: true},
        tooltips: {
          enabled: true,
          mode: 'index',
          intersect: false
      }
      }
    });
};



async function getTotalOrder(){
    $.get({
      url:urlApiGetTotalOrder,
      headers: { "Authorization": 'Bearer ' + token }
    })
    .done(res=>{
        
        $(".total-order span").html(res);
    })
    .fail(err=>{
        console.log(err);
    })
};


async function getTotalOrderByMonth(){
  var data = {};
  if(inputFr_Month.val() != "" ||inputTo_Month.val() != ""){
    data={
      fr_date:inputFr_Month.val() ,
      to_date:inputTo_Month.val() 
    }
  }
      const promise = new Promise((resolve, reject) =>{
        httpPostAsyncCate(urlApiThongKeSoLuongDonHangTheoThang,resolve,reject,data);
      })
      try{
        var response = await promise;
        hanleDataTotalOrderByMonth(response)
      }catch(err){
        console.log(err);
      }
  
   
   
    
};

function hanleDataTotalOrderByMonth(data){
  var listTotalOrder =[];
  if(data.length == 1){
    for(var i = 1; i<=12; i++){
      if(data[0]["month"] == i){
        listTotalOrder[i-1] = data[0]["totalOrder"];
      }
      if(data[0]["month"] != i)
        listTotalOrder.push(0);
    }
  }
  if(data.length>=2){
    for(var i=1; i<=12;i++){
      var result =  data.find(item =>{
        return  item["month"]  == i
      })
      if(result === undefined){
        listTotalOrder[i-1] = 0;
      }
      if(result !== undefined){
        listTotalOrder[i-1] = result["totalOrder"];
      }
    }
  }
  
  var maxTotalOrder = listTotalOrder[0] ;
  for (var j = 0; j < listTotalOrder.slice(0,12).length-1; j++){
      if(listTotalOrder.slice(0,12)[j]>maxTotalOrder){
        maxTotalOrder = listTotalOrder.slice(0,12)[j]
      }
  };
  renderLineOrder(listTotalOrder.slice(0,12),maxTotalOrder)
};


function renderLineOrder(data,maxTotalOrder){
    let myChart = document.getElementById('lineSoLuongDonHang').getContext('2d');
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';
    new Chart("lineSoLuongDonHang", 
    {
      type: "bar",
      data: {
        labels: xLabel(),
        xAxisID:"Tháng",
        datasets: [{
          label:'Đơn hàng',
          data: data,
          borderColor: "#0766AD",
          borderWidth:1,
          fill: true,
          hoverBorderWidth:3,
          hoverBorderColor:'#0766AD'
        }]
      },
      options: {
        scales: {
          yAxes: [{
              ticks: {
                min: 0,
                max: maxTotalOrder +1,
              }
          }] 
        },      
        title:{
          display:true,
          text:'Số lượng đơn hàng theo tháng',
          fontSize:25
        },
        legend: {display: true},
        tooltips:{
          enabled:true
        }
      }
    });
};

function GetObjectNameById(obid){
    var ob = listObject.find(ob => {
       return ob["id"] === obid;
    });
    return ob;
};

function getListCateDetails(){
    $.get(urlGetListCategoryDetails)
    .done(res=>{
        localStorage.setItem("listCateDetailsProduct",JSON.stringify(res))
    })
    .fail(err=>{
        alert("Error: " + err.statusText)
    })
};

function GetListObject(){
    $.get(urlGetListObject)
    .done(res=>{
        localStorage.setItem("listObjectProduct",JSON.stringify(res));
    })
};

function GetListBST(){
    $.get(urlGetListBST)
    .done(res=>{
        localStorage.setItem("listBSTProduct",JSON.stringify(res));
        renderListBST(res);
    })
};



function GetBSTById(id){
    var bst = listBSTProduct.find(bst => {
       return bst["id"] === id;
    });
    return bst;
};

function GetCateDetailById(id){
    var ct = listCateDetailsProduct.find(ct => {
       return ct["id"] === id;
    });
    return ct;
};


async function GetTop5SpBanChayNhat(){
  var data = {};
  if(inputFr_Month.val() != "" ||inputTo_Month.val() != ""){
    data={
      fr_date:inputFr_Month.val() ,
      to_date:inputTo_Month.val() 
    }
  }
    const promise = new Promise((resolve, reject) =>{
        httpPostAsyncCate(urlApiGetTop5SPBanChay,resolve,reject,data);
    })
    try{

        const res = await promise
        renderListProduct(res)
    }
    catch(err){
        console.log(err);
    }
}

function renderListProduct (data){
    var html = data.map((product,index)=>{
        var cateDetail =GetCateDetailById( product["cateDt"]);
        var object = GetObjectNameById(product["object_id"]);
        var bst = GetBSTById( product["bst_id"]);
        return `
        <tr class="tb-content" data-id = "${index}">
            <td class="productId" >
               ${product["productId"]}
            </td>
            <td class="product_title">
                ${product["title"]}
            </td>
            <td class="price">
                ${product["price"]}
            </td>
            <td class="description">
                ${product["description"]}
            </td>
            <td class="ChatLieu">
                ${product["chatLieu"]}
            </td>
            <td class="Hdsd">
                ${product["huongDanSuDung"]}
            </td>
            <td class="size">
                ${product["size"]}
            </td>
            <td class="color">
                ${product["color"]}
            </td>
            <td class="cateId" data-id = ${ cateDetail!==undefined ?cateDetail["id"]:""} >
                ${cateDetail!==undefined ?cateDetail["detailName"]:""}
            </td>
            <td class="object_id" data-id = ${object!==undefined ?object["id"]:""} >
                ${object!==undefined ?object["tenDoiTuong"]:""}
            </td>
            <td class="bst_id" data-id = ${ bst!==undefined?bst["id"]:""} >
                ${bst !==undefined ? bst["tenBST"]:"" }
            </td>   
            
            <td>
               ${product["soLuongBan"]}
            </td>
        </tr>
        `
    })
    $("tbody").html(html.join(""));
};

function float2vnd(value){
  return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
};

function xLabel(){
  var month = []
  for(var i = 1; i <= 12; i++)
    month.push(i)
  return month;
};
  
