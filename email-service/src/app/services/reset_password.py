import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from string import Template

from config.config import settings


async def send_reset_password_email(to_email: str, last_name: str, token: str) -> None:
    with open("./email-templates/reset-password/reset-password.html") as f:
        email_template = f.read()

    template = Template(email_template)
    html_content = template.substitute(
        last_name=last_name,
        link=settings.HOST_ORIGIN + "/public/auth/reset-password?token=" + token,
    )
    msg = MIMEMultipart()
    msg["From"] = settings.SMTP_USERNAME
    msg["To"] = to_email

    msg.attach(MIMEText(html_content, "html"))

    print("settings", settings)
    try:
        server = smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT)

        server.starttls()
        server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
        server.sendmail(settings.SMTP_USERNAME, to_email, msg.as_string())
        server.quit()
    except Exception as e:
        print(e)
        raise e

    print("email sent")
