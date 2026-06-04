# Este codigo es la implementacion de un servicio para manejar el 
# almacenamiento de archivos en un sistema de almacenamiento en la nube, 
# utilizando MinIO como solución de almacenamiento. 
# El servicio proporciona funcionalidades para subir, 
# listar, descargar y eliminar archivos en un bucket específico.

from minio import Minio
from minio.error import S3Error
from app.Config import config

client = Minio(
    "minio:9000",
    access_key=config.MINIO_ROOT_USER,
    secret_key=config.MINIO_ROOT_PASSWORD,
    secure=False
)

# Verificar si el bucket existe, si no, crearlo
# El bucket es el contenedor donde se almacenan 
# los archivos, es como una carpeta virtual en el sistema de 
# almacenamiento.
bucket = "uploads"

if not client.bucket_exists(bucket):
    client.make_bucket(bucket)


class NasService:

    def __init__(self, client, bucket):
        self.client = client
        self.bucket = bucket

    def upload_file(self, file_path, object_name):

        try:
            self.client.fput_object(
                self.bucket,
                object_name,
                file_path
            )

            return {
                "success": True,
                "Message": "Archivo subido correctamente"
            }
        
        except FileNotFoundError:
            return {
                "success": False,
                "Message": f"Archivo no encontrado: {file_path}"
            }

        except S3Error as e:
            return {
                "success": False,
                "Message": str(e)
            }

        except Exception as e:
            return{
                "success": False,
                "Message": str(e)
            }       
    
    def download_file(self, object_name, file_path):
        try:
            self.client.fget_object(
                self.bucket,
                object_name,
                file_path
            )
            return {
                "success": True
            }
        
        except S3Error as e:
            print(f"Error al descargar archivo...")
            return False
        
    def delete_file(self, object_name):
        try:
            self.client.remove_object(
                self.bucket,
                object_name
            )
            return True
        except S3Error as e:
            print(f"Error al eliminar archivo...")
            return False

subir = NasService(client, bucket)

#Ejemplo de uso: subir un archivo, descargarlo y luego eliminarlo

#primer parametro para buscar el archivo
#Segundo parametro para indicar donde se guardara el archivo descargado
#El segundo parametro es la ruta dentro del bcket donde se guardara el archivo
resultado = subir.upload_file("app/utils/jhv1.webp", "archivo/subir/jhv1.webp")
#print("Archivo subido exitosamente.")
print(resultado)

#primer parametro para buscar el archivo en el bucket
# segundo parametro para indicar donde se guardara el archivo descargado
#descargar = NasService(client, bucket)
#descargar.download_file("archivo/subir/jhv1.webp", "app/utils/jhv1_descargado2.webp")
#print("Archivo descargado exitosamente.")

# esto es para eliminar el achivo desde la nas
#eliminar = NasService(client, bucket)
#resultado2 = eliminar.delete_file("archivo/subir/jhv1.webp")
#print(resultado2)

#Esto es para actualizar archivo, parece que tiene la misma logica de almacenar archivo
#actualizar = NasService(client, bucket)
#actualizar.upload_file("app/utils/jhv1.webp", "archivo/subir/jhv5.webp")
#print("Archivo actualizado exitosamente.")
