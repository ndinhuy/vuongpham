using Gimji.DTO.Request.Category;
using Gimji.Models;
using Gimji.Repository.Implementations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Gimji.Controllers
{
    [Route("api/category")]
    [ApiController]
   
    public class CategoryController : ControllerBase
    {
        private CategoryRepository categoryRepository;
        public CategoryController(CategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }
        // GET: api/<CategoryController>
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult>  GetCategoryAll()
        {
            return Ok(await categoryRepository.GetAllCategory());
        }

        // GET api/<CategoryController>/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(string id)
        {
            return Ok(await categoryRepository.GetCategoryById(id));

        }


        // GET api/<CategoryController>/5
        [AllowAnonymous]
        [HttpGet("{name}")]
        public async Task<IActionResult> GetCategoryByName(string name)
        {
            return Ok(await categoryRepository.GetCategoryByName(name));

        }
        // POST api/<CategoryController>
        [Authorize(Roles = "ADMIN")]
        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] addCategoryCode categoryCode)
        {
            await categoryRepository.AddCateogory(categoryCode);
            return Ok();
        }

        // PUT api/<CategoryController>/5
        [Authorize(Roles = "ADMIN")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(string id, [FromBody] updateCategoryCode updateCategoryCode)
        {
            await categoryRepository.UpdateCategory(id,updateCategoryCode);
            return Ok();
        }

        // DELETE api/<CategoryController>/5
        [Authorize(Roles = "ADMIN")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(string id)
        {
            await categoryRepository.DeleteCategory(id);
            return Ok();
        }
    }
}
