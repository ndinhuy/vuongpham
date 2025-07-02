using Gimji.DTO.Request;
using Gimji.Models;
using Gimji.Utils;
using Microsoft.EntityFrameworkCore;
using System;

namespace Gimji.Data
{
    public class DbSeeder : IDbSeeder
    {
        private readonly MyPostgresDbContext _context;
        private readonly BcryptUtils bcryptUtils;

        public DbSeeder(MyPostgresDbContext context , BcryptUtils bcryptUtils)
        {
            _context = context;
            this.bcryptUtils = bcryptUtils;
        }

        public async Task SeedAsync()
        {
            try
            {
                Console.WriteLine("[SEED] bat dau co du lieu...");

                // Seed roles
                if (!_context.roles.Any())
                {
                    Console.WriteLine("[SEED] new role...");
                    _context.roles.AddRange(
                        new Role { Name = "ADMIN" },
                        new Role { Name = "USER" }
                    );
                    await _context.SaveChangesAsync();
                }

                // Seed admin user
                if (!_context.users.Any(u => u.Email == "admin@example.com"))
                {
                    Console.WriteLine("[SEED] Thêm user admin...");

                    var adminRole = await _context.roles.FirstOrDefaultAsync(r => r.Name == "ADMIN");

                    if (adminRole == null)
                    {
                        throw new Exception("Role 'ADMIN' khong ton tai trong database.");
                    }

                    var user1 = new User
                    {
                        Email = "admin@example.com",
                        FirstName = "Vuong",
                        LastName = "Pham",
                        Username = "admin",
                        DateOfBirth = DateTime.UtcNow,
                        Password = BcryptUtils.HashPassword("admin@vuongpham"),
                        Roles = new List<Role> { adminRole }
                    };

                    _context.users.Add(user1);
                    await _context.SaveChangesAsync();
                }

                Console.WriteLine("[SEED] Seed thanh cong.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[SEED][ERROR] {ex.Message}");
                Console.WriteLine(ex.StackTrace);
            }
        }

    }

}
