﻿using System.Collections.Generic;
using System.Linq;
using CookForMe.AppSettings.Validators;
using CookForMe.DAL;
using CookForMe.Models;
using CookForMe.Models.DTO;
using CookForMe.Models.FormModels;
using CookForMe.ServiceInterfaces;
using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace CookForMe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ResponseController : ControllerBase
    {
        private IResponseService _responseContext;

        public ResponseController(IResponseService responseContext)
        {
            _responseContext = responseContext;
        }

        [HttpPost]
        [Route("CreateResponse")]
        public IActionResult CreateResponse(ResponseFormData formData)
        {
            ResponseFormValidator validator = new ResponseFormValidator();

            ValidationResult result = validator.Validate(formData);

            if (!result.IsValid)
            {
                return BadRequest(result.Errors);
            }

            Response newResponse = new Response();
            newResponse.ResponserId = formData.ResponserId;
            newResponse.Offers = formData.Offers;
            newResponse.OrderId = formData.OrderId;

            _responseContext.Create(newResponse);
            return Ok(newResponse);
        }

        [HttpPost]
        [Route("AcceptResponse")]
        public IActionResult AcceptResponse(AcceptedResponseFormData formData)
        {
            _responseContext.AcceptResponse(formData);
            return Ok();
        }

        [HttpGet]
        [Route("GetOrderResponses/{id}")]
        public List<ShortResponseDTO> GetOrderResponses(int id)
        {

            return _responseContext.GetResponsesOfSpecificOrder(id).ToList();

        }

        [HttpGet]
        [Route("GetAcceptedResponses/{id}")]
        public List<AcceptedResponseDTO> GetAcceptedResponses(string id)
        {
            return _responseContext.GetAcceptedResponses(id).ToList();
        }

        [HttpGet]
        [Route("GetAcceptedResponse/{responseId}")]
        public AcceptedResponseDTO GetAcceptedResponse(int responseId)
        {
            return _responseContext.GetAcceptedResponse(responseId);
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
            EditResponseValidator validator = new EditResponseValidator();

            ValidationResult result = validator.Validate(formData);

            if (!result.IsValid)
            {
                return BadRequest(result.Errors);
            }

            _responseContext.EditResponse(formData);

            return Ok();
        }
    }
}