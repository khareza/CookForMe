using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.Models.DTO
{
    public class AcceptedResponseDTO
    {
        public int OfferId { get; set; }
        public ResponseDTO Response { get; set; }
        public AppUserDTO AppUser { get; set; }
    }
}
