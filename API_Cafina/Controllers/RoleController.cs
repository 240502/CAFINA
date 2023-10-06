using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Businesss;
using Model;

namespace API_Cafina_Manage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        RoleBUS roleBUS = new RoleBUS();

        [Route("Get_Role_By_Id")]
        [HttpGet]
        public IActionResult Get(int id)
        {
            try 
            {
                var result = roleBUS.Get_Role_By_Id(id);
                return result !=null ? Ok(result) : NotFound();
            }
            catch(Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("Search_Role")]
        [HttpGet]
        public IActionResult Search(string RoName)
        {
            try
            {
                var result = roleBUS.Search(RoName);
                return result !=null ? Ok(result) : NotFound(); 

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [Route("Create_Role")]
        [HttpPost]
        public IActionResult Create(string RoName)
        {
            try
            {   
                var result = roleBUS.Create(RoName);
                return result == 1 ? Ok("Thêm thành công") : BadRequest("Thêm không thành công");

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("Delete_Role")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                var result = roleBUS.Delete(id);
                return result == 1 ? Ok("Thêm thành công") : BadRequest("Thêm không thành công");

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("Update_Role")]
        [HttpPut]
        public IActionResult Update([FromBody] RoleModel role)
        {
            try
            {
                var result = roleBUS.Update(role);
                return result == 1 ? Ok("Thêm thành công") : BadRequest("Thêm không thành công");

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
