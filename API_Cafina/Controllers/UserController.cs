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
    [Authorize]
    public class UserController : ControllerBase
    {
        UserBUS userBUS = new UserBUS();
        UserThongKeBUS usTk = new UserThongKeBUS();
        UserLoginBUS userLogin = new UserLoginBUS();
        List<UserModel> userList = new List<UserModel>();


        [Route("TotalUser")]
        [HttpGet]
        public IActionResult GetTotalUser()
        {
            try
            {
                var result = userBUS.TotalUser();
                return result != 0 ? Ok(result) : NotFound();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("Get_List")]
        [HttpPost]
        public IActionResult GetList([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                int pageIndex = 0;
                int pageSize = 0;
                if (formData.Keys.Contains("pageIndex") && !string.IsNullOrEmpty(formData["pageIndex"].ToString()))
                    pageIndex = int.Parse(formData["pageIndex"].ToString());
                if (formData.Keys.Contains("pageSize") && !string.IsNullOrEmpty(formData["pageSize"].ToString()))
                    pageSize = int.Parse(formData["pageSize"].ToString());
                int total = 0;
                List<UserModel> list = userBUS.GetList(pageIndex, pageSize, out total);
                return list != null ? Ok(new { pageIndex = pageIndex, pageSize = pageSize, totalItems = total, data = list }) : NotFound();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [Route("Get_Us_By_id")]
        [HttpGet]
        public IActionResult Get(int id)
        {
            try
            {
                var result = userBUS.Get(id);
                return result == null ? NotFound() : Ok(result);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [Route("Search_Us")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                string value = "";
                int pageIndex = 0;
                int pageSize = 0;
                if (formData.Keys.Contains("pageIndex") && !string.IsNullOrEmpty(formData["pageIndex"].ToString()))
                    pageIndex = int.Parse(formData["pageIndex"].ToString());
                if (formData.Keys.Contains("pageSize") && !string.IsNullOrEmpty(formData["pageSize"].ToString()))
                    pageSize = int.Parse(formData["pageSize"].ToString());
                if (formData.Keys.Contains("value") && !string.IsNullOrEmpty(formData["value"].ToString()))
                    value = formData["value"].ToString();
                int total = 0;
                var result = userBUS.Search(value,pageIndex,pageSize,out total);
                return result == null ? NotFound() : Ok(new {pageIndex = pageIndex , pageSize = pageSize,totalItems = total,data = result});

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("Create_User")]
        [HttpPost]
        public IActionResult Create_User([FromBody] UserModel us)
        {
            var result = userBUS.Create_User(us);

            return result != -1 ? Ok("Thêm user thành công") : BadRequest("User đã tồn tại");
        }

        [Route("Delete_User")]
        [HttpDelete]
        public IActionResult Delete_User(int usId)
        {
            var result = userBUS.Delete_User(usId);
            return result >= 1 ? Ok("Xóa thành công") : BadRequest("Xóa thông tin không thành công");
        }


        [Route("Update_User")]
        [HttpPut]
        public IActionResult Update_User([FromBody] UserModel us)
        {
            var result = userBUS.Update_User(us);
            return result >= 1 ? Ok("Sủa thành công") : BadRequest("Sửa thông tin không thành công");
        }
        [Route("ThongKe_SoTienCuaUs")]
        [HttpPost]
        [Authorize]
        public IActionResult ThongKeSoTienUs([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                int fr_date = 0;
                int to_date = 0;
                int year = 0;
                if (formData.Keys.Contains("fr_date") && !string.IsNullOrEmpty(Convert.ToString(formData["fr_date"])))
                {
                    fr_date = int.Parse(formData["fr_date"].ToString());

                }
                if (formData.Keys.Contains("to_date") && !string.IsNullOrEmpty(formData["to_date"].ToString()))
                {
                    to_date = int.Parse((formData["to_date"]).ToString());
                }

                if (formData.Keys.Contains("year") && !string.IsNullOrEmpty(formData["year"].ToString()))
                {
                    year = int.Parse((formData["year"]).ToString());
                }
                List<UserThongKeModel> result = usTk.ThongKeTop5UserTieuNhieuTienNhat(fr_date, to_date, year);
                return result != null ? Ok(result) : NotFound();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);

            }
        }

    }
}
