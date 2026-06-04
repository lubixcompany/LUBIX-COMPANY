from sqlalchemy import String, Boolean, Enum
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
from app.database.Connection import Base
import uuid
from enum import Enum as typerEnum

class RoleType(str, typerEnum):
    user = "Usuario",
    admin = "Administrador"
    owner = "Lubix INC",
    company = "Empresa"

class Users(Base):
    __tablename__ = "users"
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True, 
        default=uuid.uuid4
    )
    fullName: Mapped[str] = mapped_column(
        String(50), 
        nullable=False
    )
    email: Mapped[str] = mapped_column(
        String(50), 
        nullable=False
    )
    hashed_password: Mapped[str] = mapped_column(
        String(75), 
        nullable=False
    )
    role: Mapped[RoleType] = mapped_column(
        Enum(RoleType, name="role_enum", default=RoleType.user)
    )
    
    tell: Mapped[str] = mapped_column(
        String(50), nullable=False
    )
    verified: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    isActive: Mapped[bool] = mapped_column(
        Boolean, 
        default=True, 
        nullable=False
    )
    company: Mapped[list["Company"]] = relationship(
        back_populates="user"
    )
    codes: Mapped[list["Codes"]] = relationship(
        back_populates="user"
    )

    event_token: Mapped[list["EventToken"]] = relationship(
        back_populates="user"
    )
    