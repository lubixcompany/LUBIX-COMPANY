# RF-002 — Inicio de sesión

## Identificación

| Campo | Valor |
|---------|---------|
| ID | RF-002 |
| Nombre | Inicio de sesión |
| Módulo | Autenticación |
| Prioridad | Alta |
| Estado | Implementado |
| Fecha | Febrero 2026 |

---

## Descripción

El sistema debe permitir a los usuarios autenticados iniciar sesión con correo electrónico y contraseña, validando credenciales y estado de cuenta.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
|--------|------|-------------|--------------|
| email | Texto (email) | Sí | Formato válido |
| password | Texto | Sí | No vacío |

---

## Proceso

- El usuario envía credenciales.
- Se valida existencia del usuario.
- Se verifica `is_email_verified`.
- Se compara contraseña con bcrypt.
- Se genera JWT.
- Se crea sesión activa.

---

## Salidas

| Escenario | Código HTTP | Respuesta |
|------------|-------------|----------|
| Login exitoso | 200 | Token + usuario |
| Credenciales inválidas | 401 | "Invalid credentials" |
| Email no verificado | 403 | "Email not verified" |

---

## Endpoints asociados

| Método | Ruta | Auth requerida | Descripción |
|--------|------|---------------|-------------|
| POST | /api/v1/auth/login | No | Inicio de sesión |

---

## Reglas de negocio

RN-001: No se permite login sin verificación de correo.  
RN-002: Se usa JWT con expiración.  
RN-003: Se registra sesión activa.