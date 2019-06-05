using CookForMe.AppSettings.EntityConfigurations;
using CookForMe.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.DAL
{
    public class AuthenticationContext : IdentityDbContext
    {

        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<Response> Responses { get; set; }
        public DbSet<AcceptedResponse> AcceptedResponses { get; set; }
        public DbSet<Rating> Rating { get; set; }

        public AuthenticationContext(DbContextOptions options) : base(options)
        {
            this.Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new AcceptedOfferConfiguration());
            modelBuilder.ApplyConfiguration(new AppUserConfiguration());
            modelBuilder.ApplyConfiguration(new OfferConfiguration());
            modelBuilder.ApplyConfiguration(new OrderConfiguration());
            modelBuilder.ApplyConfiguration(new ResponseConfiguration());
        }

    }
}
