using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CookForMe.AppSettings;
using CookForMe.DAL;
using CookForMe.Models;
using CookForMe.Models.DTO;
using CookForMe.Models.FormModels;
using Imgur.API;
using Imgur.API.Authentication.Impl;
using Imgur.API.Endpoints.Impl;
using Imgur.API.Models;
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
        private ResponseService _responseContext;


        public UserController(SignInManager<AppUser> signInManager,
            UserManager<AppUser> userManager, 
            IOptions<ApplicationSettings> appSettings,
            OrdersService orderContext, ResponseService responseContext)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _appSettings = appSettings.Value;
            _orderContext = orderContext;
            _responseContext = responseContext;
        }

        [HttpGet]
        [Route("GetOrders/{id}")]
        public ActionResult<List<Order>> GetOrders(string id)
        {
            return _orderContext.GetAll(id);
        }

        [HttpGet]
        [Route("GetMyOrders/{id}")]
        public ActionResult<List<Order>> GetMyOrders(string id)
        {
            return _orderContext.GetMyOrders(id);
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

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            //////Dodać mapper
            Order newOrder = new Order();
            newOrder.FounderId = formData.FounderId;
            newOrder.IngredientsAvaiable = formData.IngredientsAvaiableList;
            newOrder.Description = formData.Description;
            newOrder.CreationDate = DateTime.Now;
            newOrder.OrderStatus = OrderStatus.Active;
            newOrder.Responses = new List<Response>();
            newOrder.Deadline = formData.Deadline;
            newOrder.IngredientsPhotoUrl = formData.PhotoUrl;
            _orderContext.Create(newOrder);
            return Ok(newOrder);
        }

        [HttpPost]
        [Route("UploadPhoto")]
        public async Task<IActionResult> UploadPhoto(IFormFile photo)
        {
            var photoLink = await _orderContext.UploadPhoto(photo);
            return Ok(photoLink);
        }


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
        //move it to different controller

        [HttpPost]
        [Route("CreateResponse")]
        public IActionResult CreateResponse(ResponseFormData formData)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            //////Dodać mapper
            
            //Recipe newRecipe = new Recipe();
            //newRecipe.Name = formData.RecipeName;
            //newRecipe.Price = formData.RecipePrice;
            //newRecipe.AvgCookTime = formData.RecipeAvgCookTime;

            Response newResponse = new Response();
            //newResponse.Recipes = new List<Recipe>();
            newResponse.ResponserId = formData.ResponserId;
            newResponse.Offers = formData.Offers;
            newResponse.OrderId = formData.OrderId;

            _responseContext.Create(newResponse);
            return Ok(newResponse);
        }

        [HttpGet]
        [Route("GetOrderResponses/{id}")]
        public List<ShortResponseDTO> GetOrderResponses(int id)
        {

            return _responseContext.GetResponsesOfSpecificOrder(id).ToList();

        }

        [HttpGet]
        [Route("GetUserResponses/{id}")]
        public ActionResult<List<ResponseDTO>> GetUserResponses(string id)
        {
            return _responseContext.GetUserResponses(id).ToList();
        }

        [HttpGet]
        [Route("GetResponse/{id}")]
        public ActionResult<ShortResponseDTO> GetResponse(int id)
        {
            return _responseContext.GetResponse(id);
        }

        [HttpPut]
        [Route("EditResponse")]
        public IActionResult EditResponse(EditResponseFormData formData)
        {
            var response = _responseContext.EditResponse(formData);

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