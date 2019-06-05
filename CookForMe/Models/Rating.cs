using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public string UserRatingId { get; set; }
        public AppUser UserRating{ get; set; }
        public string UserRatedId { get; set; }
        public AppUser UserRated { get; set; }
        public decimal Rate { get; set; }
    }
}
