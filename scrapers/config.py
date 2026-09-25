import os
from dotenv import load_dotenv

load_dotenv()

TOKEN = os.getenv("COC_API_TOKEN")
CLAN_TAG_RAW = os.getenv("CLAN_TAG")

if TOKEN is None:
    raise ValueError("ERROR: COC_API_TOKEN not found.")
if CLAN_TAG_RAW is None:
    raise ValueError("ERROR: CLAN_TAG not found.")

CLAN_TAG = CLAN_TAG_RAW.replace("#", "%23")

# ✅ Official API - PERLU TOKEN!
BASE_URL = "https://api.clashofclans.com/v1"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/json"
}

print(f"Using: {BASE_URL}")
print(f"Token: {TOKEN[:10]}...") # Jangan print full token!