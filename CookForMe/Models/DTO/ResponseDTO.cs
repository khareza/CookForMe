using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.Models.DTO
{
    public class ResponseDTO
    {
        public int ResponseId { get; set; }
        public int? OrderId { get; set; }
        public DateTime OrderCreationDate { get; set; }
        public DateTime OrderDeadline { get; set; }
        public string OrderIngredientsPhotoUrl { get; set; }
        public List<string> OrderIngredientsAvaiableList { get; set; }
        public string OrderDescription { get; set; }
        public List<RecipeDTO> Recipes { get; set; }
        public string ResponseStatus { get; set; }

    }
}
