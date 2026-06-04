## Auditoría de Vulnerabilidades (CVE)
pip-audit es una herramienta desarrollada por Trail of Bits (con apoyo de Google) que analiza tu entorno Python en busca de paquetes con vulnerabilidades conocidas. Se conecta a bases de datos oficiales de la industria (como PyPI y OSV) utilizando identificadores CVE para mantener tu código seguro.

### Instalacion de uv
```bash
curl -LsSf https://astral.sh | sh
```
### Creacion de entorno virtual (venv)
```bash
uv venv
```
### Instalacion de pip-audit
```bash
uv pip install pip-audit
```

### Ejecutar auditoría

```bash
uv run pip-audit
```

### Generar reporte JSON

```bash
uvx pip-audit --format json -o reporte.json
```

### Ver dependencias instaladas

```bash
uv pip list
```

### Ver árbol de dependencias

```bash
uv tree
```

### Actualizar dependencias

```bash
uv lock --upgrade
uv sync
```

### Ejecutar nuevamente la auditoría

```bash
uv run pip-audit
```

### Resultado esperado

```text
No known vulnerabilities found
```
### Si hay vulnerabilidad por ejemplo
```text
Found x known vulnerabilities in x packages 
```
### actualizar dependencia con:
```bash
uv add "fastapi>=0.120.0"
uv lock --upgrade
uv sync
```
### Ejecutar nuevamente la auditoría

```bash
uv run pip-audit
```

### Resultado esperado
```text
No known vulnerabilities found
```

### Flujo recomendado

```bash
uv sync

uv run pip-audit

uv lock --upgrade

uv sync

uvx pip-audit
```