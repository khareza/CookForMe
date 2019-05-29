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

        public AuthenticationContext(DbContextOptions options) : base(options)
        {
            this.Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Response>()
                .HasMany(r => r.Offers)
                .WithOne(r => r.Response)
                .HasForeignKey(r => r.ResponseId);

            modelBuilder.Entity<Order>()
                .HasMany(o => o.Responses)
                .WithOne(r => r.Order)
                .HasForeignKey(r => r.OrderId);

            modelBuilder.Entity<AppUser>()
                .HasMany(a => a.Responses)
                .WithOne(r => r.Responser)
                .HasForeignKey(r => r.ResponserId);

            modelBuilder.Entity<AppUser>()
                .HasMany(a => a.MadeOrders)
                .WithOne(o=> o.Founder)
                .HasForeignKey(o => o.FounderId);

            modelBuilder.Entity<AppUser>()
                .Property(a=>a.Rating)
                .HasColumnType("decimal(5, 2)");
        }

    }
}
