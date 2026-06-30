FROM python:3.13-slim
WORKDIR /app

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

ENV PATH="/usr/local/bin:$PATH"
ENV UV_PROJECT_ENVIRONMENT="/usr/local"

COPY pyproject.toml uv.lock ./

RUN uv sync --frozen --no-dev

COPY . .

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]