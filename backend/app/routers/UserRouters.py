# Este router se encarga de manejar las rutas relacionadas 
# con la autenticación de usuarios, incluyendo registro, inicio de sesión,
# verificación de correo electrónico, recuperación de contraseña y cierre de sesión.
from fastapi import APIRouter,Depends
from app.services.AuthUser import register_user_service, verify_email_service, login_user_service, forgot_password_service, reset_password_service, logout_user_service
from sqlalchemy.orm import Session
from app.database.Connection import get_db
from app.schemas.SchemaAuthUser import createUser, verifyEmail, userLogin, forgotPassword, ResetPassword, AddToken, DeleteToken
router = APIRouter(
    prefix=("/user"),   
    tags=["User"]
)

@router.post("/register")
def registerUser(user: createUser, database: Session = Depends(get_db)):
    register_user_service(user, database)
    return {
        "message": "Usuario registrado correctamente, se ha enviado un código de verificación a tu correo electrónico para verificar tu cuenta.",
    }

@router.post("/verify-email")
def verify_email(code: verifyEmail, database: Session = Depends(get_db)):
    result = verify_email_service(code, database)
    return result

@router.post("/login")
def login_user(user: userLogin, database: Session = Depends(get_db)):
    result = login_user_service(user, database)
    return result

@router.post("/forgot-password")
def forgot_password(user: forgotPassword, database: Session = Depends(get_db)):
    result = forgot_password_service(user, database)
    return result

@router.post("/reset-password")
def reset_password(user: ResetPassword, database: Session = Depends(get_db)):
    result = reset_password_service(user, database)
    return result

@router.post("/logout")
def logout_user(delete: DeleteToken, database: Session = Depends(get_db)):
    result = logout_user_service(delete, database)
    return result
