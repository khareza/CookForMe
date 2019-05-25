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
        }

        public List<Order> GetAll()
        {
            return _context.Orders.ToList();
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
