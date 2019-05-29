using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.Models.FormModels
{
    public class ResponseFormData
    {
        public int OrderId { get; set; }
        public List<Offer> Offers { get; set; }
        public string ResponserId { get; set; }

    }
}
