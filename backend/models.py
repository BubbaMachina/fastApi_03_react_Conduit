from sqlalchemy import Table,Column, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime
from database import Base
from sqlalchemy.orm import relationship


followers = Table(
    "followers",
    Base.metadata,
    Column("follower_id",Integer,ForeignKey("users.id")),
    Column("followed_id",Integer,ForeignKey("users.id"))
)

class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    body = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    owner_id = Column(Integer, ForeignKey("users.id"))  # 👈 links article to user
    owner = relationship("User", back_populates="articles")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    articles = relationship("Article", back_populates="owner")
    following = relationship(
        "User",
        secondary=followers,
        primaryjoin=id==followers.c.follower_id,
        secondaryjoin=id==followers.c.followed_id,
        backref="followers"
    )