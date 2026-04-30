import json
import os

files = [
    'Unidades_1_a_11.json',
    'Unidades_12_a_22.json',
    'unidades_23_a_33_1.json',
    'unidades_34_a_45_v3.json'
]

combined_data = []
base_path = r'c:\Users\Usuario\Desktop\Apps\Yachakuna\data'

for filename in files:
    file_path = os.path.join(base_path, filename)
    with open(file_path, 'r', encoding='utf-8-sig') as f:
        data = json.load(f)
        # Algunos archivos pueden ser listas directas, otros pueden tener una estructura
        if isinstance(data, list):
            combined_data.extend(data)
        elif 'unidades' in data:
            combined_data.extend(data['unidades'])
        else:
            # Intentar encontrar la lista
            for key in data:
                if isinstance(data[key], list):
                    combined_data.extend(data[key])
                    break

# Deduplicar
seen = set()
unique_data = []
for item in combined_data:
    # Crear una clave única basada en verbo y unidad
    key = (item.get('verb', ''), item.get('unit', ''))
    if key not in seen:
        seen.add(key)
        unique_data.append(item)

# Guardar como JS
output_path = os.path.join(base_path, 'unidades.js')
with open(output_path, 'w', encoding='utf-8') as f:
    f.write("const DICTIONARY_DATA = ")
    json.dump(unique_data, f, ensure_ascii=False, indent=2)
    f.write(";")

print(f"Reconstrucción completada. {len(unique_data)} palabras únicas cargadas.")
