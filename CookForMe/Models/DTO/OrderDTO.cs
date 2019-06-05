using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.Models.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string IngredientsPhotoUrl { get; set; }
        public string Description { get; set; }
        public List<string> IngredientsAvaiableList { get; set; }
    }
}
