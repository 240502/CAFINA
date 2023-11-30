using Businesss;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace API_Cafina_Manage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GaleryController : ControllerBase
    {
        GaleryBUS galeryBUS = new GaleryBUS();
        [Route("Create_Galery")]
        [HttpPost]
        public IActionResult Create([FromBody] GaleryModel galery)
        {
            try
            {
                int reuslt = galeryBUS.Create(galery);
                return reuslt >= 1 ? Ok("Thêm thành công") : BadRequest("Thêm không thành công");

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }



        [Route("Delete_Galery")]
        [HttpDelete]
        public IActionResult Delete(string productid)
        {
            try
            {
                int reuslt = galeryBUS.Delete(productid);
                return reuslt >= 1 ? Ok("Xóa thành công") : BadRequest("Xóa không thành công");

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [Route("Update_Galery")]
        [HttpPost]
        public IActionResult Update([FromBody] GaleryModel galery)
        {
            try
            {
                int reuslt = galeryBUS.Update(galery);
                return reuslt >= 1 ? Ok("Sửa thành công") : BadRequest("Sửa không thành công");

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
