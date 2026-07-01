from app.services.email.EmailService import send_email


def EmailCompanyActivated(to_email: str, company_name: str, representative_name: str):

    subject = "¡Tu empresa ha sido aprobada en Lubix!"

    body = f"""
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Empresa Activada</title>
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
                                    ¡Tu empresa ha sido aprobada!
                                </h2>

                                <p style="
                                    color:#4b5563;
                                    line-height:1.7;
                                ">
                                    Hola <strong>{representative_name}</strong>,
                                </p>

                                <p style="
                                    color:#4b5563;
                                    line-height:1.7;
                                ">
                                    Nos complace informarte que la empresa
                                    <strong>{company_name}</strong> ha sido
                                    <strong>aprobada y activada</strong> en la plataforma
                                    <strong>Lubix</strong>.
                                </p>

                                <!-- Status -->
                                <table width="100%" cellpadding="0" cellspacing="0"
                                    style="
                                        background:#f0fdf4;
                                        border:1px solid #bbf7d0;
                                        border-radius:8px;
                                        margin:20px 0;
                                    ">
                                    <tr>
                                        <td style="padding:20px;">

                                            <p style="
                                                margin:0;
                                                color:#15803d;
                                                font-weight:bold;
                                            ">
                                                ✅ Estado: Cuenta activa
                                            </p>

                                            <p style="
                                                margin-top:10px;
                                                color:#166534;
                                                line-height:1.6;
                                            ">
                                                Ya puedes iniciar sesión con tu NIT y
                                                contraseña para acceder al panel de tu empresa,
                                                gestionar tu catálogo de productos y recibir pedidos.
                                            </p>

                                        </td>
                                    </tr>
                                </table>

                                <p style="
                                    color:#4b5563;
                                    line-height:1.7;
                                ">
                                    Si tienes alguna pregunta, no dudes en contactar al
                                    equipo de Lubix.
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
