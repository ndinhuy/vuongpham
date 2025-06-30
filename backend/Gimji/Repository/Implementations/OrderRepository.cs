using Gimji.Data;
using Gimji.Models;
using Microsoft.EntityFrameworkCore;

namespace Gimji.Repository.Implementations
{
    public class OrderRepository:IOrderRepository
    {
        //private readonly dbContext dbContext;
        private readonly MyPostgresDbContext dbContext;
        public async Task<Order> CreateOrderAsync(Order order)
        {
            await dbContext.orders.AddAsync(order);
            await dbContext.SaveChangesAsync();
            return order;
        }

        public async Task<(List<Order>, int)> GetOrdersAsync(int page, int limit, string? search)
        {
            var query = dbContext.orders
                .Include(o => o.Items) // Load danh sách OrderItem trong mỗi đơn hàng
                .AsQueryable();

            // Lọc theo từ khóa tìm kiếm nếu có
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(o =>
                    o.id.Contains(search)
                );
            }

            int totalOrders = await query.CountAsync(); // Tổng số đơn hàng

            var orders = await query
                .OrderByDescending(o => o.CreatedAt) // Sắp xếp theo thời gian tạo
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToListAsync();

            return (orders, totalOrders);
        }


        public async Task<Order?> GetOrderByIdAsync(string orderId)
        {
            return await dbContext.orders
                .Include(o => o.Items) // Load danh sách món ăn
                .FirstOrDefaultAsync(o => o.id == orderId);
        }

        public async Task<List<Order>> GetAllOrdersAsync()
        {
            return await dbContext.orders.Include(o => o.Items).ToListAsync();
        }

        public async Task UpdateOrderAsync(Order order)
        {
            dbContext.orders.Update(order);
            await dbContext.SaveChangesAsync();
        }
    }
}
