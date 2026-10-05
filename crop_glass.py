from PIL import Image, ImageDraw

def create_rounded_rect_mask(size, radius):
    mask = Image.new('L', size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), size], radius, fill=255)
    return mask

def process_image(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    
    # Crop the image to just the glass area
    # Visually estimating bounds based on typical padding in such screenshots
    # Image is 967 x 913
    # Left margin ~ 55, Right margin ~ 55 -> width = 857
    # Top margin ~ 20, Bottom margin ~ 20 -> height = 873
    left, top, right, bottom = 55, 20, 935, 895
    cropped = img.crop((left, top, right, bottom))
    
    # Create mask for rounded corners
    radius = 50 # Adjust based on the actual corner radius
    mask = create_rounded_rect_mask(cropped.size, radius)
    
    # Apply mask
    cropped.putalpha(mask)
    
    # Save
    cropped.save(output_path, "PNG")

process_image(
    r"C:\Users\J-J\.gemini\antigravity\brain\95d9ed3f-2014-4d03-8b20-884c91ca28ba\.user_uploaded\media_1790955716979.png",
    r"c:\Users\J-J\Downloads\Semayi Antigravity\dfih-frontend\public\hero-logo-glass.png"
)
