from typing import Optional
from pydantic import BaseModel, EmailStr
class UpdateInformationCompanyRequest(BaseModel):
    nameCompany: Optional[str] = None
    emailCompany: Optional[EmailStr] = None
    tellCompany: Optional[str] = None
    addressCompany: Optional[str] = None





