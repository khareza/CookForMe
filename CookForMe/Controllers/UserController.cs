using System;
using System.Collections.Generic;
using System.IO;
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
        private OrdersService _orderContext;

        public UserController(SignInManager<AppUser> signInManager,
            UserManager<AppUser> userManager, 
            IOptions<ApplicationSettings> appSettings,
            OrdersService orderContext)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _appSettings = appSettings.Value;
            _orderContext = orderContext;
        }

        [HttpGet]
        [Route("GetOrders")]
        public ActionResult<List<Order>> GetOrders()
        {
            return _orderContext.GetAll();
        }

        [HttpGet]
        [Route("GetOrder/{id}")]
        public ActionResult<Order> GetOrderById(int id)
        {
            var order = _orderContext.Get(id);
            if (order==null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(order);
            }
        }

        [HttpPost]
        [Route("CreateOrder")]
        public IActionResult CreateOrder(OrderFormData formData)
        {
            var founder = _userManager.Users
                .FirstOrDefault(u => u.Id == formData.FounderId);

            if (!ModelState.IsValid || founder == null)
            {
                return BadRequest();
            }
            //////Dodać mapper
            Order newOrder = new Order();
            newOrder.Founder = founder;
            newOrder.IngredientsAvaiable = formData.IngredientsAvaiableList;
            newOrder.Description = formData.Description;
            newOrder.CreationDate = DateTime.Now;
            newOrder.OrderStatus = OrderStatus.Active;
            newOrder.Responses = new List<Response>();
            newOrder.IngredientsPhotoUrl = formData.PhotoUrl;

            _orderContext.Create(newOrder);
            return Ok();
        }

        //[HttpPost]
        //[Route("UploadOrderPhoto")]
        //public IActionResult UploadOrderPhoto(IFormCollection formData)
        //{
        //    int orderId = int.Parse(formData["orderId"].First());
        //    var order = _context.Orders.First(o => o.Id == orderId);

        //    if (formData != null && formData.Files.First().Length != 0)
        //    {
        //        using (var stream = formData.Files.First().OpenReadStream())
        //        using (var memoryStream = new MemoryStream())
        //        {
        //            stream.CopyTo(memoryStream);
        //            order.IngredientsPhoto = memoryStream.ToArray();
        //        }
        //    }
        //    _context.SaveChanges();
          
        //    return Ok(order);
        //}

        [HttpDelete]
        [Route("DeleteOrder/{orderId}")]
        public IActionResult DeleteOrder(int orderId)
        {
            var response =_orderContext.Delete(orderId);
            if (response == null)
            {
                return BadRequest();
            }
            return Ok(response);
        }


        [HttpPut]
        [Route("EditOrder")]
        public IActionResult EditOrder(OrderFormData formData)
        {
            var response = _orderContext.Edit(formData);

            if (response == null)
            {
                return BadRequest();
            }
            else
            {
                return Ok(response);
            }
        }
    }
}