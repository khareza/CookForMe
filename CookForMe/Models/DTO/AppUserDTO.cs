using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.Models.DTO
{
    public class AppUserDTO
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string PhoneNumber { get; set; }
    }
}
