from fastapi import Depends,HTTPException,status,APIRouter
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models,oauth,schemas


router = APIRouter(
    tags=["Profiles"],
    prefix="/profile"
)

@router.get("",response_model=schemas.GetProfile)
def get_my_profile(db:Session=Depends(get_db),current_user:models.Users=Depends(oauth.get_current_user)):
    profile = db.query(models.Profiles).filter(models.Profiles.user_id==current_user.id).first()
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="Not found")
    return profile

@router.post("",status_code=status.HTTP_201_CREATED,response_model=schemas.CreateProfile)
def create_profile(profile:schemas.PostProfile,db:Session=Depends(get_db),current_user:models.Users=Depends(oauth.get_current_user)):
    existing = db.query(models.Profiles).filter(models.Profiles.user_id==current_user.id).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Profile already exists",
        )
    new_profile = models.Profiles(**profile.model_dump(), user_id=current_user.id)
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile


@router.put("",response_model=schemas.PutProfile)
def update_profile(profile:schemas.PostProfile,db:Session=Depends(get_db),current_user:models.Users=Depends(oauth.get_current_user)):
    existing = db.query(models.Profiles).filter(models.Profiles.user_id == current_user.id).first()
    if not existing:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Profile not found",
        )
    for field,value in profile.model_dump().items():
        setattr(existing,field,value)


    db.commit()
    db.refresh(existing)
    return existing

