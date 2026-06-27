from sqlalchemy.orm import Session
from app.models.ModelProduct import Product

def get_featured_products(db: Session):
 products = db.query(Product).limit(6).all()


 return [
    {
        "id": str(product.id),
        "name": product.name,
        "price": float(product.price),
        "stock": product.stock,
        "description": product.descripcion,
        "images": product.images,
        "discount_enable": product.discount_enable,
        "discount_value": float(product.discount_value)
    }
    for product in products
]
