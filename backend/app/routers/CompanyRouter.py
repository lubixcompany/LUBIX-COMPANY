from fastapi import APIRouter, Request,Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database.Connection import get_db
from app.services.NasService import subir

from app.services.DashboardService.company.Products import (
    create_product_service,
    update_product_service,
    delete_product_service
)

from app.services.DashboardService.company.Dasboard import (
    company_dashboard_me_service, 
    company_dashboard_my_profile_service,
    company_dashboard_upgrade_my_profile_service
)

from app.schemas.SchemaDashboard.ShemaCompany import UpdateInformationCompanyRequest, UpdateBannerAndLogoRequest


router = APIRouter(
    prefix=("/company"),
    tags=["company"]
)

@router.get("/dashboard/me")
def dashboard(request: Request, database: Session = Depends(get_db)):

    user_id = request.state.user_id
    
    return company_dashboard_me_service(
        user_id, 
        database
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

@router.post("/products")
def create_product(request: Request, database: Session = Depends(get_db)):
    user_id = request.state.user_id
    return create_product_service(user_id,database)

@router.post("/products/{product_id}")
def create_product(request: Request, database: Session = Depends(get_db)):
    
    return update_product_service()

@router.post("/products/{product_id}")
def create_product(request: Request, database: Session = Depends(get_db)):
    
    return delete_product_service()