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


        public IEnumerable<AcceptedResponseDTO> GetAcceptedResponses(string userId)
        {
            var acceptedResponses = _context.AcceptedResponses
                .Include(r => r.ChosenOrder)
                .Include(r => r.ChosenResponse)
                .Include(r => r.ChosenResponse.Offers)
                .Where(r => r.CallerId == userId);

            if (acceptedResponses != null)
            {
                foreach (var res in acceptedResponses)
                {
                    var responseFounder = _context.AppUsers.FirstOrDefault(a => a.Id == res.ChosenResponse.ResponserId);

                    var acceptedResponseDTO = new AcceptedResponseDTO();
                    acceptedResponseDTO.Response = _mapper.Map<ResponseDTO>(res.ChosenResponse);
                    acceptedResponseDTO.AppUser = _mapper.Map<AppUserDTO>(responseFounder);
                    acceptedResponseDTO.OfferId = res.ChosenOfferId;

                    acceptedResponseDTO.Response.Offers = new List<OfferDTO>();
                    foreach (var offer in res.ChosenResponse.Offers)
                    {
                        acceptedResponseDTO.Response.Offers.Add(_mapper.Map<OfferDTO>(offer));
                    }
                    yield return acceptedResponseDTO;
                }
            }
        }

        public AcceptedResponseDTO GetAcceptedResponse(int responseId)
        {
            var acceptedResponse = _context.AcceptedResponses
                .Include(r => r.ChosenOrder)
                .Include(r => r.ChosenResponse)
                .Include(r => r.ChosenResponse.Offers)
                .FirstOrDefault(r => r.ChosenResponse.Id == responseId);

            if (acceptedResponse != null)
            {
                var responseCaller = _context.AppUsers.FirstOrDefault(a => a.Id == acceptedResponse.CallerId);

                var acceptedResponseDTO = new AcceptedResponseDTO();
                acceptedResponseDTO.Response = _mapper.Map<ResponseDTO>(acceptedResponse.ChosenResponse);
                acceptedResponseDTO.AppUser = _mapper.Map<AppUserDTO>(responseCaller);
                acceptedResponseDTO.OfferId = acceptedResponse.ChosenOfferId;

                acceptedResponseDTO.Response.Offers = new List<OfferDTO>();
                foreach (var offer in acceptedResponse.ChosenResponse.Offers)
                {
                    acceptedResponseDTO.Response.Offers.Add(_mapper.Map<OfferDTO>(offer));
                }
                return acceptedResponseDTO;
            }
            return null;
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

        public void EditResponse(EditResponseFormData formData)
        {
            DeleteOffer(formData.OffersToDelete);

            foreach (var offer in formData.Offers)
            {
                if (offer.Id != 0)
                {
                    var offerFromDb = _context.Offers.Where(o => o.Id == offer.Id).FirstOrDefault();
                    offerFromDb.Name = offer.Name;
                    offerFromDb.Price = offer.Price;
                    offerFromDb.AvgCookTime = offer.AvgCookTime;
                }
                else
                {
                    offer.ResponseId = formData.Id;
                    _context.Offers.Add(offer);
                }
            }
            _context.SaveChanges();

        }

        private void DeleteOffer(List<Offer> offers)
        {
            foreach (var offer in offers)
            {
                if (offer.Id != 0)
                {
                    _context.Offers.Remove(offer);
                }
            }
            _context.SaveChanges();
        }

        public void Create(Response newResponse)
        {
            _context.Responses.Add(newResponse);
            _context.SaveChanges();
        }

        public void AcceptResponse(AcceptedResponseFormData formData)
        {
            AcceptedResponse acceptedOffer = new AcceptedResponse();
            acceptedOffer.CallerId = formData.CallerId;
            acceptedOffer.ChosenResponseId = formData.ResponseId;
            acceptedOffer.ChosenOfferId = formData.OfferId;
            acceptedOffer.ChosenOrderId = formData.OrderId;

            var order = _context.Orders.Include(o => o.Responses).FirstOrDefault(o => o.Id == formData.OrderId);
            order.OrderStatus = OrderStatus.InProgress;
            foreach (var response in order.Responses)
            {
                response.ResponseStatus = ResponseStatus.Rejected;
            }
            order.Responses.FirstOrDefault(r => r.Id == formData.ResponseId).ResponseStatus = ResponseStatus.Accepted;
            //var acceptedResponse = _context.Responses.FirstOrDefault(r => r.Id == formData.ResponseId);
            //acceptedResponse.ResponseStatus = ResponseStatus.Accepted;

            _context.AcceptedResponses.Add(acceptedOffer);
            _context.SaveChanges();
        }


    }
}
