using AutoMapper;
using CookForMe.Models;
using CookForMe.Models.DTO;
using CookForMe.Models.FormModels;
using CookForMe.ServiceInterfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.DAL
{
    public class ResponseService : IResponseService
    {
        private AuthenticationContext _context;
        private readonly IMapper _mapper;

        public ResponseService(AuthenticationContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<ShortResponseDTO> GetResponsesOfSpecificOrder(int orderid)
        {
            var responses = _context.Responses.Include(r => r.Offers).Where(x => x.OrderId == orderid);

            if (responses != null)
            {
                foreach (var res in responses)
                {
                    var responseDto = _mapper.Map<ShortResponseDTO>(res);
                    responseDto.Offers = new List<OfferDTO>();
                    foreach (var recipe in res.Offers)
                    {
                        responseDto.Offers.Add(_mapper.Map<OfferDTO>(recipe));
                    }
                    yield return responseDto;
                }
            }
        }

        public IEnumerable<ResponseDTO> GetUserResponses(string id)
        {
            var responses = _context.Responses.Include(x => x.Offers).Include(x => x.Order).Where(x => x.Responser.Id == id);
            foreach (var res in responses)
            {
                var responseDto = _mapper.Map<ResponseDTO>(res);
                responseDto.Offers = new List<OfferDTO>();

                foreach (var offer in res.Offers)
                {
                    responseDto.Offers.Add(_mapper.Map<OfferDTO>(offer));
                }
                yield return responseDto;
            }
        }

        public ShortResponseDTO GetResponse(int responseId)
        {
            var response = _context.Responses.Include(r => r.Offers).Where(x => x.Id == responseId).FirstOrDefault();

            if (response != null)
            {
                var responseDto = _mapper.Map<ShortResponseDTO>(response);
                responseDto.Offers = new List<OfferDTO>();
                foreach (var offer in response.Offers)
                {
                    responseDto.Offers.Add(_mapper.Map<OfferDTO>(offer));
                }
                return responseDto;
            }
            else
            {
                return null;
            }

        }

        public Response EditResponse(EditResponseFormData formData)
        {
            var response = _context.Responses.Include(r => r.Offers).FirstOrDefault(r => r.Id == formData.Id);
            if (response != null)
            {
                foreach (var offer in response.Offers)
                {
                    var offerForm = formData.Offers.FirstOrDefault(x => x.Id == offer.Id);
                    offer.Name = offerForm.Name;
                    offer.Price = offerForm.Price;
                    offer.AvgCookTime = offerForm.AvgCookTime;
                }
                _context.SaveChanges();
                return response;
            }
            else
            {
                return null;
            }

        }

        public void Create(Response newResponse)
        {
            _context.Responses.Add(newResponse);
            _context.SaveChanges();
        }

    }
}
