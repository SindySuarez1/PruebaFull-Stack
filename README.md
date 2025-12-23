# PruebaTecnicaFull-Stack

Este repositorio contiene el Backend en ASP.NET Core y el Frontend en React para la gestión de Personas.

## Backend (ASP.NET Core)

Características:
- CRUD de Personas (Nombre, Apellido, Correo, Documento)
- Validaciones con FluentValidation (unicidad de correo y documento)
- CORS habilitado para `http://localhost:3000`
- Repositorio en memoria (sin BD)
- Swagger/OpenAPI para documentación

Requisitos:
- .NET 7.0 SDK o superior
- Visual Studio 2022 / VS Code / Rider

Cómo ejecutar:
1. Restaurar dependencias: `dotnet restore`
2. Ejecutar la API: `dotnet run`
3. Swagger: abrir `https://localhost:7273/swagger`
4. CORS: configurado para `http://localhost:3000` (ajustar en `Program.cs` si es necesario)

Solución de problemas:
- Certificado HTTPS: `dotnet dev-certs https --trust`
- Puerto ocupado: cambiar en `Properties/launchSettings.json`
- CORS bloqueado: verificar que el frontend use `http://localhost:3000`

## Frontend (React)

Requisitos:
- Node.js 18+
- npm 9+

Cómo ejecutar:
1. Instalar dependencias: `npm install`
2. Desarrollo: `npm start` y abrir `http://localhost:3000`
3. Producción: `npm run build`

Descripción funcional:
- Formulario A: crea personas en la API (valida unicidad en backend)
- Formulario B: crea personas en estado local validando contra registros locales y del API
- Listado: búsqueda por nombre, muestra origen (API o local), edición/eliminación solo para registros del API

---

Notas del proyecto:
- Este README reemplaza el texto por defecto de Create React App.
- Si usas Windows, las advertencias de final de línea (LF/CRLF) son normales; no afectan la ejecución.
