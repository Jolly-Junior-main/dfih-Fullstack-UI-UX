import os
import re

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Map of replacements
    replacements = {
        '#698765': '#ffffff', # Deep green to white
        '#577353': '#f8fafc', # Card green to slate-50
        '#f5f0e6': '#0f172a', # Cream text to slate-900
        '#2d3a2a': '#ffffff', # Dark green to white (used for text on lime buttons)
    }

    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
        new_content = new_content.replace(old.upper(), new)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

def main():
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css')):
                replace_in_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
