import json
import re

with open(r'c:\Users\Usuario\Desktop\Apps\Yachakuna\data\unidades.js', 'r', encoding='utf-8') as f:
    content = f.read()
    # Find the JSON array
    match = re.search(r'\[.*\]', content, re.DOTALL)
    if match:
        data = json.loads(match.group(0))
        units = sorted(list(set(item['unit'] for item in data if 'unit' in item)))
        for u in units:
            print(u)
