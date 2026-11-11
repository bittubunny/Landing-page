import os
os.environ["NO_PROXY"] = "*"
os.environ["no_proxy"] = "*"
os.environ["HTTPX_NO_PROXY"] = "1"

import main

def test_direct():
    print("Direct test of FastAPI endpoints functions:")
    health = main.health_check()
    print("Health:", health)
    assert health["status"] == "healthy"

    stats = main.get_stats()
    print("Stats:", stats["species_cataloged"])

    fishes = main.get_all_fish(search=None, category=None, care_level=None, featured=None)
    print("All fishes loaded:", len(fishes))
    assert len(fishes) == 12

    freshwater = main.get_all_fish(search=None, category="freshwater", care_level=None, featured=None)
    print("Freshwater fishes:", len(freshwater))
    assert len(freshwater) > 0

    saltwater = main.get_all_fish(search=None, category="saltwater", care_level=None, featured=None)
    print("Saltwater fishes:", len(saltwater))
    assert len(saltwater) > 0

    clown = main.get_fish_by_id("clownfish")
    print("Clownfish:", clown["name"])
    assert clown["category"] == "saltwater"

    req = main.WaterCalculatorRequest(tank_gallons=55, water_type="freshwater")
    calc = main.calculate_tank_profile(req)
    print("Calculated safe capacity for 55 gal freshwater:", calc.max_safe_fish_count)
    print("Recommended species count:", len(calc.recommended_species))
    assert calc.max_safe_fish_count > 0

    sub = main.NewsletterRequest(email="aquarist@aquax.io", interest="Reef")
    resp = main.subscribe_newsletter(sub)
    print("Newsletter response:", resp.message)
    assert resp.success

    print("\n>>> ALL DIRECT BACKEND TESTS PASSED 100%! <<<")

if __name__ == "__main__":
    test_direct()
