from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from sqlalchemy import func
from uuid import UUID

from app.database.Connection import get_db
from app.models.ModelUser import Users
from app.models.ModelCompany import Company
from app.models.ModelRole import Role

router = APIRouter(prefix="/admin", tags=["admin"])


def require_admin(request: Request):
    role = getattr(request.state, "role", None)
    if role != "admin":
        raise HTTPException(status_code=403, detail="Acceso solo para administradores")


# ── Stats ──────────────────────────────────────────────────────────────────
@router.get("/stats")
def get_stats(request: Request, db: Session = Depends(get_db)):
    require_admin(request)

    total_users = db.query(func.count(Users.id)).join(
        Role, Users.role_id == Role.id
    ).filter(Role.name == "user").scalar()

    total_companies = db.query(func.count(Company.id)).scalar()

    pending = db.query(func.count(Users.id)).join(
        Company, Users.id == Company.user_id
    ).filter(Users.isActive == False).scalar()

    active_companies = db.query(func.count(Users.id)).join(
        Company, Users.id == Company.user_id
    ).filter(Users.isActive == True).scalar()

    return {
        "total_users": total_users,
        "total_companies": total_companies,
        "pending_companies": pending,
        "active_companies": active_companies,
    }


# ── Companies ──────────────────────────────────────────────────────────────
@router.get("/companies")
def get_companies(request: Request, db: Session = Depends(get_db)):
    require_admin(request)

    rows = (
        db.query(Company, Users)
        .join(Users, Company.user_id == Users.id)
        .order_by(Users.isActive.asc(), Users.created_at.desc())
        .all()
    )

    result = []
    for company, user in rows:
        result.append({
            "company_id": str(company.id),
            "user_id": str(user.id),
            "companyName": company.nameCompany,
            "companyNIT": company.CompanyNIT,
            "companyAddress": company.addressCompany,
            "certificate": company.CompanyCertificate,
            "representative": user.fullName,
            "email": user.email,
            "tell": user.tell,
            "isActive": user.isActive,
            "verified": user.verified,
            "created_at": str(user.created_at),
        })

    return result


@router.patch("/companies/{user_id}/activate")
def activate_company(user_id: UUID, request: Request, db: Session = Depends(get_db)):
    require_admin(request)

    user = db.query(Users).filter(Users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    user.isActive = True
    user.verified = True
    db.commit()

    return {"message": f"Empresa '{user.fullName}' activada correctamente"}


@router.patch("/companies/{user_id}/reject")
def reject_company(user_id: UUID, request: Request, db: Session = Depends(get_db)):
    require_admin(request)

    user = db.query(Users).filter(Users.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    user.isActive = False
    user.verified = False
    db.commit()

    return {"message": f"Empresa '{user.fullName}' rechazada"}


# ── Users ──────────────────────────────────────────────────────────────────
@router.get("/users")
def get_users(request: Request, db: Session = Depends(get_db)):
    require_admin(request)

    rows = (
        db.query(Users, Role)
        .join(Role, Users.role_id == Role.id)
        .filter(Role.name == "user")
        .order_by(Users.created_at.desc())
        .all()
    )

    return [
        {
            "user_id": str(u.id),
            "fullName": u.fullName,
            "email": u.email,
            "tell": u.tell,
            "verified": u.verified,
            "isActive": u.isActive,
            "created_at": str(u.created_at),
        }
        for u, _ in rows
    ]
