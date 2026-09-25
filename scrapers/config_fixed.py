import os
from dotenv import load_dotenv

load_dotenv()

RAW_TAG = os.getenv("CLAN_TAG")

if RAW_TAG is None:
    raise ValueError("ERROR: CLAN_TAG not found.")

CLAN_TAG = RAW_TAG.replace("#", "%23")

# ✅ RoyaleAPI Proxy - NO TOKEN NEEDED!
BASE_URL = "https://cocproxy.royaleapi.dev/v1"

# ✅ Empty headers - RoyaleAPI doesn't require Authorization
HEADERS = {
    "Accept": "application/json"
}

# Optional: uncomment for debugging
# print(f"Using: {BASE_URL}")
# print(f"Clan Tag: {RAW_TAG}")
