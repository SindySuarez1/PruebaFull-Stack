const extraerMensajesLimpios = (errorData) => {
  const mensajes = [];
  
  // Si tiene estructura de errores de FluentValidation
  if (errorData.errors && typeof errorData.errors === 'object') {
    for (const campo in errorData.errors) {
      const erroresCampo = errorData.errors[campo];
      if (Array.isArray(erroresCampo)) {
        erroresCampo.forEach(msg => {
          if (typeof msg === 'string') {
            mensajes.push(msg);
          }
        });
      } else if (typeof erroresCampo === 'string') {
        mensajes.push(erroresCampo);
      }
    }
  }
  
  return mensajes.length > 0 ? mensajes.join('\n') : null;
};

const baseUrl = process.env.REACT_APP_API_URL || "https://localhost:7273";
const API_URL = `${baseUrl}/api/Personas`;

export const crearPersona = async (persona) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(persona)
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type") || "";

    // Intentar parsear JSON aunque sea problem+json
    if (contentType.includes("json")) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (_) {
        // Si no se pudo parsear, seguimos al texto plano
      }

      if (errorData) {
        if (errorData.errors && typeof errorData.errors === "object") {
          const mensajes = [];
          for (const campo in errorData.errors) {
            const erroresCampo = errorData.errors[campo];
            if (Array.isArray(erroresCampo)) mensajes.push(...erroresCampo);
          }
          if (mensajes.length > 0) {
            throw new Error(mensajes.join("\n"));
          }
        }

        if (errorData.detail) throw new Error(errorData.detail);
        if (errorData.title) throw new Error(errorData.title);
        if (errorData.message) throw new Error(errorData.message);
      }
    }

    // Respuesta de texto plano o fallback
    const textoError = await response.text().catch(() => "");
    if (textoError) throw new Error(textoError);

    throw new Error("Error al crear persona");
  }

  return response.json();
};

export const obtenerPersonas = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    let message = "Error al obtener personas";
    try {
      const err = await response.json();
      message = err?.message || JSON.stringify(err);
    } catch (_) {}
    throw new Error(message);
  }
  return response.json();
};

export const actualizarPersona = async (id, persona) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(persona)
  });

  if (!response.ok) {
    let message = "Error al actualizar persona";
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const err = await response.json();
        message = err?.message || err?.title || JSON.stringify(err);
      } else {
        const textError = await response.text();
        message = textError || message;
      }
    } catch (_) {}
    throw new Error(message);
  }

  return response.json();
};

export const eliminarPersona = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    let message = "Error al eliminar persona";
    try {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const err = await response.json();
        message = err?.message || err?.title || JSON.stringify(err);
      } else {
        const textError = await response.text();
        message = textError || message;
      }
    } catch (_) {}
    throw new Error(message);
  }

  return true;
};
