# RF-003 — Recuperación de contraseña

## Identificación

| Campo | Valor |
|---------|---------|
| ID | RF-003 |
| Nombre | Recuperación de contraseña |
| Módulo | Autenticación |
| Prioridad | Alta |
| Estado | Implementado |
| Fecha | Febrero 2026 |

---

## Descripción

El sistema debe permitir solicitar recuperación de contraseña mediante correo electrónico registrado.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
|--------|------|-------------|--------------|
| email | Texto (email) | Sí | Debe existir en sistema |

---

## Proceso

- El usuario solicita recuperación.
- Se valida existencia del email.
- Se genera token de recuperación.
- Se envía enlace al correo.
- No se revela si el correo existe.

---

## Salidas

| Escenario | Código HTTP | Respuesta |
|------------|-------------|----------|
| Solicitud enviada | 200 | Mensaje genérico |
| Error validación | 422 | Detalle de errores |

---

## Endpoints asociados

| Método | Ruta | Auth requerida | Descripción |
|--------|------|---------------|-------------|
| POST | /api/v1/auth/forgot-password | No | Solicitar recuperación |

---

## Reglas de negocio

RN-001: No revelar si el correo existe.  
RN-002: Token expira en 1 hora.  
RN-003: Token de un solo uso.