import React, { useState } from "react";

const FormularioBase = ({ onGuardar, titulo }) => {
  const [persona, setPersona] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    documento: ""
  });

  const handleChange = (e) => {
    setPersona({
      ...persona,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(persona);
    setPersona({ nombre: "", apellido: "", correo: "", documento: "" });
  };

  return (
    <div className="form-container">
      <h2>{titulo}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Nombre</label>
            <input 
              name="nombre" 
              placeholder="Nombre" 
              value={persona.nombre} 
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label>Apellido</label>
            <input 
              name="apellido" 
              placeholder="Apellido" 
              value={persona.apellido} 
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Correo</label>
            <input 
              name="correo" 
              placeholder="Correo" 
              value={persona.correo} 
              onChange={handleChange}
              className="input"
              type="email"
              required
            />
          </div>
          <div className="form-group">
            <label>Documento</label>
            <input 
              name="documento" 
              placeholder="Documento" 
              value={persona.documento} 
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          ✓ Guardar
        </button>
      </form>
    </div>
  );
};

export default FormularioBase;
