from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from datetime import timedelta
from pydantic import BaseModel

from app.database import get_session
from app.models import Usuario
from app.security import get_password_hash, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


class LoginData(BaseModel):
    correo: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=dict)
def register(data: LoginData, session: Session = Depends(get_session)):
    # Verificar que no exista el correo
    statement = select(Usuario).where(Usuario.correo == data.correo)
    existing = session.exec(statement).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Correo ya registrado")
    password_hash = get_password_hash(data.password)
    usuario = Usuario(nombre=data.correo.split("@")[0], correo=data.correo, password_hash=password_hash)
    session.add(usuario)
    session.commit()
    session.refresh(usuario)
    return {"id": usuario.id, "correo": usuario.correo}


@router.post("/login", response_model=TokenResponse)
def login(data: LoginData, session: Session = Depends(get_session)):
    statement = select(Usuario).where(Usuario.correo == data.correo)
    usuario = session.exec(statement).first()
    if not usuario:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales incorrectas")
    if not verify_password(data.password, usuario.password_hash or ""):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales incorrectas")

    access_token_expires = timedelta(minutes=60)
    access_token = create_access_token(data={"sub": usuario.correo}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}
