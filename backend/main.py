import os
import uuid
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from database import FISH_DATABASE, AQUAX_STATS, AQUAX_FEATURES, TESTIMONIALS
from models import (
    FishSpecies,
    WaterCalculatorRequest,
    WaterCalculatorResponse,
    NewsletterRequest,
    NewsletterResponse,
    ConsultationRequest,
    ConsultationResponse,
)

app = FastAPI(
    title="AquaX Aquarium Intelligence & Species API",
    description="Backend services for the AquaX marine and freshwater ecosystem platform",
    version="1.0.0"
)

# Configure CORS to allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins during dev / local runs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for subscriptions & consultations
subscribers_db = []
consultations_db = []

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "connected_nodes": "AquaX-Biosphere-Core",
        "catalog_size": len(FISH_DATABASE)
    }

@app.get("/api/stats")
def get_stats():
    return AQUAX_STATS

@app.get("/api/features")
def get_features():
    return AQUAX_FEATURES

@app.get("/api/testimonials")
def get_testimonials():
    return TESTIMONIALS

@app.get("/api/fish", response_model=List[FishSpecies])
def get_all_fish(
    search: Optional[str] = Query(None, description="Search by name, scientific name or traits"),
    category: Optional[str] = Query(None, description="Filter: freshwater or saltwater"),
    care_level: Optional[str] = Query(None, description="Filter: Beginner, Intermediate, Advanced"),
    featured: Optional[bool] = Query(None, description="Only featured spotlight fishes")
):
    results = FISH_DATABASE

    if category and category.lower() != "all":
        results = [f for f in results if f["category"].lower() == category.lower()]

    if care_level and care_level.lower() != "all":
        results = [f for f in results if f["care_level"].lower() == care_level.lower()]

    if featured is not None:
        results = [f for f in results if f["featured"] == featured]

    if search:
        s = search.lower().strip()
        results = [
            f for f in results
            if s in f["name"].lower()
            or s in f["scientific_name"].lower()
            or s in f["description"].lower()
            or s in f["temperament"].lower()
        ]

    return results

@app.get("/api/fish/{fish_id}", response_model=FishSpecies)
def get_fish_by_id(fish_id: str):
    for fish in FISH_DATABASE:
        if fish["id"].lower() == fish_id.lower():
            return fish
    raise HTTPException(status_code=404, detail=f"Species with id '{fish_id}' not found.")

@app.post("/api/calculator", response_model=WaterCalculatorResponse)
def calculate_tank_profile(req: WaterCalculatorRequest):
    gallons = req.tank_gallons
    w_type = req.water_type.lower()

    # Determine recommended species from database matching tank size & type
    matching = [
        f for f in FISH_DATABASE
        if f["category"].lower() == w_type and f["min_tank_size_gal"] <= gallons
    ]

    # Calculate rule-of-thumb safe fish bioload capacity
    if w_type == "freshwater":
        safe_count = max(1, int(gallons * 0.9))
        filtration = f"Recommended: Canister or HOB filter rated for at least {int(gallons * 4)} GPH (Gallons Per Hour)."
        chemistry = {
            "target_temp": "74°F - 78°F (23°C - 26°C)",
            "target_ph": "6.6 - 7.4",
            "ammonia": "0.0 ppm",
            "nitrite": "0.0 ppm",
            "nitrate": "< 20 ppm"
        }
    else:
        safe_count = max(1, int(gallons * 0.4))
        filtration = f"Recommended: Reef-grade protein skimmer + wavemaker circulating {int(gallons * 15)} GPH."
        chemistry = {
            "target_temp": "76°F - 80°F (24°C - 27°C)",
            "target_ph": "8.1 - 8.4",
            "specific_gravity": "1.024 - 1.026",
            "calcium": "420 - 450 ppm",
            "alkalinity": "8 - 11 dKH"
        }

    return WaterCalculatorResponse(
        tank_gallons=gallons,
        water_type=w_type,
        max_safe_fish_count=safe_count,
        recommended_species=[FishSpecies(**f) for f in matching[:6]],
        filtration_recommendation=filtration,
        water_chemistry_guide=chemistry
    )

@app.post("/api/newsletter", response_model=NewsletterResponse)
def subscribe_newsletter(req: NewsletterRequest):
    subscribers_db.append({"email": req.email, "interest": req.interest})
    return NewsletterResponse(
        success=True,
        message=f"Welcome to AquaX! VIP aquarium intelligence handbook sent to {req.email}.",
        email=req.email
    )

@app.post("/api/consultation", response_model=ConsultationResponse)
def request_consultation(req: ConsultationRequest):
    ticket_id = f"AQX-{uuid.uuid4().hex[:6].upper()}"
    consultations_db.append({
        "ticket": ticket_id,
        "name": req.name,
        "email": req.email,
        "tank_size": req.tank_size,
        "inquiry": req.inquiry_type
    })
    return ConsultationResponse(
        success=True,
        ticket_id=ticket_id,
        message=f"Consultation request confirmed! A Master Aquarist will contact you within 2 hours. Reference ticket #{ticket_id}."
    )

# Serve built frontend if available
current_dir = os.path.dirname(os.path.abspath(__file__))
dist_path = os.path.join(current_dir, "..", "frontend", "dist")

if os.path.exists(dist_path):
    app.mount("/assets", StaticFiles(directory=os.path.join(dist_path, "assets")), name="assets")

    @app.get("/{full_path:path}")
    def serve_react_app(full_path: str):
        file_path = os.path.join(dist_path, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(dist_path, "index.html"))
else:
    @app.get("/")
    def root():
        return {
            "platform": "AquaX Marine Intelligence",
            "version": "1.0.0",
            "status": "online",
            "docs_url": "/docs"
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
