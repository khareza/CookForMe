using CookForMe.Models;
using CookForMe.Models.FormModels;
using CookForMe.ServiceInterfaces;
using Imgur.API;
using Imgur.API.Authentication.Impl;
using Imgur.API.Endpoints.Impl;
using Imgur.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.DAL
{
    public class OrdersService : IOrdersService
    {
        private AuthenticationContext _context;

        public OrdersService(AuthenticationContext context)
        {
            _context = context;
        }

        public List<Order> GetAll(string id)
        {
            var allOrders = _context.Orders.Where(x => x.Founder.Id != id);
            return allOrders.Where(x => !x.Responses.Any(o => o.ResponserId == id)).ToList();
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

        public async Task<string> UploadPhoto(IFormFile photo)
        {
            try
            {
                var client = new ImgurClient("0a97710cb62c21f", "2e503f82b29caf7f672fb4ca4ddc3ebb122d5431");
                var endpoint = new ImageEndpoint(client);
                IImage image;
                using (var fs = photo.OpenReadStream())
                {
                    image = await endpoint.UploadImageStreamAsync(fs);
                }
                //var order = _context.Orders.FirstOrDefault(x => x.Id == orderId);
                return image.Link;
            }
            catch (Exception)
            {
                return string.Empty;
            }
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

                order.ExpirationDate = formData.ExpirationDate;
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
