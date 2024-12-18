using System.ComponentModel.DataAnnotations;

namespace DotNetTrainingProject.Models.Requests
{
    public class RequestForRegister
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        public string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string ProfilePictureUrl { get; set; }
        public string Description { get; set; }
    }
}
