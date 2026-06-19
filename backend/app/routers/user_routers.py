from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.user import createUser, userLogin
from models.user import Users
from database.connection import get_db

router = APIRouter(
    prefix=("/user"),
    tags=["User"]
)

@router.post("/register")
def registerUser(u: createUser,database: Session = Depends(get_db)):
    verUser = database.query(Users).filter(Users.email == u.email).first()
    if verUser:
        raise HTTPException(status_code=409, detail="Correo registrado")
    registerUser = Users(**u.model_dump())
    database.add(registerUser)
    database.commit()
    database.refresh(registerUser)
    return registerUser

@router.post("/singIn")
def singIn(s: userLogin, database: Session = Depends(get_db)):
    verEmail = database.query(Users).filter(Users.email == s.email).first()
    if not verEmail:
        raise HTTPException(status_code=401, detail="Correo incorrecto")
    verPassword = database.query(Users).filter(Users.password == s.password).first()
    if not verPassword:
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")
    return {"message": "Inicio de sesion correctamente"}