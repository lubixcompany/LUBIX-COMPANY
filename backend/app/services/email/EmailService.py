# Este servicio email se encarga de enviar correos electrónicos
# utilizando la cuenta de Gmail configurada en las variables de entorno.
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.Config import config

GMAIL_USERNAME = config.GMAIL_USERNAME
GMAIL_PASSWORD = config.GMAIL_APP_PASSWORD


def send_email(to_email: str, subject: str, body: str):
    msg = MIMEMultipart()
    msg['From'] = GMAIL_USERNAME
    msg['To'] = to_email
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'html'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(GMAIL_USERNAME, GMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        print("Correo enviado exitosamente")
    except Exception as e:
        print(f"Error al enviar correo: {e}")


