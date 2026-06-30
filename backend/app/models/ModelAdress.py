from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID
from app.database.Connection import Base
import uuid

class Address(Base):
    __tablename__ = "addresses"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    label: Mapped[str] = mapped_column(String(50), nullable=False)
    address: Mapped[str] = mapped_column(String(255), nullable=False)
    city: Mapped[str] = mapped_column(String(100), nullable=False)
    is_default: Mapped[bool] = mapped_column(Boolean, default=False)

    user: Mapped["Users"] = relationship("Users", back_populates="addresses")