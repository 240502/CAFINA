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
                int fr_month = 0;
                int to_month = 0;
                int year = 0;
                if(formData.Keys.Contains("fr_month") && !string.IsNullOrEmpty(formData["fr_month"].ToString()))
                {
                    fr_month = int.Parse(formData["fr_month"].ToString());

                }
                if (formData.Keys.Contains("to_month") && !string.IsNullOrEmpty(formData["to_month"].ToString()))
                {
                    to_month = int.Parse(formData["to_month"].ToString());

                }
                if (formData.Keys.Contains("year") && !string.IsNullOrEmpty(formData["year"].ToString()))
                {
                    year = int.Parse(formData["year"].ToString());

                }
                List<ThongKeDoanhThuModel> tk = tkBUS.ThongKeDoanhThu(fr_month, to_month, year);
                return tk != null ? Ok(tk) : NotFound();

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
