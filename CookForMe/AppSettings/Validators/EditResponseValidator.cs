using CookForMe.Models.FormModels;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.AppSettings.Validators
{
    public class EditResponseValidator : AbstractValidator<EditResponseFormData>
    {
        public EditResponseValidator()
        {
            RuleFor(editResponse => editResponse.Id)
                .GreaterThan(0)
                .WithMessage("Select order");

            RuleFor(editResponse => editResponse.Offers)
                .NotEmpty()
                .WithMessage("Enter list of offers")
                .NotNull()
                .WithMessage("Enter list of offers");

            RuleForEach(responseForm => responseForm.Offers)
                .Must(offer => offer.Name.Length > 0)
                .WithMessage("Enter offer name");
        }
    }
}
