
import os
from kaggle.api.kaggle_api_extended import KaggleApi

# Debug script to find methods
def debug_api():
    api = KaggleApi()
    # Mock auth for dir() check to avoid error if possible, but authenticate to be safe
    # Credentials must be in env
    try:
        api.authenticate()
        print("Authenticated successfully.")
    except Exception as e:
        print(f"Auth failed: {e}")
        return

    print("Inspecting Dataset attributes:")
    try:
        datasets = api.dataset_list(user='vishardmehta')
        if datasets:
            d = datasets[0]
            print(dir(d))
            print(f"Sample download count: {getattr(d, 'downloadCount', 'N/A')}")
    except Exception as e:
        print(e)
        
    print("\nInspecting Kernel attributes:")
    try:
        kernels = api.kernels_list(user='vishardmehta', page_size=1)
        if kernels:
            k = kernels[0]
            print(dir(k))
            print(f"Sample votes: {getattr(k, 'totalVotes', 'N/A')}")
    except Exception as e:
        print(e)

if __name__ == "__main__":
    debug_api()
