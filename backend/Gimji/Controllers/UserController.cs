using Gimji.DTO.Request;
using Gimji.DTO;
using Gimji.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Gimji.Repository.Interface;
using Gimji.DTO.Request.User;
using Microsoft.IdentityModel.Tokens;

namespace Gimji.Controllers
{
    [Route("api/users")]
    [ApiController]

    public class UserController : Controller
    {
        private readonly IUserRepository _userService;
        public UserController(IUserRepository userService)
        {
            _userService = userService;
        }
        // 📌 Lấy danh sách user (có tìm kiếm & phân trang)
        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult<ResDTO<IEnumerable<User>>>> GetUsers(int page = 1, int limit = 10, string? keyword = null)
        {
            var result = await _userService.GetUsers(page, limit, keyword);
            return StatusCode(result.Code, result);
        }

        // 📌 Lấy thông tin chi tiết user theo ID
        [HttpGet("{id}")]
        [Authorize(Roles = "ADMIN , USER")]
        public async Task<ActionResult<ResDTO<User>>> GetUser(string id)
        {
            var result = await _userService.GetUser(id);
            return StatusCode(result.Code, result);
        }

        // 📌 Thêm user mới
        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult<ResDTO<string>>> AddUser([FromBody] CreateUserDTO userDto)
        {
            var result = await _userService.AddUser(userDto);
            return StatusCode(result.Code, result);
        }

        // 📌 Cập nhật thông tin user
        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult<ResDTO<string>>> UpdateUser(string id, [FromBody] UserDTO userDto)
        {
            userDto.Id = id;
            var result = await _userService.UpdateUser(userDto);
            return StatusCode(result.Code, result);
        }

        // 📌 Xóa user
        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult<ResDTO<string>>> DeleteUser(string id)
        {
            var result = await _userService.DeleteUser(id);
            return StatusCode(result.Code, result);
        }

        // 📌 Đăng nhập bằng Email & Password
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<ResDTO<string>>> Login([FromBody] LoginDTO loginDto)
        {
            var result = await _userService.Login(loginDto.email, loginDto.password);
            var token = result.Data?.ToString();
            if (result.Code == 200 && !string.IsNullOrEmpty(token))
            {
                HttpContext.Response.Cookies.Append("access_token", token, new CookieOptions
                {
                    HttpOnly = true,
                    //Secure = true,  
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTimeOffset.UtcNow.AddHours(1)
                });
            }
            return StatusCode(result.Code, result);
        }

    }
}
