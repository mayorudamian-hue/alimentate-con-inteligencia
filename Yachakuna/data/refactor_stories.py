import json
import glob
import re
import random

# Ruta de los archivos JSON
story_files = glob.glob(r"c:\Users\Usuario\Desktop\Apps\Yachakuna\data\Historia_*.json")

for file_path in story_files:
    print(f"Procesando: {file_path}")
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    # Extraer la sección base de la primera parte si existe
    base_section = 1
    if len(data) > 0 and 'section' in data[0]:
        base_section = data[0]['section']
        
    for i, part in enumerate(data):
        part['section'] = base_section
        
        # Extraer el número de parte del título
        match = re.search(r"Parte\s+(\d+)", part.get('title', ''))
        if match:
            part['part'] = int(match.group(1))
        else:
            part['part'] = i + 1
            
        # Asignar XP basado en el nivel
        level = part.get('level', 'Básico')
        part['xp'] = 20 if level == 'Intermedio' else 15
        
        # Asignar badge_id solo a la última parte
        if i == len(data) - 1:
            part['badge_id'] = f"{part['id']}-badge"
        else:
            part['badge_id'] = None
            
        # Reconstruir el objeto de la parte para mantener el orden de claves (para legibilidad)
        new_part = {
            "id": part.get("id"),
            "section": part["section"],
            "part": part["part"],
            "title": part.get("title"),
            "subtitle": part.get("subtitle"),
            "icon": part.get("icon"),
            "level": part.get("level"),
            "xp": part["xp"],
            "badge_id": part["badge_id"],
            "scenes": []
        }
        
        # Procesar escenas
        for scene in part.get('scenes', []):
            if scene.get('type') == 'text':
                new_scene = {"type": "text"}
                q_text = scene.get('q', '')
                
                # Identificar el hablante (Atojqa: — o Carmen: —)
                speaker_match = re.match(r"^([A-Z][A-Za-zñáéíóú]+)(?:qa)?:\s*—\s*", q_text)
                if speaker_match:
                    new_scene['speaker'] = speaker_match.group(1).lower()
                else:
                    new_scene['speaker'] = 'narrator'
                    
                new_scene['q'] = scene.get('q')
                new_scene['e'] = scene.get('e')
                new_part['scenes'].append(new_scene)
            
            elif scene.get('type') == 'question':
                new_scene = {
                    "type": "question",
                    "title": scene.get('title'),
                    "text": scene.get('text'),
                    "options": scene.get('options', []),
                    "correct": scene.get('correct', 0),
                    "explanation": ""  # Añadir campo en blanco según lo solicitado
                }
                
                # Mezclar opciones para evitar el sesgo de correct: 1
                if 'options' in new_scene and 'correct' in new_scene:
                    correct_text = new_scene['options'][new_scene['correct']]
                    options = new_scene['options'].copy()
                    random.shuffle(options)
                    new_scene['options'] = options
                    new_scene['correct'] = options.index(correct_text)
                    
                new_part['scenes'].append(new_scene)
                
            else:
                # Mantener escena desconocida tal cual
                new_part['scenes'].append(scene)
                
        data[i] = new_part
                    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        
print("¡Refactorización completada exitosamente!")
