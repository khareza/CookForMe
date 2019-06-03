using CookForMe.Models.FormModels;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CookForMe.AppSettings.Validators
{
    public class LoginFormValidator : AbstractValidator<LoginFormData>
    {
        public LoginFormValidator()
        {
            RuleFor(loginForm => loginForm.UserName)
                .NotNull()
                .NotEmpty()
                .WithMessage("Enter username");

            RuleFor(loginForm => loginForm.Password)
                .NotNull()
                .NotEmpty()
                .WithMessage("Enter password");
        }
    }
}
