using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Businesss;
using Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder.Extensions;
using System.Text;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Authorization;
namespace API_Cafina.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        UserBUS userBUS = new UserBUS();
        UserLoginBUS userLogin = new UserLoginBUS();


        List<UserModel> userList = new List<UserModel>();

        [Route("Create_User")]
        [HttpPost]
        public IActionResult Create_User([FromBody] UserModel us)
        {
            var result = userBUS.Create_User(us);
            
            return result!=-1 ? Ok("Thêm user thành công"):BadRequest("User đã tồn tại");
        }

        [Route("Delete_User")]
        [HttpDelete]
        public IActionResult Delete_User(int usId)
        {
            var result = userBUS.Delete_User(usId);
            return result ==1 ?Ok("Xóa thành công"):BadRequest("Xóa thông tin không thành công");
        }


        [Route("Update_User")]
        [HttpPut]
        public IActionResult Update_User([FromBody] UserModel us)
        {
            var result = userBUS.Update_User(us);
            return result == 1 ? Ok("Sủa thành công") : BadRequest("Sửa thông tin không thành công");
        }
        [Route("Thong_Ke_So_Tien_Da_Tieu_Cua_User")]
        [HttpPost]
         [Authorize]
        public IActionResult ThongKeSoTienUs([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                DateTime? fr_date = null;
                DateTime? to_date = null;
                if (formData.Keys.Contains("fr_date") && !string.IsNullOrEmpty(Convert.ToString(formData["fr_date"])))
                {
                    fr_date = DateTime.Parse(formData["fr_date"].ToString());

                }
                if (formData.Keys.Contains("to_date") && !string.IsNullOrEmpty(formData["to_date"].ToString()))
                {
                    to_date = DateTime.Parse((formData["to_date"]).ToString());
                }
                userList = userBUS.ThongKeSoTienUs(fr_date, to_date);
                if (userList != null) return Ok(userList);
                else return NotFound();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }
        [AllowAnonymous]
        [Route("Login")]
        [HttpPost]
        public IActionResult Login([FromBody] AuthenticateModel model)
        {
            var result = userLogin.Login(model.Email, model.Password);
            try
            {

                return result == null ? BadRequest(new { message = "Tên đăng nhập hoặc mật khẩu không đúng" }) : Ok(new { email = result.email, password = result.PassWord, phone_number = result.phone_number, role = result.RoleId, token = result.token });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
