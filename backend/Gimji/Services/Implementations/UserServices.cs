using Gimji.DTO.Request;
using Gimji.DTO;
using Gimji.Models;
using System.Net;
using Gimji.Data;
using Gimji.Utils;
using Microsoft.EntityFrameworkCore;
using Gimji.Repository.Interface;
using Gimji.DTO.Respone.User;
using Microsoft.AspNetCore.Identity;
using Gimji.DTO.Request.Auth;
using Gimji.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Gimji.Services.Implementations
{
    public class UserServices:IUserRepository
    {
        private MyPostgresDbContext dbContext;
        private readonly JwtUtils jwtUtils;
        private readonly BcryptUtils bcryptUtils;
        public UserServices(MyPostgresDbContext dbContext, JwtUtils jwtUtils, BcryptUtils bcryptUtils)
        {
            this.dbContext = dbContext;
            this.jwtUtils = jwtUtils;
            this.bcryptUtils = bcryptUtils;
        }

        public async Task<ResDTO<IEnumerable<UserResponeDTO>>> GetUsers(int page = 1, int limit = 10, string? keyword = null)
        {
            if (page < 1) page = 1;
            if (limit < 1) limit = 10;

            var query = dbContext.users.AsQueryable(); // Khởi tạo query

            // 🔍 Lọc theo keyword (tìm theo Name hoặc Email)
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(u => u.FirstName.Contains(keyword) || u.Email.Contains(keyword));
            }

            // 📌 Tổng số user sau khi lọc
            int totalUsers = await query.CountAsync();

            // 🛠 Phân trang
            var users = await query
                .OrderBy(u => u.FirstName) // Sắp xếp theo tên (có thể đổi thành `Id`)
                .Skip((page - 1) * limit) // Bỏ qua (page-1) * limit dòng đầu
                .Take(limit)
                .Select(u => new UserResponeDTO
                {
                    Id = u.Id,
                    Email = u.Email,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Username = u.Username,
                    DateOfBirth = u.DateOfBirth,
                })// Giới hạn số user trong 1 trang
                .ToListAsync();
            
            // 🚀 Trả về kết quả
            return new ResDTO<IEnumerable<UserResponeDTO>>
            {
                Code = (int)HttpStatusCode.OK,
                Message = "Lấy danh sách thành công",
                Data = users
            };
        }

        public async Task<ResDTO<UserResponeDTO>> GetUser(string id)
        {
            var user = await dbContext.users.FindAsync(id);

            if (user == null)
            {
                return new ResDTO<UserResponeDTO>
                {
                    Code = (int)HttpStatusCode.NotFound,
                    Message = "Không tìm thấy người dùng",
                    Data = null
                };
            }
            var userResponeDTO = new UserResponeDTO
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Username= user.Username,
                DateOfBirth = user.DateOfBirth,
                
                // map các trường cần thiết
            };
            return new ResDTO<UserResponeDTO>
            {
                Code = (int)HttpStatusCode.OK,
                Message = "Lấy thông tin người dùng thành công",
                Data = userResponeDTO
            };
        }

        public async Task<ResDTO<string>> AddUser(CreateUserDTO userDto)
        {
            try
            {
                // Kiểm tra xem email đã tồn tại chưa
                var existingUser = await dbContext.users.FirstOrDefaultAsync(u => u.Email == userDto.Email);
                if (existingUser != null)
                {
                    return new ResDTO<string>
                    {
                        Code = (int)HttpStatusCode.BadRequest,
                        Message = "Email đã được sử dụng",
                        Data = null
                    };
                }

                // Lấy danh sách Role từ database dựa trên RoleIds
                var roles = await dbContext.roles
                    .Where(r => userDto.RoleIds.Contains(r.Id))
                    .ToListAsync();

                // Nếu không có RoleIds, gán mặc định là Nhân viên phục vụ
                if (!roles.Any())
                {
                    var defaultRole = await dbContext.roles.FirstOrDefaultAsync(r => r.Name == "Employee");
                    if (defaultRole != null)
                    {
                        roles.Add(defaultRole);
                    }
                }

                // Tạo User từ DTO
                var user = new User
                {
                    FirstName = userDto.FirstName,
                    LastName = userDto.LastName,
                    Username = userDto.Username,
                    Email = userDto.Email,
                    Password = BcryptUtils.HashPassword(userDto.Password),
                    DateOfBirth = userDto.DateOfBirth,
                    Roles = roles
                };

                // Lưu User vào DB
                await dbContext.users.AddAsync(user);
                await dbContext.SaveChangesAsync();

                return new ResDTO<string>
                {
                    Code = (int)HttpStatusCode.Created,
                    Message = "Thêm người dùng thành công",
                    Data = user.Id
                };
            }
            catch (Exception ex)
            {
                return new ResDTO<string>
                {
                    Code = (int)HttpStatusCode.InternalServerError,
                    Message = $"Lỗi khi thêm người dùng: {ex.Message}",
                    Data = null
                };
            }
        }



        // 📌 Cập nhật User
        public async Task<ResDTO<string>> UpdateUser(UserDTO userDto)
        {
            var existingUser = await dbContext.users
                .Include(u => u.Roles) // Load danh sách roles nếu có
                .FirstOrDefaultAsync(u => u.Id == userDto.Id);

            if (existingUser == null)
            {
                return new ResDTO<string>
                {
                    Code = (int)HttpStatusCode.NotFound,
                    Message = "Không tìm thấy người dùng",
                    Data = null
                };
            }

            // Cập nhật thông tin người dùng
            existingUser.FirstName = userDto.FirstName;
            existingUser.LastName = userDto.LastName;
            existingUser.Username = userDto.Username;
            existingUser.Email = userDto.Email;

            // Kiểm tra nếu người dùng muốn đổi mật khẩu
            if (!string.IsNullOrEmpty(userDto.Password))
            {
                existingUser.Password = BcryptUtils.HashPassword(userDto.Password);
            }

            // Cập nhật Role nếu có thay đổi
            if (userDto.RoleIds != null && userDto.RoleIds.Any())
            {
                var roles = await dbContext.roles
                    .Where(r => userDto.RoleIds.Contains(r.Id))
                    .ToListAsync();

                existingUser.Roles = roles;
            }

            // Lưu thay đổi vào database
            dbContext.users.Update(existingUser);
            await dbContext.SaveChangesAsync();

            return new ResDTO<string>
            {
                Code = (int)HttpStatusCode.OK,
                Message = "Cập nhật người dùng thành công",
                Data = existingUser.Id
            };
        }


        // 📌 Xóa User
        public async Task<ResDTO<string>> DeleteUser(string id)
        {
            var user = await dbContext.users.FindAsync(id);
            if (user == null)
            {
                return new ResDTO<string>
                {
                    Code = (int)HttpStatusCode.NotFound,
                    Message = "Không tìm thấy người dùng",
                    Data = null
                };
            }

            dbContext.users.Remove(user);
            await dbContext.SaveChangesAsync();

            return new ResDTO<string>
            {
                Code = (int)HttpStatusCode.OK,
                Message = "Xóa người dùng thành công",
                Data = id
            };
        }                                                                                                                        

        // 📌 Đăng nhập với email và password
        public async Task<ResDTO<object>> Login(string email, string password)
        {
            var user = await dbContext.users
                .Include(u => u.Roles) // Load danh sách quyền
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null || !BcryptUtils.VerifyPassword(password, user.Password))
            {
                return new ResDTO<object>
                {
                    Code = (int)HttpStatusCode.Unauthorized,
                    Message = "Email hoặc mật khẩu không chính xác",
                    Data = null
                };
            }

            // Lấy danh sách role của user
            var roles = user.Roles.Select(r => r.Name).ToList();
            var roleString = string.Join(",", roles); // Ghép thành chuỗi

      

            // Sinh access token (hạn ngắn )
            var accessToken = jwtUtils.GenerateToken(user.Id, roleString , 10080);

            // Sinh refresh token (hạn dài, ví dụ 1 tháng)
            var refreshToken = Guid.NewGuid().ToString();
            var refreshTokenExpiry = DateTime.UtcNow.AddMonths(1); // hoặc AddDays(30)

            // Xóa token cũ (nếu có)
            var existingToken = await dbContext.UserRefreshTokens.FirstOrDefaultAsync(r => r.UserId == user.Id);
            if (existingToken != null)
                dbContext.UserRefreshTokens.Remove(existingToken);

            // Lưu refresh token mới
            var userRefreshToken = new UserRefreshToken
            {
                UserId = user.Id,
                RefreshToken = refreshToken,
                ExpiryDate = refreshTokenExpiry
            };
            dbContext.UserRefreshTokens.Add(userRefreshToken);
            await dbContext.SaveChangesAsync();
            return new ResDTO<object>
            {
                Code = (int)HttpStatusCode.OK,
                Message = "Đăng nhập thành công",
                Data = new
                {
                    Type = "Bearer",
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                }
            };

        }
        public async Task<ResDTO<object>> RefreshTokenAsync(string refreshToken)
        {
            var tokenEntity = await dbContext.UserRefreshTokens
                .Include(r => r.User)
                .ThenInclude(u => u.Roles)
                .FirstOrDefaultAsync(r => r.RefreshToken == refreshToken);

            if (tokenEntity == null || tokenEntity.ExpiryDate < DateTime.UtcNow)
            {
                return new ResDTO<object>
                {
                    Code = (int)HttpStatusCode.Unauthorized,
                    Message = "Refresh token không hợp lệ hoặc đã hết hạn",
                    Data = null
                };
            }

            var user = tokenEntity.User;
            var roleString = string.Join(",", user.Roles.Select(r => r.Name));

            // Nếu bạn muốn access token vẫn là 1 tháng:
            var newAccessToken = jwtUtils.GenerateToken(user.Id, roleString, 43200);

            return new ResDTO<object>
            {
                Code = (int)HttpStatusCode.OK,
                Message = "Làm mới token thành công",
                Data = new
                {
                    AccessToken = newAccessToken
                }
            };
        }
        public async Task<ResDTO<string>> ChangePassword(ChangePassworđTO changePassworđTO)
        {
            if (changePassworđTO.newPassword != changePassworđTO.confirmNewPassword)
            {
                return new ResDTO<string>
                {
                    Code = 400,
                    Message = "Xác nhận mật khẩu mới không khớp",
                    Data = null
                };
            }

            var user = await dbContext.users.FindAsync(changePassworđTO.userId);
            if (user == null)
            {
                return new ResDTO<string>
                {
                    Code = 404,
                    Message = "Không tìm thấy người dùng",
                    Data = null
                };
            }

            // 3. Kiểm tra mật khẩu cũ bằng Bcrypt
            if (!BcryptUtils.VerifyPassword(changePassworđTO.oldPassword, user.Password))
            {
                return new ResDTO<string>
                {
                    Code = 401,
                    Message = "Mật khẩu cũ không chính xác",
                    Data = null
                };
            }

            // 4. Hash và cập nhật mật khẩu mới
            user.Password = BcryptUtils.HashPassword(changePassworđTO.newPassword);
            dbContext.users.Update(user);
            await dbContext.SaveChangesAsync();

            return new ResDTO<string>
            {
                Code = 200,
                Message = "Đổi mật khẩu thành công",
                Data = null
            };
        }

        public async Task<ResDTO<string>> LogoutAsync(string userId)
        {
            // Tìm tất cả token thuộc user này
            var tokens = await dbContext.UserRefreshTokens
                .Where(rt => rt.UserId == userId)
                .ToListAsync();

            if (!tokens.Any())
            {
                return new ResDTO<string>
                {
                    Code = 404,
                    Message = "Không tìm thấy refresh token của người dùng",
                    Data = null
                };
            }

            dbContext.UserRefreshTokens.RemoveRange(tokens);
            await dbContext.SaveChangesAsync();

            return new ResDTO<string>
            {
                Code = 200,
                Message = "Đăng xuất thành công",
                Data = null
            };
        }





    }
}
