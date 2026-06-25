# Lubix - Backend

Backend con base de datos para el proyecto **Lubix**, desarrollado por **Yeinher Algarin**.

## Descripción

Este proyecto sirve como backend para Lubix, implementando operaciones CRUD y conexión con base de datos PostgreSQL.  
Incluye autenticación, gestión de usuarios y envío de correos electrónicos utilizando FastAPI, SQLAlchemy y SMTP con Gmail.

Version **1.1.2**

## Tecnologías y herramientas

| Tecnología / Herramienta | Uso |
|--------------------------|-----|
| Python 3.13 | Lenguaje principal del backend |
| FastAPI | Framework para construcción de APIs |
| Uvicorn | Servidor ASGI |
| SQLAlchemy | ORM para PostgreSQL |
| Alembic | Migraciones de base de datos |
| PostgreSQL | Base de datos relacional |
| psycopg2-binary | Driver PostgreSQL |
| Pydantic | Validación de datos |
| python-jose | JWT y autenticación |
| bcrypt | Hash de contraseñas |
| SMTP (smtplib) | Envío de correos |
| python-dotenv | Variables de entorno |
| Docker | Contenerización |
| Docker Compose | Orquestación de contenedores |
| MinIO | Para almacenar imagenes, archivos, etc |
| MinIO SDK | Conexión con MinIO |
| UV | Gestión moderna de dependencias |
| pip-audit | Auditoría de CVEs |
| venv | Entorno virtual |

## Funcionalidades implementadas

- Registro de usuarios.
- Inicio de sesión con JWT.
- Middleware de autenticación.
- Encriptación de contraseñas con bcrypt.
- Recuperación de contraseña mediante correo electrónico.
- Verificación de cuenta por correo electrónico.
- Gestión de usuarios.
- Gestión de empresas.
- CRUD mediante FastAPI y SQLAlchemy.
- Migraciones con Alembic.
- Integración con PostgreSQL.
- Integración con MinIO para almacenamiento de archivos.
- Gestión de buckets.
- Almacenamiento de imágenes y documentos.
- Dockerización completa del proyecto.
- Auditoría de dependencias mediante pip-audit.
- Gestión de dependencias con UV.

## Estructura de carpetas

```text
LUBIX-BACKEND/
│
├── database
│      Connection.py
│   └──
├── docs
│   ├── AUDITORIA.md
│   └── ENDPOINTS.md
├── middleware
│   ├── AuthMiddleware.py
│   └── CorsMiddleware.py
├── models
│   ├── __init__.py
│   ├── ModelCode.py
│   ├── ModelCompany.py
│   ├── ModelProduct.py
│   ├── ModelRefreshToken.py
│   ├── ModelRole.py
│   └── ModelUser.py
├── routers
│   ├── AuthRouters.py
│   ├── CardRouters.py
│   ├── CompanyRouter.py
│   └── HealthRouter.py
├── schemas
│   ├── dashboard
│   │   └── SchemaCompany.py
│   ├── SchemaAuthCompany.py
│   ├── SchemaAuthUser.py
│   └── SchemaProduct.py
├── services
│   ├── authentication
│   │   ├── AuthService.py
│   │   └── JWTService.py
│   ├── CompanyServices
│   │   ├── Dasboard.py
│   │   └── Products.py
│   ├── email
│   │   ├── EmailService.py
│   │   ├── SaveAndGenerateCode.py
│   │   └── template
│   │       ├── EmailForgotPassword.py
│   │       ├── EmailRegisterCompany.py
│   │       ├── EmailRegisterUser.py
│   │       └── EmailVerify.py
│   └── NasService.py
├── utils
│   ├── CheckNetwork.py
│   ├── Security.py
│   ├── Config.py
│   ├── seed.py
│   └── TestDatabase.py
├── Config.py
└── main.py
```

## Docker

### 1. Clonar el repositorio

```bash
git clone https://github.com/RehnieyAl/lubix-backend.git
cd lubix-backend
```

### 2. Crear variable de entorno .env con .env.example

```text
Crear archivo .env basado en .env.example
```

Linux/macOS:

```bash
cp .env.example .env
```

Windows:

```powershell
copy .env.example .env
```

### 3. Configurar variables de entorno

Configurar las variables necesarias para:

* PostgreSQL
* JWT
* SMTP
* MinIO

### 4. Construir contenedores

```bash
docker compose build
```

### 5. Levantar contenedores

```bash
docker compose up -d
```

### 6. Ejecutar migraciones dentro del contenedor

Si es la primera migración:

```bash
docker compose exec backend uv run alembic revision --autogenerate -m "Initial migration"
docker compose exec backend uv run alembic upgrade head
```


Si las migraciones ya existen:

```bash
docker compose exec backend uv run alembic upgrade head
```

### IMPORTANTE
```text
!!! IMPORTANTE
despues de ejecutar el servidor backend, edita en tu .env y activa la Seed
para implementar un usuario que es admi, los roles y la categoria de producto
# Seed
RUN_SEED=True
despues apaga el servidor, vuelve ingresar en tu .env y desactiva la Seed,
# Seed
RUN_SEED=False
despues enciende tu servidor y todo debe estar biens
```

### 7. Verificar contenedores

```bash
docker compose ps
```

### 8. Ver logs del backend

```bash
docker compose logs -f backend
```

### 9. Iniciar servidor manualmente (si es necesario)

```bash
docker compose exec backend uv run uvicorn app.main:app --host 0.0.0.0 --port 8001
```

### 9. Si necesitas saber de los endpoints ingresa al siguiente enlace
```text
http://127.0.0.1:8001/docs
```

