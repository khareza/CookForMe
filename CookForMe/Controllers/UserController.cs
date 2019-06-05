using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CookForMe.Models.DTO;
using CookForMe.Models.FormModels;
using CookForMe.ServiceInterfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CookForMe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private IUserService _userContext;

        public UserController(IUserService userContext)
        {
            _userContext = userContext;
        }

        [HttpGet]
        [Route("GetUserRating/{id}")]
        public RatingDTO GetOrderResponses(string id)
        {
            return _userContext.GetUserRating(id);
        }

        [HttpPost]
        [Route("RateUser")]
        public IActionResult RateUser(RateUserFormData formData)
        {
            _userContext.RateUser(formData);
            return Ok();
        }



    }
}