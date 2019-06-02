using AutoMapper;
using CookForMe.Models;
using CookForMe.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Response, ResponseDTO>()
                .ForMember(dest => dest.OrderCreationDate, opt => opt.MapFrom(src => src.Order.CreationDate))
                .ForMember(dest => dest.OrderDeadline, opt => opt.MapFrom(src => src.Order.ExpirationDate))
                .ForMember(dest => dest.OrderDescription, opt => opt.MapFrom(src => src.Order.Description))
                .ForMember(dest => dest.OrderIngredientsPhotoUrl, opt => opt.MapFrom(src => src.Order.IngredientsPhotoUrl))
                .ForMember(dest => dest.OrderIngredientsAvaiableList, opt => opt.MapFrom(src => src.Order.IngredientsAvaiableList))
                .ForMember(dest => dest.ResponseStatus, opt => opt.MapFrom(src => src.ResponseStatus.ToString()));

            CreateMap<Response, ShortResponseDTO>()
                .ForMember(dest => dest.ResponseId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.ResponseStatus, opt => opt.MapFrom(src => src.ResponseStatus.ToString()));


            CreateMap<Offer, OfferDTO>();
        }
    }
}
