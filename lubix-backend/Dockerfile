# Este Dockerfile es para una aplicación FastAPI que se ejecutará en un contenedor Docker. 
# Utiliza la imagen base de Python 3.13-slim para mantener el tamaño del contenedor lo más 
# pequeño posible. El Dockerfile copia los archivos necesarios, instala las dependencias y 
# expone el puerto 8000 para que la aplicación sea accesible desde fuera del contenedor.

FROM python:3.13-slim

WORKDIR /app

# Instalar uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Copiar archivos de dependencias
COPY pyproject.toml uv.lock ./

# Instalar dependencias
RUN uv sync --frozen --no-dev

# Copiar aplicación
COPY . .

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]