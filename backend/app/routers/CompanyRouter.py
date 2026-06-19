from fastapi import APIRouter, Request,Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database.Connection import get_db
from app.services.NasService import subir

from app.services.CompanyServices.Dasboard import me

from app.services.CompanyServices.Products import (
    create_product_service,
    update_product_service,
    delete_product_service
)
from app.services.CompanyServices.Dasboard import company_dashboard_services

router = APIRouter(
    prefix=("/company"),
    tags=["company"]
)

@router.get("/me")
def get_info_company(request:Request, database: Session =Depends(get_db)):
    
    #Request del middleware
    user_id = request.state.user_id
    company = me(user_id, database)

    return company
@router.get("/dashboard")
def dashboard(request: Request, database: Session = Depends(get_db)):
    
    return company_dashboard_services(request.state.user_id, database) 

@router.post("/products")
def create_product(request: Request, database: Session = Depends(get_db)):
    
    return create_product_service()

@router.post("/products/{product_id}")
def create_product(request: Request, database: Session = Depends(get_db)):
    
    return update_product_service()

@router.post("/products/{product_id}")
def create_product(request: Request, database: Session = Depends(get_db)):
    
    return delete_product_service()