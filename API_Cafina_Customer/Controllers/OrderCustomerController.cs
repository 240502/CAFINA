using Businesss;
using DataAccessLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_Cafina_Customer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderCustomerController : ControllerBase
    {
        OrderBUS orderBUS = new OrderBUS();
        [Route("Get_Order")]
        [HttpPost]
        public IActionResult getOrderByUser([FromBody] Dictionary<string,object> formData)
        {
            int? pageSize = null;
            int? pageIndex = null;
            string? email = null;
            int total = 0;
            if (formData.Keys.Contains("pageSize") && !string.IsNullOrEmpty(formData["pageSize"].ToString()))
                pageSize = int.Parse(formData["pageSize"].ToString());
            if (formData.Keys.Contains("pageIndex") && !string.IsNullOrEmpty(formData["pageIndex"].ToString()))
                pageIndex = int.Parse(formData["pageIndex"].ToString());
            if (formData.Keys.Contains("email") && !string.IsNullOrEmpty(formData["email"].ToString()))
                email = formData["email"].ToString();

            var result = orderBUS.GetOrderByUser(pageIndex,pageSize,out total,email);
            
            return result !=null ? Ok(new {PageSize = pageSize, PageIndex = pageIndex, Data = result, TotalItems = total}):NotFound();
        }
        Order_DetailsBUS odDetail = new Order_DetailsBUS();
        [Route("Get_Order_ByUsId")]
        [HttpGet]
        public IActionResult GetListOrderByUsId(int usid)
        {
            try
            {

                List<Order_Details> list = odDetail.GetListOrderByUsId(usid);
                int total = list.Count;
                return list !=null ? Ok(new {totalItems=total,data=list}) : NotFound();
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
