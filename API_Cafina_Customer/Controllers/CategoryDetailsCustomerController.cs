using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Businesss;
namespace API_Cafina_Customer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryDetailsCustomerController : ControllerBase
    {
        CategoryDetailsBUS cateBUS = new CategoryDetailsBUS();
        [Route("Get_CateDetails")]
        [HttpPost]
        public IActionResult Get([FromBody]Dictionary<string,object> formData)
        {
            try
            {
                 int cateId = 0;
                string objectName = "";
                if (formData.Keys.Contains("cateId") && !string.IsNullOrEmpty(formData["cateId"].ToString()))
                    cateId =    int.Parse( formData["cateId"].ToString());
                if(formData.Keys.Contains("objectName") && !string.IsNullOrEmpty(formData["objectName"].ToString()))
                    objectName = formData["objectName"].ToString();
                List<CategoryDetailsModel> list = cateBUS.Get(cateId, objectName);
                return list !=null ? Ok(list):NotFound();

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
