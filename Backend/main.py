from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

from schema import CarInput, PredictionOutput
from model import xgb_model, target_encoder
from preprocess import preprocess_input

app = FastAPI(
    title = "Used Car Price Prediction API",
    description = "An API to predict the price of used cars based on various features using XGBoost",
    version = "1.0.0"
)

 # Allow Next.js frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins     = ["http://localhost:3000"],
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

        return PredictionOutput(
            predicted_price = round(actual_price, 2),
            model_used      = "XGBoost + Target Encoding"
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health():
    return {"status": "ok"}