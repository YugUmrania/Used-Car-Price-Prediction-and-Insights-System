import joblib
import os

# Correct base directory (backend folder)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH   = os.path.join(BASE_DIR, "model", "xgboost_target_encoding_model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "model", "target_encoder.pkl")

# Load once at startup
xgb_model = joblib.load(MODEL_PATH)
target_encoder = joblib.load(ENCODER_PATH)

print("Model and encoder loaded successfully!")