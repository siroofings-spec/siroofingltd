import os
from PIL import Image

def process_logo(input_path, output_blue_path, output_white_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    
    datas = img.getdata()
    newDataBlue = []
    newDataWhite = []
    
    for item in datas:
        # Check if the pixel is white or near-white (threshold 235)
        if item[0] > 235 and item[1] > 235 and item[2] > 235:
            # Make it fully transparent
            newDataBlue.append((255, 255, 255, 0))
            newDataWhite.append((255, 255, 255, 0))
        else:
            # Original blue pixel
            newDataBlue.append(item)
            # Turn the blue pixel to solid white for dark backgrounds
            # Keeping the original pixel's transparency/alpha channel
            newDataWhite.append((255, 255, 255, item[3]))
            
    img.putdata(newDataBlue)
    # Crop the image to remove empty white borders if any, or just save it directly
    img.save(output_blue_path, "PNG")
    
    img.putdata(newDataWhite)
    img.save(output_white_path, "PNG")
    print("Logo processed successfully!")

input_file = "/Users/artiom/.gemini/antigravity/brain/40afb799-9c29-40dc-bebd-42c8cb8f3102/media__1783439086330.png"
output_blue = "assets/images/resources/logo-client.png"
output_white = "assets/images/resources/logo-client-white.png"

process_logo(input_file, output_blue, output_white)
