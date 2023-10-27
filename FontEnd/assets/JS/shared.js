
const urlApiGetCateDetails = "https://localhost:7284/api-customer/CategoryDetails/Get_CateDetails";
const urlApiGetListCate = "https://localhost:7284/api-customer/Category/GetCate_ByObId";



function Run (){
    getCategory();
  };
  Run();

function httpGetCateAsync(url,resolve,reject,data) {
  $.get(url,data)
  .done(response => resolve(response))
  .fail(error => reject(error))
};

function httpGetAsync(url,resolve,reject,data){
  $.get(url,data)
  .done(response => resolve(response))
  .fail(error => reject(error))
};

function httpGetAsync(url,resolve,reject,data){
  $.get(url,data)
  .done(response => resolve(response))
  .fail(error => reject(error))
};

function httpPostAsyncCate(url,resolve,reject,data){
  $.post({
    url: url,
    data:JSON.stringify(data),
    contentType : 'application/json'
  })
  .done((res,status,xhr) => {
    if(xhr.status === 200) {
      resolve(res)
    }
  })
  .fail(err =>{ 
    reject(err)
  });

};
function renderListPage(count){
    $(".list-page div").html("")
    var html = ""
    if(count > 1){
      for(var i=1; i<=count; i++){
        html+= `
        <li class="item ${thisPage ==i?"active":""}" onclick= changePage(${i})><span>${i}</span></li>
        `
      }
      $(".list-page div").html(html);
      $(".page-next").toggleClass("active-next-button",true)
    }
    else{
      $(".page-next").toggleClass("active-next-button",false)
  
    }
  };

  async function getCategory(){
    var data ={
      obId:2
    }
    const promise = new Promise((resolve,reject)=>{
      httpGetCateAsync(urlApiGetListCate,resolve,reject,data)
    })
    
   
    var title = await promise
    renderTitleSubMenu(title,"Menu_nu")
    renderTitleSubMenu(title,"Menu_be_gai")
    
    const promise1 = new Promise((resolve,reject)=>{
      httpGetCateAsync(urlApiGetListCate,resolve,reject)
    })
    var result = await promise1
    renderTitleSubMenu(result,"Menu_nam")
    renderTitleSubMenu(result,"Menu_be_trai")
  
  };

  async function renderTitleSubMenu(title,clasName){
    var group_1 = ''
    title.forEach(item=>{
     if (item["id"] ==1)
     {
         
              group_1 +=`
              <ul class="sub-menu-item" data-id = ${item["id"]}>
                <li class="title">${item["cateName"]}</li>
                <div class="content">
                 
                </div>
              </ul>`
        
     }
   });
    var group_2 = ''
     title.forEach(item=>{
      if (item["id"] >1 && item["id"] <5)
      {
        group_2+= `
            <ul class="sub-menu-item" data-id = ${item["id"]}>
              <li class="title">${item["cateName"]}</li>
              <div class="content">
              </div>
            </ul>
          `
      }
    });
   
    var group_3 = ''
    title.forEach(item=>{
     if (item["id"] >4 && item["id"] <7)
     {
       group_3+= `
           <ul class="sub-menu-item" data-id = ${item["id"]}>
             <li class="title">${item["cateName"]}</li>
             <div class="content">
             </div>
           </ul>
         `
     }
   });
    
    var group_4 = ''
    title.forEach(item=>{
      if (item["id"] >6 )
      {
        group_4+= `
          <ul class="sub-menu-item" data-id = ${item["id"]}>
            <li class="title">${item["cateName"]}</li>
            <div class="content">
            </div>
          </ul>
        `
      }
    });
    $(`.${clasName} .group-1`).html(group_1);
    $(`.${clasName} .group-2`).html(group_2);
    $(`.${clasName} .group-3`).html(group_3);
    $(`.${clasName} .group-4`).html(group_4);
  
    var subMenuContentNu =  [...document.querySelectorAll(".Menu_nu .sub-menu-item")]
    var subMenuContentNam =  [...document.querySelectorAll(".Menu_nam .sub-menu-item")]
    var subMenuContentBeTrai =  [...document.querySelectorAll(".Menu_be_trai .sub-menu-item")]
    var subMenuContentBeGai =  [...document.querySelectorAll(".Menu_be_gai .sub-menu-item")]
     async function renderSubMenuContent(subMenuContent,objectName) {
       let i =0;
       while(i<subMenuContent.length){
         var data = {
           cateId : subMenuContent[i].dataset.id,
           objectName
         }
         const promise = new Promise((resolve,reject)=>{
           httpPostAsyncCate(urlApiGetCateDetails,resolve,reject,data)
         })
         var res = await promise
         var html =""
         res.forEach(item=>{
           html+= ` <li> <a href="#">${item["detailName"]}</a></li>`
         })
         subMenuContent[i].children[1].innerHTML = html
         i++;
       }
     }
     
     renderSubMenuContent(subMenuContentNu,'Nữ')
     renderSubMenuContent(subMenuContentNam,'Nam')
     renderSubMenuContent(subMenuContentBeGai,'Trẻ em gái')
     renderSubMenuContent(subMenuContentBeTrai,'Trẻ em trai')
};

