using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Gimji.Models
{
    [Table("role")]
    public class Role
    {

        [Key]
        [Column("id")]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        [Unicode]
        public string Name { get; set; }
        [JsonIgnore]
        public virtual ICollection<User> Users { get; set; }
    }
}
