import json
import glob
import os

def rebuild_historias():
    print("Rebuilding historias.js...")
    story_files = glob.glob("Historia_*.json")
    all_stories = []
    
    # Sort files to maintain some order if needed, or just append
    for file_path in sorted(story_files):
        with open(file_path, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
            all_stories.extend(data)
            
    with open('historias.js', 'w', encoding='utf-8') as f:
        f.write("const STORIES_DATA = ")
        json.dump(all_stories, f, ensure_ascii=False)
        f.write(";")
    print(f"Done. Bundled {len(all_stories)} story parts.")

def rebuild_unidades():
    print("Rebuilding unidades.js...")
    unit_files = glob.glob("Unidades_*.json") + glob.glob("unidades_*.json")
    all_units = []
    
    for file_path in sorted(unit_files):
        with open(file_path, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
            all_units.extend(data)
            
    with open('unidades.js', 'w', encoding='utf-8') as f:
        f.write("const DICTIONARY_DATA = ")
        json.dump(all_units, f, ensure_ascii=False)
        f.write(";")
    print(f"Done. Bundled {len(all_units)} unit items.")

if __name__ == "__main__":
    # Change CWD to script location if needed, but we run from data/ usually
    rebuild_historias()
    rebuild_unidades()
