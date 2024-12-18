using DotNetTrainingProject.Entities;
using DotNetTrainingProject.Models.Requests;
using DotNetTrainingProject.Services.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DotNetTrainingProject.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _config;
        private readonly ILogger<UserService> _logger;
        public UserService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager, 
            IConfiguration config, ILogger<UserService> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _config = config;
            _logger = logger;
        }

        public async Task<string> Register(RequestForRegister request)
        {
            try
            {
                var checkUsername = await _userManager.FindByNameAsync(request.UserName);
                if (checkUsername != null)
                {
                    return "Username has already existed!";
                } // Check exist username in database

                var checkEmail = await _userManager.FindByEmailAsync(request.Email);
                if (checkEmail != null)
                {
                    return "Email has already been used!";
                } // Check exist email in database

                ApplicationUser user = new ApplicationUser()
                {
                    UserName = request.UserName,
                    Email = request.Email,
                    FullName = request.FullName,
                    DateOfBirth = request.DateOfBirth,
                    Address = request.Address,
                    ProfilePictureUrl = request.ProfilePictureUrl,
                    Description = request.Description,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                };

                var result = await _userManager.CreateAsync(user, request.Password);
                if (!result.Succeeded)
                {
                    return "Register failed!";
                }
                if(!await _roleManager.RoleExistsAsync("Customer")) 
                {
                    await _roleManager.CreateAsync(new IdentityRole("Customer"));
                } 
                await _userManager.AddToRoleAsync(user, "Customer"); // Add new user with role is Customer
                return String.Empty;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return "Register failed!";
            }
        }

        public async Task<string> Login(RequestForLogin request)
        {
            try
            {
                var result = await _signInManager.PasswordSignInAsync(request.UserName, request.Password, false, false);
                if (!result.Succeeded) return String.Empty;

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, request.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var user = await _userManager.FindByNameAsync(request.UserName);
                var userRoles = await _userManager.GetRolesAsync(user);
                foreach (var role in userRoles) 
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, role.ToString()));
                }
                
                var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Secret"]));
                var token = new JwtSecurityToken(
                        issuer: _config["JWT:ValidIssuer"],
                        audience: _config["JWT:ValidAudience"],
                        expires: DateTime.Now.AddMinutes(30),
                        claims: authClaims,
                        signingCredentials: new SigningCredentials(authenKey, SecurityAlgorithms.HmacSha256Signature)
                    );
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return String.Empty;
            }
        }
    }
}
