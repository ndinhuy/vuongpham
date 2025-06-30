namespace Gimji.DTO.Respone.Order
{
    public class OrderItemResponseDTO
    {
        public string id { get; set; }
        public string ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
