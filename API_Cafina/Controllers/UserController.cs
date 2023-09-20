using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Businesss;
using Model;
namespace API_Cafina.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        List<UserModel> userList = new List<UserModel>();
        UserBUS userBUS = new UserBUS();

        [Route("Thong_Ke_So_Tien_Da_Tieu_Cua_User")]
        [HttpPost]
        public IActionResult ThongKeSoTienUs([FromBody] Dictionary<string,object> formData)
        {
            try
            {
                DateTime? fr_date = null;
                DateTime? to_date = null;
                if(formData.Keys.Contains("fr_date") && !string.IsNullOrEmpty(Convert.ToString(formData["fr_date"])))
                {
                    fr_date = DateTime.Parse(formData["fr_date"].ToString());

                }   
                if(formData.Keys.Contains("to_date") && !string.IsNullOrEmpty(formData["to_date"].ToString()))
                {
                   to_date = DateTime.Parse((formData["to_date"]).ToString());
                }
                userList = userBUS.ThongKeSoTienUs(fr_date, to_date);
                if (userList != null) return Ok(userList);
                else return NotFound();

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
                
            }
        }
    }
}
