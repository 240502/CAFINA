using Businesss;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using System;

namespace API_Cafina.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        OrderBUS orderBus = new OrderBUS();
        Order_ThongKeBUS odTK = new Order_ThongKeBUS();
        List<OrderModel> listOrder;
        [Route("Get_Order_ById")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            OrderModel order = orderBus.GetById(id);
            if(order == null ) return NotFound();
            return Ok(order);
        }
        [Route("Create_Oder")]
        [HttpPost]
        public IActionResult CreateOrder([FromBody] OrderModel order)
        {
            var result = orderBus.CreateOrder(order);
            return result >= 1 ? Ok("Thêm thành công") : BadRequest("Thêm không thành công");

        }
        [Route("Delete_Order")]
        [HttpDelete]
        public IActionResult DeleteOrder(string orderId)
        {
            var result = orderBus.DeleteOrder(orderId);
            return result >= 1 ? Ok("Xóa thành công") : BadRequest("Xóa không thành công");
        }
        [Route("Update_Order")]
        [HttpPut]
        public IActionResult UpdateOrder(OrderModel order)
        {
            var result = orderBus.UpdateOrder(order);
            return result >= 1 ? Ok("Sửa thành công") : BadRequest("Sửa không thành công");

        }

        [Route("Search_Order")]
        [HttpPost]
        public IActionResult Search_Order([FromBody] Dictionary <string,object> formData)
        {
            long total = 0;
            try
            {
                int page = int.Parse(formData["page"].ToString());
                int pageSize = int.Parse(formData["pageSize"].ToString());
                string name = "";
                if (formData.Keys.Contains("name") && !string.IsNullOrEmpty(formData["name"].ToString()))
                {
                    name = formData["name"].ToString();
                }
                listOrder = orderBus.SearchOrder(page,pageSize, out total, name);

                return Ok(new
                {
                    TotalItem = total,
                    Data = listOrder,
                    Page = page,
                    PageSize = pageSize
                   
                }) ;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [Route("ThongKe_SoDonHang_TheoUser")]
        [HttpPost]
        public IActionResult ThongKe([FromBody] Dictionary<string,object> formData)
        {
            try
            {
                int  page = int.Parse (formData["page"].ToString());
                int  pageSize = int.Parse(formData["pageSize"].ToString());
                string fullname = "";
                if (formData.Keys.Contains("fullname") && !string.IsNullOrEmpty(Convert.ToString(formData["fullname"])))
                    fullname = Convert.ToString(formData["fullname"]);
                DateTime ? ngaybd = null;
                if(formData.Keys.Contains("ngaybd") && !string.IsNullOrEmpty(Convert.ToString(formData["ngaybd"])))
                {
                    var dt = DateTime.Parse(formData["ngaybd"].ToString());
                    ngaybd = new DateTime(dt.Year,dt.Month,dt.Day,0,0,0,0);
                }
                DateTime? ngaykt = null;
                if (formData.Keys.Contains("ngaykt") && !string.IsNullOrEmpty(Convert.ToString(formData["ngaykt"])))
                {
                    var dt = DateTime.Parse(formData["ngaykt"].ToString());
                    ngaykt = new DateTime(dt.Year, dt.Month, dt.Day);
                }
              
                int total = 0;
                var result = odTK.ThongKeSoLuongDonHangTheoKH(page,pageSize,out total,fullname,ngaybd,ngaykt);
                long abc = total;
                return Ok(new
                {
                    TotalItem = total,
                    Data = result,
                    Page = page,
                    PageSize = pageSize
                });
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [Route("ThongKe_TongSoLuongDonHang")]
        [HttpPost]
        public IActionResult ThongKeTongSlDonHang([FromBody] Dictionary<string,object> formData)
        {
            try
            {
                DateTime? fr_date = null;
                DateTime? to_date = null;
                if (formData.Keys.Contains("fr_date") && !string.IsNullOrEmpty(Convert.ToString(formData["fr_date"])))
                {
                    var dt = DateTime.Parse(formData["fr_date"].ToString());
                    fr_date = new DateTime(dt.Year,dt.Month,dt.Day);

                }
                if (formData.Keys.Contains("to_date") && !string.IsNullOrEmpty(formData["to_date"].ToString()))
                {
                    var dt= DateTime.Parse((formData["to_date"]).ToString());
                    to_date = new DateTime(dt.Year,dt.Month,dt.Day);
                }
               
                ThongKe_SLOrderModel tk = odTK.ThongKeSoLuongDonHangTheoTgian(fr_date, to_date);
                if (tk != null) return Ok(tk);
                return NotFound();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        
    }
}
