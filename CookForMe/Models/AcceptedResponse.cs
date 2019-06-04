using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.Models
{
    public class AcceptedResponse
    {
        public int Id { get; set; }
        public string CallerId { get; set; }
        public AppUser Caller { get; set; }
        public int ChosenResponseId { get; set; }
        public Response ChosenResponse { get; set; }
        public int ChosenOfferId { get; set; }
        public Offer ChosenOffer { get; set; }
        public int ChosenOrderId { get; set; }
        public Order ChosenOrder { get; set; }
    }
}
