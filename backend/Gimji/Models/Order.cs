using Gimji.enums;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Gimji.Models
{
    public class Order
    {
        [Key]
        public string id { get; set; } = Guid.NewGuid().ToString();
        public DateTime OrderDate { get; set; } = DateTime.Now;
        public decimal TotalPrice { get; set; }
        [Required]
        [MaxLength(500)]
        public string ShippingAddress { get; set; }
        public string Notes { get; set; }

        [ForeignKey("UserId")]
        [ValidateNever]
        public User user { get; set; }

        public List<OrderDetail> Items { get; set; }

        public string PaymentMethod { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
