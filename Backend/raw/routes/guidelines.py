from fastapi import Depends,HTTPException,status,APIRouter
from sqlalchemy import func, or_
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models,oauth,schemas
from typing import List

router = APIRouter(
    tags=["Guidelines"],
    prefix="/guidelines"
)

def find_rules(country:str,age:int,db:Session):
    return db.query(models.GuidelineRules).filter(
        func.lower(models.GuidelineRules.country)==country.lower(),
        models.GuidelineRules.min_age<=age,
        or_(
            models.GuidelineRules.max_age.is_(None),
            models.GuidelineRules.max_age >= age,
        ),
    ).all()

@router.get("",response_model=List[schemas.GetGuides])
def get_guidelines(country:str,age:int,db:Session=Depends(get_db)):
    # i have to get the guides according country and age
    
    return find_rules(db,country,age)

@router.get("/me", response_model=List[schemas.GetGuides])
def get_my_guidelines(db: Session = Depends(get_db), current_user: models.Users = Depends(oauth.get_current_user)):
    profile = db.query(models.Profiles).filter(models.Profiles.user_id==current_user.id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Create a profile first",
        )
    return find_rules(db, profile.country, profile.age)

