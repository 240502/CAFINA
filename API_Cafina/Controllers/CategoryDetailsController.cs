using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Businesss;
namespace API_Cafina_Manage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryDetailsController : ControllerBase
    {
        CategoryDetailsBUS cateBUS = new CategoryDetailsBUS();

        [Route("GetList_CategoryDetails")]
        [HttpGet] 
        public IActionResult GetList()
        {
            try
            {
                List<CategoryDetailsModel> list = cateBUS.GetList();
                return list != null ? Ok(list) : NotFound();

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [Route("Create_CategoryDetails")]
        [HttpPost]
        public IActionResult Create(CategoryDetailsModel cate)
        {
            try
            {
                int result = cateBUS.Create(cate);
                return result >=1 ? Ok("Thêm thành công") : BadRequest("Thêm không thành công");
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [Route("Delete_CategoryDetails")]
        [HttpDelete]
        public IActionResult Delete(int cateId)
        {
            try
            {
                int result = cateBUS.Delete(cateId);
                return result >= 1 ? Ok("Xóa thành công") : BadRequest("Xóa không thành công");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [Route("Update_CategoryDetails")]
        [HttpDelete]
        public IActionResult Update(CategoryDetailsModel cate)
        {
            try
            {
                int result = cateBUS.Update(cate);
                return result >= 1 ? Ok("Sửa thành công") : BadRequest("Sửa không thành công");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }



    }
}
