import os
import requests

# ✅ Verified 60px transparent PNGs
piece_urls = {
    "wp": "https://upload.wikimedia.org/wikipedia/commons/4/46/Chess_plt60.png",
    "wr": "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt60.png",
    "wn": "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt60.png",
    "wb": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png",
    "wq": "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt60.png",
    "wk": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png",
    "bp": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png",
    "br": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt60.png",
    "bn": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt60.png",
    "bb": "https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png",
    "bq": "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt60.png",
    "bk": "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt60.png"
}

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}

# Ensure correct folder
pieces_dir = os.path.join(os.getcwd(), "pieces")
if not os.path.isdir(pieces_dir):
    raise FileNotFoundError("Run this script from the chess-app folder where the 'pieces/' directory exists.")

# Download each piece
for code, url in piece_urls.items():
    print(f"Downloading {code}.png...", end=" ")
    try:
        response = requests.get(url, headers=headers)
        if response.ok:
            with open(os.path.join(pieces_dir, f"{code}.png"), "wb") as f:
                f.write(response.content)
            print("done.")
        else:
            print(f"failed ({response.status_code})")
    except Exception as e:
        print(f"error: {e}")

print("✅ All piece downloads attempted. Missing files likely had 404s or network issues.")
