using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Businesss;
using System.Diagnostics.Contracts;

namespace API_Cafina_Manage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ObjectController : ControllerBase
    {
        ObjectBUS obBUS = new ObjectBUS();

        [Route("Get_List_Ob")]
        [HttpGet]
        public IActionResult GetList ()
        {
            try
            {
                List<ObjectModel> ob = obBUS.GetList();
                return ob != null ? Ok(ob) : NotFound();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("Get_Ob_ByName")]
        [HttpGet]
        public IActionResult Get(string obName)
        {
            try
            {
                List<ObjectModel> ob = obBUS.Get(obName);
                return ob != null ? Ok(ob) : NotFound();

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [Route("Create_Ob")]
        [HttpPost]
        public IActionResult Create(string obName)
        {
            try
            {
                return obBUS.Create(obName) >=1 ? Ok("Thành công"):BadRequest("Thêm thất bại");
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [Route("Delete_Ob")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                return obBUS.Delete(id) >= 1 ? Ok("Xóa thành công") : BadRequest("Xóa thất bại");

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }
        [Route("Update_Ob")]
        [HttpPut]
        public IActionResult Update(ObjectModel ob)
        {
            try
            {
                return obBUS.Update(ob) >= 1 ? Ok("Sửa thành công") : BadRequest("Sửa thất bại");
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
