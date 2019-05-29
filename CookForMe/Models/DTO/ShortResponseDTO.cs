using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.Models.DTO
{
    public class ShortResponseDTO
    {
        public int ResponseId { get; set; }
        public List<OfferDTO> Offers { get; set; }
        public string ResponseStatus { get; set; }
    }
}
