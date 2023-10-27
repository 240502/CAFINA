using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Businesss;
namespace API_Cafina_Customer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCustomerController : ControllerBase
    {
        ProductBUS proBus = new ProductBUS();
        List<ProductModel> Product_List ;
        //[Route("Get_By_BST")]
        //[HttpPost]
        //public IActionResult GetByBST([FromBody] Dictionary<string,object> formData)
        //{
        //    try
        //    {
        //        int pageSize = 0;
        //        int pageIndex = 0;
        //        string TenBST = "";
        //        if (formData.Keys.Contains("pageSize") && !string.IsNullOrEmpty(formData["pageSize"].ToString())) 
        //        {
        //            pageSize = int.Parse(formData["pageSize"].ToString());
        //        }
        //        if (formData.Keys.Contains("pageIndex") && !string.IsNullOrEmpty(formData["pageIndex"].ToString()))
        //        {
        //            pageIndex = int.Parse(formData["pageIndex"].ToString());
        //        }
        //        if (formData.Keys.Contains("TenBST") && !string.IsNullOrEmpty(formData["TenBST"].ToString()))
        //        {
        //            TenBST = formData["TenBST"].ToString();
        //        }
        //        int total = 0;
        //        Product_List= proBus.GetByBST(pageSize,pageIndex,out total, TenBST);
        //        return Product_List != null ? Ok(new { TotalItems = total, Data = Product_List, Page = pageIndex,PageSize =pageSize }) : NotFound();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //}
        [Route("GetByBst")]
        [HttpPost]
        public IActionResult GetByBST([FromBody] Dictionary<string,object> formData)
        {

            try
            {
                int pageIndex = 0;
                if (formData.Keys.Contains("pageIndex") && !string.IsNullOrEmpty(formData["pageIndex"].ToString()))
                {
                    pageIndex = Convert.ToInt32(formData["pageIndex"].ToString());
                }
                int pageSize = 0;
                if (formData.Keys.Contains("pageSize")  && !string.IsNullOrEmpty(formData["pageSize"].ToString()))
                {
                    pageSize = Convert.ToInt32(formData["pageSize"].ToString());

                }
                string tenBST = string.Empty;
                if (formData.Keys.Contains("TenBST") && !string.IsNullOrEmpty(formData["TenBST"].ToString()))
                    tenBST = formData["TenBST"].ToString();
                int total = 0;
                Product_List = proBus.GetByBST(pageSize,pageIndex,  out total, "Thu đông 2023");
                return Product_List != null ? Ok(new {Data = Product_List,Page= pageIndex ,pageSize = pageSize,totalItems = total}) : NotFound();

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
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
                int? pageSize = null;
                if (formData.Keys.Contains("pageSize") && !string.IsNullOrEmpty(formData["pageSize"].ToString()))
                {
                    pageSize = int.Parse(formData["pageSize"].ToString());
                }
                int total = 0;
                Product_List = proBus.GetPhanTrang(page, pageSize, out total);
                return Product_List != null ? Ok(new { TotalItems = total, Data = Product_List, Page = page, PageSize = pageSize }) : NotFound();
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
                Product_List =  proBus.Search(page,pageSize,out total,productName,CateName);
                return Product_List != null ? Ok(new { Page = page, pageSize = pageSize, TotalItems = total, Data = Product_List }) : NotFound();

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("Recommend")]
        [HttpGet]
        public IActionResult GetRecommend( int pageIndex)
        {
            try
            {
                int pageSize = 8;
                int total = 0;
                List<ProductModel> list = proBus.GetRecommend(pageIndex,pageSize,out total);
                return list!=null? Ok(new { Page = pageIndex, PageSize = pageSize, TotalItems = total,Data = list}) : NotFound();


            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [Route("Get_ByID")]
        [HttpGet]
        public IActionResult GetByID(string id)
        {
            try
            {
                ProductModel model = proBus.GetProductById(id);
                return model != null ? Ok(model) : NotFound();


            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
