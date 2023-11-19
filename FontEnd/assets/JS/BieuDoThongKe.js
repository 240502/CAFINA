const urlApiThongKeDoanhThu  = "https://localhost:7284/api-admin/ThongKeDoanhThu/Thong_Ke_Doanh_Thu";
const inputFr_Month = $("#fr_month");
const inputTo_Month = $("#to_month");
const inputYear = $("#year");
const btnThongKe = $("#btnThongKe")


function start(){
  handleThongKe();
};
start ();
btnThongKe.on("click", ()=>{
    handleThongKe();
})


function handleThongKe(){
    var data={
        fr_month:inputFr_Month.val(),
        to_month:inputTo_Month.val(),
        year:inputYear.val(),
    }
    ThongKe(data)
}
function ThongKe(data){
    $.post({
        url:urlApiThongKeDoanhThu,
        data:JSON.stringify(data),
        contentType:"application/json"
    })
    .done(res=>{
        handleListData(res);
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

function handleListData(data){
  var listdata = [];
  if(data.length>=2){
    var fr_month = data[0]["thang"];
    var to_month = data[data.length-1]["thang"];
  
    for(var i=1; i<=12; i ++){
         if(i<fr_month || i>to_month){
           listdata[i-1] = 0 
         }
         if(i>fr_month || i<to_month){
          for(j=1;j<data.length-1;j++){
            for(var z = fr_month+1; z<to_month; z++){
               if(data[j]["thang"] == z){
                 listdata[z-1] = data[j]["doanhThu"];
                 
               }
               if(data[j]["thang"] != z)
               {

                  listdata.push(0);
               }
             }
           }
        }
        if(i == fr_month){
          listdata[fr_month-1] = data[0]["doanhThu"];
        }
         if ( i == to_month){
          listdata[to_month-1] = data[data.length-1]["doanhThu"];
         }
    }
  }
  else if(data.length == 1){
      for(var i = 1; i <=12; i ++){
        listdata[data[0]["thang"]-1]=data[0]["doanhThu"]
        if(i<=fr_month || i>=to_month){
          listdata.push(0)
        }
      }
  };
  console.log(listdata.slice(0,12))
  renderBar(listdata.slice(0,12));
};
function renderBar(listdata){
    let myChart = document.getElementById('canvasBar').getContext('2d');
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';
    new Chart("canvasBar", 
    {
      type: "bar",
      data: {
        labels: xLabel(),
        xAxisID:"Tháng",
        datasets: [{
          label:'Doanh thu',
          data: listdata.splice(0,12),
          borderColor: "#0766AD",
          backgroundColor:"#0766AD",
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
        tooltips:{
          enabled:true
        }
      }
    });

  

};

function float2vnd(value){
  return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
};

function xLabel(){
  var month = []
  for(var i = 1; i <= 12; i++)
    month.push("T."+i)
  return month;
};

