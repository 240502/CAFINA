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
        List<ProductModel> Product_List ;
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
        [Route("Search")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string,object> formData)
        {
            try
            {
                int page = 0; 
                if(formData.Keys.Contains("page") && int.TryParse(formData["page"].ToString(), out int num1))
                    page = num1;
                int pageSize = 0;
                if(formData.Keys.Contains("pageSize") && int.TryParse(formData["pageSize"].ToString(),out int num2))
                    pageSize = num2;
                string productName = string.Empty;
                if(formData.Keys.Contains("ProductName") && !string.IsNullOrEmpty(formData["ProductName"].ToString()))
                    productName = formData["ProductName"].ToString();
                string CateName="";
                if (formData.Keys.Contains("CateName") && !string.IsNullOrEmpty(formData["CateName"].ToString()))
                    CateName = formData["CateName"].ToString();
                long total = 0;
                Product_List =  proBus.Search2(page,pageSize,out total,productName,CateName);
                return Product_List != null ? Ok(new { Page = page, pageSize = pageSize, TotalItems = total, Data = Product_List }) : NotFound();

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
