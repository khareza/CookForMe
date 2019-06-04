using CookForMe.Models.FormModels;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CookForMe.AppSettings.Validators
{
    public class RegisterFormValidator : AbstractValidator<RegisterFormData>
    {
        //separate regex in case of double last name: smith-brown??
        readonly Regex firstNameRegex = new Regex(@"^[a-zA-Z]*$");
        readonly Regex usernameRegex = new Regex(@"^[a-zA-Z0-9]*$");
        readonly Regex passwordUppercase = new Regex(@"(?=.*[A-Z])");
        readonly Regex passwordLowerCase = new Regex(@"(?=.*[a-z])");
        readonly Regex passwordDigit = new Regex(@"(?=.*\d)");
        readonly Regex passwordSpecial = new Regex(@"(?=.*\W)");

        public RegisterFormValidator()
        {
            RuleFor(registerForm => registerForm.FirstName)
                .NotNull()
                .WithMessage("Enter first name")
                .NotEmpty()
                .WithMessage("Enter first name")
                .Matches(firstNameRegex)
                .WithMessage("First name cant contain special characters or digits");

            RuleFor(registerForm => registerForm.LastName)
                .NotNull()
                .WithMessage("Enter last name")
                .NotEmpty()
                .WithMessage("Enter last name")
                .Matches(firstNameRegex)
                .WithMessage("Last name cant contain special characters or digits");

            RuleFor(registerForm => registerForm.City)
                .NotNull()
                .WithMessage("Enter city")
                .NotEmpty()
                .WithMessage("Enter city");

            RuleFor(registerForm => registerForm.Street)
                .NotNull()
                .WithMessage("Enter street")
                .NotEmpty()
                .WithMessage("Enter street")
                .Matches(passwordDigit)
                .WithMessage("Enter exact address");


            RuleFor(registerForm => registerForm.UserName)
                .NotNull()
                .NotEmpty()
                .WithMessage("Enter username")
                .MinimumLength(4)
                .WithMessage("Username must be at least 4 characters long")
                .Matches(usernameRegex)
                .WithMessage("Username cant contain special characters");

            RuleFor(registerForm => registerForm.Password)
                .NotNull()
                .NotEmpty()
                .WithMessage("Enter password")
                .MinimumLength(6)
                .WithMessage("Password must be at least 6 characters long")
                .Matches(passwordUppercase)
                .WithMessage("Password must contain uppercase letter.")
                .Matches(passwordLowerCase)
                .WithMessage("Password must contain lowercase letter")
                .Matches(passwordDigit)
                .WithMessage("Password must contain digit")
                .Matches(passwordSpecial)
                .WithMessage("Password must contain special character");
        }
    }
}
