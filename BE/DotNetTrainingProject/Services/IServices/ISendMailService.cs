using DotNetTrainingProject.MailUtilities;

namespace DotNetTrainingProject.Services.IServices
{
    public interface ISendMailService
    {
        Task<string> SendMail(string userName);
        Task<string> ResetPassword(string userName, string otp, string password, string confirmPassword);
    }
}
