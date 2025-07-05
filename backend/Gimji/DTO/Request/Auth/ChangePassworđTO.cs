namespace Gimji.DTO.Request.Auth
{
    public class ChangePassworđTO
    {
        public string userId { get; set; }
        public string oldPassword { get; set; }
        public string newPassword { get; set; }
        public string confirmNewPassword { get; set; }

    }
}
