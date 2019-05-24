using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CookForMe.AppSettings;
using CookForMe.Models;
using CookForMe.Models.FormModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace CookForMe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private SignInManager<AppUser> _signInManager;
        private UserManager<AppUser> _userManager;
        private ApplicationSettings _appSettings;
        public AuthorizationController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, IOptions<ApplicationSettings> appSettings)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _appSettings = appSettings.Value;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<object> Register(RegisterFormData registerData)
        {
            var newUser = new AppUser
            {
                UserName = registerData.UserName,
                FirstName = registerData.FirstName,
                LastName = registerData.LastName,
                City = registerData.City,
                Street = registerData.Street
            };

            try
            {
                var result = await _userManager.CreateAsync(newUser, registerData.Password);

                return Ok(result);
            }
            catch (Exception)
            {
                return NoContent();
            }
        }


        [HttpPost]
        [Route("Login")]
        public async Task<object> Login(LoginFormData loginData)
        {
            var user = await _userManager.FindByNameAsync(loginData.UserName);

            if (user != null && await _userManager.CheckPasswordAsync(user,loginData.Password))
            {
                var role = await _userManager.GetRolesAsync(user);

                IdentityOptions identityOptions = new IdentityOptions();

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] {
                        new Claim("UserID", user.Id.ToString()),
                        new Claim(identityOptions.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
                    }),
                    Expires = DateTime.Now.AddHours(1),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JwtKey)), SecurityAlgorithms.HmacSha256Signature)

                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);

                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }



        }

    }
}