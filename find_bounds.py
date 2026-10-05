from PIL import Image

img = Image.open(r"C:\Users\J-J\.gemini\antigravity\brain\95d9ed3f-2014-4d03-8b20-884c91ca28ba\.user_uploaded\media_1790955716979.png")
width, height = img.size

print("Image size:", width, "x", height)
