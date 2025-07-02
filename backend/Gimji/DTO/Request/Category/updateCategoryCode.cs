using System.ComponentModel.DataAnnotations;

namespace Gimji.DTO.Request.Category
{
    public class updateCategoryCode
    {
        public string CodeValue { get; set; }


        public string Name { get; set; }

        public string Image { get; set; }

        public string Description { get; set; }
    }
}
