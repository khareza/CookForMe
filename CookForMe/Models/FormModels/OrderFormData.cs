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
        public DateTime Deadline { get; set; }
        public byte[] IngredientsPhoto { get; set; }
        public List<string> IngredientsAvaiableList { get; set; }
        public string Description { get; set; }
    }
}
