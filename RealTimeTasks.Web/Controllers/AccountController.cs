using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using RealTimeTasks.Data;
using RealTimeTasks.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace RealTimeTasks.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private string _connString;

        public AccountController(IConfiguration config)
        {
            _connString = config.GetConnectionString("ConStr");
        }

        [Route("signup")]
        [HttpPost]
        public void SignUp(SignUpModel user)
        {
            var repo = new TasksRepository(_connString);
            repo.AddUser(user, user.Password);
        }

        [Route("login")]
        [HttpPost]
        public User LogIn(LogInModel model)
        {
            var repo = new TasksRepository(_connString);
            User user = repo.LogIn(model.Email, model.Password);
            if (user == null)
            {
                return null;
            }

            var claims = new List<Claim>()
            {
                new Claim("user", user.Email)
            };
            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", "user", "role"))).Wait();

            return user;
        }

        [Route("getcurrentuser")]
        public User GetCurrentUser()
        {
            var repo = new TasksRepository(_connString);
            return repo.GetByEmail(User.Identity.Name);
        }

        [Route("logout")]
        [HttpPost]
        [Authorize]
        public void LogOut()
        {
            HttpContext.SignOutAsync().Wait();
        }
    }
}
