from sqlalchemy import String, Enum, ForeignKey, DateTime
from sqlalchemy.orm import relationship, Mapped, mapped_column
from datetime import datetime, timedelta
from app.database.Connection import Base
from enum import Enum as typerEnum
from sqlalchemy.dialects.postgresql import UUID
import uuid

class TokenType(str, typerEnum):
    access = "access"
    refresh = "refresh"

class EventToken(Base):
    __tablename__ = "event_token"
    id: Mapped[uuid.UUID] = mapped_column(
        primary_key=True, default=uuid.uuid4
    )

    token: Mapped[str] = mapped_column(
        String(255), nullable=False
    )

    token_type: Mapped[TokenType] = mapped_column(
        Enum(TokenType), nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow    
    )
    expires_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=True
    )
    
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id")
    )
    user: Mapped["Users"] = relationship(
        back_populates="event_token"
    )