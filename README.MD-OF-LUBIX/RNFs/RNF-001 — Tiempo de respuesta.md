# RF-001 — Registro de usuario

## Identificación

| Campo | Valor |
|------|------|
| ID | RF-001 |
| Nombre | Registro de usuario |
| Módulo | Autenticación |
| Prioridad | Crítica |
| Estado | Implementado |

---

## Requisitos

## RF-001.1 — Creación de cuenta
El sistema debe permitir registrar usuarios mediante nombre completo, correo electrónico y contraseña válida.

## RF-001.2 — Validación de email único
El sistema debe verificar que el correo electrónico no esté previamente registrado antes de crear la cuenta.

## RF-001.3 — Hash de contraseña
Las contraseñas deben almacenarse en la base de datos usando hashing seguro (bcrypt), sin guardar texto plano.

## RF-001.4 — Verificación de correo
El sistema debe enviar un enlace de verificación al correo electrónico del usuario tras el registro.