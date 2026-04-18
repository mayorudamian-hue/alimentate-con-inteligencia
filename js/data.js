diff --git a/js/data.js b/js/data.js
new file mode 100644
index 0000000000000000000000000000000000000000..a8be91a23ac3a5119975365d275d1df187920e20
--- /dev/null
+++ b/js/data.js
@@ -0,0 +1,282 @@
+export const STORAGE_KEY = "planificador-comidas-semanal-v2";
+export const WEEKS_KEY = "planificador-semanas-guardadas-v1";
+
+export const DAYS = [
+  { id: "monday", label: "Lunes" },
+  { id: "tuesday", label: "Martes" },
+  { id: "wednesday", label: "Miercoles" },
+  { id: "thursday", label: "Jueves" },
+  { id: "friday", label: "Viernes" },
+  { id: "saturday", label: "Sabado" },
+  { id: "sunday", label: "Domingo" }
+];
+
+export const MEAL_TYPES = [
+  { id: "breakfast", label: "Desayuno" },
+  { id: "lunch", label: "Almuerzo" },
+  { id: "snack", label: "Merienda" },
+  { id: "dinner", label: "Cena" }
+];
+
+export const ACTIVE_DAY_TARGET = {
+  calories: [2100, 2400],
+  carbs: [210, 270],
+  proteins: [90, 115],
+  fats: [60, 75],
+  fiber: [25, 30]
+};
+
+export const ACTIVE_DAY_TIPS = [
+  "+½ taza de arroz, fideos o papa en almuerzo o cena",
+  "Sumá 1 fruta extra 🍎 o un puñado de maní 🥜",
+  "O agregá un yogur más durante el día"
+];
+
+export const ACTIVITY_LEVELS = {
+  bajo: {
+    label: "Tranquilo",
+    description: "Poco movimiento",
+    multiplier: 1.0,
+    summary: "Los valores del objetivo ya estan pensados para un dia tranquilo."
+  },
+  medio: {
+    label: "Normal",
+    description: "Movimiento moderado",
+    multiplier: 1,
+    summary: "Buen punto medio para una semana comun."
+  },
+  alto: {
+    label: "Activo",
+    description: "Trabajo fisico o entrenamiento",
+    multiplier: 1.08,
+    summary: "Acepta un poco mas de energia para no quedarte corto."
+  }
+};
+
+export const BASE_PORTIONS = {
+  liviana: {
+    label: "Liviana",
+    description: "Un poco menos de porcion",
+    multiplier: 0.9,
+    summary: "La app baja aproximadamente 10% los valores base."
+  },
+  normal: {
+    label: "Normal",
+    description: "Porciones habituales",
+    multiplier: 1,
+    summary: "La app usa los valores base."
+  },
+  grande: {
+    label: "Grande",
+    description: "Un poco mas de porcion",
+    multiplier: 1.1,
+    summary: "La app sube aproximadamente 10% los valores base."
+  }
+};
+
+export const PORTION_OPTIONS = {
+  s: { label: "0.8x", multiplier: 0.8, description: "Mas liviano" },
+  m: { label: "1x", multiplier: 1, description: "Base" },
+  l: { label: "1.2x", multiplier: 1.2, description: "Con mas hambre" }
+};
+
+export const FOOD_COLORS = {
+  green: { label: "Verde", dot: "#3c9f5a", bg: "#e8f6ec" },
+  red: { label: "Rojo", dot: "#d84c3f", bg: "#fdeceb" },
+  orange: { label: "Naranja", dot: "#e59a2f", bg: "#fff3df" },
+  yellow: { label: "Amarillo", dot: "#d7b62c", bg: "#fff8d9" },
+  purple: { label: "Morado/Azul", dot: "#7f5bb8", bg: "#f1eafd" },
+  brown: { label: "Marrón", dot: "#8b6b4b", bg: "#f3ede5" },
+  white: { label: "Blanco/Marrón", dot: "#8b6b4b", bg: "#f3ede5" }
+};
+
+export const FOOD_CATEGORY_OPTIONS = [
+  "Frutas",
+  "Verduras",
+  "Infusiones",
+  "Carnes y proteínas",
+  "Cereales y harinas",
+  "Legumbres",
+  "Lácteos",
+  "Grasas y semillas",
+  "Procesados y varios"
+];
+
+export const PRESET_INGREDIENTS = [
+  { name: "Manzana", qty: "1 mediana (~180 g)", calories: 95, carbs: 25, proteins: 0.5, fats: 0.3, fiber: 4, color: "red", emoji: "🍎" },
+  { name: "Naranja", qty: "1 mediana (~130 g)", calories: 60, carbs: 15, proteins: 1, fats: 0.2, fiber: 3, color: "orange", emoji: "🍊" },
+  { name: "Banana", qty: "1 mediana (~120 g)", calories: 105, carbs: 27, proteins: 1.3, fats: 0.3, fiber: 3, color: "yellow", emoji: "🍌" },
+  { name: "Pan integral", qty: "60 g (~2 rebanadas)", calories: 150, carbs: 28, proteins: 6, fats: 2, fiber: 4.5, color: "brown", emoji: "🍞" },
+  { name: "Huevo", qty: "1 unidad", calories: 70, carbs: 0.5, proteins: 6, fats: 5, fiber: 0, color: "yellow", emoji: "🥚" },
+  { name: "Zanahoria", qty: "1 mediana (~60 g)", calories: 25, carbs: 6, proteins: 0.5, fats: 0.1, fiber: 2, color: "orange", emoji: "🥕" },
+  { name: "Pollo", qty: "150 g (pechuga cocida)", calories: 250, carbs: 0, proteins: 35, fats: 8, fiber: 0, color: "white", emoji: "🍗" },
+  { name: "Carne vacuna", qty: "150 g", calories: 280, carbs: 0, proteins: 30, fats: 18, fiber: 0, color: "red", emoji: "🥩" },
+  { name: "Arroz blanco", qty: "1 taza cocido (~150 g)", calories: 200, carbs: 45, proteins: 4, fats: 0.5, fiber: 1, color: "white", emoji: "🍚" },
+  { name: "Arroz integral", qty: "1 taza cocido", calories: 215, carbs: 45, proteins: 5, fats: 2, fiber: 3.5, color: "brown", emoji: "🌾" },
+  { name: "Fideos", qty: "1 taza cocidos", calories: 220, carbs: 43, proteins: 8, fats: 1, fiber: 2, color: "brown", emoji: "🍝" },
+  { name: "Papa", qty: "1 mediana (~150 g)", calories: 130, carbs: 30, proteins: 3, fats: 0.2, fiber: 3, color: "yellow", emoji: "🥔" },
+  { name: "Lechuga", qty: "1 plato", calories: 15, carbs: 3, proteins: 1, fats: 0, fiber: 1.5, color: "green", emoji: "🥬" },
+  { name: "Tomate", qty: "1 mediano", calories: 20, carbs: 5, proteins: 1, fats: 0, fiber: 1.5, color: "red", emoji: "🍅" },
+  { name: "Maní", qty: "30 g (puñado)", calories: 170, carbs: 6, proteins: 7, fats: 14, fiber: 2, color: "brown", emoji: "🥜" },
+  { name: "Leche", qty: "1 vaso (~250 ml)", calories: 120, carbs: 12, proteins: 8, fats: 5, fiber: 0, color: "white", emoji: "🥛" },
+  { name: "Lentejas", qty: "1 taza cocidas", calories: 230, carbs: 40, proteins: 18, fats: 1, fiber: 15, color: "brown", emoji: "🧆" },
+  { name: "Atún", qty: "170 g (escurrido)", calories: 250, carbs: 0, proteins: 35, fats: 12, fiber: 0, color: "white", emoji: "🐟" },
+  { name: "Choclo", qty: "1 unidad mediana", calories: 120, carbs: 27, proteins: 4, fats: 2, fiber: 3, color: "yellow", emoji: "🌽" },
+  { name: "Batata", qty: "1 mediana (~200 g)", calories: 180, carbs: 40, proteins: 2, fats: 0, fiber: 6, color: "orange", emoji: "🍠" },
+  { name: "Zapallo", qty: "1/2 mediano (~400 g)", calories: 100, carbs: 25, proteins: 3, fats: 0, fiber: 4, color: "orange", emoji: "🎃" },
+  { name: "Milanesas de pollo", qty: "3 unidades", calories: 450, carbs: 30, proteins: 40, fats: 20, fiber: 2, color: "white", emoji: "🍗" },
+  { name: "Milanesas de carne", qty: "3 unidades", calories: 600, carbs: 30, proteins: 45, fats: 35, fiber: 2, color: "red", emoji: "🥩" },
+  { name: "Ajo", qty: "1 diente", calories: 5, carbs: 1, proteins: 0, fats: 0, fiber: 0.1, color: "white", emoji: "🧄" },
+  { name: "Diente de león", qty: "1 plato", calories: 25, carbs: 5, proteins: 2, fats: 0, fiber: 3, color: "green", emoji: "🌿" },
+  { name: "Acelga", qty: "1 paquete (~300 g cocida)", calories: 60, carbs: 10, proteins: 5, fats: 1, fiber: 5, color: "green", emoji: "🥬" },
+  { name: "Espinaca", qty: "1 paquete (~300 g cocida)", calories: 70, carbs: 11, proteins: 6, fats: 1, fiber: 6, color: "green", emoji: "🥬" },
+  { name: "Pizza", qty: "2 porciones medianas", calories: 500, carbs: 60, proteins: 20, fats: 20, fiber: 3, color: "brown", emoji: "🍕" },
+  { name: "Hamburguesa de lentejas", qty: "1 unidad", calories: 200, carbs: 25, proteins: 10, fats: 5, fiber: 7, color: "brown", emoji: "🧆" },
+  { name: "Hamburguesa de carne", qty: "1 unidad", calories: 250, carbs: 0, proteins: 20, fats: 18, fiber: 0, color: "red", emoji: "🍔" },
+  { name: "Bife de cerdo", qty: "150 g", calories: 300, carbs: 0, proteins: 28, fats: 20, fiber: 0, color: "red", emoji: "🥩" },
+  { name: "Polenta con queso", qty: "1 porción", calories: 300, carbs: 40, proteins: 10, fats: 10, fiber: 2, color: "yellow", emoji: "🍲" },
+  { name: "Salsa de tomate con carne", qty: "1 porción", calories: 180, carbs: 10, proteins: 12, fats: 10, fiber: 2, color: "red", emoji: "🍝" },
+  { name: "Ñoquis", qty: "1 porción", calories: 300, carbs: 60, proteins: 8, fats: 3, fiber: 3, color: "brown", emoji: "🍝" },
+  { name: "Nuez", qty: "1 unidad", calories: 30, carbs: 1, proteins: 1, fats: 3, fiber: 0.5, color: "brown", emoji: "🌰" },
+  { name: "Aceite de oliva", qty: "1 cucharada", calories: 120, carbs: 0, proteins: 0, fats: 14, fiber: 0, color: "brown", emoji: "🫒" },
+  { name: "Aceitunas", qty: "4 unidades", calories: 25, carbs: 1, proteins: 0, fats: 2, fiber: 0.5, color: "brown", emoji: "🫒" },
+  { name: "Ciruela", qty: "1 unidad", calories: 30, carbs: 8, proteins: 0, fats: 0, fiber: 1, color: "purple", emoji: "🍑" },
+  { name: "Pepino", qty: "1 mediano", calories: 20, carbs: 4, proteins: 1, fats: 0, fiber: 1, color: "green", emoji: "🥒" }
+];
+
+export const MEALS = { breakfast: [], lunch: [], snack: [], dinner: [] };
+
+const perfilToGoal = {
+  bajarPeso: "control",
+  entrenar: "energia",
+  mejorarCuerpo: "cuerpo",
+  masEnergia: "energia",
+  diaTransquilo: "pareja"
+};
+
+const goalLabels = {
+  energia: "Mas energia",
+  cuerpo: "Mejorar el cuerpo",
+  control: "Controlar el peso",
+  pareja: "Dia tranquilo (pareja)"
+};
+
+export function goalsFromPerfiles(perfiles = {}) {
+  const out = {};
+  Object.entries(perfiles).forEach(([perfilKey, perfil]) => {
+    const goalKey = perfilToGoal[perfilKey];
+    if (!goalKey) return;
+    const p = perfil.prioridadPorComida || {};
+    out[goalKey] = {
+      label: perfil.label || goalLabels[goalKey],
+      description: perfil.descripcion || "",
+      target: {
+        calories: [perfil.calorias?.min ?? 1800, perfil.calorias?.max ?? 2100],
+        carbs: [perfil.carbohidratos?.min ?? 160, perfil.carbohidratos?.max ?? 200],
+        proteins: [perfil.proteinas?.min ?? 90, perfil.proteinas?.max ?? 120],
+        fats: [perfil.grasas?.min ?? 55, perfil.grasas?.max ?? 70],
+        fiber: [perfil.fibra?.min ?? 25, perfil.fibra?.max ?? 30]
+      },
+      mealBias: {
+        breakfast: p.desayuno || ["balanced"],
+        lunch: p.almuerzo || ["balanced"],
+        snack: p.merienda || ["balanced"],
+        dinner: p.cena || ["balanced"]
+      }
+    };
+  });
+  return out;
+}
+
+export async function loadMealsFromJson(url = "comidas.json") {
+  const res = await fetch(url);
+  if (!res.ok) {
+    throw new Error(`No se pudo cargar ${url}`);
+  }
+  const data = await res.json();
+  const validationErrors = validateComidasPayload(data);
+  if (validationErrors.length) {
+    throw new Error(`Estructura inválida en ${url}: ${validationErrors.join(" | ")}`);
+  }
+
+  const mealTypeMap = {
+    desayuno: "breakfast",
+    almuerzo: "lunch",
+    merienda: "snack",
+    cena: "dinner"
+  };
+
+  function toInternal(meal) {
+    return {
+      id: meal.id,
+      name: meal.nombre,
+      detail: meal.detalle,
+      calories: meal.calorias,
+      carbs: meal.carbohidratos,
+      proteins: meal.proteinas,
+      fats: meal.grasas,
+      fiber: meal.fibra || 0,
+      tags: meal.tags || [],
+      balance: meal.balance || "",
+      ingredients: meal.ingredientes || [],
+      mealTypes: meal.mealTypes || []
+    };
+  }
+
+  Object.keys(mealTypeMap).forEach(esKey => {
+    const enKey = mealTypeMap[esKey];
+    const arr = data.comidas?.[esKey] || [];
+    MEALS[enKey] = arr.map(toInternal);
+  });
+
+  return {
+    meals: MEALS,
+    goals: goalsFromPerfiles(data.perfilesNutricionales || {})
+  };
+}
+
+export function validateComidasPayload(data) {
+  const errors = [];
+  if (!data || typeof data !== "object") {
+    return ["el archivo no es un objeto JSON válido"];
+  }
+
+  const mealSections = ["desayuno", "almuerzo", "merienda", "cena"];
+  if (!data.comidas || typeof data.comidas !== "object") {
+    errors.push("falta el bloque 'comidas'");
+    return errors;
+  }
+
+  const requiredMealFields = [
+    "id",
+    "nombre",
+    "detalle",
+    "calorias",
+    "carbohidratos",
+    "proteinas",
+    "grasas",
+    "ingredientes"
+  ];
+
+  mealSections.forEach((section) => {
+    const meals = data.comidas?.[section];
+    if (!Array.isArray(meals)) {
+      errors.push(`comidas.${section} debe ser un array`);
+      return;
+    }
+
+    meals.forEach((meal, idx) => {
+      requiredMealFields.forEach((field) => {
+        if (meal?.[field] === undefined || meal?.[field] === null || meal?.[field] === "") {
+          errors.push(`comidas.${section}[${idx}] falta '${field}'`);
+        }
+      });
+    });
+  });
+
+  if (!data.perfilesNutricionales || typeof data.perfilesNutricionales !== "object") {
+    errors.push("falta el bloque 'perfilesNutricionales'");
+  }
+
+  return errors;
+}
