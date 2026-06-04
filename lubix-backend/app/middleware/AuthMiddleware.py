# este codigo es creado para dar acceso a las rutas 
# esto sin necesitad de token de autenticacion,
# pero de igual manera se busca validar el token a la hora
# de proteger las demas rutas dependiendo del rol validando 
# en la base de datos si aquel token existe y corresponde a el usuario
from fastapi import Request
from starlette.responses import JSONResponse
from app.database.Connection import SessionLocal
from app.models.ModelEventToken import EventToken
from app.models.ModelUser import Users


PUBLIC_ROUTES = [
    "/user/login",
    "/user/register",
    "/user/verify-email",
    "/user/forgot-password",
    "/user/reset-password"       
]

async def auth_middleware(request: Request, call_next):
    if request.url.path in PUBLIC_ROUTES:
        return await call_next(request)

    token = request.headers.get("Authorization")
    if not token:
        return JSONResponse(status_code=401, content={"detalle": "Token de autenticación requerido"})

    db = SessionLocal()
    event_token = db.query(EventToken).filter(EventToken.token == token).first()
    if not event_token:
        return JSONResponse(status_code=401, content={"detalle": "token invalido"})

    user = db.query(Users).filter(Users.id == event_token.user_id).first()
    if not user:
        return JSONResponse(status_code=401, content={"detalle": "Usuario no encontrado"})

    request.state.user = user
    response = await call_next(request)
    return response
