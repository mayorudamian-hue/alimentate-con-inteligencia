file_path = r'c:\Users\Usuario\Desktop\Apps\Yachakuna\data\unidades.js'

with open(file_path, 'rb') as f:
    data = f.read(100)
    print(f"Bytes: {data}")
