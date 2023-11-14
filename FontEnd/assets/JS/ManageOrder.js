const urlApiGetListOrder = "https://localhost:7284/api-admin/Order/Get_ListOrder_Manage";
const urlApiGetListStatus  = "https://localhost:7284/api-admin/Status/GetListStatus";
const urlApiGetStatusById  = "https://localhost:7284/api-admin/Status/GetStatusById";
const urlApiUpdateOrder = 'https://localhost:7284/api-admin/Order/Update_Order';
const urlApiDeleteOrderById = 'https://localhost:7284/api-admin/Order/Delete_Order';
const urlApitGetOrderDetailByOrderId = 'https://localhost:7284/api-admin/OrderDetail/GetListOrderDetailByOrderId';

const btnSaveOpen = $(".opened .btnSave");
const inputOrderId = $("#orderid");
const inputUserId = $("#user_id");
const inputFullName = $("#fullName");
const inputEmail = $("#email");
const inputPhoneNumber = $("#phone_number");
const inputAddress = $("#address");
const inputNote = $("#note");
const inputOrderDate = $("#order_date");
const inputStatus = $("#status"); 
const inputStatusListData = $("#status_list_data");
let isUpdate = false;
var ListStatus = JSON.parse(localStorage.getItem("ListStatus"));

function Start(){
    getListOrder();
    getListStatus();
    renderLoaiDonHang();
}

let thisPage = 1;
let pageSize = 10;
Start();

inputStatus.on("change", ()=>{
    isUpdate=true;
    handleTextSaveBtn();
});
function handleTextSaveBtn(){
    
    if(isUpdate){
        btnSaveOpen.toggleClass("active",isUpdate);
    }
}
async function  getListOrder(){
    var data = {
        pageIndex : thisPage,
        pageSize:pageSize,
        status :$("#status-list-data").val() !== null ? $("#status-list-data").val():3
    }
    $.post({
        url:urlApiGetListOrder,
        data:JSON.stringify(data),
        contentType:"application/json"
    }).done(res=>{
        renderListOrderManage(res);
        console.log(res);
    })
    .fail(err=>{
        console.log(err);
    })
};

function getListStatus(){
    $.get(urlApiGetListStatus)
    .done(res=>{
        localStorage.setItem("ListStatus",JSON.stringify(res));
        renderStatus(res);
    }).fail(err=>{
        console.log(err);
    });
};
async function GetOrderDetailByOrderId(orderId){
    let listorderDetailUpdate = [];
    $.get(urlApitGetOrderDetailByOrderId+"?orderId="+orderId)
    .done(res=>{
        listorderDetailUpdate.push(res);
        localStorage.setItem("OrderDetailUpdate",JSON.stringify(listorderDetailUpdate));
    }).fail(err=>{
        console.log(err)
    });
};
function getStatusById(id){
    var status = ListStatus.find(status=>{
        return status["id"] == id;
    });
    return status;
};
function renderLoaiDonHang(){
    var html = ListStatus.map((status,index )=>{
        return `
        <option value="${status["id"]}" ${status["id"] == 3 ? "selected":""}>${status["statusName"]}</option>
        `
    });
    $("#status-list-data").html(html.join(""));
    $("#status-list-data").on("change",()=>{
        getListOrder();
    })
}

function renderStatus (listStatus){
 var html = listStatus.map((status,index)=>{
    return `
        <option ${index ==0? "selected":""} value="${status["id"]}">${status["statusName"]}</option>
    `
 });
 $("#status").html(html.join(''));
}

function renderListOrderManage(data){
    var page  = Math.ceil(data["totalItems"]/pageSize);
    renderListPage(page);
    var html = data["data"].map(( order)=>{
        GetOrderDetailByOrderId(order["id"])
        var listorderDetail =JSON.parse( localStorage.getItem("OrderDetailUpdate"));
        var totalProduct = listorderDetail.length;
        console.log(listorderDetail);
        var status = getStatusById(order["status"]);
        return `
        <tr class="tb-content" data-id = "${order["id"]}">
            <td class="orderId" >
                ${order["id"]}
            </td>
            <td class="user_Id">
                ${order["user_Id"]}
            </td>
            <td class="fullName">
               ${order["fullName"]}
            </td>
            <td class="email">
                ${order["email"]}
            </td>
            <td class="phoneNumber">
                ${ order["phone_number"]}

            </td>
            <td class="address">
                ${ order["address"]}

            </td>
            <td class="note">
                ${order["note"]}
            </td>
            <td class="order_Date">
                ${order["order_Date"].slice(0,10)}
            </td>
            <td class="order_Date">
                ${totalProduct}
            </td>
            <td class="status" data-id = ${status["id"]}>
                ${status["statusName"]}
            </td>
            <td>
                 <div class="group-btn">
                     <div class="group-delete">
                         <button type="button" class="btnDelete btn" onclick = "activeModalConfirm(${order["id"]})">Xóa</button>
                     </div>

                     <div class="group-update">
                         <button type="button" class="btnUpdate btn" onclick = "fillToInput(${order["id"]})">Sửa</button>
                     </div>
                 </div>
            </td>
        </tr>
        `
    })
    $(".opened tbody").html(html.join(""));
    btnPageNext.on("click",()=>{
        if(thisPage === page){
    
        }
        else{
            thisPage = thisPage + 1;
    
        }
        changePage(thisPage);
      });
};
var OrderIdUpdate =JSON.parse(localStorage.getItem("Order_Update"));

function fillToInput(orderId){
    var  row = [...document.querySelectorAll(".tb-content")].find(row=>{
        return Number(row.dataset.id) === orderId
    });
    inputOrderId.val(row.querySelector(".orderId").textContent.trim());
    inputUserId.val(row.querySelector(".user_Id").textContent.trim());
    inputFullName.val(row.querySelector(".fullName").textContent.trim());
    inputEmail.val(row.querySelector(".email").textContent.trim());
    inputPhoneNumber.val(row.querySelector(".phoneNumber").textContent.trim());
    inputAddress.val(row.querySelector(".address").textContent.trim());
    inputNote.val(row.querySelector(".note").textContent.trim());
    inputOrderDate.val(row.querySelector(".order_Date").textContent.trim());
    inputStatus.val(row.querySelector(".status").dataset.id);
    localStorage.setItem("Order_Update",JSON.stringify(orderId));
    GetOrderDetailByOrderId(OrderIdUpdate);
};


btnSaveOpen.on("click", ()=>{
    handleUpdateOrder();
});


function handleUpdateOrder(){
    const listOrderDetailUpdate =  JSON.parse( localStorage.getItem("OrderDetailUpdate"));
    const data = {
        id:inputOrderId.val() ,
        user_Id:inputUserId.val(),
        fullName:inputFullName.val(),
        email:inputEmail.val(),
        order_Date:inputOrderDate.val(),
        phone_number:inputPhoneNumber.val(),
        address:inputAddress.val(),
        note: inputNote.val(),
        status:inputStatus.val(),
        order_Details:listOrderDetailUpdate[0]
    };
    UpdateOrder(data);
    
};

function UpdateOrder(data){
    $.ajax({
        type: "PUT",
        url: urlApiUpdateOrder,
        data: JSON.stringify(data),
        contentType: "application/json"
        
    })
    .done(async (res)=>{
           await getListOrder();
            showSuccessToast("Cập nhật thành công");

    })
    .fail(err=>{
        console.log(err.statusText);
        showErrorToast("Có lỗi vui lòng thao tác lại sau 1p");
    })
};

function activeModalConfirm(orderId){
    openModalCofirmDelete("Bạn chắc chắn muốn xóa sản phẩm này ?");
    $("#modal-confirm-delete .btnNo").on('click', ()=>{
      closeModalCofirmDelete();
      console.log("oke")

    });
    $("#modal-confirm-delete .btnYes").on('click', ()=>{
      DeleteOrder(orderId);
      console.log("oke")
    });
  };

function DeleteOrder(data){
    $.ajax({
        type: "DELETE",
        url: urlApiDeleteOrderById+"?orderId="+data
        
    })
    .done(async (res)=>{
            await getListOrder();
            showSuccessToast("Xóa thành công");
            closeModalCofirmDelete();
        
    })
    .fail(err=>{
        console.log(err.statusText);
        closeModalCofirmDelete();
        showErrorToast("Có lỗi vui lòng thao tác lại sau 1p");
    })
};
btnPagePrev.on("click",()=>{
    if(thisPage === 1){
  
    }
    else{
        thisPage = thisPage - 1;
  
    }
    changePage(thisPage);
  });
function changePage(index){
    thisPage = index;
    getListOrder();
    if(thisPage !=1){
        $(".page-prev").toggleClass("active-button",true)
    }
    else{
        $(".page-prev").toggleClass("active-button",false)
    }
  }