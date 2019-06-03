using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CookForMe.AppSettings.Validators;
using CookForMe.DAL;
using CookForMe.Models;
using CookForMe.Models.FormModels;
using CookForMe.ServiceInterfaces;
using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CookForMe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private IOrdersService _orderContext;

        public OrderController(IOrdersService orderContext)
        {
            _orderContext = orderContext;
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
            if (order == null)
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

            OrderFormValidator validator = new OrderFormValidator();

            ValidationResult result = validator.Validate(formData);


            if (!result.IsValid)
            {
                return BadRequest(result.Errors);
            }
            //////Dodać mapper
            Order newOrder = new Order();
            newOrder.FounderId = formData.FounderId;
            newOrder.IngredientsAvaiable = formData.IngredientsAvaiableList;
            newOrder.Description = formData.Description;
            newOrder.ExpirationDate = formData.ExpirationDate;
            newOrder.IngredientsPhotoUrl = formData.PhotoUrl;
            newOrder.CreationDate = DateTime.Now;
            newOrder.OrderStatus = OrderStatus.Active;
            newOrder.Responses = new List<Response>();

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
            var response = _orderContext.Delete(orderId);
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
            OrderFormValidator validator = new OrderFormValidator();

            ValidationResult result = validator.Validate(formData);

            if (!result.IsValid)
            {
                return BadRequest(result.Errors);
            }

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