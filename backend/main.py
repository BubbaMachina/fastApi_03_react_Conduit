from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from models import Article,User
import schemas
import crud
from database import SessionLocal, engine, Base, get_db
from auth import router as auth_router, get_current_user
# from profile import router as profile_router

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

@app.post("/articles/{article_id}/favorite", response_model=schemas.ArticleOut)
def add_favorite(article_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return crud.add_favorite(db, article_id, current_user)


@app.delete("/articles/{article_id}/favorite", response_model=schemas.ArticleOut)
def remove_favorite(article_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return crud.remove_favorite(db, article_id, current_user)

@app.get("/favorites", response_model=List[schemas.FavoriteOut])
def list_favorites(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    favorites = crud.get_favorites(db, current_user)
    return favorites

@app.get("/articles/all", response_model=List[schemas.ArticleOut])
def list_all_articles(
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100)
):
    """
    Fetch all articles with optional pagination.
    - `skip`: Number of records to skip.
    - `limit`: Maximum number of records to return.
    """
    return db.query(Article).offset(skip).limit(limit).all()

@app.get("/articles/{article_id}", response_model=schemas.ArticleOut)
def get_article(
    article_id: int,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user)
):
    """
    Fetch details of a single article by its ID.
    """
    article = db.query(Article).filter(Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    # Check if the article is favorited by the current user
    if current_user:
        is_favorited = db.query(Article).join(Article.favorited_by).filter(
            Article.id == article_id, User.id == current_user.id
        ).count() > 0
        article.isFavorited = is_favorited
    else:
        article.isFavorited = False  # Default to False for unauthenticated users

    return article


@app.put("/articles/{article_id}", response_model=schemas.ArticleOut)
def update_article(
    article_id: int,
    updated_article: schemas.ArticleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update an existing article by its ID.
    """
    article = db.query(Article).filter(Article.id == article_id, Article.owner_id == current_user.id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    article.title = updated_article.title
    article.body = updated_article.body
    db.commit()
    db.refresh(article)
    return article


# Enable uvicorn run via python main.py
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
