from PIL import Image

def remove_white_bg(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = list(img.getdata())

    # We want to remove all the light grey / white checkerboard.
    # The checkerboard is mostly r,g,b > 190.
    # We will also crop the image to the bounding box of the non-transparent pixels!
    
    new_data = []
    for item in data:
        r, g, b, a = item
        if r > 190 and g > 190 and b > 190:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    
    # Crop to bounding box
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        
    img.save(output_path, "PNG")

remove_white_bg(
    r"C:\Users\J-J\.gemini\antigravity\brain\95d9ed3f-2014-4d03-8b20-884c91ca28ba\.user_uploaded\media_1790953550587.png",
    r"c:\Users\J-J\Downloads\Semayi Antigravity\dfih-frontend\public\hero-logo-new.png"
)
