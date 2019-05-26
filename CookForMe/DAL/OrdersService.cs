using CookForMe.Models;
using CookForMe.Models.FormModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.DAL
{
    public class OrdersService
    {
        private AuthenticationContext _context;

        public OrdersService(AuthenticationContext context)
        {
            _context = context;
            //_context.Database.EnsureDeleted();
            //_context.Database.EnsureCreated();
        }

        public List<Order> GetAll(string id)
        {
            return _context.Orders.Where(x=>x.Founder.Id != id).ToList();
        }

        public List<Order> GetMyOrders(string id)
        {
            return _context.Orders.Where(x => x.Founder.Id == id).ToList();
        }

        public Order Get(int id)
        {
            var order = _context.Orders.FirstOrDefault(o => o.Id == id);
            return order;
        }


        public void Create(Order newOrder)
        {
            _context.Orders.Add(newOrder);
            _context.SaveChanges();
        }

        public Order Delete(int orderId)
        {
            var orderToDelete = _context.Orders.FirstOrDefault(o => o.Id == orderId);
            if (orderToDelete == null)
            {
                return null;
            }
            _context.Orders.Remove(orderToDelete);
            _context.SaveChanges();

            return orderToDelete;
        }

        public Order Edit(OrderFormData formData)
        {
            var order = _context.Orders.FirstOrDefault(o => o.Id == formData.OrderId);

            if (order != null)
            {
                //use object mapper here :)

                order.Deadline = formData.Deadline;
                order.IngredientsAvaiable = formData.IngredientsAvaiableList;
                order.Description = formData.Description;
                order.IngredientsPhotoUrl = formData.PhotoUrl;
                _context.SaveChanges();
                return order;
            }
            else
            {
                return null;
            }
        }
    }
}
