from app.services.email.EmailService import send_email


def EmailVerify(to_email: str, code: str, code_type: str):

    subject = "Verificación de correo"

    body = f"""
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verificación de correo</title>
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
                                    Verificación de correo
                                </h2>

                                <p style="
                                    color:#4b5563;
                                    line-height:1.7;
                                ">
                                    Hemos recibido una solicitud para verificar tu
                                    correo electrónico en <strong>Lubix</strong>.
                                </p>

                                <p style="
                                    color:#4b5563;
                                    line-height:1.7;
                                ">
                                    Utiliza el siguiente código para completar el proceso:
                                </p>

                                <!-- Verification Code -->
                                <table width="100%" cellpadding="0" cellspacing="0"
                                    style="
                                        background:#f9fafb;
                                        border:1px solid #e5e7eb;
                                        border-radius:8px;
                                        margin:25px 0;
                                    ">
                                    <tr>
                                        <td align="center" style="padding:25px;">

                                            <span style="
                                                display:inline-block;
                                                background:#eef2ff;
                                                color:#00E65A;
                                                padding:15px 30px;
                                                font-size:32px;
                                                font-weight:bold;
                                                letter-spacing:8px;
                                                border-radius:8px;
                                                font-family:monospace;
                                            ">
                                                {code}
                                            </span>

                                        </td>
                                    </tr>
                                </table>

                                <!-- Information -->
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
                                                margin:0;
                                                color:#374151;
                                            ">
                                                <strong>Tiempo de expiración:</strong>
                                                10 minutos
                                            </p>

                                        </td>
                                    </tr>
                                </table>

                                <!-- Security Notice -->
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
                                                Aviso de seguridad
                                            </p>

                                            <p style="
                                                margin-top:10px;
                                                color:#92400e;
                                                line-height:1.6;
                                            ">
                                                Si no solicitaste este código,
                                                puedes ignorar este correo de forma segura.
                                            </p>

                                        </td>
                                    </tr>
                                </table>

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