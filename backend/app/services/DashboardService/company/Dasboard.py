from sqlalchemy.orm import Session
from app.models.ModelUser import Users
from fastapi import HTTPException
from app.schemas.SchemaDashboard.ShemaCompany import UpdateInformationCompanyRequest, UpdateBannerAndLogoRequest

def company_dashboard_me_service(user_id, database: Session):
    user = database.query(Users).filter(Users.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    company = user.company
    role = user.role

    return {
        "nameCompany": company.nameCompany,
        "addressCompany": user.email,
        "memberAT": user.created_at,
        "role": role.name,
        "sales": 1247,
        "stars": 4.7,
        "reviews": 856
    }


def company_dashboard_my_profile_service(user_id: str, database: Session):
    user = database.query(Users).filter(Users.id == user_id).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
    company = user.company  # relationship por si se me olvida xd

    return {
        "nameCompany": company.nameCompany,
        "emailCompany": user.email,
        "addressCompany": company.addressCompany,
        "tellCompany": user.tell,
        "memberAT": user.created_at,
        "averageRating": 4.7,
        "totalReviews": 856,
        "completeSales": 1247,
        "sellerLevel": "platino"
    }

def company_dashboard_upgrade_my_profile_service(user_id: str, CompanyRequest:UpdateInformationCompanyRequest,database: Session):
    user = database.query(Users).filter(Users.id == user_id).first()
    search_emails = database.query(Users).filter(Users.email == CompanyRequest.emailCompany)
    print("recibido: ", CompanyRequest.emailCompany )
    if not search_emails:
        raise HTTPException(status_code=400, detail="El correo esta en uso")
    
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    
    company = user.company  # relationship por si se me olvida xd

    try:

        if CompanyRequest.nameCompany is not None:
            company.nameCompany = CompanyRequest.nameCompany

        if CompanyRequest.emailCompany is not None:
            user.email = CompanyRequest.emailCompany
        
        if CompanyRequest.tellCompany is not None:
            user.tell = CompanyRequest.tellCompany
        
        if CompanyRequest.addressCompany is not None:
            company.addressCompany = CompanyRequest.addressCompany
        
        database.commit()
        database.refresh(user)
        database.refresh(company)

    except Exception as e:
        database.rollback()

        print("ERROR:",e)
        raise HTTPException(status_code=500, detail="En actualizar datos")
    
    return {
        "messaje": "Perfil actualizado correctamente"
    }
