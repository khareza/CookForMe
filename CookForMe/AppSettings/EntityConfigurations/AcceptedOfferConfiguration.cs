using CookForMe.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.AppSettings.EntityConfigurations
{
    public class AcceptedOfferConfiguration : IEntityTypeConfiguration<AcceptedOffer>
    {
        public void Configure(EntityTypeBuilder<AcceptedOffer> builder)
        {
            //AccpetedOffers/Response 1-1
            builder
                .HasOne(ao => ao.ChosenResponse)
                .WithOne(r => r.AcceptedResponse)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey<AcceptedOffer>(ao => ao.ChosenResponseId);

            //AccpetedOffers/Order 1-1
            builder
                .HasOne(ao => ao.ChosenOffer)
                .WithOne(o => o.AcceptedOffer)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey<AcceptedOffer>(ao => ao.ChosenOfferId);

        }
    }
}
