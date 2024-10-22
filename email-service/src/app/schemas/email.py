from pydantic import BaseModel, EmailStr

class EmailSchema(BaseModel):
    to_email: EmailStr
    token: str
    subject: str
    body: str
