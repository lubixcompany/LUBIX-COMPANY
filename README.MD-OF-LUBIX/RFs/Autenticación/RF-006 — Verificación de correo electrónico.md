# RF-006 — Verificar correo electrónico

## Identificación

| Campo | Valor |
|---------|---------|
| ID | RF-006 |
| Nombre | Verificar correo electrónico |
| Módulo | Autenticación |
| Prioridad | Alta |
| Estado | Implementado |
| Fecha | Febrero 2026 |

---

## Descripción

El sistema debe activar la cuenta del usuario mediante un token enviado al correo.

---

## Proceso

- Usuario abre enlace de verificación.
- Backend valida token.
- Se activa cuenta.
- Se marca token como usado.

---

## Reglas de negocio

RN-001: Token expira en 24h.  
RN-002: Solo puede usarse una vez.