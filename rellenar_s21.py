from pdfrw import PdfReader, PdfWriter, PageMerge

TEMPLATE_PATH = "plantilla.pdf"
OUTPUT_PATH = "salida.pdf"

def fill_pdf(data, template_path=TEMPLATE_PATH, output_path=OUTPUT_PATH):

    ANNOT_KEY = '/Annots'
    ANNOT_FIELD_KEY = '/T'
    ANNOT_VAL_KEY = '/V'
    SUBTYPE_KEY = '/Subtype'
    WIDGET_SUBTYPE_KEY = '/Widget'
    
    template_pdf = PdfReader(template_path)
    
    for page in template_pdf.pages:
        annotations = page.get(ANNOT_KEY)
        if annotations:
            for annotation in annotations:
                if annotation.get(SUBTYPE_KEY) == WIDGET_SUBTYPE_KEY:
                    key = annotation.get(ANNOT_FIELD_KEY)
                    if key:
                        key_name = key[1:-1]  # limpieza del texto
                        if key_name in data:
                            value = data[key_name]

                            # Si es checkbox
                            if annotation.get('/FT') == '/Btn':
                                if value in [True, "Yes", "On", "1", 1]:
                                    annotation.update({ANNOT_VAL_KEY: '/Yes'})
                                    annotation.update({"/AS": '/Yes'})
                                else:
                                    annotation.update({ANNOT_VAL_KEY: '/Off'})
                                    annotation.update({"/AS": '/Off'})
                            # Si es caja de texto
                            else:
                                annotation.update({ANNOT_VAL_KEY: str(value)})
    
    PdfWriter().write(output_path, template_pdf)
    print(f"PDF generado: {output_path}")


# -------------------------
# EJEMPLO DE USO
# -------------------------

if __name__ == "__main__":
    datos = {
        "900_1_Text_SanSerif": "Choque Angelica",
        "900_2_Text_SanSerif": "12/02/1975",
        "900_3_CheckBox": "Off",
        "900_4_CheckBox": "Yes",
        "900_5_Text_SanSerif": "P.N.B.",
        "900_13_Text_C_SanSerif": "2024",
        "901_23_CheckBox": "Yes",
        "905_23_Text_SanSerif": "Se la nombra publicadora",
    }

    fill_pdf(datos, "Choque Angelica 2025-2026.pdf", "Choque_Angelica_generado.pdf")