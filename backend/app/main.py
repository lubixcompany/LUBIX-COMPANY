# main.py: Este código sirve para iniciar la
# aplicación de FastAPI del backend lubix, configurar las rutas y
# middlewares necesarios.

# =========================
# LIBRERÍAS EXTERNAS
# =========================
from fastapi import FastAPI
from contextlib import asynccontextmanager

# =========================
# BASE DE DATOS
# =========================
from app.database.Connection import SessionLocal
import app.models

# =========================
# CONFIG
# =========================
from app.Config import config

# =========================
# ROUTERS
# =========================
from app.routers import AuthRouters
from app.routers import HealthRouter
from app.routers import CompanyRouter
from app.routers import mediaRouter
from app.routers.HomeRouter import router as HomeRouter
from app.routers import ProductRouter
from app.routers import CardRouters  # lo tienes en tu estructura

# =========================
# MIDDLEWARE
# =========================
from app.middleware.AuthMiddleware import auth_middleware
from app.middleware.CorsMiddleware import setup_cors

# =========================
# UTILS
# =========================
from app.utils.seed import run_seed


# =========================
# LIFESPAN
# =========================
@asynccontextmanager
async def lifespan(app):
    db = SessionLocal()

    if config.RUN_SEED:
        run_seed(db)

    db.close()
    yield


# =========================
# APP
# =========================
app = FastAPI(lifespan=lifespan)

# =========================
# MIDDLEWARE
# =========================
setup_cors(app)
app.middleware("http")(auth_middleware)

# =========================
# ROUTERS
# =========================
app.include_router(AuthRouters.router)
app.include_router(HealthRouter.router)
app.include_router(CompanyRouter.router)
app.include_router(mediaRouter.router)
app.include_router(HomeRouter.router)
app.include_router(ProductRouter.router)
app.include_router(CardRouters.router)
