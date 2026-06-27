# routers/ProductRouter.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.Connection import get_db
from app.services.ProductService import search_products_by_name

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

@router.get("/search/{name}")
def search_products_endpoint(name: str, db: Session = Depends(get_db)):
    return search_products_by_name(db, name)
