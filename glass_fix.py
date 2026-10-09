import os
import re

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to replace glassmorphic backgrounds to be greenish
    # bg-white/X -> bg-[#84cc16]/X
    # bg-[#ffffff]/X -> bg-[#84cc16]/X
    # bg-black/X -> bg-[#84cc16]/X (sometimes used)

    new_content = re.sub(r'bg-white/(\d+)', r'bg-[#84cc16]/\1', content)
    new_content = re.sub(r'bg-\[\#ffffff\]/(\d+)', r'bg-[#84cc16]/\1', new_content)
    new_content = re.sub(r'bg-black/(\d+)', r'bg-[#84cc16]/\1', new_content)
    
    # Text colors
    # Ensure all `#0f172a` texts are readable, maybe bump opacities if they are too low
    new_content = new_content.replace('text-[#0f172a]/40', 'text-[#0f172a]/60')
    new_content = new_content.replace('text-[#0f172a]/30', 'text-[#0f172a]/50')
    new_content = new_content.replace('text-[#0f172a]/20', 'text-[#0f172a]/50')
    
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
