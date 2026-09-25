#!/usr/bin/env python3
"""
Unified CoC Data Downloader - Menggabungkan semua scraper dengan parallel requests
Menggantikan: clan_scraper.py, war_scraper.py, raid_scraper.py
Hanya butuh: config.py (yang sudah di-fix) + main_downloader.py ini
"""

import os
import json
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests
from config import BASE_URL, CLAN_TAG, HEADERS

# ============================================
# CONFIG
# ============================================

REQUEST_TIMEOUT = 10
MAX_WORKERS = 5

# ============================================
# SCRAPERS (Dari original files, dimodifikasi)
# ============================================

def get_clan_data():
    """Download clan info - dari clan_scraper.py"""
    return {
        "name": "Clan Data",
        "endpoint": f"{BASE_URL}/clans/{CLAN_TAG}",
        "save_dir": "data/clan_stats",
        "save_func": save_clan_data
    }

def get_war_data():
    """Download current war - dari war_scraper.py"""