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

    companyName: Mapped[str] = mapped_column(
        String(100), 
        nullable=False
    )

    companyAddress: Mapped[str] = mapped_column(
        String(255), 
        nullable=False
    )

    companyNIT: Mapped[str] = mapped_column(
        String(50), 
        unique=True,
        nullable=False
    )

    companyLogo: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    companyBanner: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True
    )

    # Relación con User
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        unique=True,
        nullable=False
    )

    user: Mapped["Users"] = relationship(
        "Users",
        back_populates="company"
    )

    products: Mapped[list["Product"]] = relationship(
        "Product",
        back_populates="company"
    )
