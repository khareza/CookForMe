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
                .NotEmpty();

            RuleFor(orderForm => orderForm.OrderId)
                .GreaterThan(0);

            RuleFor(orderForm => orderForm.ExpirationDate)
                .GreaterThan(DateTime.Now);
        }
    }
}
