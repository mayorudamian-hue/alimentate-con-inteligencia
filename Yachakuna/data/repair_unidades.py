file_path = r'c:\Users\Usuario\Desktop\Apps\Yachakuna\data\unidades.js'

with open(file_path, 'rb') as f:
    data = f.read()

# 39 es el caracter ' (comilla simple)
is_broken = True
for i in range(0, min(100, len(data)), 2):
    if data[i] != 39:
        is_broken = False
        break

if is_broken:
    print("Detectado patrón de comillas intercaladas. Reparando...")
    new_data = bytearray()
    for i in range(1, len(data), 2):
        new_data.append(data[i])
    
    with open(file_path, 'wb') as f:
        f.write(new_data)
    print("Archivo reparado.")
else:
    print("No se detectó el patrón de rotura (comilla en posiciones pares).")
    
    # Probar sentido 2
    is_broken = True
    for i in range(1, min(100, len(data)), 2):
        if data[i] != 39:
            is_broken = False
            break
    if is_broken:
        print("Detectado sentido 2. Reparando...")
        new_data = bytearray()
        for i in range(0, len(data), 2):
            new_data.append(data[i])
        with open(file_path, 'wb') as f:
            f.write(new_data)
        print("Archivo reparado (sentido 2).")
