from pydantic import BaseModel, Field

class CarInput(BaseModel):
    brand        : str   = Field(..., example="maruti")
    model        : str   = Field(..., example="swift")
    year         : int   = Field(..., ge=1995, le=2026, example=2019)
    kmDriven     : float = Field(..., gt=0, example=45000)
    transmission : str   = Field(..., example="manual")
    fuelType     : str   = Field(..., example="petrol")
    owner        : str   = Field(..., example="first")
    
class PredictionOutput(BaseModel):
    predicted_price : float
    model_used      : str