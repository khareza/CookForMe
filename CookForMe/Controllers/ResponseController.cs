using System.Collections.Generic;
using System.Linq;
using CookForMe.DAL;
using CookForMe.Models;
using CookForMe.Models.DTO;
using CookForMe.Models.FormModels;
using CookForMe.ServiceInterfaces;
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
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Response newResponse = new Response();
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

                _responseContext.EditResponse(formData);

            return Ok();
        }
    }
}