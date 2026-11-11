from pydantic import BaseModel, Field
from typing import List, Optional

class FishSpecies(BaseModel):
    id: str
    name: str
    scientific_name: str
    category: str  # "freshwater" | "saltwater"
    care_level: str  # "Beginner" | "Intermediate" | "Advanced"
    temperament: str  # "Peaceful" | "Semi-Aggressive" | "Community" | "Aggressive"
    min_tank_size_gal: int
    temperature_range: str
    ph_range: str
    diet: str
    max_size_inches: float
    origin: str
    swimming_level: str
    lifespan: str
    image_url: str
    badge: Optional[str] = None
    description: str
    care_summary: str
    compatible_species: List[str]
    fun_fact: str
    featured: bool = False

class WaterCalculatorRequest(BaseModel):
    tank_gallons: float = Field(..., gt=0, description="Tank volume in gallons")
    water_type: str = Field(..., description="freshwater or saltwater")
    experience_level: Optional[str] = "Beginner"

class WaterCalculatorResponse(BaseModel):
    tank_gallons: float
    water_type: str
    max_safe_fish_count: int
    recommended_species: List[FishSpecies]
    filtration_recommendation: str
    water_chemistry_guide: dict

class NewsletterRequest(BaseModel):
    email: str
    interest: Optional[str] = "All Aquatics"

class NewsletterResponse(BaseModel):
    success: bool
    message: str
    email: str

class ConsultationRequest(BaseModel):
    name: str
    email: str
    tank_size: str
    inquiry_type: str
    message: str

class ConsultationResponse(BaseModel):
    success: bool
    ticket_id: str
    message: str

class CompatibilityCheckRequest(BaseModel):
    species_ids: List[str] = Field(..., min_length=2, description="At least two species to evaluate")

class CompatibilityCheckResponse(BaseModel):
    harmony_score: int
    verdict: str  # "Harmonious Coexistence", "Conditional Compatibility", "Critical Conflict"
    environment_match: bool
    temperature_overlap: str
    ph_overlap: str
    min_tank_recommended_gal: int
    evaluated_species: List[str]
    warnings: List[str]
    positive_synergies: List[str]

class DiagnosticRequest(BaseModel):
    symptom_key: str
    water_type: Optional[str] = "freshwater"

class DiagnosticResponse(BaseModel):
    condition_name: str
    urgency: str  # "Critical", "Moderate", "Watchful"
    primary_cause: str
    symptoms_observed: str
    immediate_action: str
    treatment_protocol: str
    preventive_measure: str
