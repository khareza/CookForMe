﻿using System.ComponentModel.DataAnnotations.Schema;

namespace CookForMe.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string AvgCookTime { get; set; }
        public int ResponseId { get; set; }
        public Response Response { get; set; }
    }
}
