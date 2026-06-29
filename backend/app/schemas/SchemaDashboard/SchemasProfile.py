from pydantic import BaseModel
from typing import Optional
from uuid import UUID

# --- Perfil ---
class ProfileUpdate(BaseModel):
    fullName: str
    tell: Optional[str] = None

class ProfileResponse(BaseModel):
    id: UUID
    fullName: str
    email: str
    tell: Optional[str] = None
    member_since: str

    model_config = {"from_attributes": True}

# --- Direcciones ---
class AddressCreate(BaseModel):
    label: str
    address: str
    city: str
    is_default: bool = False

class AddressUpdate(BaseModel):
    label: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    is_default: Optional[bool] = None

class AddressResponse(BaseModel):
    id: UUID
    label: str
    address: str
    city: str
    is_default: bool

    model_config = {"from_attributes": True}