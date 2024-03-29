﻿// <auto-generated />
using System;
using CookForMe.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CookForMe.Migrations
{
    [DbContext(typeof(AuthenticationContext))]
    partial class AuthenticationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CookForMe.Models.AcceptedResponse", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CallerId");

                    b.Property<int>("ChosenOfferId");

                    b.Property<int>("ChosenOrderId");

                    b.Property<int>("ChosenResponseId");

                    b.HasKey("Id");

                    b.HasIndex("CallerId");

                    b.HasIndex("ChosenOfferId")
                        .IsUnique();

                    b.HasIndex("ChosenOrderId")
                        .IsUnique();

                    b.HasIndex("ChosenResponseId")
                        .IsUnique();

                    b.ToTable("AcceptedResponses");
                });

            modelBuilder.Entity("CookForMe.Models.Offer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AvgCookTime");

                    b.Property<string>("Name");

                    b.Property<decimal>("Price");

                    b.Property<int>("ResponseId");

                    b.HasKey("Id");

                    b.HasIndex("ResponseId");

                    b.ToTable("Offers");
                });

            modelBuilder.Entity("CookForMe.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreationDate");

                    b.Property<string>("Description");

                    b.Property<DateTime>("ExpirationDate");

                    b.Property<string>("FounderId");

                    b.Property<string>("IngredientsAvaiable");

                    b.Property<string>("IngredientsPhotoUrl");

                    b.Property<int>("OrderStatus");

                    b.HasKey("Id");

                    b.HasIndex("FounderId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("CookForMe.Models.Rating", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Rate");

                    b.Property<string>("UserRatedId");

                    b.Property<string>("UserRatingId");

                    b.HasKey("Id");

                    b.HasIndex("UserRatedId");

                    b.HasIndex("UserRatingId");

                    b.ToTable("Rating");
                });

            modelBuilder.Entity("CookForMe.Models.Response", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("OrderId");

                    b.Property<int>("ResponseStatus");

                    b.Property<string>("ResponserId");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.HasIndex("ResponserId");

                    b.ToTable("Responses");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityUser");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128);

                    b.Property<string>("Name")
                        .HasMaxLength(128);

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("CookForMe.Models.AppUser", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityUser");

                    b.Property<int>("Age");

                    b.Property<string>("City");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Street");

                    b.HasDiscriminator().HasValue("AppUser");
                });

            modelBuilder.Entity("CookForMe.Models.AcceptedResponse", b =>
                {
                    b.HasOne("CookForMe.Models.AppUser", "Caller")
                        .WithMany("AcceptedOffers")
                        .HasForeignKey("CallerId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CookForMe.Models.Offer", "ChosenOffer")
                        .WithOne("AcceptedOffer")
                        .HasForeignKey("CookForMe.Models.AcceptedResponse", "ChosenOfferId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CookForMe.Models.Order", "ChosenOrder")
                        .WithOne("AcceptedOrder")
                        .HasForeignKey("CookForMe.Models.AcceptedResponse", "ChosenOrderId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CookForMe.Models.Response", "ChosenResponse")
                        .WithOne("AcceptedResponse")
                        .HasForeignKey("CookForMe.Models.AcceptedResponse", "ChosenResponseId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("CookForMe.Models.Offer", b =>
                {
                    b.HasOne("CookForMe.Models.Response", "Response")
                        .WithMany("Offers")
                        .HasForeignKey("ResponseId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("CookForMe.Models.Order", b =>
                {
                    b.HasOne("CookForMe.Models.AppUser", "Founder")
                        .WithMany("MadeOrders")
                        .HasForeignKey("FounderId");
                });

            modelBuilder.Entity("CookForMe.Models.Rating", b =>
                {
                    b.HasOne("CookForMe.Models.AppUser", "UserRated")
                        .WithMany("GivenRates")
                        .HasForeignKey("UserRatedId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("CookForMe.Models.AppUser", "UserRating")
                        .WithMany("GottenRates")
                        .HasForeignKey("UserRatingId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("CookForMe.Models.Response", b =>
                {
                    b.HasOne("CookForMe.Models.Order", "Order")
                        .WithMany("Responses")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CookForMe.Models.AppUser", "Responser")
                        .WithMany("MadeResponses")
                        .HasForeignKey("ResponserId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
