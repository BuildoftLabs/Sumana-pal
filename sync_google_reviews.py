"""
Google Reviews → Firestore Sync Script
=======================================
This script fetches reviews from Google Places API and saves them
to your Firestore 'reviews' collection so they appear on your website.

SETUP:
1. pip install requests firebase-admin
2. Download your Firebase service account key:
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate new private key" → save as "serviceAccountKey.json" in this folder
3. Fill in GOOGLE_API_KEY and PLACE_ID below
4. Run: python sync_google_reviews.py
"""

import requests
import json
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# ─────────────────────────────────────────────────────────
# CONFIGURATION — fill these in before running
# ─────────────────────────────────────────────────────────
GOOGLE_API_KEY = "YOUR_GOOGLE_PLACES_API_KEY"   # From Google Cloud Console
PLACE_ID       = "YOUR_GOOGLE_PLACE_ID"          # e.g. ChIJxxxxxxxxxxxxxxxx
SERVICE_ACCOUNT_KEY = "serviceAccountKey.json"   # Firebase service account file
# ─────────────────────────────────────────────────────────


def fetch_google_reviews(api_key: str, place_id: str) -> list:
    """Fetch reviews from Google Places Details API."""
    url = "https://maps.googleapis.com/maps/api/place/details/json"
    params = {
        "place_id": place_id,
        "fields": "name,rating,reviews",
        "key": api_key,
        "reviews_sort": "newest",
        "language": "en",
    }

    print(f"Fetching reviews for Place ID: {place_id}...")
    response = requests.get(url, params=params)

    if response.status_code != 200:
        raise Exception(f"HTTP error {response.status_code}: {response.text}")

    data = response.json()

    if data.get("status") != "OK":
        raise Exception(f"Places API error: {data.get('status')} — {data.get('error_message', '')}")

    result = data.get("result", {})
    reviews = result.get("reviews", [])
    print(f"✅ Fetched {len(reviews)} reviews from Google (max 5 returned by API)")
    return reviews


def save_reviews_to_firestore(db_client, reviews: list):
    """Save fetched reviews to Firestore 'reviews' collection."""
    collection_ref = db_client.collection("reviews")

    # Get existing reviews to avoid duplicates (match by author + text)
    existing = collection_ref.stream()
    existing_keys = set()
    for doc in existing:
        d = doc.to_dict()
        key = f"{d.get('name','')}|{d.get('review','')[:60]}"
        existing_keys.add(key)

    added = 0
    skipped = 0

    for review in reviews:
        author   = review.get("author_name", "Anonymous")
        text     = review.get("text", "")
        stars    = review.get("rating", 5)
        time_str = review.get("relative_time_description", "")
        photo    = review.get("profile_photo_url", "")

        # Skip if already exists
        key = f"{author}|{text[:60]}"
        if key in existing_keys:
            print(f"  ⏭  Skipping (already exists): {author}")
            skipped += 1
            continue

        # Build the Firestore document (matches your admin Reviews schema)
        doc = {
            "name":       author,
            "review":     text,
            "stars":      stars,
            "avatar":     photo,
            "source":     "google",
            "timeDesc":   time_str,
            "isActive":   True,
            "order":      0,
            "createdAt":  datetime.utcnow().isoformat(),
            "updatedAt":  datetime.utcnow().isoformat(),
        }

        collection_ref.add(doc)
        print(f"  ✅ Added: {author} ({stars}★) — \"{text[:60]}...\"")
        added += 1

    print(f"\n📊 Done — {added} added, {skipped} skipped (already existed)")


def main():
    if GOOGLE_API_KEY == "YOUR_GOOGLE_PLACES_API_KEY":
        print("❌ Please set your GOOGLE_API_KEY in the script before running.")
        return
    if PLACE_ID == "YOUR_GOOGLE_PLACE_ID":
        print("❌ Please set your PLACE_ID in the script before running.")
        return

    # Init Firebase Admin
    print("Connecting to Firestore...")
    cred = credentials.Certificate(SERVICE_ACCOUNT_KEY)
    firebase_admin.initialize_app(cred)
    db_client = firestore.client()
    print("✅ Connected to Firestore (project: dt-sumanapal)")

    # Fetch from Google
    reviews = fetch_google_reviews(GOOGLE_API_KEY, PLACE_ID)

    if not reviews:
        print("⚠️  No reviews returned from Google.")
        return

    # Save to Firestore
    save_reviews_to_firestore(db_client, reviews)
    print("\n🎉 Sync complete! Reviews will now appear on your website.")


if __name__ == "__main__":
    main()
