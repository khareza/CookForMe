using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CookForMe.AppSettings;
using CookForMe.DAL;
using CookForMe.Models;
using CookForMe.Models.FormModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace CookForMe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private SignInManager<AppUser> _signInManager;
        private UserManager<AppUser> _userManager;
        private ApplicationSettings _appSettings;
        private AuthenticationContext _context;

        public UserController(SignInManager<AppUser> signInManager,
            UserManager<AppUser> userManager, 
            IOptions<ApplicationSettings> appSettings,
            AuthenticationContext context)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _appSettings = appSettings.Value;
            _context = context;
        }

        [HttpGet]
        [Route("GetOrders")]
        public ActionResult<IEnumerable<Order>> GetOrders()
        {
            return _context.Orders.ToList();
        }

        [HttpPost]
        [Route("CreateOrder")]
        public ActionResult CreateOrder(OrderFormData formData)
        {
            var founder = _userManager.Users
                .FirstOrDefault(u => u.Id == formData.FounderId);

            if (!ModelState.IsValid || founder==null)
            {
                return BadRequest();
            }
            //Dodać mapper
            Order newOrder = new Order();
            newOrder.Founder = founder;
            newOrder.Deadline = formData.Deadline;
            newOrder.IngredientsPhoto = formData.IngredientsPhoto;
            newOrder.IngredientsAvaiableList = formData.IngredientsAvaiableList;
            newOrder.Description = formData.Description;
            newOrder.CreationDate = DateTime.Now;
            newOrder.OrderStatus = OrderStatus.Active;
            newOrder.Responses = new List<Response>();

            //dodać layer do bazy danych
            _context.Orders.Add(newOrder);
            _context.SaveChanges();

            return Ok(newOrder);
        }

        [HttpDelete]
        [Route("DeleteOrder")]
        public ActionResult DeleteOrder(int OrderId)
        {
            var orderToDelete = _context.Orders.FirstOrDefault(o=>o.Id == OrderId);
            if (orderToDelete == null)
            {
                return BadRequest();
            }
            _context.Orders.Remove(orderToDelete);
            _context.SaveChanges();

            return Ok(orderToDelete);
        }


        [HttpDelete]
        [Route("EditOrder")]
        public ActionResult EditOrder(OrderFormData formData)
        {

            var order = _context.Orders.FirstOrDefault(o => o.Id == formData.OrderId);


            if (order != null)
            {
                //use object mapper here :)

                order.Deadline = formData.Deadline;
                order.IngredientsPhoto = formData.IngredientsPhoto;
                order.IngredientsAvaiableList = formData.IngredientsAvaiableList;
                order.Description = formData.Description;
                _context.SaveChanges();
                return Ok(order);
            }
            else
            {
                return BadRequest();
            }
        }


    }
}