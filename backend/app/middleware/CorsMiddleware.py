# este codigo busca una comunicacion con frontend 
# y asi mismo seguridad al hacerlo 
# creando la configuracion del middleware para
# darle acceso al frontend asignado, permitiendo 
# autenticaciones y todos los metodos HTTP
# bloqueando el acceso a la peticion recibida si el backend
# no esta autorizado
from fastapi.middleware.cors import CORSMiddleware
from app.Config import config

def setup_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )