import os

# Ruta de la carpeta con los PDFs
pdf_folder = "./"

# Plantilla HTML para generar el índice
html_template = """
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listado de PDFs</title>
</head>
<body>
    <h1>Archivos PDF disponibles</h1>
    <ul>
        {links}
    </ul>
</body>
</html>
"""

# Listar los archivos PDF
pdf_files = [f for f in os.listdir(pdf_folder) if f.endswith('.pdf')]
links = "\n".join([f'<li><a href="{pdf_folder}/{pdf}" target="_blank">{pdf}</a></li>' for pdf in pdf_files])

# Generar el archivo HTML
html_content = html_template.format(links=links)
with open("index.html", "w") as f:
    f.write(html_content)

print("Archivo HTML generado.")
