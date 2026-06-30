from fastapi import APIRouter, Depends, HTTPException, Request, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional
from uuid import UUID

from app.database.Connection import get_db
from app.models.ModelProduct import Product
from app.models.ModelCompany import Company

router = APIRouter(prefix="/catalog", tags=["catalog"])


# ── GET /catalog/products ────────────────────────────────────────────────
@router.get("/products")
def list_products(
    search: Optional[str] = Query(None, description="Buscar por nombre"),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    query = db.query(Product)

    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))

    total = query.count()
    products = query.offset((page - 1) * limit).limit(limit).all()

    return {
        "total": total,
        "page": page,
        "limit": limit,
        "results": [
            {
                "id": str(p.id),
                "name": p.name,
                "price": float(p.price),
                "images": p.images or [],
                "discount_enable": p.discount_enable,
                "discount_value": float(p.discount_value) if p.discount_value else 0,
                "stock": p.stock,
                "descripcion": p.descripcion,
                "company_id": str(p.company_id),
            }
            for p in products
        ],
    }


# ── GET /catalog/products/{id} ───────────────────────────────────────────
@router.get("/products/{product_id}")
def get_product(product_id: UUID, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    company = db.query(Company).filter(Company.id == product.company_id).first()

    return {
        "id": str(product.id),
        "name": product.name,
        "price": float(product.price),
        "images": product.images or [],
        "discount_enable": product.discount_enable,
        "discount_value": float(product.discount_value) if product.discount_value else 0,
        "stock": product.stock,
        "descripcion": product.descripcion,
        "technical_spec": product.technical_spec,
        "company": {
            "id": str(company.id),
            "name": company.nameCompany,
        } if company else None,
    }


# ── POST /catalog/order ──────────────────────────────────────────────────
@router.post("/order", status_code=201)
def place_order(request: Request, db: Session = Depends(get_db)):
    """
    Endpoint para registrar una orden de compra.
    Actualmente devuelve confirmación básica.
    El modelo de órdenes se implementará en una próxima migración.
    """
    user_id = getattr(request.state, "user_id", None)
    if not user_id:
        raise HTTPException(status_code=401, detail="Debes iniciar sesión para realizar un pedido")

    return {
        "message": "Pedido recibido correctamente. En breve te contactaremos.",
        "status": "pending",
    }
