namespace Gimji.DTO.Request.Order
{
    public class CreateOrderDTO
    {

        public string CreatedBy { get; set; }
        public List<OrderItemDTO> Items { get; set; }
    }
}
