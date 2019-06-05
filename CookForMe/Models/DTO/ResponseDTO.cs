using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.Models.DTO
{
    public class ResponseDTO
    {
        public int Id { get; set; }
        public OrderDTO Order { get; set; }
        public List<OfferDTO> Offers { get; set; }
        public string ResponseStatus { get; set; }
    }
}
