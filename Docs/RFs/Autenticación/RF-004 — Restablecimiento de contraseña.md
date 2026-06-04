# RF-004 — Restablecer contraseña

## Identificación

| Campo | Valor |
|---------|---------|
| ID | RF-004 |
| Nombre | Restablecer contraseña |
| Módulo | Autenticación |
| Prioridad | Alta |
| Estado | Implementado |
| Fecha | Febrero 2026 |

---

## Descripción

El sistema debe permitir establecer una nueva contraseña usando un token válido de recuperación.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
|--------|------|-------------|--------------|
| token | Texto | Sí | Válido y no expirado |
| password | Texto | Sí | Política de seguridad |

---

## Proceso

- Se valida token.
- Se verifica expiración.
- Se actualiza contraseña con bcrypt.
- Se invalida token.
- Se eliminan sesiones activas.

---

## Salidas

| Escenario | Código HTTP | Respuesta |
|------------|-------------|----------|
| Éxito | 200 | "Password updated" |
| Token inválido | 400 | Error |
| Token expirado | 410 | Error |

---

## Endpoints asociados

| Método | Ruta | Auth requerida | Descripción |
|--------|------|---------------|-------------|
| POST | /api/v1/auth/reset-password | No | Cambiar contraseña |

---

## Reglas de negocio

RN-001: Token único.  
RN-002: Expira en 1 hora.  
RN-003: Invalida sesiones activas.