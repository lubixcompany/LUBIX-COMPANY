from fastapi import APIRouter, Response, HTTPException
from app.services.NasService import client

router = APIRouter()

@router.get("/media/proxy")
def proxy_file(path: str):
   try:
      response = client.get_object("uploads", path.replace("uploads", ""))

      return Response(
         content=response.read(),
         media_type="images/png"
      )
   
   except Exception as e:
      print(e)
      raise HTTPException(status_code=404, detail="Archivo no encontrado")