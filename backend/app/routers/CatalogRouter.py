from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.database.Connection import get_db
from app.services.CatalogService import (
    get_all_products,
    get_product_by_id,
    get_related_products,
    get_all_categories,
    get_featured_products,
    get_new_products,
)

router = APIRouter(
    prefix="/catalog",
    tags=["catalog"],
)


@router.get("/products")
def list_products(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    search: Optional[str] = Query(None, max_length=255),
    category: Optional[str] = Query(None),
    min_price: Optional[float] = Query(None, ge=0),
    max_price: Optional[float] = Query(None, ge=0),
    in_stock: Optional[bool] = Query(None),
    only_discount: Optional[bool] = Query(None),
    sort_by: str = Query("relevance", regex="^(relevance|price_asc|price_desc|newest)$"),
    database: Session = Depends(get_db),
):
    return get_all_products(
        database=database,
        page=page,
        limit=limit,
        search=search,
        category=category,
        min_price=min_price,
        max_price=max_price,
        in_stock=in_stock,
        only_discount=only_discount,
        sort_by=sort_by,
    )


@router.get("/products/{product_id}")
def product_detail(product_id: str, database: Session = Depends(get_db)):
    return get_product_by_id(product_id, database)


@router.get("/products/{product_id}/related")
def related_products(product_id: str, database: Session = Depends(get_db)):
    return get_related_products(product_id, database)


@router.get("/categories")
def list_categories(database: Session = Depends(get_db)):
    return get_all_categories(database)


@router.get("/featured")
def featured_products(
    limit: int = Query(8, ge=1, le=20),
    database: Session = Depends(get_db),
):
    return get_featured_products(database, limit)


@router.get("/new")
def new_products(
    limit: int = Query(8, ge=1, le=20),
    database: Session = Depends(get_db),
):
    return get_new_products(database, limit)
