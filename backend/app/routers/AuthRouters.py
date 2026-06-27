# Este router se encarga de manejar las rutas relacionadas 
# con la autenticación de usuarios, incluyendo registro, inicio de sesión,
# verificación de correo electrónico, recuperación de contraseña y cierre de sesión.
from fastapi import APIRouter, Depends, UploadFile, File, Form
from app.services.authentication.AuthService import (
    register_user_service,
    register_company_service,
    verify_email_service,
    login_user_service,
    login_company_service,
    forgot_password_service,
    reset_password_service,
    refresh_token_service,
    logout_service
)
from sqlalchemy.orm import Session
from app.database.Connection import get_db
from app.schemas.SchemaAuthUser import (
    createUser, 
    verifyEmail, 
    userLogin, 
    forgotPassword, 
    ResetPassword,
    RefreshRequest
)
from app.schemas.SchemaAuthCompany import createCompany, LoginCompany
from app.services.NasService import NasService, get_nas_service

router = APIRouter(
    prefix=("/auth"),   
    tags=["auth"]
)

# Registro de usuario con first_name y last_name
@router.post("/register-user")
def registerUser(user: createUser, database: Session = Depends(get_db)):
    register_user_service(user, database)
    return {
        "message": "Usuario registrado correctamente, se ha enviado un código de verificación a tu correo electrónico para verificar tu cuenta.",
    }

# Registro de empresa sin NITDV ni certificado
@router.post("/register-company")
def registerCompany(
    first_name: str = Form(...),
    last_name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    tell: str = Form(...),
    companyName: str = Form(...),
    companyAddress: str = Form(...),
    companyNIT: str = Form(...),
    companyLogo: UploadFile | None = File(None),
    companyBanner: UploadFile | None = File(None),
    nas: NasService = Depends(get_nas_service),
    database: Session = Depends(get_db)
):
    user = createUser(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password,
        tell=tell
    )

    company = createCompany(
        companyName=companyName,
        companyAddress=companyAddress,
        companyNIT=companyNIT,
        companyLogo=companyLogo.filename if companyLogo else None,
        companyBanner=companyBanner.filename if companyBanner else None
    )

    return register_company_service(
        user=user,
        company=company,
        nas=nas, 
        database=database
    )

@router.post("/verify-email-user")
def verify_email(code: verifyEmail, database: Session = Depends(get_db)):
    return verify_email_service(code, database)

@router.post("/login-user")
def login_user(user: userLogin, database: Session = Depends(get_db)):
    return login_user_service(user, database)

@router.post("/login-company")
def login_company(company: LoginCompany, database: Session = Depends(get_db)):
    return login_company_service(company, database)

@router.post("/forgot-password-user")
def forgot_password(user: forgotPassword, database: Session = Depends(get_db)):
    return forgot_password_service(user, database)

@router.post("/reset-password-user")
def reset_password(user: ResetPassword, database: Session = Depends(get_db)):
    return reset_password_service(user, database)

@router.post("/refresh")
def refresh_token(data: RefreshRequest, database: Session = Depends(get_db)):
    return refresh_token_service(data, database)

@router.post("/logout")
def logout():
    return {"message": "saliendo del inicio de sesión"}
