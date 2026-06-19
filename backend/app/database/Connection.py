from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from config import config

engine = create_engine(
    config.URL_DATABASE,
    pool_pre_ping=True,
    echo=True, ## True para activar logs - False para desactivar Logs
    connect_args={"client_encoding": "utf8"}
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
