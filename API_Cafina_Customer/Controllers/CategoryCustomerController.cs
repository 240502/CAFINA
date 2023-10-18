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
        Cate_ObjectBUS cate_ob = new Cate_ObjectBUS();
        [Route("Get_Cate_Ob")]
        [HttpPost]
        public IActionResult Get([FromBody] Dictionary<string,object> formData)
        {
            try
            {
                string CateName = "";
                string ObjectName = "";

                if(formData.Keys.Contains("CateName") && !string.IsNullOrEmpty(formData["CateName"].ToString())) 
                {
                    CateName = formData["CateName"].ToString();

                }


                if (formData.Keys.Contains("ObjectName") && !string.IsNullOrEmpty(formData["ObjectName"].ToString()))
                {
                    ObjectName = formData["ObjectName"].ToString();

                }
                List<Cate_ObjectModel> model = cate_ob.get(CateName, ObjectName);
                return model == null ? NotFound() : Ok(model);

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
