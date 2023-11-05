using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Businesss;
using System.Security.Cryptography;

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
        [Route("GetCate_ByObId")]
        [HttpGet]
        public IActionResult GetCateByObId(int obId)
        {
            try
            {
                List<CategoryModel> list = cate.GetCateByObId(obId);
                return list == null ? NotFound() : Ok(list);
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [Route("GetCateById")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            try
            {
                CategoryModel cateModel = cate.Get(id);
                return cateModel == null ? NotFound() : Ok(cateModel);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
