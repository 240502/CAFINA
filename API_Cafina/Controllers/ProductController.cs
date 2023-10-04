using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Businesss;
using Model;
using Microsoft.AspNetCore.Authentication;
using System.Globalization;
using System;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.IO;
using Microsoft.AspNetCore.Authorization;

namespace API_Cafina.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IWebHostEnvironment _env;
       public ProductController(IWebHostEnvironment env) 
       {
            _env = env;
       }
        ProductBUS proBus = new ProductBUS();
        List<ProductModel> Product_List;
        string _path;
        [Route("GetById")]
        [HttpGet]
        public IActionResult GetProductById(string productId)
        {
            var result = proBus.GetProductById(productId);
            return result == null? NotFound():Ok(result);
        }
        [Route("Search_Product")]
        [HttpGet]
        public IActionResult SearchProduct(string value)
        {
            Product_List = proBus.SearchProduct(value);
            return Product_List == null ? NotFound(): Ok(Product_List);
        }
        [Route("Insert_Product")]
        [HttpPost]
        public IActionResult CreateProduct([FromBody]ProductModel product)
        {
            var result = proBus.CreateProduct(product);
            return result == 1 ? Ok("Thêm thành công"):BadRequest("Thêm không thành công");
        }
        [Route("Update_Product")]
        [HttpPut]
        public IActionResult UpdateProduct([FromBody] ProductModel product)
        {
            var result = proBus.UpdateProduct(product);
            return result == 1 ? Ok("Sửa thành công") : BadRequest("Sửa không thành công");

        }
        [Route("Delete_Product")]
        [HttpDelete]
        public IActionResult DeleteProduct(string productId)
        {
            var result = proBus.DeleteProduct(productId);
            return result == 1 ? Ok("Xóa thành công") : BadRequest("Xóa không thành công");

        }
        [Route("Search_2")]
        [HttpPost]
        public IActionResult Search2([FromBody] Dictionary<string,object> formData)
        {
            try
            {
                
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string proName = "";
                if (formData.Keys.Contains("ProductName") && !string.IsNullOrEmpty(Convert.ToString(formData["ProductName"]))) { 
                    proName = Convert.ToString(formData["ProductName"]); 
                }
                string CateName = "";
                if (formData.Keys.Contains("CateName") && !string.IsNullOrEmpty(formData["CateName"].ToString())) 
                {
                    CateName = formData["CateName"].ToString(); 
                }
                long total = 0;
                Product_List = proBus.Search2(page, pageSize, out total, proName, CateName);
                if (Product_List.Count > 0)
                {
                    return Ok(
                    new
                   {
                       TotalItems = total,
                       Data = Product_List,
                       Page = page,
                       PageSize = pageSize
                   }
                   );
                }
                else return NotFound();
               
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [Route("ThongKe")]
        [HttpPost]
        public IActionResult ThongKeSanPhamBanChay([FromBody] Dictionary<string,object> formData)
        {
            try
            {
                DateTime? to_date = null ;
                DateTime? fr_date  = null;
                if (formData.Keys.Contains("to_date") && !string.IsNullOrEmpty(Convert.ToString(formData["fr_date"])))
                {
                     
                    fr_date = DateTime.Parse(formData["fr_date"].ToString());
                }
                

                if (formData.Keys.Contains("fr_date") && !string.IsNullOrEmpty(Convert.ToString(formData["to_date"])))
                 {
                    to_date = DateTime.Parse(formData["to_date"].ToString());
                }
                var result = proBus.ThongKeSanPhamBanChay(fr_date, to_date);
                return result != null ? Ok(result) : NotFound();

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [NonAction]
        public string CreatePathFile(string RelativePathFileName)
        {
            try
            {
                IConfigurationBuilder builder = new ConfigurationBuilder();
                builder.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                builder.SetBasePath(Directory.GetCurrentDirectory());
                IConfigurationRoot configuration = builder.Build();
                IConfigurationSection configurationSection = configuration.GetSection("AppSettings").GetSection("PATH");
                _path = configurationSection.Value;
                string serverRootPathFolder = _path;
                string fullPathFile = $@"{serverRootPathFolder}\{RelativePathFileName}";
                string fullPathFolder = Path.GetDirectoryName(fullPathFile);
                if(!Directory.Exists(fullPathFolder))
                    Directory.CreateDirectory(fullPathFolder);
                return fullPathFile;

            }catch(Exception ex)
            {
                return ex.Message;
            }
        }
        [Route("dowload")]
        [HttpPost]
        public IActionResult DownloadData([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var webRoot = _env.WebRootPath;
                string exportPath = Path.Combine(webRoot, @"\export\DM.xlsx");
                FileStream stream = new FileStream(exportPath,FileMode.Open,FileAccess.Read);
                return File(stream, "application/octet-stream");
            }catch(Exception ex)
            {
                throw ex;
            }
        }
        [HttpPost("UploadFiles")]
        public async Task<IActionResult> Post(List<IFormFile> files)
        {
            long size = files.Sum(f => f.Length);

            // full path to file in temp location
            var filePath = Path.GetTempFileName();

            foreach (var formFile in files)
            {
                if (formFile.Length > 0)
                {
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }
                }
            }
            return Ok(new { count = files.Count, size, filePath });
        }
        [Route("Upload")]
        [HttpPost , DisableRequestSizeLimit]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            try
            {
               
                if (file.Length > 0)
                {
                    string filePath = $"upload/{file.FileName}";
                    var fullPath = CreatePathFile(filePath);
                    using(var fileStream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                    return Ok(new { fullPath });
                }
                else { return BadRequest(); }
            }catch(Exception ex) 
            {
                return StatusCode(500, "Không tìm thấy");
            }
        }

       
    }
}
