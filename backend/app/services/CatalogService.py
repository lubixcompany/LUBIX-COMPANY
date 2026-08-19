from sqlalchemy.orm import Session
from sqlalchemy import desc, asc, or_, func
from app.models.ModelProduct import Product, Catalog
from app.services.NasService import build_media_url


def get_all_products(
    database: Session,
    page: int = 1,
    limit: int = 20,
    search: str = None,
    category: str = None,
    min_price: float = None,
    max_price: float = None,
    in_stock: bool = None,
    only_discount: bool = None,
    sort_by: str = "relevance",
):
    query = database.query(Product)

    # Search by name, description
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                Product.name.ilike(search_term),
                Product.descripcion.ilike(search_term),
            )
        )

    # Filter by category (catalog name)
    if category:
        catalog = database.query(Catalog).filter(Catalog.name.ilike(category)).first()
        if catalog:
            query = query.filter(Product.catalog_id == catalog.id)

    # Filter by price range
    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)

    # Filter by stock
    if in_stock is not None:
        if in_stock:
            query = query.filter(Product.stock > 0)
        else:
            query = query.filter(Product.stock == 0)

    # Filter by discount
    if only_discount:
        query = query.filter(Product.discount_enable == True, Product.discount_value > 0)

    # Total before pagination
    total = query.count()

    # Sort
    if sort_by == "price_asc":
        query = query.order_by(asc(Product.price))
    elif sort_by == "price_desc":
        query = query.order_by(desc(Product.price))
    elif sort_by == "newest":
        query = query.order_by(desc(Product.created_at))
    else:
        query = query.order_by(desc(Product.created_at))

    # Pagination
    offset = (page - 1) * limit
    products = query.offset(offset).limit(limit).all()

    result = []
    for p in products:
        images = []
        if p.images:
            for img in p.images:
                images.append(build_media_url(img))

        company_name = ""
        if p.company:
            company_name = p.company.nameCompany

        catalog_name = ""
        if p.catalog:
            catalog_name = p.catalog.name

        result.append({
            "id": str(p.id),
            "name": p.name,
            "price": float(p.price),
            "images": images,
            "discount_enable": p.discount_enable,
            "discount_value": float(p.discount_value) if p.discount_enable else 0,
            "stock": p.stock,
            "descripcion": p.descripcion,
            "technical_spec": p.technical_spec,
            "created_at": p.created_at.isoformat() if p.created_at else None,
            "company_name": company_name,
            "catalog_name": catalog_name,
        })

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "total_pages": (total + limit - 1) // limit if limit > 0 else 0,
        "products": result,
    }


def get_product_by_id(product_id: str, database: Session):
    from fastapi import HTTPException

    product = database.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    images = []
    if product.images:
        for img in product.images:
            images.append(build_media_url(img))

    company_name = ""
    if product.company:
        company_name = product.company.nameCompany

    catalog_name = ""
    catalog_id = None
    if product.catalog:
        catalog_name = product.catalog.name
        catalog_id = str(product.catalog.id)

    return {
        "id": str(product.id),
        "name": product.name,
        "price": float(product.price),
        "images": images,
        "discount_enable": product.discount_enable,
        "discount_value": float(product.discount_value) if product.discount_enable else 0,
        "stock": product.stock,
        "descripcion": product.descripcion,
        "technical_spec": product.technical_spec,
        "created_at": product.created_at.isoformat() if product.created_at else None,
        "company_name": company_name,
        "catalog_name": catalog_name,
        "catalog_id": catalog_id,
    }


def get_related_products(product_id: str, database: Session):
    product = database.query(Product).filter(Product.id == product_id).first()

    if not product or not product.catalog_id:
        return []

    related = (
        database.query(Product)
        .filter(Product.catalog_id == product.catalog_id, Product.id != product.id)
        .limit(6)
        .all()
    )

    result = []
    for p in related:
        images = []
        if p.images:
            for img in p.images:
                images.append(build_media_url(img))

        catalog_name = ""
        if p.catalog:
            catalog_name = p.catalog.name

        result.append({
            "id": str(p.id),
            "name": p.name,
            "price": float(p.price),
            "images": images,
            "discount_enable": p.discount_enable,
            "discount_value": float(p.discount_value) if p.discount_enable else 0,
            "stock": p.stock,
            "descripcion": p.descripcion,
            "technical_spec": p.technical_spec,
            "created_at": p.created_at.isoformat() if p.created_at else None,
            "company_name": p.company.nameCompany if p.company else "",
            "catalog_name": catalog_name,
        })

    return result


def get_all_categories(database: Session):
    catalogs = database.query(Catalog).all()

    result = []
    for c in catalogs:
        count = database.query(Product).filter(Product.catalog_id == c.id).count()
        result.append({
            "id": str(c.id),
            "name": c.name,
            "product_count": count,
        })

    return result


def get_featured_products(database: Session, limit: int = 8):
    products = (
        database.query(Product)
        .filter(Product.discount_enable == True, Product.discount_value > 0)
        .order_by(desc(Product.discount_value))
        .limit(limit)
        .all()
    )

    result = []
    for p in products:
        images = []
        if p.images:
            for img in p.images:
                images.append(build_media_url(img))

        catalog_name = ""
        if p.catalog:
            catalog_name = p.catalog.name

        result.append({
            "id": str(p.id),
            "name": p.name,
            "price": float(p.price),
            "images": images,
            "discount_enable": p.discount_enable,
            "discount_value": float(p.discount_value) if p.discount_enable else 0,
            "stock": p.stock,
            "descripcion": p.descripcion,
            "technical_spec": p.technical_spec,
            "created_at": p.created_at.isoformat() if p.created_at else None,
            "company_name": p.company.nameCompany if p.company else "",
            "catalog_name": catalog_name,
        })

    return result


def get_new_products(database: Session, limit: int = 8):
    products = (
        database.query(Product)
        .order_by(desc(Product.created_at))
        .limit(limit)
        .all()
    )

    result = []
    for p in products:
        images = []
        if p.images:
            for img in p.images:
                images.append(build_media_url(img))

        catalog_name = ""
        if p.catalog:
            catalog_name = p.catalog.name

        result.append({
            "id": str(p.id),
            "name": p.name,
            "price": float(p.price),
            "images": images,
            "discount_enable": p.discount_enable,
            "discount_value": float(p.discount_value) if p.discount_enable else 0,
            "stock": p.stock,
            "descripcion": p.descripcion,
            "technical_spec": p.technical_spec,
            "created_at": p.created_at.isoformat() if p.created_at else None,
            "company_name": p.company.nameCompany if p.company else "",
            "catalog_name": catalog_name,
        })

    return result
