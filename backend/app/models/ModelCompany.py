# Este modelo representa la tabla "company" en la base de datos, 
# que almacena información sobre las empresas.
from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from app.database.Connection import Base

class Company(Base):
    __tablename__ = "company"
    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True, 
        default=uuid.uuid4
    )
    nameCompany: Mapped[str] = mapped_column(
        String(50), 
        nullable=False
    )
    nit: Mapped[str] = mapped_column(
        String(50), 
        nullable=False
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id")
    )
    
    user: Mapped[list["Users"]] = relationship(
        back_populates="company"
    )