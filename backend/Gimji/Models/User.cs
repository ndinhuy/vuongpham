using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Gimji.Models
{
    public class User
    {
        [Key]
        [Column("id")]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }

        public DateTime DateOfBirth { get; set; }
        public virtual ICollection<Role> Roles { get; set; }

        [NotMapped]
        public string UserFullName => $"{FirstName} {LastName}";
    }
}
