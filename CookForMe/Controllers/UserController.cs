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
        public async Task<IActionResult> CreateOrder(OrderFormData formData)
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

            _context.Orders.Add(newOrder);
            _context.SaveChanges();
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
        public ActionResult DeleteOrder(int orderId)
        {
            var orderToDelete = _context.Orders.FirstOrDefault(o=>o.Id == orderId);
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
        public async Task<IActionResult> EditOrder(OrderFormData formData)
        {

            var order = _context.Orders.FirstOrDefault(o => o.Id == formData.OrderId);


            if (order != null)
            {
                //use object mapper here :)

                order.Deadline = formData.Deadline;
                order.IngredientsAvaiable = formData.IngredientsAvaiableList;
                order.Description = formData.Description;
                order.IngredientsPhotoUrl = formData.PhotoUrl;
                //using (var memoryStream = new MemoryStream())
                //{
                //    //await formData.IngredientsPhoto.Files.First().CopyToAsync(memoryStream);
                //    order.IngredientsPhoto = memoryStream.ToArray();
                //}
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