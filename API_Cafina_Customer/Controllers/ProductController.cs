using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Businesss;
namespace API_Cafina_Customer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        ProductBUS proBus = new ProductBUS();
        List<ProductModel> Product_List;
        [Route("PhanTrang_DSProduct")]
        [HttpPost]
        public IActionResult PhanTrang([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                int? page = null;
                if (formData.Keys.Contains("page") && !string.IsNullOrEmpty(formData["page"].ToString()))
                {

                    page = int.Parse(formData["page"].ToString());
                }
                int? pageSize = 5;
                int total = 0;
                Product_List = proBus.PhanTrangDSProduct(page, pageSize, out total);
                return Product_List != null ? Ok(new { TotalItem = total, Data = Product_List, Page = page, PageSize = pageSize }) : NotFound();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }
}
