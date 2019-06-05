using CookForMe.Models.FormModels;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CookForMe.AppSettings.Validators
{
    public class OrderFormValidator : AbstractValidator<OrderFormData>
    {
        public OrderFormValidator()
        {
            RuleFor(orderForm => orderForm.FounderId)
                .NotNull()
                .WithMessage("User is invalid")
                .NotEmpty()
                .WithMessage("User is invalid"); 

            RuleFor(orderForm => orderForm.ExpirationDate)
                .GreaterThan(DateTime.Now)
                .WithMessage("Enter correct date");

            RuleFor(orderForm => orderForm.IngredientsAvaiableList)
                .NotEmpty()
                .WithMessage("Enter list of ingredients")
                .NotNull()
                .WithMessage("Enter list of ingredients");
        }
    }
}
