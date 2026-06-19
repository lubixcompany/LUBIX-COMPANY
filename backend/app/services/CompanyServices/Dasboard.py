from sqlalchemy.orm import Session
from app.models.ModelUser import Users

def me(user_id: str, database: Session):
    user = database.query(Users).filter(Users.id == user_id).first()
    
    company = user.company  # relationship por si se me olvida xd

    return {
        "nameCompany": company.nameCompany,
        "addressCompany": user.email,
        "tellCompany": user.tell,
        "memberAT": "25-05-2003",
        "CompanyNIT": company.CompanyNIT,
        "CompanyNITDV": company.CompanyNITDV
    }

def company_dashboard_services():
    pass