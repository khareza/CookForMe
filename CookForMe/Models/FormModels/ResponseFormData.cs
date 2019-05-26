using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.Models.FormModels
{
    public class ResponseFormData
    {
        public int OrderId { get; set; }
        public string ResponserId { get; set; }
        public string RecipeName { get; set; }
        public decimal RecipePrice { get; set; }
        public string RecipeAvgCookTime { get; set; }

    }
}
