using CookForMe.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.DAL
{
    public class ResponseService
    {
        private AuthenticationContext _context;

        public ResponseService(AuthenticationContext context)
        {
            _context = context;
        }

        public List<Response> GetResponsesOfSpecificOrder(int id)
        {
            return _context.Responses.Where(x => x.Id == id).ToList();
        }

        public List<Response> GetUserResponses(string id)
        {
            return _context.Responses.Include(x=>x.Recipes).Where(x => x.Responser.Id == id).ToList();
        }

        public void Create(Response newResponse)
        {
            _context.Responses.Add(newResponse);
            _context.SaveChanges();
        }

    }
}
