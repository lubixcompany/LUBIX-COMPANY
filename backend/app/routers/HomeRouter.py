from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.Connection import get_db
from app.services.HomeService import get_featured_products

router = APIRouter(
prefix="/homeuser",
tags=["Homeuser"]
)

@router.get("/products")
def featured_products(db: Session = Depends(get_db)):
    return get_featured_products(db)



