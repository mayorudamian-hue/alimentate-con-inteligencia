import json
import re
import os

file_path = r'c:\Users\Usuario\Desktop\Apps\Yachakuna\data\unidades.js'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extraer el JSON
match = re.search(r'const DICTIONARY_DATA = (\[.*\]);', content, re.DOTALL)
if not match:
    print("No se pudo encontrar DICTIONARY_DATA")
    exit()

data = json.loads(match.group(1))
print(f"Total inicial: {len(data)}")

# Deduplicar
seen = set()
unique_data = []

for item in data:
    # Usamos una tupla de (verb, translation, unit) como llave única
    # Normalizamos el unit (trim) para evitar duplicados por espacios
    verb = str(item.get('verb', '')).strip()
    trans = str(item.get('translation', '')).strip()
    unit = str(item.get('unit', '')).strip()
    
    key = (verb, trans, unit)
    
    if key not in seen:
        seen.add(key)
        unique_data.append(item)

print(f"Total después de deduplicar: {len(unique_data)}")

# Escribir de vuelta
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(f"const DICTIONARY_DATA = {json.dumps(unique_data, ensure_ascii=False)};")

print("Archivo actualizado con éxito.")
