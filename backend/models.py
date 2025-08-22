from sqlalchemy import Table,Column, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime
from database import Base
from sqlalchemy.orm import relationship


favorites_table = Table(
    "favorites",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"),primary_key=True),
    Column("article_id", Integer, ForeignKey("articles.id"),primary_key=True)
)


class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    body = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    owner_id = Column(Integer, ForeignKey("users.id"))  # 👈 links article to user
    owner = relationship("User", back_populates="articles")
    favorited_by = relationship(
        "User",
        secondary=favorites_table,
        back_populates="favorites"
    )

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    articles = relationship("Article", back_populates="owner")
    favorites = relationship(
        "Article",
        secondary=favorites_table,
        back_populates="favorited_by"
    )
