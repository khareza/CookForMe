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
        public AppUser Responser { get; set; }
        public Order Order { get; set; }
        public List<Recipe> Recipes { get; set; }
        public ResponseStatus ResponseStatus { get; set; }
    }
}
