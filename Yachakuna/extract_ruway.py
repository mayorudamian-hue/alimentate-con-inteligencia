import re

html_path = r"c:\Users\Usuario\Desktop\Apps\Quechua\Ruway app\Ruway.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extraer CSS
css_match = re.search(r"<style>(.*?)</style>", content, re.DOTALL)
if css_match:
    with open(r"c:\Users\Usuario\Desktop\Apps\Yachakuna\css\ruway.css", "w", encoding="utf-8") as f:
        f.write("/* Estilos importados de Ruway.html */\n")
        f.write(css_match.group(1).strip())

# Extraer JS
js_match = re.search(r"<script>(.*?)</script>", content, re.DOTALL)
if js_match:
    with open(r"c:\Users\Usuario\Desktop\Apps\Yachakuna\js\ruway.js", "w", encoding="utf-8") as f:
        f.write("/* Lógica importada de Ruway.html */\n")
        f.write(js_match.group(1).strip())

# Extraer HTML (solo el contenido de la clase .app dentro del body)
# Porque Ruway.html tiene su header, etc. que ya reemplazamos en index.html
app_match = re.search(r'<div class="app">(.*?)</div><!-- /app -->', content, re.DOTALL)
if app_match:
    html_snippet = app_match.group(0).strip()
    # Ahora leemos el index.html actual e inyectamos esto en tab-ruway
    index_path = r"c:\Users\Usuario\Desktop\Apps\Yachakuna\index.html"
    with open(index_path, "r", encoding="utf-8") as f:
        index_content = f.read()
    
    index_content = index_content.replace(
        '<div id="ruway-app-root">\n                <!-- Aquí inyectaremos el contenido de Ruway -->\n            </div>',
        '<div id="ruway-app-root">\n' + html_snippet + '\n</div>'
    )
    
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(index_content)

print("Extracción completada.")
