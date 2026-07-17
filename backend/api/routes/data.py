import os
import shutil
from typing import Optional
import pandas as pd
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from core.config import settings
from api.deps import get_db, get_current_user
from models.user import User, GuestSession
from models.dataset import Dataset

router = APIRouter()

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_dataset(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    if not file.filename.endswith(('.csv', '.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="Only CSV and Excel files are supported")
    
    # Restrict guest users to 2 sessions
    if isinstance(current_user, GuestSession):
        if current_user.sessions_used >= 2:
            raise HTTPException(
                status_code=403, 
                detail="You have reached your free guest limit. Create an account to continue."
            )
        current_user.sessions_used += 1
        db.commit()

    file_location = os.path.join(UPLOAD_DIR, f"{file.filename}")
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(file.file, file_object)

    # Basic schema detection with pandas
    try:
        if file.filename.endswith('.csv'):
            df = pd.read_csv(file_location, nrows=100) # Read only first 100 rows for schema detection
        else:
            df = pd.read_excel(file_location, nrows=100)
            
        columns = df.columns.tolist()
        dtypes = {col: str(dtype) for col, dtype in df.dtypes.items()}
        
        schema_info = {
            "columns": columns,
            "dtypes": dtypes,
            "row_count": len(df), # roughly
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse file: {str(e)}")

    user_id = current_user.id if isinstance(current_user, User) else None
    guest_id = current_user.id if isinstance(current_user, GuestSession) else None
    
    dataset = Dataset(
        user_id=user_id,
        guest_id=guest_id,
        filename=file.filename,
        file_path=file_location,
        schema_info=schema_info
    )
    db.add(dataset)
    db.commit()
    db.refresh(dataset)
    
    return {"message": "Dataset uploaded successfully", "dataset_id": dataset.id, "schema": schema_info}
