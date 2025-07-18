from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from models import Article,User
import schemas
import crud
from database import SessionLocal, engine, Base, get_db
from auth import router as auth_router, get_current_user
from profile import router as profile_router

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(profile_router)
# Allow frontend on Vite dev server

@app.get("/articles", response_model=List[schemas.ArticleOut])
def list_articles(db: Session = Depends(get_db),current_user: User = Depends(get_current_user)):
    return db.query(Article).filter(Article.owner_id == current_user.id).all()
    # return crud.get_articles(db)

@app.post("/articles", response_model=schemas.ArticleOut)
def create_article(
    article: schemas.ArticleCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
    ):
    
    return crud.create_article(db, article,current_user)

@app.delete("/articles/{article_id}")
def delete_article(article_id: int, db: Session = Depends(get_db),current_user: User= Depends(get_current_user)):
    crud.delete_article(db, article_id,current_user)
    return {"detail": "Article deleted"}

# Enable uvicorn run via python main.py
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
