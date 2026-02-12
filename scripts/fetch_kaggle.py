
import os
import json
import re
import urllib.request
from kaggle.api.kaggle_api_extended import KaggleApi

# Configuration
USERNAME = 'vishardmehta'
OUTPUT_FILE = 'src/data/kaggle.json'

def fetch_kaggle_data():
    print(f"Fetching Kaggle stats for {USERNAME}...")
    
    # Defaults
    stats = {
        "upvotes": 0,
        "downloads": 0,
        "notebooks": 0,
        "datasets": 0,
        "competitions_tier": "Expert",
        "notebooks_tier": "Expert",
        "datasets_tier": "Contributor",
        "rank": "1450", # Placeholder/approx
        "medals": {
            # Default to user's manual counts if scraping fails
            "datasets": {"gold": 0, "silver": 3, "bronze": 2},
            "notebooks": {"gold": 0, "silver": 0, "bronze": 3},
            "competitions": {"gold": 0, "silver": 0, "bronze": 0}
        }
    }

    # 1. Official API for Counts
    try:
        api = KaggleApi()
        api.authenticate()
        print("Authenticated with Kaggle API.")
        
        # Notebooks (has page_size)
        kernels = api.kernels_list(user=USERNAME, page_size=100)
        stats["notebooks"] = len(kernels)
        stats["upvotes"] = sum(getattr(k, 'total_votes', 0) for k in kernels)
        print(f"Notebooks: {stats['notebooks']}, Upvotes: {stats['upvotes']}")
        
        # Datasets (NO page_size, use page loop if needed, but 1 page enough for <20)
        datasets = api.dataset_list(user=USERNAME, page=1)
        if datasets:
            stats["datasets"] = len(datasets)
            stats["downloads"] = sum(getattr(d, 'download_count', 0) for d in datasets)
            print(f"Datasets: {stats['datasets']}, Downloads: {stats['downloads']}")
        
    except Exception as e:
        print(f"API Error: {e}")

    # 2. Scrape Profile HTML for Ranks/Tiers (Hybrid)
    print("Scraping profile for Rank/Tier data...")
    try:
        url = f"https://www.kaggle.com/{USERNAME}"
        # detailed User-Agent to ensure we get the full React app payload
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
        }
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            
            # Regex for Tier
            # Look for "tier":"expert" or similar in the embedded JSON
            tier_match = re.search(r'"performanceTier":\s*"(\w+)"', html, re.IGNORECASE)
            if tier_match:
                tier = tier_match.group(1).capitalize()
                stats["competitions_tier"] = tier
                # Usually implies notebooks/datasets tier too unless specified otherwise
                # But let's keep the manual differentiation if we can't find specific ones.
                print(f"Found Tier: {tier}")
            
            # Regex for Rank
            # "currentRank":1450
            rank_match = re.search(r'"currentRank":\s*(\d+)', html)
            if rank_match:
                stats["rank"] = rank_match.group(1)
                print(f"Found Rank: {stats['rank']}")

            # Regex for total medals if possible (complex structure)
            # Maybe count occurrences of specific medal icons if they have distinct class names?
            # "alt=\"gold medal\"" ?
            pass

    except Exception as e:
        print(f"Scrape Error: {e}")

    # Formatting
    if stats["downloads"] > 1000:
        stats["downloads_display"] = f"{round(stats['downloads']/1000)}k+"
    else:
        stats["downloads_display"] = str(stats["downloads"])

    # Write to file
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(stats, f, indent=2)
    
    print(f"Stats saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    fetch_kaggle_data()
