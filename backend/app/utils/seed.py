import uuid
from sqlalchemy.orm import Session
from app.models.ModelRole import Role
from app.models.ModelUser import Users
from app.utils.Security import hash_password
from app.Config import config

def seed_roles(db: Session):
    roles = ["user", "company", "admin"]

    for role_name in roles:
        exists = db.query(Role).filter(Role.name == role_name).first()

        if not exists:
            db.add(Role(name=role_name))

    db.commit()

def seed_admin(db: Session):
    admin_role = db.query(Role).filter(Role.name == "admin").first()

    if not admin_role:
        return

    admin_email = config.ADMIN_DEFAULT
    admin_password = config.PASSWORD_DEFAULT

    exists = db.query(Users).filter(Users.email == admin_email).first()

    if not exists:
        admin = Users(
            id=uuid.uuid4(),
            fullName="System Admin",
            email=admin_email,
            tell="0000000000",
            hashed_password=hash_password(admin_password),
            role_id=admin_role.id,
            verified = True

        )

        db.add(admin)
        db.commit()


def run_seed(db: Session):
    seed_roles(db)
    seed_admin(db)