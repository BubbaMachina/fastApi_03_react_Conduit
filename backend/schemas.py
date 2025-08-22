from pydantic import BaseModel, EmailStr, constr
from datetime import datetime

class ArticleCreate(BaseModel):
    title: str
    body: str

class ArticleOut(BaseModel):
    id: int
    title: str
    body: str
    created_at: datetime
    owner_id: int

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    username: constr(strip_whitespace=True,min_length=3)
    email: EmailStr
    password: constr(min_length=3)
    
# class UserCreate(BaseModel):
#     username: str
#     email: str
#     password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    
class FavoriteOut(BaseModel):
    user: UserOut
    article: ArticleOut

    class Config:
        orm_mode = True
        