using System.IdentityModel.Tokens.Jwt;

namespace Gimji.Helper
{
    public class TokenHelper
    {
        public static string? GetUserIdFromAccessToken(HttpContext context)
        {
            var token = context.Request.Cookies["access_token"];
            if (string.IsNullOrEmpty(token)) return null;

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            // Lấy từ "nameid" vì token bạn dùng claim này
            var userId = jwtToken.Claims.FirstOrDefault(c => c.Type == "nameid")?.Value;
            return userId;
        }

        public static string? GetUserRole(HttpContext context)
        {
            var token = context.Request.Cookies["access_token"];
            if (string.IsNullOrEmpty(token)) return null;

            var handler = new JwtSecurityTokenHandler();
            var jwtToken = handler.ReadJwtToken(token);

            var role = jwtToken.Claims.FirstOrDefault(c => c.Type == "role")?.Value;
            return role;
        }
    }
}
