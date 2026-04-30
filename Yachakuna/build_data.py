import os
import json
import glob

def build_data():
    base_dir = r"c:\Users\Usuario\Desktop\Apps\Yachakuna\data"
    
    # Unidades
    unidades_files = glob.glob(os.path.join(base_dir, "unidades*.json"), recursive=False)
    # Algunas están capitalizadas, buscamos ignore case usando pattern o simplemente ambas
    unidades_files += glob.glob(os.path.join(base_dir, "Unidades*.json"), recursive=False)
    
    # Remove duplicates
    unidades_files = list(set(unidades_files))
    
    all_unidades = []
    for f in unidades_files:
        try:
            with open(f, 'r', encoding='utf-8-sig') as file:
                data = json.load(file)
                if isinstance(data, list):
                    all_unidades.extend(data)
                else:
                    all_unidades.append(data)
            print(f"Loaded {f}")
        except Exception as e:
            print(f"Error loading {f}: {e}")
            
    # Escribir unidades.js
    with open(os.path.join(base_dir, "unidades.js"), 'w', encoding='utf-8') as f:
        f.write("const DICTIONARY_DATA = " + json.dumps(all_unidades, ensure_ascii=False) + ";\n")
    print(f"Compiled unidades.js with {len(all_unidades)} items.")

    # Historias
    historias_files = glob.glob(os.path.join(base_dir, "Historia*.json"), recursive=False)
    historias_files += glob.glob(os.path.join(base_dir, "historia*.json"), recursive=False)
    historias_files = list(set(historias_files))
    
    all_historias = []
    for f in historias_files:
        try:
            with open(f, 'r', encoding='utf-8') as file:
                data = json.load(file)
                if isinstance(data, list):
                    all_historias.extend(data)
                else:
                    all_historias.append(data)
            print(f"Loaded {f}")
        except Exception as e:
            print(f"Error loading {f}: {e}")
            
    # Escribir historias.js
    with open(os.path.join(base_dir, "historias.js"), 'w', encoding='utf-8') as f:
        f.write("const STORIES_DATA = " + json.dumps(all_historias, ensure_ascii=False) + ";\n")
    print(f"Compiled historias.js with {len(all_historias)} stories.")

if __name__ == "__main__":
    build_data()
