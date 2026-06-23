
```text
http://127.0.0.1:8000/

para probar conexion de base de datos desde el backend:
POSTDATA: debe tener previamente postgre sql con usuario, contraseña y base de datos
GET /health/test

-- Usuario
--  registrar usuario
POST Auth/register-user
{
  "fullName": "",
  "email": "",
  "tell": "",
  "password": ""
}

-- registro de empresa
post /Auth/register-company
{
  "companyName": "",
  "companyEmail": "",
  "companyPassword": "",
  "companyTell": "",
  "companyAddress": "",
  "companyNIT": "",
  "companyNITDV": ""
}

--- login company
post /Auth/login-company
{
  "companyNIT": "",
  "companyPassword": ""
}

verify account
POST Auth/verify-email
{
  "email": "",
  "code": ""
}

export default App

-- login 
POST Auth/login
{
  "email": "",
  "password": ""
}

-- forgot password
POST Auth/forgot-password
{
  "email": ""
}

-- reset password
POST Auth/reset-password
{
  "email": "",
  "code": "",
  "new_password":""
}

```