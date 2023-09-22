using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Businesss;
using Model;
using System.Globalization;
using System;

namespace API_Cafina.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
       
        ProductBUS proBus = new ProductBUS();
        List<ProductModel> Product_List;
        [Route("Get_All")]
        [HttpGet]
        public IActionResult Get()
        {
            Product_List = proBus.GetAll();
            return Ok(Product_List);
        }
        [Route("PhanTrang_DSProduct")]
        [HttpGet]
        public IActionResult PhanTrang(int page)
        {
            int pageSize = 36;
            Product_List=   proBus.PhanTrangDSProduct(page, pageSize);
            return Product_List !=null ? Ok(Product_List):NotFound();
        }
        [Route("GetById")]
        [HttpGet]
        public IActionResult GetAllProduct(string productId)
        {
            var result = proBus.GetProductById(productId);
            return result == null? NotFound():Ok(result);
        }
        [Route("Search_Product")]
        [HttpGet]
        public IActionResult SearchProduct(string value)
        {
            Product_List = proBus.SearchProduct(value);
            return Product_List == null ? NotFound(): Ok(Product_List);
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
        [Route("ThongKe")]
        [HttpPost]
        public IActionResult ThongKeSanPhamBanChay([FromBody] Dictionary<string,object> formData)
        {
            try
            {
                DateTime? to_date = null ;
                DateTime? fr_date  = null;
                if (formData.Keys.Contains("to_date") && !string.IsNullOrEmpty(Convert.ToString(formData["fr_date"])))
                {
                     
                    fr_date = DateTime.Parse(formData["fr_date"].ToString());
                }
                

                if (formData.Keys.Contains("fr_date") && !string.IsNullOrEmpty(Convert.ToString(formData["to_date"])))
                 {
                    to_date = DateTime.Parse(formData["to_date"].ToString());
                }
                var result = proBus.ThongKeSanPhamBanChay(fr_date, to_date);
                return result != null ? Ok(result) : NotFound();

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
