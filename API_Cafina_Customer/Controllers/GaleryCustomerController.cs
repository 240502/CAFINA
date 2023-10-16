using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Businesss;
using Model;
namespace API_Cafina_Customer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GaleryCustomerController : ControllerBase
    {
        GaleryBUS galeryBUS = new GaleryBUS();
        [Route("GetByProductId")]
        [HttpGet]
        public IActionResult GetByProductId(string productId)
        {
            try
            {
                GaleryModel galery = galeryBUS.GetByProductId(productId);
                return galery == null ? NotFound() : Ok(galery);

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
