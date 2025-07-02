using Gimji.DTO;
using Gimji.DTO.Request;
using Gimji.Models;
using Gimji.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Gimji.Controllers
{
    [Route("api/role")]
    [ApiController]
    [Authorize(Roles = "ADMIN, USER")]
    //[Authorize(Policy ="admin")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository roleRepository;
        public RoleController(IRoleRepository roleRepository)
        {
            this.roleRepository = roleRepository;
        }

        // ✅ Lấy danh sách Role với phân trang và tìm kiếm
        [HttpGet]
        [Authorize(Roles = "ADMIN, USER")]
        public async Task<ActionResult<ResDTO<IEnumerable<Role>>>> GetRoles(
            [FromQuery] int page = 1,
            [FromQuery] int limit = 10,
            [FromQuery] string? keyword = null)
        {
            var result = await roleRepository.GetRoles(page, limit, keyword);
            return StatusCode(result.Code, result);
        }

        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        [Authorize(Roles = "ADMIN, USER")]
        public async Task<ActionResult<ResDTO<Role>>> GetRoleById(string id)
        {
            var result = await roleRepository.GetRoleById(id);
            return StatusCode(result.Code, result);
        }

        // POST api/<RoleController>
        [HttpPost]

        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult<ResDTO<Role>>> CreateRole([FromBody] CreateRoleDTO roleDto)
        {
            var result = await roleRepository.CreateRole(roleDto.Name);
            return StatusCode(result.Code, result);
        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult<ResDTO<Role>>> UpdateRole(string id, [FromBody] UpdateRoleDTO roleDto)
        {
            var result = await roleRepository.UpdateRole(id, roleDto.Name);
            return StatusCode(result.Code, result);
        }

        // DELETE api/<RoleController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult<ResDTO<Role>>> DeleteRole(string id)
        {
            var result = await roleRepository.DeleteRole(id);
            return StatusCode(result.Code, result);
        }
    }
}
