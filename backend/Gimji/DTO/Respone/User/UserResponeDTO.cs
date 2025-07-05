namespace Gimji.DTO.Respone.User
{
    public class UserResponeDTO
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }

        public DateTime DateOfBirth { get; set; }
    }
}
