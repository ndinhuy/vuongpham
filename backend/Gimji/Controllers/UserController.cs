using Gimji.DTO.Request;
using Gimji.DTO;
using Gimji.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Gimji.Repository.Interface;
using Gimji.DTO.Request.User;
using Microsoft.IdentityModel.Tokens;
using Gimji.Utils;
using Microsoft.EntityFrameworkCore;

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

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<ResDTO<object>>> Login([FromBody] LoginDTO loginDto)
        {
            var result = await _userService.Login(loginDto.email, loginDto.password);

            if (result.Code == 200 && result.Data is not null)
            {
                // Ép kiểu dynamic data từ ResDTO
                var tokenData = result.Data as dynamic;

                var accessToken = tokenData?.AccessToken as string;
                var refreshToken = tokenData?.RefreshToken as string;

                if (!string.IsNullOrEmpty(accessToken) && !string.IsNullOrEmpty(refreshToken))
                {
                    // 🟢 Lưu Access Token vào cookie
                    HttpContext.Response.Cookies.Append("access_token", accessToken, new CookieOptions
                    {
                        HttpOnly = true,
                        //Secure = true, // bật nếu dùng HTTPS
                        SameSite = SameSiteMode.Strict,
                        Expires = DateTimeOffset.UtcNow.AddDays(7)
                    });

                    // 🟢 Lưu Refresh Token vào cookie
                    HttpContext.Response.Cookies.Append("refresh_token", refreshToken, new CookieOptions
                    {
                        HttpOnly = true,
                        //Secure = true,
                        SameSite = SameSiteMode.Strict,
                        Expires = DateTimeOffset.UtcNow.AddMonths(1) /// ví dụ: refresh token sống 7 ngày
                    });
                }
            }

            return StatusCode(result.Code);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            var result = await _userService.RefreshTokenAsync(request.RefreshToken);
            return StatusCode(result.Code, result); // trả về ResDTO chuẩn
        }


    }
}
