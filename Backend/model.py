import joblib
import os

# Path to models folder
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH   = os.path.join(BASE_DIR, "models", "xgboost_target_encoding_model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "models", "target_encoder.pkl")


# Load once at startup - not on every request
xgb_model = joblib.load(MODEL_PATH)
target_encoder = joblib.load(ENCODER_PATH)

print("Model and encoder loaded successfully!")