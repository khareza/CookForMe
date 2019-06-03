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
            RuleFor(editResponse => editResponse.Id).GreaterThan(0);
            RuleFor(editResponse => editResponse.Offers).NotEmpty();
        }
    }
}
