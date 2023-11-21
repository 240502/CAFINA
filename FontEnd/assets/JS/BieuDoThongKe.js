const urlApiThongKeDoanhThu  = "https://localhost:7284/api-admin/ThongKeDoanhThu/Thong_Ke_Doanh_Thu";
const urlApiThongKeDoanhThuTheoNgay  = "https://localhost:7284/api-admin/ThongKeDoanhThu/Thong_Ke_Doanh_Thu_TheoNgay";


const inputFr_Month = $("#fr_month");
const inputTo_Month = $("#to_month");
const inputLoaiThongKe = $("#loaiThongKe");
const btnThongKe = $("#btnThongKe")
let isSelectDate = true;

function start(){
  handleThongKe();
};
start ();
btnThongKe.on("click", ()=>{
  $(".canvasBar").html("")
  if(isSelectDate){

    handleThongKe();
  }  
  else{
    hanleSelectThongKe();
  }
});
function hanleSelectThongKe(){
  var data = {};
  const date = new Date();
  if(inputLoaiThongKe.val()==="1"){
    ThongKe(data);
    
  }
  if(inputLoaiThongKe.val()==="2"){
    console.log(2)
    data={
      fr_date:`${date.getFullYear()}-01-01`,
      to_date:`${date.getFullYear()}-03-30`,
    }
    ThongKe(data);

  }
  if(inputLoaiThongKe.val()==="3"){
    console.log(3)
    data={
      fr_date:`${date.getFullYear()}-04-01`,
      to_date:`${date.getFullYear()}-06-30`,
    }
    ThongKe(data);

  }
  if(inputLoaiThongKe.val()==="4"){
    console.log(4)
    data={
      fr_date:`${date.getFullYear()}-07-01`,
      to_date:`${date.getFullYear()}-09-30`,
    }
    ThongKe(data);

  }
  if(inputLoaiThongKe.val()==="5"){
    console.log(5)
    data={
      fr_date:`${date.getFullYear()}-10-01`,
      to_date:`${date.getFullYear()}-12-30`,
    }
    ThongKe(data);

  }

  if(inputLoaiThongKe.val()==="6"){
    console.log(6)
    data={
      fr_date:`${date.getFullYear()}-${date.getMonth()+1}-01`,
      to_date:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
    }
    
    console.log(data);
    ThongKeDoanhThuTheoNgay(data);
  }
};
inputLoaiThongKe.on("change", ()=>{
  isSelectDate = false;

});

function ThongKeDoanhThuTheoNgay(data){
  $.post({
    url:urlApiThongKeDoanhThuTheoNgay,
    headers: { "Authorization": 'Bearer ' + token },
    data:JSON.stringify(data),
    contentType:"application/json"
})
.done(res=>{
  handleListDataDay(res);
  renderTotalPrice(res);
  console.log(res)
})
.fail(err=>{
    console.log(err)
})
}
function handleThongKe(){
  var data = {}
  if(inputFr_Month.val() !== "" && inputTo_Month.val() !== ""){
     data={
      fr_date:inputFr_Month.val(),
      to_date:inputTo_Month.val(),
    }
  }
  if(inputFr_Month.val() !== "" && inputTo_Month.val() === "")
  {
    data={
      fr_date:inputFr_Month.val()
    }
  }
  if(inputFr_Month.val() === "" && inputTo_Month.val() !== "")
  {
    data={
      to_date:inputTo_Month.val()
    }
  }
  ThongKe(data)
};

function ThongKe(data){
    $.post({
        url:urlApiThongKeDoanhThu,
        headers: { "Authorization": 'Bearer ' + token },
        data:JSON.stringify(data),
        contentType:"application/json"
    })
    .done(res=>{
      handleListDataMonth(res);
      renderTotalPrice(res);
        console.log(res)
    })
    .fail(err=>{
        console.log(err)
    })
};

function renderTotalPrice(data){
  let total = 0;
  data.forEach(element => {
      total += element["doanhThu"]
  });
  console.log(total);
  $(".total-price span").html(handlePrice(total));
}

function handleListDataDay(data){
  const date = new Date();

  var listData = [];
  if(data.length == 1){
    for(var i = 1; i<=date.getDate(); i++){
      if(data[0]["day"] == i){
        listData[i-1] = data[0]["doanhThu"];
      }
      if(data[0]["day"] != i)
      listData.push(0);
    }
  }
  if(data.length>=2){
    for(var i=1; i<=31;i++){
      var result =  data.find(item =>{
        return  item["day"]  == i
      })

      if(result === undefined){
        listData[i-1] = 0;
      }
      if(result !== undefined){
        listData[i-1] = result["doanhThu"];
      }
    }
  }
  console.log(listData.slice(0,date.getDate()))
  renderBar(listData.slice(0,date.getDate()),xLabelDay(date.getFullYear(),date.getMonth()+1,date.getDate()));
};

function handleListDataMonth(data){
  var listData = [];
    if(data.length == 1){
      for(var i = 1; i<=12; i++){
        console.log(i == 11)
        if(data[0]["month"] == i){
          listData[i-1] = data[0]["doanhThu"];
        }
        if(data[0]["month"] != i)
        listData.push(0);
      }
    }
    if(data.length>=2){
      for(var i=1; i<=12;i++){
        var result =  data.find(item =>{
          return  item["thang"]  == i
        })

        if(result === undefined){
          listData[i-1] = 0;
        }
        if(result !== undefined){
          listData[i-1] = result["doanhThu"];
        }
      }
    }
  renderBar(listData.slice(0,12),xLabelMonth());
};
function renderBar(listdata,xlabel){
    let myChart = document.getElementById('canvasBar').getContext('2d');
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 13;
    Chart.defaults.global.defaultFontColor = '#777';
    var chart =  new Chart("canvasBar", 
    {
      type: "bar",
      data: {
        labels: xlabel,
        xAxisID:"Tháng",
        datasets: [{
          label:'Doanh thu',
          data: listdata,
          borderColor: "#0766AD",
          backgroundColor:"#0766AD",
          borderWidth:1,
          fill: true,
          hoverBorderWidth:3,
          hoverBorderColor:'#0766AD'
        }]
      },
      ActiveDataPoint :{
        index:2
      },
      options: {
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
                  callback: function(value, index, values) {
                      return float2vnd(value);
                  }
              }
          }] 
        },             
        title:{
          display:true,
          text:'Doanh thu theo tháng',
          fontSize:25
        },
        legend: {display: true},
        tooltips: {
          enabled: true,
          mode: 'index',
          intersect: false
        },
        plugins: {
          filler: {
              propagate: true
          }
        }
      }
    });

  

};

function float2vnd(value){
  return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
};

function xLabelMonth(){
  var month = []
  for(var i = 1; i <= 12; i++)
    month.push("T."+i)
  return month;
};

function xLabelDay(year,month,maxdate){
  var date = []
  for(var i = 1; i <= maxdate; i++)
    
    date.push(i+`-${month}`)
  console.log(date)
  return date;
};


