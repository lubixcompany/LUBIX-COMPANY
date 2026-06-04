# RF-003 — Recuperación de contraseña

## Identificación

| Campo | Valor |
|------|------|
| ID | RF-003 |
| Nombre | Recuperación de contraseña |
| Módulo | Autenticación |
| Prioridad | Alta |
| Estado | Implementado |

---

## Requisitos

## RF-003.1 — Solicitud de recuperación
El sistema debe permitir solicitar recuperación de contraseña mediante correo electrónico.

## RF-003.2 — Envío de enlace seguro
El sistema debe enviar un enlace único y seguro al correo del usuario.

## RF-003.3 — Token de expiración
El enlace de recuperación debe expirar después de un tiempo definido (ej. 24 horas).