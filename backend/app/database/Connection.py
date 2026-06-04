# este codigo tiene como funcion realizar una conexion 
# con la base de datos posgrest asi mismo se busca 
# crear sesiones con sessionmarker y sessionlocal
# dando acceso a la base de datos con get_db sin poder 
# agregar comentarios de manera automatica 
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from app.Config import config

engine = create_engine(
    config.URL_DATABASE,
    pool_pre_ping=True,
    echo=False ## True para activar logs - False para desactivar Logs
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

def get_db():
    database = SessionLocal()
    try:
        yield database
    finally:
        database.close()

class Base(DeclarativeBase):
    pass
