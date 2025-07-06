using Gimji.DTO;
using Gimji.DTO.Request.Category;
using Gimji.Models;
using Gimji.Repository.Implementations;
using Gimji.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Gimji.Controllers
{
    [Route("api/category")]
    [ApiController]
   
    public class CategoryController : ControllerBase
    {
        private ICategoryService categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }
        // GET: api/<CategoryController>
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetCategoryAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            var result = await categoryService.GetAllCategory(pageNumber, pageSize);
            return StatusCode(result.Code, result);
        }


        // GET api/<CategoryController>/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(string id)
        {
            var result = await categoryService.GetCategoryById(id);
            return StatusCode(result.Code, result);
        }


        // GET api/<CategoryController>/5

        [AllowAnonymous]
        [HttpGet("search")]
        public async Task<IActionResult> SearchCategoryByName([FromQuery] string name)
        {
            var result = await categoryService.GetCategoryByName(name);
            return StatusCode(result.Code, result);
        }

        // POST api/<CategoryController>
        [Authorize(Roles = "ADMIN")]
        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] addCategoryCode categoryCode)
        {
            var result = await categoryService.AddCategory(categoryCode);
            return StatusCode(result.Code, result);
        }

        // PUT api/<CategoryController>/5
        [Authorize(Roles = "ADMIN")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(string id, [FromBody] updateCategoryCode updateCategoryCode)
        {
            var result = await categoryService.UpdateCategory(id, updateCategoryCode);
            return StatusCode(result.Code, result);
        }

        // DELETE api/<CategoryController>/5
        [Authorize(Roles = "ADMIN")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<ResDTO<string>>> DeleteCategory(string id)
        {
            ResDTO<string> result =  await categoryService.DeleteCategory(id);

            return StatusCode(result.Code, result);
        }
    }
}
