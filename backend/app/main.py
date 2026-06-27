## main.py: Este codigo sirve para iniciar la
#  aplicacion de FastAPI del backend lubix, configurar las rutas y
#  middlewares necesarios,.
from fastapi import FastAPI
from contextlib import asynccontextmanager
import asyncio
from app.database.Connection import SessionLocal
from app.routers import AuthRouters
from app.routers import HealthRouter
from app.routers import CompanyRouter
from app.routers import mediaRouter
from app.routers import AdminRouter
import app.models
from app.middleware.AuthMiddleware import auth_middleware
from app.middleware.CorsMiddleware import setup_cors
from app.utils.seed import run_seed
from app.Config import config



# =========================
# LIFESPAN
# =========================
@asynccontextmanager
async def lifespan(app):
    # Inicializar bucket de MinIO con reintentos (Docker race condition)
    from app.services.NasService import client as minio_client, bucket as minio_bucket
    for attempt in range(10):
        try:
            if not minio_client.bucket_exists(minio_bucket):
                minio_client.make_bucket(minio_bucket)
            print("MinIO bucket inicializado correctamente")
            break
        except Exception as e:
            print(f"MinIO no disponible (intento {attempt + 1}/10): {e}")
            if attempt < 9:
                await asyncio.sleep(3)

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
app.include_router(AdminRouter.router)



