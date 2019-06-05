using AutoMapper;
using CookForMe.Models;
using CookForMe.Models.DTO;
using CookForMe.Models.FormModels;
using CookForMe.ServiceInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.DAL
{
    public class UserService : IUserService
    {
        private AuthenticationContext _context;
        private readonly IMapper _mapper;

        public UserService(AuthenticationContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public RatingDTO GetUserRating(string userId)
        {
            var ratings = _context.Rating.Where(r => r.UserRatedId == userId).ToList();

            RatingDTO ratingInfo = new RatingDTO();
            ratingInfo.RatesAmount = ratings.Count;
            ratingInfo.Rate = ratings.Count > 0 ? ratings.Average(x => x.Rate) : 0;

            return ratingInfo;
        }

        public void RateUser(RateUserFormData formData)
        {
            var ratings = _context.Rating.Where(r => r.UserRatedId == formData.UserRatedId).ToList();
            Rating rating = new Rating();
            rating.Rate = formData.Rate;
            rating.UserRatedId = formData.UserRatedId;
            rating.UserRatingId = formData.UserRatingId;
            if (ratings.Any(x=>x.UserRatingId == formData.UserRatingId))
            {
                ratings.First(x => x.UserRatingId == formData.UserRatingId).Rate = formData.Rate;
            }
            else
            {
                _context.Rating.Add(rating);
            }
            _context.SaveChanges();
        }

    }
}
