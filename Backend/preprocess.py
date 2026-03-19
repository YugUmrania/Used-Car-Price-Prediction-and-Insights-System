import numpy as np
import pandas as pd 

LUXURY_BRANDS = [
    'mercedes-benz', 'bmw', 'audi', 'land rover',
    'volvo', 'jaguar', 'mini', 'porsche', 'lexus',
    'maserati', 'bentley', 'lamborghini', 'rolls-royce',
    'jeep', 'hummer'
]

def preprocess_input(data: dict, encoder) -> pd.DataFrame:
    
    brand        = data['brand'].lower().strip()
    model        = data['model'].lower().strip()
    year         = data['year']
    km_driven    = data['kmDriven']
    transmission = data['transmission'].lower().strip()
    fuel_type    = data['fuelType'].lower().strip()
    owner        = data['owner'].lower().strip()

# Step 1 — Derived features (same as notebook)
    age         = 2026 - year
    log_km      = np.log1p(km_driven)
    km_per_year = log_km / (age + 1)
    age_squared = age ** 2
    
    # Step 2 — Build base dataframe
    input_dict = {
        'brand'                  : brand,
        'model'                  : model,
        'age'                    : age,
        'kmdriven'               : log_km,
        'km_per_year'            : km_per_year,
        'log_km'                 : log_km,
        'age_squared'            : age_squared,
        'transmission_automatic' : 1 if transmission == 'automatic' else 0,
        'transmission_manual'    : 1 if transmission == 'manual'    else 0,
        'fueltype_diesel'        : 1 if fuel_type == 'diesel'       else 0,
        'fueltype_hybrid'        : 1 if fuel_type == 'hybrid'       else 0,
        'fueltype_hybrid/cng'    : 1 if fuel_type == 'hybrid/cng'   else 0,
        'fueltype_petrol'        : 1 if fuel_type == 'petrol'       else 0,
        'owner_first'            : 1 if owner == 'first'            else 0,
        'owner_second'           : 1 if owner == 'second'           else 0,
        'owner_third'            : 1 if owner == 'third'            else 0,
    }
    
    df = pd.DataFrame([input_dict])
    
    # Step 3 — Target encode brand and model
    df = encoder.transform(df)

    return df