using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.Models.FormModels
{
    public class EditResponseFormData
    {
        public int Id { get; set; }
        public List<Offer> Offers { get; set; }
    }
}
