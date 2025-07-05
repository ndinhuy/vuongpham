namespace Gimji.DTO.Request.Order
{
    public class CreateOrderDTO
    {
        public string? userId { get; set; }
        public List<OrderItemDTO> Items { get; set; }
        public string? ShippingAddress { get; set; }
        public string? Notes { get; set; }
        public string PaymentMethod { get; set; }

        // Thông tin cho khách không đăng nhập
        public string? GuestName { get; set; }
        public string? GuestPhone { get; set; }
        public string? GuestEmail { get; set; }
    }
}
