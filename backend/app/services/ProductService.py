# services/ProductService.py
from sqlalchemy.orm import Session
from app.models.ModelProduct import Product

def search_products_by_name(db: Session, name: str):
    products = db.query(Product).filter(Product.name.ilike(f"%{name}%")).all()
    if not products:
        return {"message": "Producto no encontrado"}
    
    results = []
    for product in products:
        results.append({
            "name": product.name,
            "price": float(product.price),
            "stock": product.stock,
            "description": product.descripcion,
            "images": product.images,
            "discount_enable": product.discount_enable,
            "discount_value": float(product.discount_value)
        })
    return results
