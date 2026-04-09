import sqlite3
import tkinter as tk
from tkinter import ttk, messagebox, filedialog
from PIL import Image, ImageTk
from datetime import datetime
import os

DB_NAME = "muebles.db"

# -------------------------------------------------
#  BASE DE DATOS
# -------------------------------------------------

def conectar():
    return sqlite3.connect(DB_NAME)

def crear_tablas():
    with conectar() as conn:
        cursor = conn.cursor()

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS materiales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            tipo TEXT,
            precio REAL NOT NULL,
            cantidad REAL NOT NULL,
            unidad TEXT,
            stock_minimo REAL NOT NULL
        )
        """)

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS muebles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            imagen TEXT,
            fecha TEXT,
            estado TEXT,
            margen REAL,
            precio_final REAL
        )
        """)

        cursor.execute("""
        CREATE TABLE IF NOT EXISTS piezas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mueble_id INTEGER,
            nombre TEXT NOT NULL,
            cantidad INTEGER NOT NULL,
            alto REAL,
            ancho REAL,
            m2 REAL,
            material_id INTEGER,
            costo REAL,
            FOREIGN KEY (mueble_id) REFERENCES muebles(id),
            FOREIGN KEY (material_id) REFERENCES materiales(id)
        )
        """)

crear_tablas()

# -------------------------------------------------
#  APLICACIÓN PRINCIPAL
# -------------------------------------------------

class App:
    def __init__(self, root):
        self.root = root
        self.root.title("Gestión de Muebles")
        self.root.geometry("1300x700")

        self.notebook = ttk.Notebook(root)
        self.notebook.pack(fill="both", expand=True)

        # Tabs
        self.tab_inventario = tk.Frame(self.notebook)
        self.tab_muebles = tk.Frame(self.notebook)
        self.tab_reportes = tk.Frame(self.notebook)

        self.notebook.add(self.tab_inventario, text="Inventario")
        self.notebook.add(self.tab_muebles, text="Muebles")
        self.notebook.add(self.tab_reportes, text="Reportes")

        # UI
        self.inventario_ui()
        self.muebles_ui()
        self.reportes_ui()

        # Cargar datos iniciales
        self.cargar_materiales()
        self.cargar_muebles()
        self.cargar_reporte()

    # -------------------------------------------------
    #   INVENTARIO
    # -------------------------------------------------

    def inventario_ui(self):
        frame = tk.Frame(self.tab_inventario)
        frame.pack(fill="both", expand=True)

        cols = ("ID", "Nombre", "Tipo", "Precio", "Cantidad", "Unidad", "Min")
        self.tree = ttk.Treeview(frame, columns=cols, show="headings")
        self.tree.pack(fill="both", expand=True)

        for col in cols:
            self.tree.heading(col, text=col)

        # Botones
        botones = tk.Frame(self.tab_inventario)
        botones.pack(pady=5)
        tk.Button(botones, text="Agregar", command=self.agregar_material).pack(side="left", padx=5)
        tk.Button(botones, text="Editar", command=self.editar_material).pack(side="left", padx=5)
        tk.Button(botones, text="Eliminar", command=self.eliminar_material).pack(side="left", padx=5)

    def cargar_materiales(self):
        self.tree.delete(*self.tree.get_children())

        with conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM materiales")

            for row in cursor.fetchall():
                tag = "bajo" if row[4] <= row[6] else ""
                self.tree.insert("", "end", values=row, tags=(tag,))

        self.tree.tag_configure("bajo", background="misty rose")

    def agregar_material(self):
        self._material_form()

    def editar_material(self):
        seleccionado = self.tree.selection()
        if not seleccionado:
            return messagebox.showwarning("Aviso", "Seleccione un material")

        item = self.tree.item(seleccionado)
        self._material_form(material=item["values"])

    def _material_form(self, material=None):
        ventana = tk.Toplevel(self.root)
        ventana.title("Editar Material" if material else "Nuevo Material")

        campos = ["Nombre", "Tipo", "Precio", "Cantidad", "Unidad", "Stock Min"]
        entries = []

        for i, c in enumerate(campos):
            tk.Label(ventana, text=c).pack()
            e = tk.Entry(ventana)
            e.pack()
            if material:
                e.insert(0, material[i+1])
            entries.append(e)

        def guardar():
            try:
                datos = (
                    entries[0].get(),
                    entries[1].get(),
                    float(entries[2].get()),
                    float(entries[3].get()),
                    entries[4].get(),
                    float(entries[5].get())
                )

                with conectar() as conn:
                    cursor = conn.cursor()

                    if material:
                        cursor.execute("""
                            UPDATE materiales SET 
                            nombre=?, tipo=?, precio=?, cantidad=?, unidad=?, stock_minimo=?
                            WHERE id=?
                        """, datos + (material[0],))
                    else:
                        cursor.execute("""
                            INSERT INTO materiales(nombre,tipo,precio,cantidad,unidad,stock_minimo)
                            VALUES (?,?,?,?,?,?)
                        """, datos)

                ventana.destroy()
                self.cargar_materiales()
                self.cargar_reporte()

            except ValueError:
                messagebox.showerror("Error", "Datos numéricos inválidos")

        tk.Button(ventana, text="Guardar", command=guardar).pack(pady=10)

    def eliminar_material(self):
        seleccionado = self.tree.selection()
        if not seleccionado:
            return

        mat_id = self.tree.item(seleccionado)["values"][0]

        with conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM materiales WHERE id=?", (mat_id,))

        self.cargar_materiales()
        self.cargar_reporte()

    # -------------------------------------------------
    #   MUEBLES
    # -------------------------------------------------

    def muebles_ui(self):
        frame = tk.Frame(self.tab_muebles)
        frame.pack(fill="both", expand=True)

        cols = ("ID", "Nombre", "Estado", "Costo", "Precio Sugerido")
        self.lista_muebles = ttk.Treeview(frame, columns=cols, show="headings")
        self.lista_muebles.pack(fill="both", expand=True)

        for col in cols:
            self.lista_muebles.heading(col, text=col)

        botones = tk.Frame(self.tab_muebles)
        botones.pack(pady=5)

        tk.Button(botones, text="Nuevo Mueble", command=self.crear_mueble).pack(side="left", padx=5)
        tk.Button(botones, text="Agregar Pieza", command=self.agregar_pieza).pack(side="left", padx=5)
        tk.Button(botones, text="Editar Pieza", command=self.editar_pieza).pack(side="left", padx=5)
        tk.Button(botones, text="Cargar Imagen", command=self.cargar_imagen).pack(side="left", padx=5)

        self.img_label = tk.Label(self.tab_muebles)
        self.img_label.pack(pady=5)

        self.lista_muebles.bind("<<TreeviewSelect>>", lambda e: self.mostrar_imagen_seleccionado())

    # -------------------------------------------------
    #  CREAR MUEBLE
    # -------------------------------------------------

    def crear_mueble(self):
        ventana = tk.Toplevel(self.root)
        ventana.title("Nuevo Mueble")
        ventana.geometry("400x450")

        tk.Label(ventana, text="Nombre").pack()
        e_nombre = tk.Entry(ventana); e_nombre.pack()

        tk.Label(ventana, text="Estado").pack()
        estado = ttk.Combobox(ventana, values=["Diseño", "Producción", "Terminado"])
        estado.current(0)
        estado.pack()

        tk.Label(ventana, text="Margen (%)").pack()
        e_margen = tk.Entry(ventana); e_margen.insert(0, "30"); e_margen.pack()

        def guardar():
            nombre = e_nombre.get().strip()
            if not nombre:
                return messagebox.showwarning("Error", "Ingrese un nombre")

            try:
                margen = float(e_margen.get())
            except:
                return messagebox.showerror("Error", "Margen inválido")

            fecha = datetime.now().strftime("%Y-%m-%d")

            with conectar() as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT INTO muebles(nombre, estado, margen, precio_final, fecha)
                    VALUES (?,?,?,?,?)
                """, (nombre, estado.get(), margen, 0, fecha))

            self.cargar_muebles()
            ventana.destroy()

        tk.Button(ventana, text="Guardar", command=guardar).pack(pady=10)

    # -------------------------------------------------
    #  AGREGAR PIEZAS
    # -------------------------------------------------

    def agregar_pieza(self):
        seleccionado = self.lista_muebles.selection()
        if not seleccionado:
            return messagebox.showwarning("Aviso", "Seleccione un mueble")

        mueble_id = self.lista_muebles.item(seleccionado)["values"][0]

        ventana = tk.Toplevel(self.root)
        ventana.title("Piezas del Mueble")
        ventana.geometry("900x500")

        cols = ("ID", "Nombre", "Cantidad", "Alto", "Ancho", "m²", "Material", "Costo")
        tabla = ttk.Treeview(ventana, columns=cols, show="headings")
        tabla.pack(fill="both", expand=True)

        for c in cols:
            tabla.heading(c, text=c)

        # cargar piezas existentes
        with conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT piezas.id, piezas.nombre, piezas.cantidad,
                       piezas.alto, piezas.ancho, piezas.m2,
                       materiales.nombre, piezas.costo
                FROM piezas
                LEFT JOIN materiales ON piezas.material_id = materiales.id
                WHERE piezas.mueble_id = ?
            """, (mueble_id,))

            for row in cursor.fetchall():
                tabla.insert("", "end", values=row)

        # ---------- FORMULARIO DE PIEZA ----------
        form = tk.Frame(ventana); form.pack(pady=10)

        def campo(label):
            tk.Label(form, text=label).pack()
            e = tk.Entry(form); e.pack()
            return e

        e_nombre = campo("Nombre pieza")
        e_cant = campo("Cantidad")
        e_alto = campo("Alto (cm)")
        e_ancho = campo("Ancho (cm)")

        # materiales
        tk.Label(form, text="Material").pack()
        with conectar() as conn:
            mats = conn.execute("SELECT id, nombre, precio FROM materiales").fetchall()

        cb_mat = ttk.Combobox(form, values=[f"{m[0]} - {m[1]}" for m in mats])
        cb_mat.pack()

        # ---------- AGREGAR PIEZA ----------
        def agregar():
            try:
                nombre = e_nombre.get().strip()
                cant = int(e_cant.get())
                alto = float(e_alto.get()) / 100
                ancho = float(e_ancho.get()) / 100
                m2 = alto * ancho

                mat = cb_mat.get().split(" ")[0]
                mat_id = int(mat)

                precio_mat = next(m[2] for m in mats if m[0] == mat_id)
                costo = precio_mat * m2 * cant

            except:
                return messagebox.showerror("Error", "Datos inválidos")

            with conectar() as conn:
                conn.execute("""
                    INSERT INTO piezas(mueble_id, nombre, cantidad, alto, ancho, m2, material_id, costo)
                    VALUES (?,?,?,?,?,?,?,?)
                """, (mueble_id, nombre, cant, alto*100, ancho*100, m2, mat_id, costo))

            tabla.insert("", "end", values=(None, nombre, cant, alto*100, ancho*100, m2, cb_mat.get(), costo))

            self.recalcular_costo_mueble(mueble_id)

        tk.Button(form, text="Agregar pieza", command=agregar).pack(pady=5)

    # -------------------------------------------------
    #  EDITAR PIEZA (opcional, simple)
    # -------------------------------------------------

    def editar_pieza(self):
        messagebox.showinfo("Info", "Función de edición avanzada disponible si la necesitas.")

    # -------------------------------------------------
    #  RECALCULAR COSTO MUEBLE
    # -------------------------------------------------

    def recalcular_costo_mueble(self, mueble_id):
        with conectar() as conn:
            cursor = conn.cursor()

            cursor.execute("SELECT SUM(costo) FROM piezas WHERE mueble_id=?", (mueble_id,))
            costo_total = cursor.fetchone()[0] or 0

            cursor.execute("SELECT margen FROM muebles WHERE id=?", (mueble_id,))
            margen = cursor.fetchone()[0]

            precio_final = costo_total * (1 + margen / 100)

            cursor.execute("UPDATE muebles SET precio_final=? WHERE id=?", (precio_final, mueble_id))

        self.cargar_muebles()
        self.cargar_reporte()

    # -------------------------------------------------
    #  IMÁGENES
    # -------------------------------------------------

    def cargar_imagen(self):
        seleccionado = self.lista_muebles.selection()
        if not seleccionado:
            return messagebox.showwarning("Aviso", "Seleccione un mueble")

        mueble_id = self.lista_muebles.item(seleccionado)["values"][0]

        ruta = filedialog.askopenfilename(
            filetypes=[("Imágenes", "*.png;*.jpg;*.jpeg;*.webp")]
        )
        if not ruta:
            return

        os.makedirs("imagenes", exist_ok=True)

        nombre_archivo = f"mueble_{mueble_id}.png"
        destino = os.path.join("imagenes", nombre_archivo)

        img = Image.open(ruta)
        img.save(destino)

        with conectar() as conn:
            conn.execute("UPDATE muebles SET imagen=? WHERE id=?", (destino, mueble_id))

        self.mostrar_imagen_seleccionado()

    def mostrar_imagen_seleccionado(self):
        seleccionado = self.lista_muebles.selection()
        if not seleccionado:
            return

        mueble_id = self.lista_muebles.item(seleccionado)["values"][0]

        with conectar() as conn:
            ruta = conn.execute("SELECT imagen FROM muebles WHERE id=?", (mueble_id,)).fetchone()[0]

        if not ruta or not os.path.exists(ruta):
            self.img_label.config(image="", text="Sin imagen")
            return

        img = Image.open(ruta)
        img = img.resize((250, 250))
        self.photo = ImageTk.PhotoImage(img)

        self.img_label.config(image=self.photo)

    # -------------------------------------------------
    #  CARGAR MUEBLES
    # -------------------------------------------------

    def cargar_muebles(self):
        self.lista_muebles.delete(*self.lista_muebles.get_children())

        with conectar() as conn:
            cursor = conn.cursor()
            cursor.execute("""
                SELECT id, nombre, estado,
                    (SELECT SUM(costo) FROM piezas WHERE mueble_id=muebles.id),
                    precio_final
                FROM muebles
            """)

            for row in cursor.fetchall():
                costo = row[3] or 0
                self.lista_muebles.insert("", "end", values=(
                    row[0], row[1], row[2], round(costo,2), round(row[4] or 0,2)
                ))

    # -------------------------------------------------
    #  REPORTES
    # -------------------------------------------------

    def reportes_ui(self):
        frame = tk.Frame(self.tab_reportes)
        frame.pack(fill="both", expand=True)

        cols = ("Mueble", "Estado", "Pieza", "Material", "Cantidad", "Alto cm", "Ancho cm", "m²", "Costo")

        self.tree_reportes = ttk.Treeview(frame, columns=cols, show="headings")
        self.tree_reportes.pack(fill="both", expand=True)

        for col in cols:
            self.tree_reportes.heading(col, text=col)

        tk.Button(self.tab_reportes, text="Actualizar Reporte", command=self.cargar_reporte).pack(pady=5)

    def cargar_reporte(self):
        self.tree_reportes.delete(*self.tree_reportes.get_children())

        with conectar() as conn:
            cursor = conn.cursor()

            cursor.execute("""
                SELECT muebles.nombre, muebles.estado,
                       piezas.nombre, materiales.nombre,
                       piezas.cantidad, piezas.alto, piezas.ancho,
                       piezas.m2, piezas.costo
                FROM piezas
                LEFT JOIN muebles ON piezas.mueble_id = muebles.id
                LEFT JOIN materiales ON piezas.material_id = materiales.id
            """)

            for row in cursor.fetchall():
                self.tree_reportes.insert("", "end", values=row)

# -------------------------------------------------
#  EJECUCIÓN
# -------------------------------------------------
if __name__ == "__main__":
    root = tk.Tk()
    app = App(root)
    root.mainloop()