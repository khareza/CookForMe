using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.Models.FormModels
{
    public class RateUserFormData
    {
        public string UserRatingId { get; set; }
        public string UserRatedId { get; set; }
        public decimal Rate { get; set; }

    }
}
