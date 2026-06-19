from app.services.email.EmailService import send_email


def EmailRegisterCompany(to_email: str,company_name: str,company_nit: str):

    subject = "Solicitud de registro de empresa recibida"

    body = f"""
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Registro de Empresa</title>
    </head>

    <body style="
        margin:0;
        padding:0;
        background-color:#f4f4f4;
        font-family:Arial,sans-serif;
    ">

        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding:40px 0;">

                    <table width="600" cellpadding="0" cellspacing="0"
                        style="
                            background:#ffffff;
                            border-radius:12px;
                            overflow:hidden;
                            border:1px solid #e5e7eb;
                        ">

                        <!-- Header -->
                        <tr>
                            <td align="center"
                                style="
                                    background:#00E65A;
                                    color:#0f172a;
                                    padding:30px;
                                ">
                                <h1 style="margin:0;">
                                    Lubix
                                </h1>
                            </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                            <td style="padding:30px;">

                                <h2 style="
                                    margin-top:0;
                                    color:#111827;
                                ">
                                    Solicitud de registro recibida
                                </h2>

                                <p style="
                                    color:#4b5563;
                                    line-height:1.7;
                                ">
                                    Hemos recibido correctamente la solicitud de registro
                                    de tu empresa en <strong>Lubix</strong>.
                                </p>

                                <!-- Company Info -->
                                <table width="100%" cellpadding="0" cellspacing="0"
                                    style="
                                        background:#f9fafb;
                                        border:1px solid #e5e7eb;
                                        border-radius:8px;
                                        margin:20px 0;
                                    ">
                                    <tr>
                                        <td style="padding:20px;">

                                            <p style="
                                                margin:0 0 10px 0;
                                                color:#374151;
                                            ">
                                                <strong>Empresa:</strong>
                                                {company_name}
                                            </p>

                                            <p style="
                                                margin:0;
                                                color:#374151;
                                            ">
                                                <strong>NIT:</strong>
                                                {company_nit}
                                            </p>

                                        </td>
                                    </tr>
                                </table>

                                <!-- Status -->
                                <table width="100%" cellpadding="0" cellspacing="0"
                                    style="
                                        background:#fff7ed;
                                        border:1px solid #fed7aa;
                                        border-radius:8px;
                                        margin:20px 0;
                                    ">
                                    <tr>
                                        <td style="padding:20px;">

                                            <p style="
                                                margin:0;
                                                color:#b45309;
                                                font-weight:bold;
                                            ">
                                                Estado: En revisión
                                            </p>

                                            <p style="
                                                margin-top:10px;
                                                color:#92400e;
                                                line-height:1.6;
                                            ">
                                                Nuestro equipo validará la información
                                                suministrada. Recibirás una respuesta
                                                en un plazo máximo de
                                                <strong>3 días hábiles</strong>.
                                            </p>

                                        </td>
                                    </tr>
                                </table>

                                <p style="
                                    color:#4b5563;
                                    line-height:1.7;
                                ">
                                    Una vez finalizada la revisión, te notificaremos
                                    si la empresa ha sido aprobada o si necesitamos
                                    información adicional.
                                </p>

                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center"
                                style="
                                    background:#f9fafb;
                                    color:#6b7280;
                                    padding:20px;
                                    font-size:12px;
                                ">
                                © 2026 Lubix. Todos los derechos reservados.
                                <br>
                                Este es un mensaje automático, por favor no respondas este correo.
                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

    </body>
    </html>
    """

    return send_email(to_email, subject, body)