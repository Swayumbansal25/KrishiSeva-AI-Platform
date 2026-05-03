from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pickle
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the real trained model
with open('RandomForest.pkl', 'rb') as f:
    model = pickle.load(f)

with open('labels.pkl', 'rb') as f:
    labels = pickle.load(f)

print("Model loaded successfully!")
print("Crops:", labels)

class CropFormData(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

def get_risk_level(confidence: float) -> str:
    if confidence >= 80:
        return "Low"
    elif confidence >= 60:
        return "Medium"
    else:
        return "High"

def get_soil_health(ph: float) -> str:
    if 6.0 <= ph <= 7.5:
        return "Good"
    elif 5.5 <= ph <= 8.0:
        return "Moderate"
    else:
        return "Poor"

@app.post("/predict-form")
async def predict_form(data: CropFormData):
    # Prepare input for model
    features = np.array([[
        data.nitrogen,
        data.phosphorus,
        data.potassium,
        data.temperature,
        data.humidity,
        data.ph,
        data.rainfall
    ]])

    # Get prediction probabilities for all crops
    probabilities = model.predict_proba(features)[0]

    # Get top 5 predictions
    top5_indices = np.argsort(probabilities)[::-1][:5]
    top5_crops = [
        {
            "name": labels[i].capitalize(),
            "confidence": round(probabilities[i] * 100, 1),
            "riskLevel": get_risk_level(probabilities[i] * 100)
        }
        for i in top5_indices
    ]

    # Best prediction
    best_crop = top5_crops[0]
    confidence = best_crop["confidence"]
    soil_health = get_soil_health(data.ph)

    # Smart recommendations based on actual input values
    recommendations = []

    if data.nitrogen < 40:
        recommendations.append("Nitrogen is low — consider adding urea or compost fertilizer.")
    elif data.nitrogen > 100:
        recommendations.append("Nitrogen is high — reduce nitrogen-based fertilizers.")
    else:
        recommendations.append(f"Nitrogen level ({data.nitrogen} kg/ha) is optimal.")

    if data.ph < 6.0:
        recommendations.append(f"Soil pH ({data.ph}) is acidic — add lime to raise pH.")
    elif data.ph > 7.5:
        recommendations.append(f"Soil pH ({data.ph}) is alkaline — add sulfur to lower pH.")
    else:
        recommendations.append(f"Soil pH ({data.ph}) is ideal for most crops.")

    if data.rainfall < 80:
        recommendations.append(f"Rainfall ({data.rainfall}mm) is low — irrigation is recommended.")
    elif data.rainfall > 200:
        recommendations.append(f"Rainfall ({data.rainfall}mm) is high — ensure proper drainage.")
    else:
        recommendations.append(f"Rainfall ({data.rainfall}mm) is sufficient.")

    if data.humidity < 40:
        recommendations.append("Humidity is low — consider drip irrigation.")
    elif data.humidity > 85:
        recommendations.append("Humidity is high — watch for fungal diseases.")
    else:
        recommendations.append(f"Humidity ({data.humidity}%) is in a healthy range.")

    if data.temperature < 15:
        recommendations.append("Temperature is low — protect crops from cold stress.")
    elif data.temperature > 38:
        recommendations.append("Temperature is high — ensure adequate watering.")
    else:
        recommendations.append(f"Temperature ({data.temperature}°C) is suitable for cultivation.")

    return {
        "predicted_crop": best_crop["name"],
        "confidence": confidence,
        "soil_health": soil_health,
        "recommendations": recommendations,
        "all_predictions": top5_crops
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    return {
        "predicted_crop": "Rice",
        "confidence": 90,
        "soil_health": "Good",
        "recommendations": ["Please use the form for accurate predictions."]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)