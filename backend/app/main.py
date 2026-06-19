from fastapi import FastAPI
from routers import user_routers
from routers import health
from database.connection import Base,engine
import models
app = FastAPI()
Base.metadata.create_all(bind=engine)
app.include_router(user_routers.router)
app.include_router(health.router)
