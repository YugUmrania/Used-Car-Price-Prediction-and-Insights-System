from pydantic import BaseModel, Field, field_validator

class CarInput(BaseModel):
    brand        : str   = Field(..., json_schema_extra={"example": "maruti"})
    model        : str   = Field(..., json_schema_extra={"example": "swift"})
    year         : int   = Field(..., ge=1995, le=2026, json_schema_extra={"example": 2019})
    kmDriven     : float = Field(..., gt=0, json_schema_extra={"example": 45000})
    transmission : str   = Field(..., json_schema_extra={"example": "manual"})
    fuelType     : str   = Field(..., json_schema_extra={"example": "petrol"})
    owner        : str   = Field(..., json_schema_extra={"example": "first"})

    @field_validator("transmission")
    @classmethod
    def validate_transmission(cls, v):
        allowed = ["Manual", "Automatic"]
        if v not in allowed:
            raise ValueError(f"Transmission must be one of {allowed}, got '{v}'")
        return v

    @field_validator("fuelType")
    @classmethod
    def validate_fuel_type(cls, v):
        allowed = ["Petrol", "Diesel", "hybrid", "Hybrid/CNG"]
        if v not in allowed:
            raise ValueError(f"Fuel type must be one of {allowed}, got '{v}'")
        return v

    @field_validator("owner")
    @classmethod
    def validate_owner(cls, v):
        allowed = ["first", "second", "third"]
        if v not in allowed:
            raise ValueError(f"Owner must be one of {allowed}, got '{v}'")
        return v
    
class PredictionOutput(BaseModel):
    predicted_price : float
    model_used      : str

class ReviewInput(BaseModel):
    brand            : str
    model            : str
    year             : int
    km_driven        : float
    transmission     : str
    fuel_type        : str
    owner            : str
    predicted_price  : float
    rating           : int = Field(..., ge=1, le=5)
    feedback         : str = ""

class ReviewOutput(BaseModel):
    id               : int
    message          : str = "Review submitted successfully"

class ReviewStats(BaseModel):
    total_reviews    : int
    average_rating   : float
    rating_distribution : dict