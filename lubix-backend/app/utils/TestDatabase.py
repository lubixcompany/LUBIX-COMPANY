from sqlalchemy import text
from app.database.Connection import engine

## Testeo de conexion de base de datos desde el backend
def db_test():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
            return {"Base de datos": "OK"}
    except Exception as e:
        return {"Base de datos": "ERROR", "detail": str(e)}
    