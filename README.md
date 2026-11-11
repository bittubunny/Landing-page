# AquaX | Responsive Aquarium Species & Biosphere Landing Page

AquaX is a modern, responsive, high-performance landing page and intelligence platform designed for aquarium fish enthusiasts, aquascapers, and reef keepers.

Built using **React.js** (with Tailwind CSS and Lucide icons) on the frontend and **Python (FastAPI)** on the backend.

---

## 🌟 Key Features & Sections

1. **Navigation Bar (`Navbar.jsx`)**:
   - Bioluminescent AquaX brand logo and telemetry badge.
   - Live backend status indicator showing real-time connectivity to FastAPI.
   - Smooth-scrolling links to *Species Matrix*, *Biosphere Features*, *Tank Matcher*, *AquaX Shield™*, and *Hobbyist Stories*.
   - Responsive mobile navigation drawer with backdrop blur.

2. **Hero Section (`Hero.jsx`)**:
   - Compelling aquatic headline: *"Breathe Life Into Your Living Waters"*.
   - Dual high-converting Call-to-Action buttons (*Explore Fish Catalog* and *Launch Tank Matcher*).
   - Interactive live species preview card with freshwater & saltwater toggle and real water parameters (temperature, pH, minimum tank size, care level).
   - Live metric indicators (640+ Species, 99.8% Healthy Arrival Rate, 48,500+ Aquarists, 120K+ Community).

3. **Curated Species Matrix & Catalog (`FishCatalog.jsx`)**:
   - Comprehensive directory of freshwater and saltwater fishes (Clownfish, Royal Blue Discus, Pacific Blue Tang, Neon Tetra, Mandarin Dragonet, Halfmoon Betta, Altum Angelfish, Celestial Pearl Danio, and more).
   - Search filter by common name, scientific name, and dietary traits.
   - Category filtering (All, Saltwater Reef, Freshwater, Featured) and Care level filtering (Beginner, Intermediate, Advanced).
   - Interactive parameter badges on each card (pH, temperature, minimum tank volume, care requirements).

4. **Detailed Care & Biological Modal (`FishModal.jsx`)**:
   - Deep biological inspection modal for every species.
   - Detailed water chemistry thresholds, dietary regimes, origin, swimming strata, and compatible tank mates.
   - Fascinating biological fun facts and *"Test in Tank Calculator"* quick action.

5. **AquaX Smart Bio-Matrix Matcher (`TankCalculator.jsx`)**:
   - Interactive calculator widget connected to the FastAPI `/api/calculator` endpoint.
   - Calculates safe biological carrying capacity, minimum filtration flow rate (GPH), target water chemistry, and algorithmically matched compatible species for any tank size (in gallons & liters).

6. **Biosphere Features Section (`Features.jsx`)**:
   - Core AquaX innovations: *Smart Bio-Matrix Compatibility*, *AquaX Shield™ 21-Day Clinical Quarantine*, *Precision Care Telemetry*, *Captive-Bred & Reef Conservation*, *24/7 Master Aquarist Support*, and *AquaPod™ Thermal Shipping*.
   - 14-Day "Alive & Thriving" guarantee highlight banner.

7. **Social Proof & Testimonials (`Testimonials.jsx`)**:
   - Verified endorsements from marine biologists, international competition aquascapers, and discus breeders.
   - 5-star rating displays and biome configurations.

8. **High-Converting Call-to-Action (`CallToAction.jsx`)**:
   - Interactive VIP Aquarium Dispatch subscription.
   - Connected directly to `/api/newsletter` with live confirmation feedback and PDF species handbook dispatch.

9. **Comprehensive Footer (`Footer.jsx`)**:
   - Taxonomy index, platform features, conservation pledge, privacy charter, and back-to-top navigation.

---

## 🛠️ Tech Stack

- **Frontend**:
  - React 18
  - Vite
  - Tailwind CSS
  - Lucide React (Lucide Icons)
- **Backend**:
  - Python 3.10+
  - FastAPI
  - Uvicorn
  - Pydantic v2

---

## 🚀 How to Run the Project

### Option 1: One-Command All-in-One Runner (FastAPI + Built React App)

Run the Python runner from the project root:

```bash
python run_app.py
```

- **Open the landing page**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Open the interactive Swagger API docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### Option 2: Full-Stack Development Mode (Hot Reloading)

#### 1. Start the FastAPI Backend:
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```
API runs at `http://127.0.0.1:8000`.

#### 2. Start the React Frontend:
In a separate terminal:
```bash
cd frontend
npm run dev
```
React development server runs at `http://localhost:5173` (with automatic `/api` proxy forwarding to FastAPI).

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health status and species count |
| `GET` | `/api/stats` | Verified hobbyist & catalog statistics |
| `GET` | `/api/features` | Core AquaX platform features and guarantees |
| `GET` | `/api/testimonials` | Verified hobbyist reviews and endorsements |
| `GET` | `/api/fish` | Search and filter catalog by category, care level, traits |
| `GET` | `/api/fish/{id}` | Detailed species profile, water metrics, and tank mates |
| `POST` | `/api/calculator` | Bioload calculation and compatible fish recommendations |
| `POST` | `/api/newsletter` | VIP newsletter subscription and dispatch |
| `POST` | `/api/consultation`| Aquarist concierge booking request |

---

## 🧪 Testing Backend Endpoints

Run the automated backend test suite:

```bash
python backend/test_api.py
```
