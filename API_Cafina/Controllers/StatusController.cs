using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Businesss;
namespace API_Cafina_Manage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        StatusBUS statusBUS = new StatusBUS();
        [Route("GetListStatus")]
        [HttpGet]
        public IActionResult GetListStatus()
        {
            try
            {
                List<StatusModel> list = statusBUS.GetListStatus();
                return list!=null ? Ok(list) : NotFound();
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("GetStatusById")]
        [HttpGet]
        public IActionResult GetStatusById(int id)
        {
            try
            {
                StatusModel status = statusBUS.GetStatusById(id);
                return status != null ? Ok(status) : NotFound();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
