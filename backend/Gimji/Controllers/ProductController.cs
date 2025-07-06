using Gimji.DTO.Request.Product;
using Gimji.DTO.Respone.Product;
using Gimji.Models;
using Gimji.Repository.Implementations;
using Gimji.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Gimji.Controllers
{
    [Route("api/product")]
    [ApiController]
    [AllowAnonymous]
    public class ProductController : ControllerBase
    {
        private readonly IProductService productService;

        public ProductController(IProductService productService)
        {
            this.productService = productService;
        }

        // GET: api/product?search=...&from=...&page=...
        [HttpGet]
        public async Task<IActionResult> GetProductAll(
            [FromQuery] string? search,
            [FromQuery] decimal? from,
            [FromQuery] decimal? to,
            [FromQuery] string? sortBy,
            [FromQuery] int? limit,
            [FromQuery] int? page = 1)
        {
            var result = await productService.GetAllProduct(search, from, to, sortBy, limit, page);
            return StatusCode(result.Code, result);
        }

        // GET: api/product/category/micay?search=...&page=...
        [HttpGet("category/{categoryCode}")]
        public async Task<IActionResult> GetProductByCategory(
            string categoryCode,
            [FromQuery] string? search,
            [FromQuery] decimal? from,
            [FromQuery] decimal? to,
            [FromQuery] string? sortBy,
            [FromQuery] int? limit,
            [FromQuery] int? page = 1)
        {
            var result = await productService.GetProductByCategory(categoryCode, search, from, to, sortBy, limit, page);
            return StatusCode(result.Code, result);
        }

        // GET: api/product/abc123
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(string id)
        {
            var result = await productService.GetProductById(id);
            return StatusCode(result.Code, result);
        }

        // POST: api/product
        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> CreateProduct([FromBody] addProduct addProduct)
        {
            var result = await productService.AddProduct(addProduct);
            return StatusCode(result.Code, result);
        }

        // PUT: api/product/abc123
        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> UpdateProduct(string id, [FromBody] ProductDTO productDTO)
        {
            var result = await productService.UpdateProduct(id, productDTO);
            return StatusCode(result.Code, result);
        }

        // DELETE: api/product/abc123
        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            var result = await productService.DeleteProduct(id);
            return StatusCode(result.Code, result);
        }

        [HttpGet("slug/{slug}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetProductBySlug(string slug)
        {
            var result = await productService.GetProductBySlug(slug);
            return StatusCode(result.Code, result);
        }

    }
}
