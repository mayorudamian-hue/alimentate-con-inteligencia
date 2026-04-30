import re

file_path = r'c:\Users\Usuario\Desktop\Apps\Yachakuna\data\unidades.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Rango de tildes: áéíóúñÁÉÍÓÚÑ¿¡
weird_chars_count = 0
new_content = ""

for char in content:
    if ord(char) > 127 and char not in "áéíóúñÁÉÍÓÚÑ¿¡":
        # Reemplazar por apóstrofe estándar
        new_content += "'"
        weird_chars_count += 1
    else:
        new_content += char

if weird_chars_count > 0:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Se corrigieron {weird_chars_count} caracteres extraños.")
else:
    print("No se encontraron caracteres extraños.")
