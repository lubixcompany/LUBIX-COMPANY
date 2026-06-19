http://127.0.0.1:8000/


 -- Usuario

--  registrar usuario
POST user/register
{
  "fullName": "Yeinher Algarin",
  "email": "yeinersaku@gmail.com",
  "tell": "3023110351",
  "password": "swapswap"
}

-- login 
POST user/singIn
data: falta un byc para ocultar contraseña
{
  "email": "yeinersaku@gmail.com",
  "password": "swapswap"
}