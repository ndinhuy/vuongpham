using Gimji.Models;

namespace Gimji.DTO.Request.Product
{
    public class addProduct
    {
        public string name { get; set; }
        public string image1 { get; set; }
        public string image2 { get; set; }
        public string image3 { get; set; }
        public decimal price { get; set; }
        public string description { get; set; }
        public string nsn { get; set; } /*số lượng tồn kho */

        public string categoryId { get; set; }
    }
}
