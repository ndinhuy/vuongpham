using Gimji.DTO.Request.Order;
using Gimji.DTO.Respone.Order;
using Gimji.DTO;
using Gimji.enums;
using Gimji.Models;
using Gimji.Repository;
using Gimji.Services.Interface;
using Gimji.Repository.Implementations;
using Gimji.Repository.Interface;

namespace Gimji.Services.Implementations
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        public OrderService(IOrderRepository orderRepository, IProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
        }


        public async Task<ResDTO<Order>> CreateOrder(CreateOrderDTO orderDto)
        {
            if (orderDto.Items == null || !orderDto.Items.Any())
            {
                return new ResDTO<Order>
                {
                    Code = 400,
                    Message = "Đơn hàng không có món ăn!",
                    Data = null
                };
            }
            // ✅ Nếu KHÔNG có userId => Phải có thông tin khách
            if (string.IsNullOrWhiteSpace(orderDto.userId))
            {
                if (string.IsNullOrWhiteSpace(orderDto.GuestName) || string.IsNullOrWhiteSpace(orderDto.GuestPhone))
                {
                    return new ResDTO<Order>
                    {
                        Code = 400,
                        Message = "Khách không đăng nhập phải nhập họ tên và số điện thoại.",
                        Data = null
                    };
                }
            }

            decimal totalPrice = 0;
            var orderItems = new List<OrderDetail>();

            foreach (var item in orderDto.Items)
            {
                var product = await _productRepository.GetProductById(item.ProductId);

                if (product == null)
                {
                    return new ResDTO<Order>
                    {
                        Code = 400,
                        Message = $"Món ăn với ID {item.ProductId} không tồn tại!",
                        Data = null
                    };
                }

                totalPrice += product.price * item.Quantity;

                orderItems.Add(new OrderDetail
                {
                    ProductId = product.productID,
                    Quantity = item.Quantity,
                    Price = product.price,
                });
            }

            var order = new Order
            {
                Items = orderItems,
                TotalPrice = totalPrice,
                Status = OrderStatus.Pending,
                CreatedAt = DateTime.UtcNow,
                UserId = orderDto.userId,
                ShippingAddress = orderDto.ShippingAddress ?? "",
                Notes = orderDto.Notes,
                PaymentMethod = orderDto.PaymentMethod,
                GuestName = orderDto.GuestName,
                GuestPhone = orderDto.GuestPhone,
                GuestEmail = orderDto.GuestEmail
            };

            await _orderRepository.CreateOrderAsync(order);

            return new ResDTO<Order>
            {
                Code = 200,
                Message = "Tạo đơn hàng thành công!",
                Data = order
            };
        }



        public async Task<ResDTO<Order>> GetOrderByIdAsync(string orderId)
        {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);

            if (order == null)
            {
                return new ResDTO<Order>
                {
                    Code = 404,
                    Message = "Đơn hàng không tồn tại",
                    Data = null
                };
            }

            return new ResDTO<Order>
            {
                Code = 200,
                Message = "Lấy đơn hàng thành công",
                Data = order
            };
        }



        //public async Task<ResDTO<object>> GetAllOrdersAsync(int page = 1, int limit = 10, string? search = null)
        //{
        //    if (page < 1) page = 1;
        //    if (limit < 1) limit = 10;

        //    var (orders, totalOrders) = await _orderRepository.GetOrdersAsync(page, limit, search);

        //    var orderDTOs = orders.Select(order => new OrderResponseDTO
        //    {
        //        Id = order.id,
        //        TotalPrice = order.TotalPrice,
        //        CreatedAt = order.CreatedAt,
        //        Status = order.Status.ToString(),
        //        Items = order.Items.Select(item => new OrderItemResponseDTO
        //        {
        //            Id = item.Id,
        //            MenuItemId = item.MenuItemId,
        //            MenuItemName = item.MenuItemName,
        //            Quantity = item.Quantity,
        //            Price = item.Price,
        //            IsDeleted = item.IsDeleted


        //        }).ToList()
        //    }).ToList();

        //    return new ResDTO<object>
        //    {
        //        Code = 200,
        //        Message = "Lấy danh sách đơn hàng thành công!",
        //        Data = new
        //        {
        //            Orders = orderDTOs,
        //            Total = totalOrders
        //        }
        //    };
        //}


        public async Task<OrderResponseDTO?> UpdateOrderStatusAsync(string orderId, string status)
        {
            var order = await _orderRepository.GetOrderByIdAsync(orderId);
            if (order == null) return null;

            if (Enum.TryParse<OrderStatus>(status, out var newStatus))
            {
                order.Status = newStatus;
                await _orderRepository.UpdateOrderAsync(order);
                //return MapToOrderResponseDTO(order);
            }

            return null;
        }
        public Task<ResDTO<Order>> UpdateOrderAsync(Order order) {
            return null;
        }
        //public async Task<ResDTO<OrderResponseDTO>> GetOrderByIdAsync(string orderId)
        //{
        //    var order = await _orderRepository.GetOrderByIdAsync(orderId);

        //    if (order == null)
        //    {
        //        return new ResDTO<OrderResponseDTO>
        //        {
        //            Code = 404,
        //            Message = "Không tìm thấy đơn hàng",
        //            Data = null
        //        };
        //    }

        //    var orderDTO = new OrderResponseDTO
        //    {
        //        Id = order.Id,
        //        TableId = order.TableId,
        //        CreatedBy = order.CreatedBy,
        //        TotalPrice = order.TotalPrice,
        //        CreatedAt = order.CreatedAt,
        //        Status = order.Status.ToString(),
        //        Items = order.Items.Select(item => new OrderItemResponseDTO
        //        {
        //            Id = item.Id,
        //            MenuItemId = item.MenuItemId,
        //            MenuItemName = item.MenuItemName,
        //            Quantity = item.Quantity,
        //            Price = item.Price,
        //            IsDeleted = item.IsDeleted
        //        }).ToList()
        //    };

        //    return new ResDTO<OrderResponseDTO>
        //    {
        //        Code = 200,
        //        Message = "Lấy đơn hàng thành công!",
        //        Data = orderDTO
        //    };
        //}

        //private OrderResponseDTO MapToOrderResponseDTO(Order order)
        //{
        //    return new OrderResponseDTO
        //    {
        //        Id = order.Id,
        //        CreatedBy = order.CreatedBy,
        //        CreatedAt = order.CreatedAt,
        //        Status = order.Status.ToString(),
        //        Items = order.Items.Select(i => new OrderItemResponseDTO
        //        {
        //            MenuItemId = i.MenuItemId,
        //            Quantity = i.Quantity,
        //            Price = i.Price
        //        }).ToList()
        //    };
        //}
    }
}
