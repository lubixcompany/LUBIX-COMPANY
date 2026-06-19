from fastapi import APIRouter
from utils.testDatabase import db_test

router = APIRouter(
    prefix=("/health"),
    tags=["health"]
)
@router.get("/test")
def healthDatabase():
    return db_test()