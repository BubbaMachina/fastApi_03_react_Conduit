from fastapi import HTTPException
import models
import schemas
from sqlalchemy.orm import Session

def get_articles(db: Session):
    return db.query(models.Article).order_by(models.Article.created_at.desc()).all()

def create_article(db: Session, article: schemas.ArticleCreate, current_user: models.User):
    db_article = models.Article(**article.model_dump(),owner_id=current_user.id)
    db.add(db_article)
    db.commit()
    db.refresh(db_article)
    return db_article

def delete_article(db: Session, article_id: int, current_user: models.User):
    article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    if article.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this article")
    db.delete(article)
    db.commit()

def add_favorite(db: Session, article_id: int, current_user: models.User):
    article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    if current_user in article.favorited_by:
        raise HTTPException(status_code=400, detail="Article already favorited")
    current_user.favorites.append(article)
    db.commit() 
    db.refresh(current_user)
    return article

def remove_favorite(db: Session, article_id: int, current_user: models.User):
    article = db.query(models.Article).filter(models.Article.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    if current_user not in article.favorited_by:
        raise HTTPException(status_code=400, detail="Article not favorited")
    current_user.favorites.remove(article)
    db.commit()
    db.refresh(current_user)
    return article

def get_favorites(db: Session, current_user: models.User):
    return current_user.favorites