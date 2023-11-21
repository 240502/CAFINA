using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Businesss;
using Microsoft.AspNetCore.Authorization;

namespace API_Cafina_Manage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ThongKeDoanhThuController : ControllerBase
    {
        ThongKeDoanhThuBUS tkBUS = new ThongKeDoanhThuBUS();
        [Route("Thong_Ke_Doanh_Thu")]
        [HttpPost]
        public IActionResult ThongKeDoanhThu([FromBody] Dictionary<string,object>formData)
        {
            try
            {
                DateTime? fr_date = null;
                DateTime? to_date = null;
                if(formData.Keys.Contains("fr_date") && !string.IsNullOrEmpty(formData["fr_date"].ToString()))
                {
                    fr_date = DateTime.Parse(formData["fr_date"].ToString());

                }
                if (formData.Keys.Contains("to_date") && !string.IsNullOrEmpty(formData["to_date"].ToString()))
                {
                    to_date = DateTime.Parse(formData["to_date"].ToString());

                }
              
                List<ThongKeDoanhThuModel> tk = tkBUS.ThongKeDoanhThu(fr_date, to_date);
                return tk != null ? Ok(tk) : NotFound();

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [Route("Thong_Ke_Doanh_Thu_TheoNgay")]
        [HttpPost]
        public IActionResult ThongKeDoanhThuTheoNgay([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                DateTime? fr_date = null;
                DateTime? to_date = null;
                if (formData.Keys.Contains("fr_date") && !string.IsNullOrEmpty(formData["fr_date"].ToString()))
                {
                    fr_date = DateTime.Parse(formData["fr_date"].ToString());

                }
                if (formData.Keys.Contains("to_date") && !string.IsNullOrEmpty(formData["to_date"].ToString()))
                {
                    to_date = DateTime.Parse(formData["to_date"].ToString());

                }

                List<ThongKeDoanhThuModel> tk = tkBUS.ThongKeDoanhThuTheoNgay(fr_date, to_date);
                return tk != null ? Ok(tk) : NotFound();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
