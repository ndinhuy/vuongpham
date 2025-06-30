using Gimji.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Gimji.Data
{
    public class MyPostgresDbContext:DbContext
    {
        public DbSet<CategoryCode> categoryCodes { get; set; }


        public DbSet<Product> products { get; set; }

        public DbSet<User> users { get; set; }
        public DbSet<Role> roles { get; set; }

        public DbSet<Order> orders { get; set; }
        public DbSet<OrderDetail> orderDetails { get; set; }

        public MyPostgresDbContext(DbContextOptions<MyPostgresDbContext> options):base(options)
        {
        }
    }
}
