# RF-005 — Cerrar sesión

## Identificación

| Campo | Valor |
|---------|---------|
| ID | RF-005 |
| Nombre | Cerrar sesión |
| Módulo | Autenticación |
| Prioridad | Media |
| Estado | Implementado |
| Fecha | Febrero 2026 |

---

## Descripción

El sistema debe permitir cerrar la sesión activa del usuario.

---

## Proceso

- El usuario solicita logout.
- Se invalida JWT o sesión.
- Se elimina token en cliente.

---

## Salidas

| Escenario | Código HTTP | Respuesta |
|------------|-------------|----------|
| Logout | 200 | "Logged out" |

---

## Reglas de negocio

RN-001: El token queda invalidado en backend.