using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Businesss;
using Model;

namespace API_Cafina.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
       
        ProductBUS proBus = new ProductBUS();
        List<ProductModel> Product_List;
        [Route("Get_All_Product")]
        [HttpGet]
        public IActionResult GetAllProduct()
        {
            Product_List = proBus.GetListProduct();
            if (Product_List.Count ==0)
                return NotFound();
            return Ok(Product_List);
        }
        [Route("Search_Product")]
        [HttpGet]
        public IActionResult SearchProduct(string value)
        {
            Product_List = proBus.SearchProduct(value);
            if(Product_List ==  null)
                return NotFound();
             return Ok(Product_List);
        }
        [Route("Insert_Product")]
        [HttpPost]
        public IActionResult CreateProduct([FromBody]ProductModel product)
        {
            var result = proBus.CreateProduct(product);
            return Ok(result);
        }
        [Route("Update_Product")]
        [HttpPut]
        public IActionResult UpdateProduct([FromBody] ProductModel product)
        {
            var result = proBus.UpdateProduct(product);
            return Ok(result);
        }
        [Route("Delete_Product")]
        [HttpDelete]
        public IActionResult DeleteProduct(string productId)
        {
            var result = proBus.DeleteProduct(productId);
            return Ok(result);
        }
        [Route("Search_2")]
        [HttpPost]
        public IActionResult Search2([FromBody] Dictionary<string,object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string proName = "";
                var key = formData["ProductName"].ToString();
                if (formData.Keys.Contains("ProductName") && !string.IsNullOrEmpty(Convert.ToString(formData["ProductName"]))) { 
                    proName = Convert.ToString(formData["ProductName"]); 
                }
                int CateId = 0;
                if (formData.Keys.Contains("CateId") && CateId != null) 
                { 
                    CateId = int.Parse(formData["CateId"].ToString()); 
                }
                long total = 0;
                Product_List = proBus.Search2(page, pageSize, out total, proName, CateId);
                if (Product_List.Count > 0)
                {
                    return Ok(
                    new
                   {
                       TotalItems = total,
                       Data = Product_List,
                       Page = page,
                       PageSize = pageSize
                   }
                   );
                }
                else return NotFound();
               
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
