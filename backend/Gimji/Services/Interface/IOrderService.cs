using Gimji.DTO;
using Gimji.DTO.Request.Order;
using Gimji.DTO.Respone.Order;
using Gimji.Models;

namespace Gimji.Services.Interface
{
    public interface IOrderService
    {
        Task<ResDTO<OrderResponseDTO>> GetOrderByIdAsync(string orderId);
        Task<ResDTO<object>> GetAllOrdersAsync(int page = 1, int limit = 10, string? search = null);
        Task<OrderResponseDTO> UpdateOrderStatusAsync(string orderId, string status);

        Task<ResDTO<Order>> CreateOrder(CreateOrderDTO orderDto, string token);
    }
}
