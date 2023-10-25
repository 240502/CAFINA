using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Businesss;
namespace API_Cafina_Manage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        AccountLoginBUS accBUS = new AccountLoginBUS();
        [AllowAnonymous]
        [Route("Login")]
        [HttpPost]
        public IActionResult Login([FromBody] AuthenticateModel model)
        {
            var result = accBUS.Login(model.UserName, model.Password);
            try
            {

                return result == null ? BadRequest(new { message = "Tên đăng nhập hoặc mật khẩu không đúng" }) : Ok(new { UserName = result.UserName, PassWord = result.Password, Role_id = result.Role_id, User_id = result.User_id, token = result.token });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
