using Backend.Personas.Api.Models;
using FluentValidation;

public class PersonaValidator : AbstractValidator<Persona>
{
    public PersonaValidator()
    {
        RuleFor(p => p.Nombre)
            .NotEmpty().WithMessage("El nombre es obligatorio")
            .MinimumLength(2);

        RuleFor(p => p.Apellido)
            .NotEmpty().WithMessage("El apellido es obligatorio");

        RuleFor(p => p.Correo)
            .NotEmpty()
            .EmailAddress().WithMessage("Correo no válido");

        RuleFor(p => p.Documento)
            .NotEmpty().WithMessage("El documento es obligatorio");
    }
}
