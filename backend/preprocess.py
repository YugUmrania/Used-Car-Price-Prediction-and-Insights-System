import numpy as np
import pandas as pd 

LUXURY_BRANDS = [
    'mercedes-benz', 'bmw', 'audi', 'land rover',
    'volvo', 'jaguar', 'mini', 'porsche', 'lexus',
    'maserati', 'bentley', 'lamborghini', 'rolls-royce',
    'jeep', 'hummer'
]

VALID_BRANDS = [
    "ambassador","ashok","aston martin","audi","bajaj","bentley","bmw","chevrolet",
    "citroen","datsun","fiat","force","ford","honda","hummer","hyundai","icml",
    "isuzu","jaguar","jeep","kia","lamborghini","land rover","lexus","mahindra",
    "maruti suzuki","maserati","mercedes-benz","mg","mini","mitsubishi","nissan",
    "opel","porsche","renault","rolls-royce","skoda","ssangyong","tata","toyota",
    "toyota land","volkswagen","volvo",
]

VALID_MODELS = {
    "maruti suzuki": ["swift","dzire","baleno","ertiga","wagon r","alto","alto k10","celerio","ciaz","s-cross","vitara brezza","ignis","s-presso","brezza","xl6","tour s","tour m","eco","omni","gypsy","a-star","ritz","sx4","esteem","versa","grand vitara","jimny","fronx","invicto"],
    "hyundai": ["i10","i20","venue","creta","tucson","kona","verna","xcent","aura","grand i10","santro","elite i20","accent","sonata","elantra","fluidic verna","getz","santro xing","tucson","i20 active","i10 grand","grand i10 nios","venue n line","creta n line","exter","viva","eon"],
    "tata": ["nexon","harrier","safari","tiago","tigo","altroz","punch","hexa","zest","bolt","indica","indigo","manza","aria","safari storme","sumo","xenon","venture","nano","tiago nrg","altroz iTurbo","harrier dark","safari dark","curvv","sierra","sumo gold","magic","winger"],
    "toyota": ["innova","fortuner","corolla","camry","glanza","rumion","urban cruiser","etios","liva","yaris","hyryder","land cruiser","fortuner legender","innova crysta","qualis","corolla altis","camry hybrid","alphard","vellfire","prado","hilux"],
    "honda": ["city","amaze","jazz","brio","wr-v","civic","accord","cr-v","mobilio","br-v","elevate","city hybrid","civic type r"],
    "mahindra": ["xuv300","xuv400","xuv500","xuv700","bolero","scorpio","thar","marazzo","kuv100","verito","tuo","jeep","quanto","xyllo","logang","bolero neo","scorpio n","xuv300 turbo","marazzo m","thar roxx","be 6e","xev 9e"],
    "ford": ["ecosport","figo","freestyle","aspire","endeavour","fusion","fiesta","icon","escort","mondeo","mustang","ranger","classic"],
    "volkswagen": ["polo","vento","taigun","tiguan","t-roc","passat","jetta","ameo","up","cross polo","phaeton","golf","touran","sharan"],
    "skoda": ["rapid","octavia","superb","kushaq","slavia","kamiq","karoq","kodiaq","fabia","yeti","Laura"],
    "renault": ["kwid","triber","kiger","duster","lodgy","captur","kwid climber","scala","fluence","fluence","symbol"],
    "nissan": ["magnite","kicks","sunny","micra","terrano","x-trail","juke","qashqai","leaf","patrol","teana","evalia"],
    "kia": ["sonet","seltos","carens","ev6","carnival","sonet htx","seltos htx","stinger","picanto","rio","sorento","sportage"],
    "mg": ["hector","hector plus","astor","zs ev","comet","gloster","hector smart"],
    "bmw": ["3 series","5 series","7 series","x1","x3","x5","x7","z4","4 series","6 series","x6","i4","ix","m3","m5","x2","x4","8 series","i7","ix1"],
    "mercedes-benz": ["a-class","c-class","e-class","s-class","gla","glb","glc","gle","gls","g-wagon","cla","amg gt","eqc","b-class","v-class","maybach"],
    "audi": ["a3","a4","a6","a8","q3","q5","q7","q8","e-tron","rs5","r8","tt","s5","s7","a7","q2","q4 e-tron","rs q8"],
    "volvo": ["s60","s90","xc40","xc60","xc90","v40","s40","c40","ex30","ex40","ex90"],
    "jaguar": ["xe","xf","f-pace","e-pace","f-type","i-pace","xj","xk","s-type"],
    "porsche": ["cayenne","macan","panamera","taycan","718","911","cayman","boxster","carrera gt"],
    "land rover": ["range rover","range rover sport","range rover evoque","discovery","discovery sport","defender","freelander","velar"],
    "mini": ["cooper","countryman","clubman","paceman","convertible","john cooper works"],
    "lexus": ["es","rx","nx","lx","ux","ls","lc","gx","is","rc","lm"],
    "bentley": ["continental","flying spur","bentayga","mulsanne","azure","arnage"],
    "lamborghini": ["huracan","aventador","urus","gallardo","murcielago"],
    "rolls-royce": ["ghost","phantom","wraith","dawn","cullinan","spectre"],
    "maserati": ["ghibli","quattroporte","levante","mc20","gran turismo","gran cabrio"],
    "ferrari": ["roma","portofino","f8","sf90","296 gtb","812","purosangue"],
    "jeep": ["compass","meridian","wrangler","grand cherokee","cherokee","renegade","gladiator"],
    "isuzu": ["mu-x","d-max","v-cross","s-cab"],
    "citroen": ["c3","c5 aircross","ec3","basalt"],
    "datsun": ["redi-go","go","go+"],
    "fiat": ["punto","linea","urban cross","aventura","punto evo"],
    "force": ["gurkha","trax","cruiser"],
    "hummer": ["h2","h3","ev"],
    "icml": ["extreme","rx"],
    "mitsubishi": ["outlander","pajero","l200","lancer","cvt","montero"],
    "opel": ["corsa","astra","vectra"],
    "ssangyong": ["rexton","korando","tivoli","rodius"],
    "toyota land": ["cruiser","prado"],
    "aston martin": ["db11","vantage","dbx","dbs"],
    "bajaj": ["qute","re60"],
    "chevrolet": ["beat","cruze","sail","aveo","captiva","enjoy","spark","optra","tavera","trailblazer","malibu","corvette","camaro"],
    "lamborghini": ["huracan","aventador","urus"],
}

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