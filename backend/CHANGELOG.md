```md
# Changelog

Todos los cambios importantes de este proyecto serán documentados en este archivo.


## [1.1.1b] - 2026-06-18
- Implementacion de logica de dashboard de comprador y vendedor

## [1.1.1] - 2026-06-16

### Added
- Implementacion de modelos ORM para el proyecto.
    - `company`
    - `products`
    - `catalog`

- Implementacion de esquema relacional entre `Users`, `company` y `products`
- Endpoint para el dasboard para la opcion `Mi perfil` ("/company/me")
- Sistema de aunteticacion con JWT (access + refresh token)
- Soporte de roles para usuario (incluye admin, company, user)
- Implementacion de seed para entrega de produccion (PorFavor leer el readme.md).


### Changed
- Migracion de `ModelEventToken` a ModelRefreshToken para la mejora de session
- Implementacion de try,except + database.rollback() en registro de usuario y empresa para evitar errores de registro en la base de datos.
- Reestructuracion de modelo de base de datos (ORM) para la mejora de las relaciones entre entidades
- Mejora de respuesta api (Response mas consitente)
- Mejora de AuthMiddleware, ya funciona todo 100%

### Fixed
- Correcion de validacion de roles en Authmiddleware

### Security
- Validacion de tokens JWT en endpoints protegidos
- Mejora de verificacion de roles dentro del Authmiddleware
- Auditoría de dependencias con **pip-audit** sin vulnerabilidad critica.


## [1.1.0] - 2026-06-02

### Added
- Integración de **MinIO** para el almacenamiento de archivos.
- Implementación de **pip-audit** para la auditoría de vulnerabilidades (CVE).
- Documentación y comentarios descriptivos en el código.
- Archivo `uv.lock` para garantizar versiones reproducibles.
- Configuración funcional de Docker.

### Changed
- Migración del gestor de paquetes **pip** a **uv**.
- Reemplazo de `requirements.txt` por `pyproject.toml`.
- Estandarización del entorno de desarrollo utilizando uv.

### Security
- Fijación de versiones de dependencias mediante `uv.lock`.
- Auditoría automática de vulnerabilidades con **pip-audit**.

### Infrastructure
- Incorporación de un contenedor dedicado para **MinIO**.
- Mejoras en la configuración Docker.
```md
