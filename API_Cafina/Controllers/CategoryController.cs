using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Businesss;
namespace API_Cafina_Manage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        CategoryBUS cateBUS = new CategoryBUS();
        List<CategoryModel> listcate;

        [Route("Create_Cate")]
        [HttpPost]
        public IActionResult Create([FromBody] CategoryModel model)
        {
            try
            {
                var result = cateBUS.Create(model);
                return result ==1 ? Ok(result) : BadRequest(result);
               
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("Delete_Cate")]
        [HttpDelete]
        public IActionResult Delete(int cateId)
        {
            try
            {
                var result = cateBUS.Delete(cateId);
                return result == 1 ? Ok(result) : BadRequest(result);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("Update_Cate")]
        [HttpPut]
        public IActionResult Update([FromBody] CategoryModel model)
        {
            try
            {
                var result = cateBUS.Update(model);
                return result == 1 ? Ok(result) : BadRequest(result);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
