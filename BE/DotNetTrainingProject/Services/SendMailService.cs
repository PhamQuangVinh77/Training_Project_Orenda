using DotNetTrainingProject.Entities;
using DotNetTrainingProject.MailUtilities;
using DotNetTrainingProject.Services.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using MimeKit;

namespace DotNetTrainingProject.Services
{
    public class SendMailService : ISendMailService
    {
        private MailSettings _mailSettings;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMemoryCache _memoryCache;
        private IPasswordHasher<ApplicationUser> _passwordHasher;
        public SendMailService(IOptions<MailSettings> mailSettings, UserManager<ApplicationUser> userManager,
            IMemoryCache memoryCache, IPasswordHasher<ApplicationUser> passwordHasher)
        {
            _mailSettings = mailSettings.Value;
            _userManager = userManager;
            _memoryCache = memoryCache;
            _passwordHasher = passwordHasher;
        }
        public async Task<string> SendMail(string userName)
        {
            var existUser = await _userManager.FindByNameAsync(userName);
            if (existUser == null) return "Username doesn't exist!";
            var toEmail = existUser.Email.ToString();

            var email = new MimeMessage();
            email.Sender = new MailboxAddress(_mailSettings.DisplayName, _mailSettings.Mail);
            email.From.Add(new MailboxAddress(_mailSettings.DisplayName, _mailSettings.Mail));
            email.To.Add(new MailboxAddress(toEmail, toEmail));
            email.Subject = "Recovery password mail";
            var otp = GenerateOTP();
            var builder = new BodyBuilder();
            builder.HtmlBody = $"This is your OTP: {otp}!\n It will expire in 10 minutes!";
            email.Body = builder.ToMessageBody();
            SaveOtpInCache(userName, otp);

            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            try
            {
                await smtp.ConnectAsync(_mailSettings.Host, _mailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync(_mailSettings.Mail, _mailSettings.Password);
                await smtp.SendAsync(email);
                smtp.Disconnect(true);
                return String.Empty;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                smtp.Disconnect(true);
                return "Send OTP failed";
            }
        }

        private void SaveOtpInCache(string userName, string otp)
        {
            var key = "OTP_" + userName;
            var expireTime = TimeSpan.FromMinutes(10);
            _memoryCache.Set(key, otp, expireTime);
        }

        private string GenerateOTP()
        {
            var length = 8;
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length)
                                        .Select(s => s[random.Next(s.Length)])
                                        .ToArray());
        }

        public async Task<string> ResetPassword(string userName, string otp, string password, string confirmPassword)
        {
            try
            {
                if (password != confirmPassword) return "Confirm password isn't correct!";
                var key = "OTP_" + userName;
                if (_memoryCache.TryGetValue(key, out string cacheOTP) && cacheOTP == otp)
                {
                    var user = await _userManager.FindByNameAsync(userName);
                    if (user == null) return "Reset password failed!";
                    user.PasswordHash = _passwordHasher.HashPassword(user, password);
                    await _userManager.UpdateAsync(user);
                    _memoryCache.Remove(key);
                    return String.Empty;
                }
                return "OTP isn't correct!";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return "Reset password failed!";
            }
        }
    }
}
