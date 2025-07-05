namespace Gimji.DTO.Request.Auth
{
    public class ChangPasswordDTORequest
    {
        public string oldPassword { get; set; }
        public string newPassword { get; set; }
        public string confirmNewPassword { get; set; }
    }
}
