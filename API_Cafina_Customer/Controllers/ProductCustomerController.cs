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
        [Route("GetProductByBst")]
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
        [Route("GetProductByCateName")]
        [HttpGet]
        public IActionResult GetProductByCateName(string cateName)
        {
            try
            {
                List<ProductModel> product = proBus.GetProductByCateName(cateName);
                return product != null ? Ok(product) : NotFound();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("GetProductByObjectId_CateDtId")]
        [HttpGet]
        public IActionResult GetProductByObjectId_CateDtId(int objectId , int catedtid,string productId)
        {
            try
            {
                List<ProductModel> product = proBus.GetProductByObjectId_CateDtId(objectId,catedtid,productId);
                return product !=null ? Ok(product) : NotFound();

            }catch(Exception ex)
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
                int pageIndex = 0;
                int pageSize = 0;

                string value = "";
                if (formData.Keys.Contains("value") && !string.IsNullOrEmpty(Convert.ToString(formData["value"])))
                {
                    value = Convert.ToString(formData["value"]);
                }
                if (formData.Keys.Contains("pageIndex") && !string.IsNullOrEmpty(Convert.ToString(formData["pageIndex"])))
                {
                    pageIndex = int.Parse(formData["pageIndex"].ToString());
                }
                if (formData.Keys.Contains("pageSize") && !string.IsNullOrEmpty(Convert.ToString(formData["pageSize"])))
                {
                    pageSize = int.Parse(formData["pageSize"].ToString());
                }
                long total = 0;
                Product_List =  proBus.Search(pageIndex,pageSize,out total,value);
                return Product_List != null ? Ok(new { Page = pageIndex, pageSize = pageSize, TotalItems = total, Data = Product_List }) : NotFound();

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("Recommend")]
        [HttpPost]
        public IActionResult GetRecommend([FromBody] Dictionary<string,object>formData)
        {
            try
            {
                int pageIndex = 0;
                string gender = "";
                if (formData.Keys.Contains("pageIndex") && !string.IsNullOrEmpty(formData["pageIndex"].ToString()))
                    pageIndex = int.Parse(formData["pageIndex"].ToString());
                if (formData.Keys.Contains("gender") && !string.IsNullOrEmpty(formData["gender"].ToString()))
                    gender = (formData["gender"].ToString());
                int pageSize = 0;
                if (formData.Keys.Contains("pageSize") && !string.IsNullOrEmpty(formData["pageSize"].ToString()))
                    pageSize = int.Parse(formData["pageSize"].ToString());
                int total = 0;
                List<ProductModel> list = proBus.GetRecommend(pageIndex,pageSize,out total, gender);
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
        [Route("GetProductByObjectName_BstName")]
        [HttpPost]
        public IActionResult GetByObName_BstName([FromBody] Dictionary<string,object> formData)
        {
            try
            {
                int pageIndex = 0;
                if (formData.Keys.Contains("pageIndex") && !string.IsNullOrEmpty(formData["pageIndex"].ToString()))
                    pageIndex = int.Parse(formData["pageIndex"].ToString());
                int pageSize = 0;
                if (formData.Keys.Contains("pageSize") && !string.IsNullOrEmpty(formData["pageSize"].ToString()))
                    pageSize = int.Parse(formData["pageSize"].ToString());
                string BstName = "";
                if (formData.Keys.Contains("bstName") && !string.IsNullOrEmpty(formData["bstName"].ToString()))
                    BstName = formData["bstName"].ToString();
                string objectName = "";
                if (formData.Keys.Contains("objectName") && !string.IsNullOrEmpty(formData["objectName"].ToString()))
                    objectName = formData["objectName"].ToString();
                int total = 0;
                List<ProductModel> list = proBus.GetByObName_BstName(pageIndex, pageSize, out total, BstName, objectName);
                return list != null ? Ok(new { pageIndex = pageIndex, pageSize = pageSize, totalItems = total, data = list }) : NotFound();
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        [Route("GetProductByCateDetailName")]
        [HttpGet]
        public IActionResult GetProductByCateDetailName(string cateDetailName)
        {
            try
            {
                List<ProductModel> list = proBus.GetProductByCateDetailName(cateDetailName);
                return list != null ? Ok(list) : NotFound();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
