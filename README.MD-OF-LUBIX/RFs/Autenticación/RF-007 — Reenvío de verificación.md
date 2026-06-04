# RF-007 — Reenviar correo de verificación

## Identificación

| Campo | Valor |
|---------|---------|
| ID | RF-007 |
| Nombre | Reenviar verificación |
| Módulo | Autenticación |
| Prioridad | Media |
| Estado | Implementado |
| Fecha | Febrero 2026 |

---

## Descripción

El sistema debe permitir reenviar el correo de verificación.

---

## Proceso

- Usuario solicita reenvío.
- Se genera nuevo token.
- Se envía correo actualizado.

---

## Reglas de negocio

RN-001: Se invalida el token anterior.