namespace DotNetTrainingProject.Models.Requests
{
    public class ResetPasswordRequest
    {
        public string OTP { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
