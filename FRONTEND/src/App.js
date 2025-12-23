import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FormularioA from "./pages/FormularioA";
import FormularioB from "./pages/FormularioB";
import Listado from "./pages/Listado";
import { obtenerPersonas, crearPersona } from "./services/personaService";

function App() {
  const [personasA, setPersonasA] = useState([]);
  const [personasB, setPersonasB] = useState([]);

  // Cargar personas del API al montar el componente
  useEffect(() => {
    cargarPersonasA();
  }, []);

  const cargarPersonasA = async () => {
    try {
      const data = await obtenerPersonas();
      setPersonasA(data);
    } catch (error) {
      console.error("Error al cargar personas del API:", error);
    }
  };

  // Handlers para FormularioA (API)
  const handleCrearA = async (persona) => {
    try {
      const nuevaPersona = await crearPersona(persona);
      setPersonasA([...personasA, nuevaPersona]);
      return { success: true, persona: nuevaPersona };
    } catch (error) {
      throw error;
    }
  };

  const handleActualizarA = async (id, persona) => {
    try {
      const { actualizarPersona } = await import("./services/personaService");
      await actualizarPersona(id, persona);
      setPersonasA(
        personasA.map((p) => (p.id === id ? { ...p, ...persona } : p))
      );
      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  const handleEliminarA = async (id) => {
    try {
      const { eliminarPersona } = await import("./services/personaService");
      await eliminarPersona(id);
      setPersonasA(personasA.filter((p) => p.id !== id));
      return { success: true };
    } catch (error) {
      throw error;
    }
  };

  // Handlers para FormularioB (Estado local)
  const handleCrearB = (persona) => {
    const correo = (persona.correo || "").trim().toLowerCase();
    const documento = (persona.documento || "").trim();

    const correoDuplicadoLocal = personasB.some(
      (p) => (p.correo || "").trim().toLowerCase() === correo
    );
    const documentoDuplicadoLocal = personasB.some(
      (p) => (p.documento || "").trim() === documento
    );

    const correoDuplicadoApi = personasA.some(
      (p) => (p.correo || "").trim().toLowerCase() === correo
    );
    const documentoDuplicadoApi = personasA.some(
      (p) => (p.documento || "").trim() === documento
    );

    if (correoDuplicadoLocal || correoDuplicadoApi) {
      throw new Error("Ya existe una persona con el mismo correo (local o API)");
    }
    if (documentoDuplicadoLocal || documentoDuplicadoApi) {
      throw new Error("Ya existe una persona con el mismo documento (local o API)");
    }

    setPersonasB([...personasB, { ...persona, id: Date.now() }]);
    return { success: true };
  };

  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-link">Formulario A</Link>
          <Link to="/form-b" className="nav-link">Formulario B</Link>
          <Link to="/listado" className="nav-link">Listado</Link>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<FormularioA onGuardar={handleCrearA} />} />
          <Route 
            path="/form-b" 
            element={
              <FormularioB 
                personas={personasB} 
                onGuardar={handleCrearB} 
              />
            } 
          />
          <Route 
            path="/listado" 
            element={
              <Listado 
                personasA={personasA}
                personasB={personasB}
                onActualizarA={handleActualizarA}
                onEliminarA={handleEliminarA}
              />
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
