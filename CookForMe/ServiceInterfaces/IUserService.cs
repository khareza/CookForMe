using CookForMe.Models.DTO;
using CookForMe.Models.FormModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.ServiceInterfaces
{
    public interface IUserService
    {
        void RateUser(RateUserFormData formData);
        RatingDTO GetUserRating(string userId);
    }
}
