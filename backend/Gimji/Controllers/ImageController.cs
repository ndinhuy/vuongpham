using Gimji.DTO;
using Gimji.DTO.Respone.Image;
using Gimji.Models;
using Gimji.Repository.Implementations;
using Gimji.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Runtime.CompilerServices;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Gimji.Controllers
{
    [Route("api/images")]
    [ApiController]
    [AllowAnonymous]
    public class ImageController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private IProductService productService;
        public ImageController(IWebHostEnvironment env , IProductService productService) 
        { 
            this.environment = env;
            this.productService = productService;
        }
        // GET api/<PictureController>/5
        [HttpGet("{fileName}")]
        public async Task<IActionResult> getImage(string fileName)
        {
            try
            {
                var imageDirectory = Path.Combine(this.environment.ContentRootPath, "images");
                var filePath = Path.Combine(imageDirectory, fileName);
                if (System.IO.File.Exists(filePath))
                {
                    var fileStream = System.IO.File.OpenRead(filePath);
                    var contentType = GetContentType(fileName); // Lấy loại nội dung dựa trên phần mở rộng của tệp tin
                    return File(fileStream, contentType); // Adjust content type based on your image type
                }
                return NotFound("Image not found");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        // POST api/<ProductController>
        //[Authorize(Policy = "authenticated")]
        // POST api/images
        [HttpPost]
        public async Task<IActionResult> UploadImage([FromForm] Image image)
        {
            if (!ModelState.IsValid || image.ImageFile == null)
            {
                return BadRequest(new ResDTO<ImageResponeDTO>
                {
                    Code = 400,
                    Message = "File ảnh không hợp lệ",
                    Data = null
                });
            }

            var result = await productService.SaveImages(image.ImageFile);
            return StatusCode(result.Code, result.Data);
        }

        private string GetContentType(string fileName)
        {
            var fileExtension = Path.GetExtension(fileName).ToLowerInvariant();
            switch (fileExtension)
            {
                case ".jpg":
                case ".jpeg":
                    return "image/jpeg";
                case ".png":
                    return "image/png";
                default:
                    return "application/octet-stream"; // Loại nội dung mặc định nếu không xác định được
            }
        }
    }
}
