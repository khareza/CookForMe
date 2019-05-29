using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace CookForMe.Models
{
    public enum OrderStatus
    {
        Active,
        Cancel,
        Finished,
        InProgress
    }

    public class Order
    {
        public int Id { get; set; }
        public string FounderId { get; set; }
        public AppUser Founder { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime Deadline { get; set; }
        public string IngredientsPhotoUrl { get; set; }
        public OrderStatus OrderStatus { get; set; }
        [NotMapped]
        public List<string> IngredientsAvaiableList
        {
            get { return IngredientsAvaiable.Split(',').ToList(); }
            set { IngredientsAvaiable = string.Join(',', value); }
        }
        public string IngredientsAvaiable { get; set; }

        // public List<string> IngredientsAvaiable { get; set; }
        public List<Response> Responses { get; set; }
        public string Description { get; set; }

    }
}
