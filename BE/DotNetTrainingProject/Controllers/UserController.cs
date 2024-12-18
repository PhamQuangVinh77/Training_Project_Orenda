using DotNetTrainingProject.Models.Requests;
using DotNetTrainingProject.Models.Responses;
using DotNetTrainingProject.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace DotNetTrainingProject.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : Controller
    {
        private IUserService _userService;
        private ISendMailService _sendMailService;

        public UserController(IUserService userService, ISendMailService sendMailService)
        {
            _userService = userService;
            _sendMailService = sendMailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RequestForRegister request)
        {
            var result = await _userService.Register(request);
            if (String.IsNullOrEmpty(result))
            {
                return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "Create new account successfully!" });
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = result });

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] RequestForLogin request)
        {
            var result = await _userService.Login(request);
            if (String.IsNullOrEmpty(result))
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "Username or password is invalid!" });
            }
            return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = result });
        }

        [HttpPost("forget-password")]
        public async Task<IActionResult> ForgetPassword([FromForm] string userName)
        {
            var result = await _sendMailService.SendMail(userName);
            if (String.IsNullOrEmpty(result))
            {
                return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "OTP has been sent to user's mail!" });
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = result });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody]ResetPasswordRequest request)
        {
            var result = await _sendMailService.ResetPassword(request.Username, request.OTP, request.Password, request.ConfirmPassword);
            if (String.IsNullOrEmpty(result))
            {
                return StatusCode(StatusCodes.Status200OK, new Response { Status = "Success", Message = "Password has been changed!" });
            }
            return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = result });
        }
    }
}
