import FormularioBase from "../components/FormularioBase";

const FormularioA = ({ onGuardar }) => {
  const handleSubmit = async (persona) => {
    try {
      const resultado = await onGuardar(persona);
      if (resultado.success) {
        alert(" Persona guardada correctamente en el API");
      }
    } catch (error) {
      alert(" Error al guardar: " + (error.message || "Error desconocido"));
    }
  };

  return (
    <div className="page-container">
      <h1>Formulario A - Almacenamiento en API</h1>
      <p className="subtitle">Los datos se guardan en el backend (ASP.NET Core)</p>
      <FormularioBase
        titulo="Ingresa los datos de la persona"
        onGuardar={handleSubmit}
      />
    </div>
  );
};

export default FormularioA;
