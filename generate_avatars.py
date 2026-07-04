import hashlib
import os
from PIL import Image, ImageDraw

def generate_identicon(username, bg_color, fg_color, size=420, grid_size=5):
    # Generăm un hash determinist din nume sau text
    h = hashlib.md5(username.encode('utf-8')).hexdigest()
    
    # Creăm o imagine cu fundalul ales
    img = Image.new('RGB', (size, size), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Calculăm dimensiunea fiecărui pătrățel
    padding = size // 10
    usable_size = size - 2 * padding
    cell_size = usable_size // grid_size
    
    # Grid simetric 5x5 (coloana 0=4, 1=3)
    grid = [[False]*grid_size for _ in range(grid_size)]
    
    byte_idx = 0
    for row in range(grid_size):
        for col in range((grid_size + 1) // 2):
            val = int(h[byte_idx % len(h)], 16) % 2 == 0
            grid[row][col] = val
            grid[row][grid_size - 1 - col] = val
            byte_idx += 1
            
    # Desenăm pătrățelele
    for row in range(grid_size):
        for col in range(grid_size):
            if grid[row][col]:
                x0 = padding + col * cell_size
                y0 = padding + row * cell_size
                x1 = x0 + cell_size
                y1 = y0 + cell_size
                draw.rectangle([x0, y0, x1, y1], fill=fg_color)
                
    return img

output_dir = "/Users/artiom/.gemini/antigravity/scratch/siroofingltd/avatars"
os.makedirs(output_dir, exist_ok=True)

palettes = [
    ("avatar_roofing_red.png", (248, 250, 252), (225, 29, 72)),     # Fundal deschis, Pătrățele Roșii S&I
    ("avatar_roofing_dark.png", (15, 23, 42), (225, 29, 72)),       # Fundal Dark Navy, Pătrățele Roșii
    ("avatar_gold_navy.png", (15, 23, 42), (245, 158, 11)),         # Fundal Dark Navy, Pătrățele Aurii
    ("avatar_royal_blue.png", (241, 245, 249), (37, 99, 235)),      # Fundal Albastru Regal
    ("avatar_emerald.png", (17, 24, 39), (16, 185, 129)),           # Fundal Verde Smarald
]

for name, bg, fg in palettes:
    img = generate_identicon("siroofings-spec", bg, fg)
    path = os.path.join(output_dir, name)
    img.save(path)
    print(f"Generated {path}")
