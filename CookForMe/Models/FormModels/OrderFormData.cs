using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.Models.FormModels
{
    public class OrderFormData
    {
        public string FounderId { get; set; }
        public int OrderId { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string PhotoUrl { get; set; }
       // public IFormFile Photo { get; set; }
        public string IngredientsAvaiableList { get; set; }
        public string Description { get; set; }
    }
}
