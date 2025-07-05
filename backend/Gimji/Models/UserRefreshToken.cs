namespace Gimji.Models
{
    public class UserRefreshToken
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime ExpiryDate { get; set; }

        // Khóa ngoại tới User
        public string UserId { get; set; }
        public User User { get; set; } = default!;
    }
}
