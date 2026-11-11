"""
AquaX Aquarium Intelligence & Landing Page Runner
Launches the FastAPI backend and serves the React landing page on port 8000.
"""

import sys
import os
import webbrowser

# Add backend directory to sys.path
backend_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "backend")
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

import uvicorn

if __name__ == "__main__":
    print("=" * 65)
    print("   AquaX - Exotic Aquarium Species & Biosphere Intelligence")
    print("   React.js + Python (FastAPI)")
    print("=" * 65)
    print(">> Serving full-stack landing page on: http://127.0.0.1:8000")
    print(">> Interactive Swagger API Docs at:   http://127.0.0.1:8000/docs")
    print(">> Press Ctrl+C to terminate.")
    print("=" * 65)
    
    # Run uvicorn
    uvicorn.run("main:app", app_dir=backend_dir, host="127.0.0.1", port=8000, reload=True)
