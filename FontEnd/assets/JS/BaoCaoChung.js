const urlApiGetTotalOrder = "https://localhost:7284/api-admin/Order/Get_Total_Order";
const urlApiGetTotalUser = "https://localhost:7284/api-admin/User/TotalUser";
const urlApiThongKeDoanhThu  = "https://localhost:7284/api-admin/ThongKeDoanhThu/Thong_Ke_Doanh_Thu";

async function Start(){
    //showSubNav();
     getTotalUser();
     getTotalOrder();
    handleThongKe();
}
Start();
async function getTotalUser(){
    $.get(urlApiGetTotalUser)
    .done(res=>{
        $(".statistics-data .totalUser").html(res);
    })
    .fail(err=>{
        console.log(err);
    })
};

async function getTotalOrder(data){
    $.get(urlApiGetTotalOrder)
    .done(res=>{
        
        $(".statistics-data .totalOrder").html(res);
    })
    .fail(err=>{
        console.log(err);
    })
};


function handleThongKe(){
    const date = new Date();

    var data={
        fr_month:0,
        to_month:0,
        year:date.getFullYear(),
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
function renderTotalPrice(res) {
    var total = 0 ;
    res.forEach(element => {
        total +=element["doanhThu"] 
    });
    $(".totalMoney .data").html(handlePrice(total))
}


function handleListData(data){
    var listdata = [];
    if(data.length>=2){
      var fr_month = data[0]["thang"];
      var to_month = data[data.length-1]["thang"];
        var mid_month = to_month - fr_month;
      for(var i=1; i<=12; i ++){
           if(i<fr_month || i>to_month){
             listdata[i-1] = 0 
           }
           if(i>fr_month && i<to_month){
            if(mid_month ===2){
                for(j=0;j<data.length;j++){

                    if(data[j]["thang"] == to_month -1){
                        listdata.push(data[j]["doanhThu"]);
                    }
                    else{
                        console.log(data.length)
                        listdata.push(0);
                    }
                }
            }
            if(mid_month > 2){
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

    renderBarDoanhThu(listdata.slice(0,12));
  };
function renderBarDoanhThu(data){
    let myChart = document.getElementById('barSoNguoiDung').getContext('2d');
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';
    
    new Chart("barSoNguoiDung", 
    {
      type: "line",
      data: {
        labels: xLabel(),
        xAxisID:"Tháng",
        datasets: [{
          label:'Doanh thu',
          data: data,
          borderColor: "#0766AD",
          backgroundColor:"#0766AD",
          borderWidth:1,
          fill: false,
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
  

const ctx1 = document.getElementById('lineSoLuongDongHang').getContext('2d');
const myChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    },
});


const ctx2 = document.getElementById('luotXemSanPham').getContext('2d');
const myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
        }]
    },
});
// let myChart = document.getElementById('barSoNguoiDung').getContext('2d');
//     Chart.defaults.global.defaultFontFamily = 'Lato';
//     Chart.defaults.global.defaultFontSize = 16;
//     Chart.defaults.global.defaultFontColor = '#777';
    
//     new Chart("barSoNguoiDung", 
//     {
//       type: "bar",
//       data: {
//         labels: [1,2,3,4,5,6,7,8,9,10,11,12],
//         xAxisID:"Tháng",
//         datasets: [{
//           label:'Doanh thu',
//           data: [10,10,20,30,32,34,35,36,37,38,12,12],
//           borderColor: "#0766AD",
//           backgroundColor:"#0766AD",
//           borderWidth:1,
//           fill: false,
//           hoverBorderWidth:3,
//           hoverBorderColor:'#0766AD'
//         }]
//       },
//       options: {
//         // scales: {
//         //   yAxes: [{
//         //       ticks: {
//         //           beginAtZero: true,
//         //           callback: function(value, index, values) {
//         //               return float2vnd(value);
//         //           }
//         //       }
//         //   }] 
//         // },             
//         title:{
//           display:true,
//           text:'Doanh thu theo tháng',
//           fontSize:16
//         },
//         legend: {display: true},
//         tooltips:{
//           enabled:true
//         }
//       }
//     });