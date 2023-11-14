const urlApiThongKeDoanhThu  = "https://localhost:7284/api-admin/ThongKeDoanhThu/Thong_Ke_Doanh_Thu";
const inputFr_Month = $("#fr_month");
const inputTo_Month = $("#to_month");
const inputYear = $("#year");
const btnThongKe = $("#btnThongKe")



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
        renderBar(res)
    })
    .fail(err=>{
        console.log(err)
    })
}
function renderBar(data){

 
    var listdata = data.map(item=>{
        return item["doanhThu"]
    })
    var listmonth = data.map(item=>{
        return item["thang"]
    })
    console.log(listmonth)
    let myChart = document.getElementById('myChart').getContext('2d');
    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 18;
    Chart.defaults.global.defaultFontColor = '#777';
    
    let massPopChart = new Chart(myChart, {
      type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data:{
        labels:listmonth,
        datasets:[{
          label:'Doanh thu',
          data:listdata,
          //backgroundColor:'green',
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ],
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        }]
      },
      options:{
        title:{
          display:true,
          text:'Doanh thu theo tháng',
          fontSize:25
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:50,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
    });
}

