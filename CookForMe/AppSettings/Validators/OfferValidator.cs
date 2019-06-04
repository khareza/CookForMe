using CookForMe.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CookForMe.AppSettings.Validators
{
    public class OfferValidator : AbstractValidator<Offer>
    {
        readonly Regex nameRegex = new Regex(@"^[a-zA-Z]*$");
        readonly Regex priceRegex = new Regex(@"^\d*(\.\d{1,2})?$");
        public OfferValidator()
        {
            RuleFor(offer => offer.Name)
                .NotNull()
                .WithMessage("Enter offer name")
                .NotEmpty()
                .WithMessage("Enter offer name")
                .Matches(nameRegex)
                .WithMessage("Enter correct name");

            RuleFor(offer => offer.Price)
                .NotNull()
                .WithMessage("Enter offer price")
                .NotEmpty()
                .WithMessage("Enter offer price")
                .GreaterThanOrEqualTo(0)
                .WithMessage("Price can't be negative");

            RuleFor(offer => offer.AvgCookTime)
                .NotNull()
                .WithMessage("Enter offer cook time")
                .NotEmpty()
                .WithMessage("Enter offer cook time");
        }
    }
}
