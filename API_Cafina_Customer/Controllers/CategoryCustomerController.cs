using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Businesss;
namespace API_Cafina_Customer.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CategoryCustomerController : ControllerBase
    {
        CategoryBUS cate= new CategoryBUS();
        [Route("Get_List_Cate")]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {

                List<CategoryModel> model = cate.GetList();
                return model == null ? NotFound() : Ok(model);

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
