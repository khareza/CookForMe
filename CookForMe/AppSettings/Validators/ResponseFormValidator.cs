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
                .GreaterThan(0);

            RuleFor(responseForm => responseForm.Offers)
                .NotEmpty()
                .NotNull();

            RuleFor(responseForm => responseForm.ResponserId)
                .NotEmpty()
                .NotNull();
        }
    }
}
