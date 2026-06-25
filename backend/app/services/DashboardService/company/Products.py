from sqlalchemy.orm import Session
from app.models.ModelUser import Users
from app.models.ModelProduct import Product, Catalog
from fastapi import HTTPException
import json

def create_product_service(
        user_id,
        nameProduct,
        nameCatalog,
        priceProduct,
        stockProduct,
        descripcionProduct,
        technicalSpecProduct,
        imagesProduct,
        nas,
        database: Session
    ):

    try:

        search_user = database.query(Users).filter(Users.id == user_id).first()
        
        if not search_user:
            raise HTTPException(status_code=401, detail="Usuario no encontrado")
        
        company = search_user.company
        
        if not company:
            raise HTTPException(status_code=401, detail="Empresa no encontrado")
        
    
        if nameCatalog:
            search_catalog = database.query(Catalog).filter(Catalog.name == nameCatalog).first()
            
            if not nameCatalog:
                raise HTTPException(status_code=401, detail="Este catalogo no existe")
        
        print("Esto es solo una prueba")
        print("Name user", search_user.fullName)
        print("id compañia: ", company.id)
        print("Nombre compañia: ", company.nameCompany)
        print("Id de catalogo: ", search_catalog.id)
        print("Nombre catalogo: ", search_catalog.name)

        image_urls = []
        technical_spec = {}

        if technicalSpecProduct:
            if isinstance(technicalSpecProduct, str):
                technical_spec = json.loads(technicalSpecProduct)
            else:
                technical_spec = technicalSpecProduct


        if imagesProduct:
            for file in imagesProduct:
                url = nas.upload_file(file, f"companies/{company.CompanyNIT}/imagesProduct/")
                image_urls.append(url["path"])
        
        new_product = Product(
            name=nameProduct,
            price=priceProduct,
            images= image_urls,
            stock=stockProduct,
            descripcion=descripcionProduct,
            technical_spec=technical_spec,
            company_id = company.id,
            catalog_id = search_catalog.id
        )

        database.add(new_product)
        database.commit()
        database.refresh(new_product)

        return {
            "messaje": "producto guardado exitosamente",
            "id": new_product.id,
            "nameProduct": new_product.name,
            "price": new_product.price,
            "stock": new_product.stock,
            "categorie": new_product.catalog_id,
            "descripcion": new_product.descripcion,
            "technicalSpec": new_product.technical_spec,
            "imagesProduct": new_product.images
        }
    
    except Exception as e:
        database.rollback()
        return {"error": str(e)}

def select_product_service(
        
):
    pass  
    
def update_product_service(
        user_id,
        idProduct,
        nameProduct, 
        nameCatalog,
        priceProduct,
        discountEnable,
        discountValue,
        stockProduct,
        descripcionProduct,
        technicalSpecProduct,
        imagesProduct,
        imagesToDeleted,
        nas,
        database: Session,
):
    print("ENTRO AL ENDPOINT UPDATE PRODUCT")
    
    try:
        search_user = database.query(Users).filter(Users.id == user_id).first()

        if not search_user:
            raise HTTPException(status_code=401, detail="Usuario no encontrado")
        
        company = search_user.company

        if not company:
            raise HTTPException(status_code=404, detail="Empresa no encontrada")
        
        search_product = database.query(Product).filter(Product.id == idProduct, Product.company_id == company.id).first()

        if not search_product:
            raise HTTPException(status_code=404, detail="Producto no encontrado")
        
        search_catalog = None

        if nameCatalog:
            search_catalog = database.query(Catalog).filter(Catalog.name == nameCatalog).first()

            if not nameCatalog:
                raise HTTPException(status_code=404, detail="Este catalogo no existe")

        print("Informacion general")
        print("Name user", search_user.fullName)
        print("id compañia: ", company.id)
        print("Nombre compañia: ", company.nameCompany)

        if search_catalog:
            print("Id de catalogo: ", search_catalog.id)
            print("Nombre catalogo: ", search_catalog.name)
        
        print(type(search_product.images))
        print(search_product.images)


        print("ANTES COMMIT")

        database.commit()
        print("DESPUES COMMIT")
        database.refresh(search_product)

        return {
            "message": "Producto actualizado correctamente",
            "product_id": str(search_product.id)
        }
    
    except HTTPException:
        database.rollback()
        print("ERROR:", type(e).__name__)
        print("ERROR:", str(e))
        raise

    except Exception as e:
        database.rollback()
        raise HTTPException(status_code=500, detail="Error al actualizar producto")

def delete_product_service():
    pass




