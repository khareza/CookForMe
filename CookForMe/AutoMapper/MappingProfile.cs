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
                .ForMember(dest => dest.ResponseStatus, opt => opt.MapFrom(src => src.ResponseStatus.ToString()));

            CreateMap<Response, ShortResponseDTO>()
                .ForMember(dest => dest.ResponseId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.ResponseStatus, opt => opt.MapFrom(src => src.ResponseStatus.ToString()));

            CreateMap<Offer, OfferDTO>();

            CreateMap<Order, OrderDTO>();

            CreateMap<AppUser, AppUserDTO>();
        }
    }
}
