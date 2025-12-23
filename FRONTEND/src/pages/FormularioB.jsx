import FormularioBase from "../components/FormularioBase";

const FormularioB = ({ personas, onGuardar }) => {
  const handleSubmit = (persona) => {
    try {
      const resultado = onGuardar(persona);
      if (resultado.success) {
        alert(" Persona guardada en estado local");
      }
    } catch (error) {
      alert(" Error al guardar: " + (error.message || "Error desconocido"));
    }
  };

  return (
    <div className="page-container">
      <h1>Formulario B - Almacenamiento Local</h1>
      <p className="subtitle">Los datos se guardan solo en React (sin backend)</p>
      <FormularioBase
        titulo="Ingresa los datos de la persona"
        onGuardar={handleSubmit}
      />

      <div className="personas-list">
        <h2>Personas guardadas en estado local ({personas.length})</h2>
        {personas.length === 0 ? (
          <p className="empty-message">No hay personas guardadas aún</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Documento</th>
              </tr>
            </thead>
            <tbody>
              {personas.map((p, index) => (
                <tr key={index}>
                  <td>{p.nombre}</td>
                  <td>{p.apellido}</td>
                  <td>{p.correo}</td>
                  <td>{p.documento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FormularioB;
