import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

# Fuera de Docker el host es localhost, dentro es 'postgres'
_url = (os.getenv("URL_DATABASE") or os.getenv("DATABASE_URL", "")).replace(
    "@postgres:", "@localhost:"
)

engine = create_engine(_url)

try:
    with engine.connect() as conn:
        result = conn.execute(text("SELECT version()"))
        version = result.scalar()
        print(f"✅ Conexión exitosa")
        print(f"   PostgreSQL: {version}")
except Exception as e:
    print(f"❌ Error de conexión: {e}")
