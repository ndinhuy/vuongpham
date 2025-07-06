using Gimji.DTO.Request.Auth;
using Gimji.DTO;
using Gimji.Services.Implementations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Gimji.Repository.Interface;
using Gimji.Helper;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Gimji.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IUserRepository _userRepository;

        public AuthController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("change-password")]
        [Authorize]
        public async Task<ActionResult<ResDTO<string>>> ChangePassword([FromBody] ChangPasswordDTORequest dto)
        {
            var userId = TokenHelper.GetUserIdFromAccessToken(HttpContext); // ✅ nếu method là static


            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Không tìm thấy userId trong token");

            ChangePassworđTO changePassworđ = new ChangePassworđTO();

            changePassworđ.userId = userId;
            changePassworđ.oldPassword = dto.oldPassword;
            changePassworđ.newPassword = dto.newPassword;
            changePassworđ.confirmNewPassword = dto.confirmNewPassword;

            

            var result = await _userRepository.ChangePassword(changePassworđ);
            return StatusCode(result.Code, result);
        }
        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var userId = TokenHelper.GetUserIdFromAccessToken(HttpContext);

            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new ResDTO<string>
                {
                    Code = 401,
                    Message = "Không tìm thấy userId trong token",
                    Data = null
                });

            var result = await _userRepository.LogoutAsync(userId);
            // Xoá cookie chứa accessToken / refreshToken nếu có
            Response.Cookies.Delete("access_token");
            Response.Cookies.Delete("refresh_token");

            return StatusCode(result.Code, result);
        }

    }
}
