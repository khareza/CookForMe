using CookForMe.Models;
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
            return _context.Orders.Where(x => x.Id == id).FirstOrDefault().Responses;
        }

        public List<Response> GetUserResponses(string id)
        {
            return _context.Responses.Where(x => x.Responser.Id == id).ToList();
        }

        public void Create(Response newResponse,int orderId)
        {
            var order = _context.Orders.FirstOrDefault(x=>x.Id == orderId);
            order.Responses.Add(newResponse);
            _context.SaveChanges();
        }

        //public Order Delete(int orderId)
        //{
        //    var orderToDelete = _context.Orders.FirstOrDefault(o => o.Id == orderId);
        //    if (orderToDelete == null)
        //    {
        //        return null;
        //    }
        //    _context.Orders.Remove(orderToDelete);
        //    _context.SaveChanges();

        //    return orderToDelete;
        //}

        //public Order Edit(OrderFormData formData)
        //{
        //    var order = _context.Orders.FirstOrDefault(o => o.Id == formData.OrderId);

        //    if (order != null)
        //    {
        //        //use object mapper here :)

        //        order.Deadline = formData.Deadline;
        //        order.IngredientsAvaiable = formData.IngredientsAvaiableList;
        //        order.Description = formData.Description;
        //        order.IngredientsPhotoUrl = formData.PhotoUrl;
        //        _context.SaveChanges();
        //        return order;
        //    }
        //    else
        //    {
        //        return null;
        //    }
        //}
    }
}
