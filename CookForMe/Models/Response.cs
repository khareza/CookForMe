using System.Collections.Generic;

namespace CookForMe.Models
{

    public enum ResponseStatus
    {
        Active,
        Rejected,
        Accepted
    }

    public class Response
    {
        public int Id { get; set; }
        public string ResponserId { get; set; }
        public AppUser Responser { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public List<Offer> Offers { get; set; }
        public ResponseStatus ResponseStatus { get; set; }
        public AcceptedOffer AcceptedResponse { get; set; }
    }
}
