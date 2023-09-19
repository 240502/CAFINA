using Businesss;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_Cafina.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        OrderBUS orderBus = new OrderBUS();
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
            return Ok(result);
        }
        [Route("Delete_Order")]
        [HttpDelete]
        public IActionResult DeleteOrder(string orderId)
        {
            var result = orderBus.DeleteOrder(orderId);
            return Ok(result);
        }
        [Route("Update_Order")]
        [HttpPut]
        public IActionResult UpdateOrder(OrderModel order)
        {
            var result = orderBus.UpdateOrder(order);
            return Ok(result);
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
        [Route("ThongKe")]
        [HttpPost]
        public IActionResult ThongKe([FromBody] Dictionary<string,object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string fullname = "";
                if (formData.Keys.Contains("fullname") && !string.IsNullOrEmpty(Convert.ToString(formData["fullname"])))
                    fullname = Convert.ToString(formData["fullname"]);
                DateTime ? ngaybd = null;
                if(formData.Keys.Contains("ngaybd") && !string.IsNullOrEmpty(Convert.ToString(formData["ngaybd"])))
                {
                    var dt = DateTime.Parse(formData["ngaybd"].ToString());
                    ngaybd = new DateTime(dt.Year,dt.Month,dt.Day,0,0,0,0);
                }
                DateTime ? ngaykt = null;
                if (formData.Keys.Contains("ngaykt") && !string.IsNullOrEmpty(Convert.ToString(formData["ngaykt"])))
                {
                    var dt = DateTime.Parse(formData["ngaykt"].ToString());
                    ngaykt = new DateTime(dt.Year, dt.Month, dt.Day, 23,59, 59, 999);
                }
                long total = 0;
                var result = orderBus.ThongKe(page,pageSize,out total,fullname,ngaybd,ngaykt);
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
    }
}
