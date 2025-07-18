# routers/profile.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import User
from database import get_db
from auth import get_current_user
from schemas import Profile

router = APIRouter(prefix="/profiles", tags=["profiles"])

@router.get("/{username}", response_model=Profile)
def get_profile(username: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    following = current_user in user.followers
    return {"username": user.username, "bio": "", "following": following}

@router.post("/{username}/follow", response_model=Profile)
def follow_user(username: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user = db.query(User).filter(User.username == username).first()
    if not user or user == current_user:
        raise HTTPException(status_code=400, detail="Invalid user")

    if current_user not in user.followers:
        user.followers.append(current_user)
        db.commit()
    
    return {"username": user.username, "bio": "", "following": True}

@router.delete("/{username}/follow", response_model=Profile)
def unfollow_user(username: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user = db.query(User).filter(User.username == username).first()
    if not user or user == current_user:
        raise HTTPException(status_code=400, detail="Invalid user")

    if current_user in user.followers:
        user.followers.remove(current_user)
        db.commit()

    return {"username": user.username, "bio": "", "following": False}
