"""
Find Google Place ID Helper
============================
Run this FIRST to find your Place ID, then use it in sync_google_reviews.py

SETUP:
1. pip install requests
2. Set your GOOGLE_API_KEY below
3. Run: python find_place_id.py
"""

import requests

# Paste your Google Places API key here
GOOGLE_API_KEY = "YOUR_GOOGLE_PLACES_API_KEY"

def find_place_id(api_key: str, query: str) -> None:
    """Search for a place and return its Place ID."""
    url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
    params = {
        "input": query,
        "inputtype": "textquery",
        "fields": "place_id,name,formatted_address,rating,user_ratings_total",
        "key": api_key,
    }

    print(f"Searching for: {query}\n")
    response = requests.get(url, params=params)
    data = response.json()

    if data.get("status") != "OK":
        print(f"❌ Error: {data.get('status')} — {data.get('error_message', 'Unknown error')}")
        print("  Make sure your API key has Places API enabled.")
        return

    candidates = data.get("candidates", [])
    if not candidates:
        print("❌ No results found. Try a different search query.")
        return

    print(f"✅ Found {len(candidates)} result(s):\n")
    for i, place in enumerate(candidates, 1):
        print(f"  Result {i}:")
        print(f"    Name:    {place.get('name', 'N/A')}")
        print(f"    Address: {place.get('formatted_address', 'N/A')}")
        print(f"    Rating:  {place.get('rating', 'N/A')} ⭐ ({place.get('user_ratings_total', 0)} reviews)")
        print(f"    ✅ PLACE ID: {place.get('place_id', 'N/A')}")
        print()

    print("Copy the PLACE ID above and paste it into sync_google_reviews.py")


if __name__ == "__main__":
    if GOOGLE_API_KEY == "YOUR_GOOGLE_PLACES_API_KEY":
        print("❌ Please set your GOOGLE_API_KEY in this script first.")
    else:
        find_place_id(GOOGLE_API_KEY, "Dietitian Sumana Pal Roy Chinsurah West Bengal")
