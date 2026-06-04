# RF-001 — Registro de usuario

## Identificación

| Campo | Valor |
|---------|---------|
| ID | RF-001 |
| Nombre | Registro de usuario |
| Módulo | Autenticación |
| Prioridad | Alta |
| Estado | Implementado |
| Fecha | Febrero 2026 |

---

## Descripción

El sistema debe permitir que un usuario nuevo cree una cuenta proporcionando su nombre completo, correo electrónico y contraseña. Tras el registro, el sistema envía un correo de verificación para activar la cuenta antes de permitir el inicio de sesión.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
|--------|------|-------------|--------------|
| full_name | Texto | Sí | 2–255 caracteres |
| email | Texto (email) | Sí | Formato válido, único en sistema |
| password | Texto | Sí | Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número |

---

## Proceso

- El usuario envía los datos desde el formulario de registro.
- El frontend valida campos básicos.
- El backend valida con reglas de negocio.
- Se verifica que el correo no exista.
- La contraseña se encripta con bcrypt.
- Se crea el usuario en la tabla `users`.
- Se genera un token de verificación con expiración de 24 horas.
- Se envía correo con enlace de activación.
- El usuario debe verificar el correo antes de iniciar sesión.

---

## Salidas

| Escenario | Código HTTP | Respuesta |
|------------|-------------|----------|
| Registro exitoso | 201 | Usuario creado |
| Email duplicado | 400 | "Email already registered" |
| Error validación | 422 | Detalle de errores |

---

## Endpoints asociados

| Método | Ruta | Auth requerida | Descripción |
|--------|------|---------------|-------------|
| POST | /api/v1/auth/register | No | Registro de usuario |
| POST | /api/v1/auth/verify-email | No | Verificación de cuenta |

---

## Reglas de negocio

RN-001: El email debe ser único.  
RN-002: La contraseña se almacena encriptada (bcrypt).  
RN-003: El usuario no puede iniciar sesión sin verificar correo.  
RN-004: El token de verificación expira en 24 horas.  
RN-005: El usuario se crea con `is_email_verified = false`.