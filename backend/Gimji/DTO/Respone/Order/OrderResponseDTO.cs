namespace Gimji.DTO.Respone.Order
{
    public class OrderResponseDTO
    {
        public string Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Status { get; set; }
        public decimal TotalPrice { get; set; }

        public List<OrderItemResponseDTO> Items { get; set; } = new();
    }
}
