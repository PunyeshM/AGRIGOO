from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Full list of diseases with mappings to pesticides and fertilizers
disease_mapping = {
    "Apple_Apple_scab": {"pesticide": "Captan", "fertilizer": "Calcium Nitrate"},
    "Apple_Black_rot": {"pesticide": "Mancozeb", "fertilizer": "Potassium Nitrate"},
    "Apple_Cedar_apple_rusths": {"pesticide": "Copper Hydroxide", "fertilizer": "Nitrogen Fertilizer"},
    "Apple_healthy": {"pesticide": "None Required", "fertilizer": "Balanced Fertilizer"},
    "Blueberry_healthy": {"pesticide": "None Required", "fertilizer": "Acidic Fertilizer"},
    "Cherry_(including_sour)_healthy": {"pesticide": "None Required", "fertilizer": "Balanced Fertilizer"},
    "Cherry_(including_sour)_Powdery": {"pesticide": "Sulfur Dust", "fertilizer": "Potash"},
    "Corn_(maize)_Cercospora_leaf_sp": {"pesticide": "Azoxystrobin", "fertilizer": "Urea"},
    "Corn_(maize)Common_rust": {"pesticide": "Propiconazole", "fertilizer": "Ammonium Sulfate"},
    "Corn_(maize)_healthy": {"pesticide": "None Required", "fertilizer": "Balanced Fertilizer"},
    "Corn_(maize)_Northem_Leaf_Blig": {"pesticide": "Chlorothalonil", "fertilizer": "Phosphorus Fertilizer"},
    "Grape_Black_rot": {"pesticide": "Myclobutanil", "fertilizer": "Calcium Nitrate"},
    "Grape_Esca_(Black_Measles)": {"pesticide": "Tebuconazole", "fertilizer": "Potassium Fertilizer"},
    "Grape_healthy": {"pesticide": "None Required", "fertilizer": "Balanced Fertilizer"},
    "Grape_Leaf_blight_(Isariopsis_Lea)": {"pesticide": "Copper Sulfate", "fertilizer": "Nitrogen Fertilizer"},
    "Orange_Haunglongbing_(Citrus_)": {"pesticide": "Imidacloprid", "fertilizer": "Magnesium Sulfate"},
    "Peach_Bacterial_spot": {"pesticide": "Copper Hydroxide", "fertilizer": "Potassium Fertilizer"},
    "Peach_healthy": {"pesticide": "None Required", "fertilizer": "Balanced Fertilizer"},
    "Pepper,_bell_Bacterial_spot": {"pesticide": "Streptomycin", "fertilizer": "Calcium Nitrate"},
    "Pepper,_bell_healthy": {"pesticide": "None Required", "fertilizer": "Balanced Fertilizer"},
    "Potato_Early_blight": {"pesticide": "Chlorothalonil", "fertilizer": "Phosphorus Fertilizer"},
    "Potato_healthy": {"pesticide": "None Required", "fertilizer": "Balanced Fertilizer"},
    "Potato_Late_blight": {"pesticide": "Metalaxyl", "fertilizer": "Ammonium Sulfate"},
    "Raspberry_healthy": {"pesticide": "None Required", "fertilizer": "Balanced Fertilizer"},
    "Soybean_healthy": {"pesticide": "None Required", "fertilizer": "Balanced Fertilizer"},
    "Squash_Powdery_mildew": {"pesticide": "Sulfur", "fertilizer": "Potassium Fertilizer"},
    "Strawberry_healthy": {"pesticide": "None Required", "fertilizer": "Balanced Fertilizer"},
    "Strawberry_Leaf_scorch": {"pesticide": "Myclobutanil", "fertilizer": "Calcium Nitrate"},
    "Tomato_Bacterial_spot": {"pesticide": "Copper Hydroxide", "fertilizer": "Nitrogen Fertilizer"},
    "Tomato_Early_blight": {"pesticide": "Chlorothalonil", "fertilizer": "Ammonium Nitrate"},
    "Tomato_healthy": {"pesticide": "None Required", "fertilizer": "Balanced Fertilizer"},
    "Tomato_Late_blight": {"pesticide": "Mancozeb", "fertilizer": "Potassium Fertilizer"},
    "Tomato_Leaf_Mold": {"pesticide": "Fungicide", "fertilizer": "Nitrogen Fertilizer"},
    "Tomato_Septoria_leaf_spot": {"pesticide": "Azoxystrobin", "fertilizer": "Phosphorus Fertilizer"},
    "Tomato_Spider_mites_Two-spotte": {"pesticide": "Abamectin", "fertilizer": "Balanced Fertilizer"},
    "Tomato_Target_Spot": {"pesticide": "Difenoconazole", "fertilizer": "Calcium Nitrate"},
    "Tomato_Tomato_mosaic_virus": {"pesticide": "Insecticidal Soap", "fertilizer": "Nitrogen Fertilizer"},
    "Tomato_Tomato_Yellow_Leaf_Cur": {"pesticide": "Neem Oil", "fertilizer": "Phosphorus Fertilizer"},
}

@app.route("/")
def index():
    diseases = list(disease_mapping.keys())
    return render_template("index.html", diseases=diseases)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    disease = data.get("disease")
    if disease in disease_mapping:
        response = disease_mapping[disease]
        return jsonify({"success": True, "data": response})
    else:
        return jsonify({"success": False, "message": "Disease not found"})

if __name__ == "__main__":
    app.run(debug=True)
