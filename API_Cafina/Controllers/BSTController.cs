using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using Businesss;
namespace API_Cafina_Manage.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BSTController : ControllerBase
    {
        BST_BUS bst_BUS = new BST_BUS();
        [Route("GetById")]
        [HttpGet]
        public IActionResult GetById(int id)
        {
            try
            {
                BSTModel bst = bst_BUS.GetById(id);
                return bst !=null ? Ok(bst) : NotFound();

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("GetByName")]
        [HttpGet]
        public IActionResult GetByName(string TenBST)
        {
            try
            {
                BSTModel bst = bst_BUS.GetByName(TenBST);
                return bst != null ? Ok(bst) : NotFound();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [Route("GetListBST")]
        [HttpGet]
        public IActionResult GetList()
        {
            try
            {
                List<BSTModel> bst = bst_BUS.GetList();
                return bst != null ? Ok(bst) : NotFound();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [Route("Create_BST")]
        [HttpPost]
        public IActionResult Create(string TenBST)
        {
            try
            {
                int result = bst_BUS.Create(TenBST);
                return result >= 1 ?  Ok("Thêm thành công") : BadRequest("Thêm không thành công");

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [Route("Delete_BST")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                int result = bst_BUS.Delete(id);
                return result >= 1 ? Ok("Xóa thành công") : BadRequest("Xóa không thành công");

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        [Route("Update_BST")]
        [HttpPut]
        public IActionResult Update(BSTModel bst)
        {
            try
            {
                int result = bst_BUS.Update(bst);
                return result >= 1 ? Ok("Sửa thành công") : BadRequest("Sửa không thành công");

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
