using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_Cafina_Customer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        [Route("Get_Order")]
        [HttpPost]
        public IActionResult getOrderByUser()
        {
            return Ok();
        }
    }
}
