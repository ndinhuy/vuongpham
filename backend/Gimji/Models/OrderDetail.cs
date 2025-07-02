using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gimji.Models
{
    public class OrderDetail
    {
        [Key]
        public string id { get; set; } = Guid.NewGuid().ToString();
        public int OrderId { get; set; }
        [ForeignKey("Product")]
        public string ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public Order Order { get; set; }
        public Product Product { get; set; }
    }
}
