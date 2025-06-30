using System.ComponentModel.DataAnnotations;

namespace Gimji.Models
{
    public class OrderDetail
    {
        [Key]
        public string id { get; set; } = Guid.NewGuid().ToString();
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public Order Order { get; set; }
        public Product Product { get; set; }
    }
}
