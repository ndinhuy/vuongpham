using Gimji.DTO;
using Gimji.DTO.Request;
using Gimji.DTO.Request.Auth;
using Gimji.DTO.Respone.User;
using Gimji.Models;

namespace Gimji.Repository.Interface
{
    public interface IUserRepository
    {
        Task<ResDTO<IEnumerable<UserResponeDTO>>> GetUsers(int page = 1, int limit = 10, string? keyword = null);
        Task<ResDTO<UserResponeDTO>> GetUser(string id);
        Task<ResDTO<string>> AddUser(CreateUserDTO userDto);
        Task<ResDTO<string>> UpdateUser(UserDTO userDto);
        Task<ResDTO<string>> DeleteUser(string id);
        Task<ResDTO<object>> Login(string email, string password);

        Task<ResDTO<object>> RefreshTokenAsync(string refreshToken);
        Task<ResDTO<string>> ChangePassword(ChangePassworđTO changePassworđTO);

        Task<ResDTO<string>> LogoutAsync(string userId);


    }
}
