using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.Models.FormModels
{
    public class AcceptedResponseFormData
    {
        public string CallerId { get; set; }
        public int ResponseId { get; set; }
        public int OfferId { get; set; }
        public int OrderId { get; set; }
    }
}
