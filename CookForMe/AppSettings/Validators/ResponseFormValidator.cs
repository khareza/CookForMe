using CookForMe.Models.FormModels;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.AppSettings.Validators
{
    public class ResponseFormValidator : AbstractValidator<ResponseFormData>
    {
        public ResponseFormValidator()
        {
            RuleFor(responseForm => responseForm.OrderId)
                .GreaterThan(0)
                .WithMessage("Select order");

            RuleFor(responseForm => responseForm.Offers)
                .NotEmpty()
                .WithMessage("Enter list of offers")
                .NotNull()
                .WithMessage("Enter list of offers");

            RuleForEach(responseForm => responseForm.Offers).SetValidator(new OfferValidator());

            RuleFor(responseForm => responseForm.ResponserId)
                .NotEmpty()
                .WithMessage("User is invalid")
                .NotNull()
                .WithMessage("User is invalid");
        }
    }
}
