## main.py: Este codigo sirve para iniciar la
#  aplicacion de FastAPI del backend lubix, configurar las rutas y
#  middlewares necesarios,.
from fastapi import FastAPI
from app.routers import UserRouters
from app.routers import HealthRouter
# from app.database.connection import Base,engine
import app.models
from app.middleware.AuthMiddleware import auth_middleware
from app.middleware.CorsMiddleware import setup_cors

app = FastAPI()
app.middleware("http")(auth_middleware)
setup_cors(app)
#Base.metadata.create_all(bind=engine)
app.include_router(UserRouters.router)
app.include_router(HealthRouter.router)

@app.get("/")
def root():
    return {"message": "Backend Lubix - API running successfully"}


