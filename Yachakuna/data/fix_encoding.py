import os

file_path = r'c:\Users\Usuario\Desktop\Apps\Yachakuna\data\unidades.js'

# Intentar leer con diferentes codificaciones
encodings = ['utf-8', 'latin-1', 'windows-1252']
content = None

for enc in encodings:
    try:
        with open(file_path, 'r', encoding=enc) as f:
            content = f.read()
        print(f"Leído con {enc}")
        break
    except:
        continue

if content:
    # Reemplazar comillas inteligentes y otros caracteres comunes con problemas
    replacements = {
        'â€™': "'",
        'â€˜': "'",
        'Ã¡': 'á',
        'Ã©': 'é',
        'Ã': 'í',
        'Ã³': 'ó',
        'Ãº': 'ú',
        'Ã±': 'ñ',
        'Â¿': '¿',
        'â€': '"',
        '': "'", # Reemplazar el carácter diamante por un apóstrofe si es que es eso
    }
    
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    # Asegurarnos de que todos los apóstrofes sean el estándar '
    # A veces hay apóstrofes de diferentes tipos (U+2019, etc.)
    content = content.replace('’', "'").replace('‘', "'").replace('`', "'")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Archivo normalizado a UTF-8 y corregido.")
else:
    print("No se pudo leer el archivo.")
