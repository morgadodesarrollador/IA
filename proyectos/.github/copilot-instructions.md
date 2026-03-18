## Instrucciones para agentes de codificación (Copilot / AI)

Propósito
- Proveer a los agentes de IA información accionable y específica para ser productivos en este repositorio.

Contexto actual
- Al momento de generar este archivo no se detectaron archivos de proyecto en el workspace. Esto significa que no hay ejemplos recorables para extraer patrones concretos. Si el repositorio contiene código, por favor sube/sincroniza los archivos o indica la ruta para re-evaluar y actualizar estas instrucciones con ejemplos reales.

Reglas rápidas (usar siempre)
- Al iniciar, listar y analizar (en este orden): `README.md`, `package.json` / `pyproject.toml` / `pom.xml`, `src/`, `tests/`, `Dockerfile`, `.github/workflows/`.
- No adivinar comandos: si no hay `package.json` o `Makefile`, preguntar antes de ejecutar o proponer comandos.
- Cuando propongas cambios, incluye: motivos breves, archivos modificados y pruebas mínimas (build + test) para validar.

Qué buscar primero (preguntas con prioridad)
1. ¿Cuál es el comando de build y test? (ej.: `npm test`, `pytest`, `mvn test`, `go test`)
2. ¿Hay configuraciones CI en `.github/workflows/` que muestren pasos automáticos?
3. ¿Dónde están las entradas principales/servicios (`src/main`, `app.py`, `index.js`)?
4. ¿Existen scripts de inicio (`start`, `serve`, `dev`) en manifiestos?

Patrones y convenciones esperadas (plantilla — completar con ejemplos reales)
- Estructura de carpetas: `src/` para código, `tests/` para pruebas, `docs/` para documentación.
- Mensajes de commit: estilo conventional commits (ej.: `feat:`, `fix:`) — si el repositorio usa otro estilo, reemplazar.
- Branching: ramas `main`/`master` protegidas; crear PRs por rama `feature/*` o `fix/*`.

Integraciones y puntos de contacto (rellenar con valores del repo)
- Dependencias externas habituales: [rellenar — p. ej. DockerHub image names, servicios remotos, bases de datos].
- Variables de entorno críticas: DATABASE_URL, API_KEY, etc. (buscar `.env.example` o docs).

Checklist mínimo antes de proponer PRs
- Ejecutar build localmente sin errores.
- Ejecutar suite de tests (o agregar tests si corresponde) y documentar resultados.
- Asegurar que linters/formatters pasan (ej.: `eslint --fix`, `black .`, `golangci-lint run`).

Prompts útiles para explorar el repo (ejemplos que el humano puede pedir)
- "Muestra los archivos y dependencias usados por el proyecto."  
- "Encuentra el punto de entrada de la aplicación y explica el flujo de inicialización."  
- "Busca y resume los workflows en `.github/workflows/` y qué comandos ejecutan."

Cómo actualizar este archivo
- Si agregas/actualizas archivos del proyecto, pide al agente que re-escanee el repo y fusione ejemplos reales en las secciones de "Patrones" e "Integraciones".

Solicito feedback
- Indica las rutas de los archivos del proyecto o sube el contenido para que actualice esta guía con ejemplos concretos y comandos reales.
