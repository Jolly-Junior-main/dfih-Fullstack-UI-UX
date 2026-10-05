from PIL import Image

def remove_white_bg(input_path, output_path, tolerance=230):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()

    new_data = []
    for item in data:
        if item[0] > tolerance and item[1] > tolerance and item[2] > tolerance:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")

remove_white_bg(
    r"C:\Users\J-J\.gemini\antigravity\brain\95d9ed3f-2014-4d03-8b20-884c91ca28ba\.user_uploaded\media_1790953550587.png",
    r"c:\Users\J-J\Downloads\Semayi Antigravity\dfih-frontend\public\hero-logo-new.png"
)
