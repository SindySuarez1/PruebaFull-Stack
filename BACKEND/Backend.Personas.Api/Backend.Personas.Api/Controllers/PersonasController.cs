using Microsoft.AspNetCore.Mvc;
using Backend.Personas.Api.Models;
using Backend.Personas.Api.Data;

namespace Backend.Personas.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonasController : ControllerBase
    {
        // CREAR
        [HttpPost]
        public IActionResult Crear([FromBody] Persona persona)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            if (PersonaRepository.Personas.Any(p => p.Documento == persona.Documento))
            {
                return BadRequest("Ya existe una persona con ese documento.");
            }

            if (PersonaRepository.Personas.Any(p => p.Correo == persona.Correo))
            {
                return BadRequest("Ya existe una persona con ese correo.");
            }
           
            persona.Id = Guid.NewGuid();
            PersonaRepository.Personas.Add(persona);
            return Ok(persona);

        }

        // LISTAR PERSONAS
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(PersonaRepository.Personas);
        }

        // BUSCAR POR NOMBRE
        [HttpGet("buscar")]
        public IActionResult BuscarPorNombre([FromQuery] string nombre)
        {
            var resultado = PersonaRepository.Personas
                .Where(p => p.Nombre.Contains(nombre, StringComparison.OrdinalIgnoreCase))
                .ToList();

            return Ok(resultado);
        }

      

        // ACTUALIZAR
        [HttpPut("{id}")]
        public IActionResult Actualizar(Guid id, [FromBody] Persona persona)
        {
            var existente = PersonaRepository.Personas.FirstOrDefault(p => p.Id == id);
            if (existente == null)
                return NotFound();

            existente.Nombre = persona.Nombre;
            existente.Apellido = persona.Apellido;
            existente.Correo = persona.Correo;
            existente.Documento = persona.Documento;

            return Ok(existente);
        }

        // ELIMINAR
        [HttpDelete("{id}")]
        public IActionResult Eliminar(Guid id)
        {
            var persona = PersonaRepository.Personas.FirstOrDefault(p => p.Id == id);
            if (persona == null)
                return NotFound();

            PersonaRepository.Personas.Remove(persona);
            return NoContent();
        }
    }
}

