import { useState } from "react";

const Listado = ({ personasA, personasB, onActualizarA, onEliminarA }) => {
  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(null);
  const [formEdit, setFormEdit] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    documento: ""
  });

  // Consolidar personas de ambos orígenes
  const consolidado = [
    ...personasA.map((p) => ({ ...p, origen: "API (Formulario A)" })),
    ...personasB.map((p) => ({ ...p, origen: "Local (Formulario B)" }))
  ];

  // Filtrar por búsqueda
  const filtradas = consolidado.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleEliminar = async (id, origen) => {
    if (origen !== "API (Formulario A)") {
      alert("Solo se pueden eliminar personas del Formulario A (API)");
      return;
    }

    if (window.confirm("¿Estás seguro de eliminar esta persona?")) {
      try {
        await onEliminarA(id);
        alert(" Persona eliminada correctamente");
      } catch (error) {
        alert(" Error al eliminar: " + (error.message || "Error desconocido"));
      }
    }
  };

  const iniciarEdicion = (persona) => {
    if (persona.origen !== "API (Formulario A)") {
      alert("Solo se pueden editar personas del Formulario A (API)");
      return;
    }
    setEditando(persona.id);
    setFormEdit({
      nombre: persona.nombre,
      apellido: persona.apellido,
      correo: persona.correo,
      documento: persona.documento
    });
  };

  const handleChangeEdit = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value
    });
  };

  const handleActualizar = async (id) => {
    try {
      await onActualizarA(id, formEdit);
      alert(" Persona actualizada correctamente");
      setEditando(null);
    } catch (error) {
      alert(" Error al actualizar: " + (error.message || "Error desconocido"));
    }
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setFormEdit({ nombre: "", apellido: "", correo: "", documento: "" });
  };

  return (
    <div className="page-container">
      <h1>Listado Consolidado</h1>
      <p className="subtitle">
        Personas del Formulario A (API): <strong>{personasA.length}</strong> | 
        Personas del Formulario B (Local): <strong>{personasB.length}</strong>
      </p>

      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-input"
        />
      </div>

      {filtradas.length === 0 ? (
        <p className="empty-message">No hay personas para mostrar</p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Documento</th>
                <th>Origen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtradas.map((p) => (
                <tr key={`${p.origen}-${p.id}`}>
                  {editando === p.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="nombre"
                          value={formEdit.nombre}
                          onChange={handleChangeEdit}
                          className="input-edit"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="apellido"
                          value={formEdit.apellido}
                          onChange={handleChangeEdit}
                          className="input-edit"
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          name="correo"
                          value={formEdit.correo}
                          onChange={handleChangeEdit}
                          className="input-edit"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="documento"
                          value={formEdit.documento}
                          onChange={handleChangeEdit}
                          className="input-edit"
                        />
                      </td>
                      <td>
                        <span className="badge badge-api">API</span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleActualizar(p.id)}
                          className="btn btn-success btn-sm"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={cancelarEdicion}
                          className="btn btn-secondary btn-sm"
                        >
                          Cancelar
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{p.nombre}</td>
                      <td>{p.apellido}</td>
                      <td>{p.correo}</td>
                      <td>{p.documento}</td>
                      <td>
                        <span
                          className={
                            p.origen === "API (Formulario A)"
                              ? "badge badge-api"
                              : "badge badge-local"
                          }
                        >
                          {p.origen === "API (Formulario A)" ? "API" : "Local"}
                        </span>
                      </td>
                      <td>
                        {p.origen === "API (Formulario A)" && (
                          <>
                            <button
                              onClick={() => iniciarEdicion(p)}
                              className="btn btn-primary btn-sm"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleEliminar(p.id, p.origen)}
                              className="btn btn-danger btn-sm"
                            >
                              Eliminar
                            </button>
                          </>
                        )}
                        {p.origen === "Local (Formulario B)" && (
                          <span className="text-muted">Solo lectura</span>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Listado;
