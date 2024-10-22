from fastapi import Request, HTTPException, APIRouter
from services.email_verification import send_verification_email
from services.reset_password import send_reset_password_email
import re

router = APIRouter()


@router.post("/send-verification-email")
async def email_verification(request: Request):
    try:
        response = await request.json()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid JSON body")

    email_regex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

    email = response.get("email")
    last_name = response.get("lastName")
    token = response.get("token")

    if not re.match(email_regex, email):
        raise HTTPException(status_code=400, detail="Invalid email format")

    if not email or not last_name or not token:
        raise HTTPException(status_code=400, detail="Invalid JSON body")

    await send_verification_email(email, last_name, token)

    return {"message": "email verification email sent"}


@router.post("/send-password-reset-email")
async def reset_password(request: Request):
    try:
        response = await request.json()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid JSON body")

    email_regex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

    email = response.get("email")
    last_name = response.get("lastName")
    token = response.get("token")

    if not re.match(email_regex, email):
        raise HTTPException(status_code=400, detail="Invalid email format")

    if not email or not last_name or not token:
        print("error, one of the values in null")
        raise HTTPException(status_code=400, detail="Invalid JSON body")
    await send_reset_password_email(email, last_name, token)

    return {"message": "password recovery email sent"}
