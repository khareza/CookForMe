using System.Collections.Generic;
using System.Threading.Tasks;
using CookForMe.Models;
using CookForMe.Models.FormModels;
using Microsoft.AspNetCore.Http;

namespace CookForMe.ServiceInterfaces
{
    public interface IOrdersService
    {
        void Create(Order newOrder);
        Order Delete(int orderId);
        Order Edit(OrderFormData formData);
        Order Get(int id);
        List<Order> GetAll(string id);
        List<Order> GetMyOrders(string id);
        Task<string> UploadPhoto(IFormFile photo);
    }
}