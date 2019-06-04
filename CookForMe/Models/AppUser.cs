using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace CookForMe.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public decimal Rating { get; set; }
        public List<Order> MadeOrders { get; set; }
        public List<Response> MadeResponses { get; set; }
        public List<AcceptedResponse> AcceptedOffers { get; set; }
    }
}
