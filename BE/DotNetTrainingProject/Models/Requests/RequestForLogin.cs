using System.ComponentModel.DataAnnotations;

namespace DotNetTrainingProject.Models.Requests
{
    public class RequestForLogin
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
