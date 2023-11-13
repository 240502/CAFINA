using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Businesss;
namespace API_Cafina_Manage.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    
    public class OrderDetailController : ControllerBase
    {
        Order_DetailsBUS odBUS = new Order_DetailsBUS();
        [Route("GetListOrderDetailByOrderId")]
        [HttpGet]
        public IActionResult GetListOrderDetailByOrderId(int orderId)
        {
            try
            {
                List<Order_Details> list = odBUS.GetListOrderDetailByOrderId(orderId);
                return list!=null ? Ok(list) : NotFound();

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
