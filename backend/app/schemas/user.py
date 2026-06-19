from pydantic import BaseModel, EmailStr
from models.user import RoleType

class createUser(BaseModel):
    fullName: str
    email: EmailStr
    password: str
    role: RoleType = RoleType.user
    tell: str
    isActive: bool = True

class userLogin(BaseModel):
    email: EmailStr
    password: str

class resetPassword(BaseModel):
    Email: EmailStr

