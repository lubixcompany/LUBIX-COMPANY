from fastapi import APIRouter, Request,Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database.Connection import get_db
from uuid import UUID

from app.services.DashboardService.company.Products import (
    create_product_service,
    update_product_service,
    delete_product_service
)

from app.services.DashboardService.company.Dasboard import (
    company_dashboard_me_service, 
    company_dashboard_my_profile_service,
    company_dashboard_upgrade_my_profile_service,
    company_dasboard_upgrade_my_photo_and_banner_profile,
    company_dashboard_get_my_products
)

from app.schemas.SchemaDashboard.ShemaCompany import UpdateInformationCompanyRequest

from app.services.NasService import NasService, get_nas_service

router = APIRouter(
    prefix=("/company"),
    tags=["company"]
)

@router.get("/dashboard/me")
def dashboard(request: Request,database: Session = Depends(get_db)):

    user_id = request.state.user_id
    
    return company_dashboard_me_service(
        user_id= user_id,
        database=database
    )

@router.get("/dashboard/my-profile")
def get_info_company(request:Request, database: Session =Depends(get_db)):
    #Request del middleware
    user_id = request.state.user_id
    return company_dashboard_my_profile_service(user_id, database)

# patch solo permite actualizar una o varias informacion, es opcional por el usuario.
@router.patch("/dashboard/upgrade-my-profile")
def upgrade_info_company_profile(request: Request, upgrade_profile: UpdateInformationCompanyRequest,database: Session = Depends(get_db)):
    user_id = request.state.user_id
    return company_dashboard_upgrade_my_profile_service(user_id, upgrade_profile, database)

@router.patch("/dashboard/patch-media-logo-banner")
def patch_media(
    request: Request,
    photo_profile: UploadFile = File(None),
    banner_profile: UploadFile = File(None),
    nas: NasService = Depends(get_nas_service),
    database: Session = Depends(get_db)
):

    user_id = request.state.user_id

    return company_dasboard_upgrade_my_photo_and_banner_profile(
        user_id=user_id,
        nas=nas,
        database=database,
        photo_profile=photo_profile,
        banner_profile=banner_profile
    )

@router.post("/dashboard/product")
def create_product(
    request: Request,
    nameProduct: str = Form (...), 
    nameCatalog: str = Form(...),
    priceProduct: float = Form(...),
    stockProduct: int = Form(...),
    descripcionProduct: str = Form(...),
    technicalSpecProduct: str = Form(...),
    imagesProduct: list[UploadFile] = File(None),
    nas: NasService = Depends(get_nas_service),
    database:Session = Depends(get_db)
):
    user_id = request.state.user_id

    return create_product_service(
        user_id=user_id,
        nameProduct=nameProduct, 
        nameCatalog=nameCatalog,
        priceProduct=priceProduct,
        stockProduct=stockProduct,
        descripcionProduct=descripcionProduct,
        technicalSpecProduct=technicalSpecProduct,
        imagesProduct=imagesProduct,
        nas=nas,
        database=database
    )

# Para atraer productos de la empresa
@router.get("/dashboard/get-my-products")
def get_my_product( 
    request: Request, 
    page: int =  1, 
    limit: int =10, 
    database: Session = Depends(get_db)
):
    print("accediendo a endpoint")
    user_id = request.state.user_id

    return company_dashboard_get_my_products(
        user_id,
        page=page,
        limit= limit,
        database=database
    )

@router.patch("/dashboard/update-my-product/{idProduct}")
def upgrade_my_product(
    request: Request,
    idProduct: UUID,
    nameProduct: str = Form (None), 
    nameCatalog: str = Form(None),
    priceProduct: float = Form(None),
    discountEnable: bool = Form(None),
    discountValue: int = Form(None),
    stockProduct: int = Form(None),
    descripcionProduct: str = Form(None),
    technicalSpecProduct: str = Form(None),
    imagesProduct: list[UploadFile] = File(None),
    imagesToDeleted: list[str] | None = Form(None),
    nas: NasService = Depends(get_nas_service),
    database:Session = Depends(get_db)
    
    ):
    
    user_id = request.state.user_id

    print("Accediento al update point")

    return update_product_service(
        user_id=user_id,
        idProduct=idProduct,
        nameProduct=nameProduct, 
        nameCatalog=nameCatalog,
        priceProduct=priceProduct,
        discountEnable=discountEnable,
        discountValue=discountValue,
        stockProduct=stockProduct,
        descripcionProduct=descripcionProduct,
        technicalSpecProduct=technicalSpecProduct,
        imagesProduct=imagesProduct,
        imagesToDeleted=imagesToDeleted,
        nas=nas,
        database=database
    )

@router.delete("/dashboard/delete-my-product/{product_id}")
def delete_my_product(request: Request, database: Session = Depends(get_db)):
    
    return delete_product_service()