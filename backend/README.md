# Lubix - Backend

Backend con base de datos para el proyecto Lubix, desarrollado por **Yeinher Algarin**.

## Descripción
Este proyecto sirve como backend para Lubix, implementando operaciones CRUD y conexión con base de datos PostgreSQL.  
Se implementa autenticación y gestión de datos utilizando FastAPI y SQLAlchemy.

version alpha V.0.1

## Tecnologías y Herramientas

| Tecnología / Herramienta | Uso |
|--------------------------|-----|
| Python 3.14.3 | Lenguaje principal del backend |
| venv | Entorno virtual para Python |
| FastAPI | Framework para APIs (CRUD) |
| Uvicorn | Servidor ASGI para correr FastAPI |
| SQLAlchemy | ORM (Object Relational Mapping) para manejar la base de datos |
| PostgreSQL 18.3 | Base de datos relacional |
| psycopg2-binary | Driver para conexión con PostgreSQL |
| python-dotenv | Leer variables de entorno desde archivos `.env` |

## Estructura de Carpetas

```text
LUBIX-BACKEND/
│
├─ app/
│  ├─ main.py             # Entrada principal de la aplicación FastAPI
│  ├─ database/
|  |  └─ connection.py    # Configuracion de la base de datos
│  ├─ docs/
|  |  └─ ENDPOINTS.md     # documentacion de endpoints
|  ├─ models/
|  |  ├─__init__.py       # Iniciar modelos
|  |  ├─company.py        # Define la tabla empresa
|  |  └─ user.py          # Define la tabla usuario
│  ├─ routers/            # Carpeta con routers de endpoints
│  |   └─ user.py         # routers usuario
│  ├─ schemas/            # Estructura de entrada y salida de datos en la api
|  |  ├─company.py        
|  |  └─user.py           
|  └─ utils/
|     ├─ testDatabase.py  # Prueba de conexion de base de datos
|     └─ jwt.py           # JSON WEB TOKEN (generar tokens ) no implementado todavia...
├─ .env                   # Variables de entorno
├─ requirements.txt       # Dependencias del proyecto
├─ README.md              # Documentación del proyecto
└─ venv/                  # Entorno virtual de Python
```


## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. **Clonar el repositorio**  
   ```bash
   git clone https://github.com/RehnieyAl/LUBIX-BACKEND.git
   cd LUBIX-BACKEND
   ```
   
2. **Activar entorno virtual venv**
    ```bash
    python -m venv venv
    ```
2.1 **linux/macOS**
    ```bash
    source venv/bin/activate
    ``` 
2.2 **windows**
    ```bash
    venv\Scripts\activate
    ```
3 **Instalar dependencias**
    ```bash
    pip install -r requierements.txt
    ```

4. **Crear archivo .env afuera de la carpeta app y añadir este codigo**
    ```bash
    URL_DATABASE = "postgresql://tu_usuario_en_posgresql:contraseña@localhost:tupuerto/tubasededatos"
    ```
5. **Iniciar servidor backend**
    ```bash
    cd app
    uvicorn main:app --reload
    ```
## Backend hecho por mi
