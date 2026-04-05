from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

from schema import CarInput, PredictionOutput, ReviewInput, ReviewOutput, ReviewStats
from model import xgb_model, target_encoder
from preprocess import preprocess_input
from database import insert_review, get_review_stats, get_all_reviews

app = FastAPI(
    title = "Used Car Price Prediction API",
    description = "An API to predict the price of used cars based on various features using XGBoost",
    version = "1.0.0"
)

 # Allow Next.js frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins     = ["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods     = ["*"],
    allow_headers     = ["*"],
    allow_credentials = True
)

@app.get("/")
def root():
    return {"message": "Used Car Price Prediction API is running!"}

@app.post("/predict", response_model=PredictionOutput)
def predict(car: CarInput):
    try:
        # Step 1 — Preprocess input
        df = preprocess_input(car.dict(), target_encoder)

        # Step 2 — Predict (log scale)
        log_price = xgb_model.predict(df)[0]

        # Step 3 — Reverse log transform to get actual ₹
        actual_price = float(np.expm1(log_price))

        # Validate prediction is reasonable
        if actual_price <= 0:
            raise HTTPException(
                status_code=400,
                detail="Unable to predict price for this vehicle configuration. Please try a different combination."
            )

        return PredictionOutput(
            predicted_price = round(actual_price, 2),
            model_used      = "XGBoost + Target Encoding"
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/review", response_model=ReviewOutput)
def submit_review(review: ReviewInput):
    try:
        if review.rating < 1 or review.rating > 5:
            raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")

        review_id = insert_review(review.dict())
        return ReviewOutput(id=review_id, message="Review submitted successfully")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit review: {str(e)}")

@app.get("/reviews/stats", response_model=ReviewStats)
def get_stats():
    try:
        return get_review_stats()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/reviews")
def get_reviews(limit: int = 100, offset: int = 0):
    try:
        return get_all_reviews(limit=limit, offset=offset)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health():
    return {"status": "ok"}
