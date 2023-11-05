using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Businesss;
namespace API_Cafina_Customer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ObjectCustomerController : ControllerBase
    {
        ObjectBUS obBUS = new ObjectBUS();
        [Route("Get_ObjectByName")]
        [HttpGet]
        public IActionResult GetByName(string obName)
        {
            try
            {
                List<ObjectModel> list = obBUS.Get(obName);
                return list !=null ? Ok(list) : NotFound();

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("Get_ObjectById")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            try
            {
                ObjectModel ob = obBUS.GetByID(id);
                return ob != null ? Ok(ob) : NotFound();

            }catch(Exception ex)
            {
                throw new Exception($"{ex.Message}");
            }

        }
    }
}
