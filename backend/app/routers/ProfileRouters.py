from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from typing import List
import uuid

from app.database.Connection import get_db
from app.models.ModelUser import Users
from app.models.ModelAdress import Address
from app.schemas.SchemaDashboard.SchemasProfile import (
    ProfileUpdate, ProfileResponse,
    AddressCreate, AddressUpdate, AddressResponse,
)

router = APIRouter(prefix="/profile", tags=["Profile"])


def get_current_user(request: Request, db: Session = Depends(get_db)) -> Users:
    user_id = getattr(request.state, "user_id", None)
    if not user_id:
        raise HTTPException(status_code=401, detail="No autenticado")
    user = db.query(Users).filter(Users.id == uuid.UUID(user_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user


# ── GET /profile/me ─────────────────────────────────────────
@router.get("/me", response_model=ProfileResponse)
def get_profile(request: Request, db: Session = Depends(get_db)):
    current_user = get_current_user(request, db)
    return {
        "id": current_user.id,
        "fullName": current_user.fullName,
        "email": current_user.email,
        "tell": current_user.tell,
        "member_since": current_user.created_at.strftime("%B %Y"),
    }


# ── PUT /profile/me ─────────────────────────────────────────
@router.put("/me", response_model=ProfileResponse)
def update_profile(request: Request, data: ProfileUpdate, db: Session = Depends(get_db)):
    current_user = get_current_user(request, db)
    current_user.fullName = data.fullName
    if data.tell is not None:
        current_user.tell = data.tell
    db.commit()
    db.refresh(current_user)
    return {
        "id": current_user.id,
        "fullName": current_user.fullName,
        "email": current_user.email,
        "tell": current_user.tell,
        "member_since": current_user.created_at.strftime("%B %Y"),
    }


# ── GET /profile/addresses ───────────────────────────────────
@router.get("/addresses", response_model=List[AddressResponse])
def get_addresses(request: Request, db: Session = Depends(get_db)):
    current_user = get_current_user(request, db)
    return db.query(Address).filter(Address.user_id == current_user.id).all()


# ── POST /profile/addresses ──────────────────────────────────
@router.post("/addresses", response_model=AddressResponse, status_code=201)
def create_address(request: Request, data: AddressCreate, db: Session = Depends(get_db)):
    current_user = get_current_user(request, db)
    if data.is_default:
        db.query(Address).filter(Address.user_id == current_user.id).update({"is_default": False})
    new_addr = Address(**data.model_dump(), user_id=current_user.id)
    db.add(new_addr)
    db.commit()
    db.refresh(new_addr)
    return new_addr


# ── PUT /profile/addresses/{id} ──────────────────────────────
@router.put("/addresses/{address_id}", response_model=AddressResponse)
def update_address(request: Request, address_id: str, data: AddressUpdate, db: Session = Depends(get_db)):
    current_user = get_current_user(request, db)
    addr = db.query(Address).filter(
        Address.id == uuid.UUID(address_id),
        Address.user_id == current_user.id,
    ).first()
    if not addr:
        raise HTTPException(status_code=404, detail="Dirección no encontrada")
    if data.is_default:
        db.query(Address).filter(Address.user_id == current_user.id).update({"is_default": False})
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(addr, field, value)
    db.commit()
    db.refresh(addr)
    return addr


# ── DELETE /profile/addresses/{id} ───────────────────────────
@router.delete("/addresses/{address_id}", status_code=204)
def delete_address(request: Request, address_id: str, db: Session = Depends(get_db)):
    current_user = get_current_user(request, db)
    addr = db.query(Address).filter(
        Address.id == uuid.UUID(address_id),
        Address.user_id == current_user.id,
    ).first()
    if not addr:
        raise HTTPException(status_code=404, detail="Dirección no encontrada")
    db.delete(addr)
    db.commit()