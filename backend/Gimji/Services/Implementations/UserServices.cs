using Gimji.DTO.Request;
using Gimji.DTO;
using Gimji.Models;
using System.Net;
using Gimji.Data;
using Gimji.Utils;
using Microsoft.EntityFrameworkCore;
using Gimji.Repository.Interface;

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

        public async Task<ResDTO<IEnumerable<User>>> GetUsers(int page = 1, int limit = 10, string? keyword = null)
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
                .Take(limit) // Giới hạn số user trong 1 trang
                .ToListAsync();

            // 🚀 Trả về kết quả
            return new ResDTO<IEnumerable<User>>
            {
                Code = (int)HttpStatusCode.OK,
                Message = "Lấy danh sách thành công",
                Data = users
            };
        }

        public async Task<ResDTO<User>> GetUser(string id)
        {
            var user = await dbContext.users.FindAsync(id);

            if (user == null)
            {
                return new ResDTO<User>
                {
                    Code = (int)HttpStatusCode.NotFound,
                    Message = "Không tìm thấy người dùng",
                    Data = null
                };
            }

            return new ResDTO<User>
            {
                Code = (int)HttpStatusCode.OK,
                Message = "Lấy thông tin người dùng thành công",
                Data = user
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

            // Sinh token
            var token = jwtUtils.GenerateToken(user.Id, roleString);

            return new ResDTO<object>
            {
                Code = (int)HttpStatusCode.OK,
                Message = "Đăng nhập thành công",
                Data = new
                {
                    Type = "Bearer",
                    Token = token
                }
            };
        }
    }
}
