import json
import re
from collections import defaultdict

with open(r'c:\Users\Usuario\Desktop\Apps\Yachakuna\data\unidades.js', 'r', encoding='utf-8') as f:
    content = f.read()
    match = re.search(r'\[.*\]', content, re.DOTALL)
    if match:
        data = json.loads(match.group(0))
        unit_names = list(set(item['unit'] for item in data if 'unit' in item))
        
        num_map = defaultdict(list)
        for name in unit_names:
            num_match = re.search(r'\d+', name)
            if num_match:
                num = int(num_match.group(0))
                num_map[num].append(name)
        
        for num, names in sorted(num_map.items()):
            if len(names) > 1:
                print(f"Duplicate number {num}: {names}")
            else:
                print(f"{num}: {names[0]}")
