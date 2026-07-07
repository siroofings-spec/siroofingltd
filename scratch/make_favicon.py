import os
from PIL import Image

def generate_transparent_favicon():
    src_path = "/Users/artiom/.gemini/antigravity/brain/40afb799-9c29-40dc-bebd-42c8cb8f3102/media__1783443145522.png"
    dest_path = "/Users/artiom/.gemini/antigravity/scratch/siroofingltd/assets/images/logo/favicon-client.png"
    
    if not os.path.exists(src_path):
        print(f"Source file not found: {src_path}")
        return
        
    img = Image.open(src_path).convert("RGBA")
    datas = img.getdata()
    
    new_data = []
    for item in datas:
        # If pixel is white or near-white, make it transparent
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    
    # Crop to content bounding box of non-transparent pixels
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    # Pad to square to preserve aspect ratio (prevent squishing/distortion)
    w, h = img.size
    max_dim = max(w, h)
    
    # Create a square image with transparent background
    square_img = Image.new("RGBA", (max_dim, max_dim), (255, 255, 255, 0))
    
    # Center the original cropped image on the square canvas
    paste_x = (max_dim - w) // 2
    paste_y = (max_dim - h) // 2
    square_img.paste(img, (paste_x, paste_y))
    
    # Resize to standard high-res favicon dimensions
    final_img = square_img.resize((64, 64), Image.Resampling.LANCZOS)
    
    # Save the file
    final_img.save(dest_path, "PNG")
    print(f"Favicon created successfully with preserved aspect ratio at {dest_path}")

if __name__ == "__main__":
    generate_transparent_favicon()
