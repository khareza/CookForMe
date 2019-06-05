using CookForMe.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.AppSettings.EntityConfigurations
{
    public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder
               .HasMany(a => a.MadeResponses)
               .WithOne(r => r.Responser)
               .HasForeignKey(r => r.ResponserId);

            builder
               .HasMany(a => a.MadeOrders)
               .WithOne(o => o.Founder)
               .HasForeignKey(o => o.FounderId);

            //AccpetedOffers/AppUsers n-1
            builder
                .HasMany(a => a.AcceptedOffers)
                .WithOne(ao => ao.Caller)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey(ao => ao.CallerId);

            //i rating somebody
            builder
                .HasMany(a => a.GottenRates)
                .WithOne(r=>r.UserRating)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey(r => r.UserRatingId);

            //Somebody rating me
            builder
                .HasMany(a => a.GivenRates)
                .WithOne(r => r.UserRated)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey(r => r.UserRatedId);

            
        }
    }
}
