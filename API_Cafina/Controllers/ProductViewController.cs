using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Businesss;
namespace API_Cafina_Manage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductViewController : ControllerBase
    {

        ProductViewsBUS productViewBUS = new ProductViewsBUS();
        ProductViewTotalBUS productViewTotalBUS = new ProductViewTotalBUS();

        [Route("GetTotalProductView")]
        [HttpPost]
        public IActionResult GetTotalProductView([FromBody] Dictionary<string,object> formData)
        {
            try
            {
                int month = 0;
                int year = 0;

            
              
                if (formData.Keys.Contains("month") && !string.IsNullOrEmpty(formData["month"].ToString()))
                {
                    month = int.Parse(formData["month"].ToString());
                }
                if (formData.Keys.Contains("year") && !string.IsNullOrEmpty(formData["year"].ToString()))
                {
                    year = int.Parse(formData["year"].ToString());
                }


                ProductViewTotalModel productViewModel = productViewTotalBUS.GetTotalProductViewInMonth( month, year);
                return productViewModel != null ? Ok(productViewModel) : NotFound();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [Route("Get_ProductView_ByProductId")]
        [HttpPost]
        public IActionResult GetProductViewByProductId([FromBody] Dictionary<string,object>formData)
        {
            try
            {
                int date = 0;
                int month = 0;
                int year = 0;
                string productId = "";

                if(formData.Keys.Contains("productId") && !string.IsNullOrEmpty(formData["productId"].ToString()))
                {
                    productId = formData["productId"].ToString();
                }
                if(formData.Keys.Contains("date") && !string.IsNullOrEmpty(formData["date"].ToString()))
                {
                    date = int.Parse(formData["date"].ToString());  
                }
                if (formData.Keys.Contains("month") && !string.IsNullOrEmpty(formData["month"].ToString()))
                {
                    month = int.Parse(formData["month"].ToString());
                }
                if (formData.Keys.Contains("year") && !string.IsNullOrEmpty(formData["year"].ToString()))
                {
                    year = int.Parse(formData["year"].ToString());
                }


                ProductViewModel productViewModel = productViewBUS.GetProductViewByProductId(productId,date,month,year);
                return productViewModel !=null ? Ok(productViewModel) : NotFound();


            }catch(Exception ex) {
                throw new Exception(ex.Message);
            }

        }

        [Route("Create_ProductView")]

        [HttpPost]
        public IActionResult CreateProductView([FromBody] ProductViewModel productView)
        {
            try
            {
                int reuslt = productViewBUS.CreateProductView(productView);
                return reuslt >0 ? Ok("Thêm thành công"): BadRequest("Thêm không thành công");

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }



        [Route("Delete_ProductView")]

        [HttpDelete]
        public IActionResult DeleteProductView(int id)
        {
            try
            {
                int reuslt = productViewBUS.DeleteProductView(id);
                return reuslt > 0 ? Ok("Xóa thành công") : BadRequest("Xóa không thành công");

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("Update_ProductView")]

        [HttpPut]
        public IActionResult UpdateProductView([FromBody] ProductViewModel productView)
        {
            try
            {
                int reuslt = productViewBUS.UpdateProductView(productView);
                return reuslt > 0 ? Ok("Sửa thành công") : BadRequest("Sửa không thành công");

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
