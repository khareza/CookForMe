using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.Models.FormModels
{
    public class PhotoFormData
    {
        public int OrderId { get; set; }
        public IFormCollection Photo { get; set; }
    }
}
