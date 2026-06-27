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
    # Con allow_origins=["*"] y allow_credentials=True los navegadores rechazan la petición.
    # Si URL_FRONTEND está definida se usa como origen específico con credentials habilitadas.
    if config.URL_FRONTEND:
        allow_origins = [config.URL_FRONTEND]
        allow_credentials = True
    else:
        allow_origins = ["*"]
        allow_credentials = False

    app.add_middleware(
        CORSMiddleware,
        allow_origins=allow_origins,
        allow_credentials=allow_credentials,
        allow_methods=["*"],
        allow_headers=["*"]
    )