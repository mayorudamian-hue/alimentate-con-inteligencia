 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/js/app.bundle.js b/js/app.bundle.js
new file mode 100644
index 0000000000000000000000000000000000000000..3f7167887605f8c03ca3f4ba6ba675f155d1c1eb
--- /dev/null
+++ b/js/app.bundle.js
@@ -0,0 +1,2574 @@
+// Auto-generated standalone bundle for environments without ES module support.
+
+const STORAGE_KEY = "planificador-comidas-semanal-v2";
+const WEEKS_KEY = "planificador-semanas-guardadas-v1";
+
+const DAYS = [
+  { id: "monday", label: "Lunes" },
+  { id: "tuesday", label: "Martes" },
+  { id: "wednesday", label: "Miercoles" },
+  { id: "thursday", label: "Jueves" },
+  { id: "friday", label: "Viernes" },
+  { id: "saturday", label: "Sabado" },
+  { id: "sunday", label: "Domingo" }
+];
+
+const MEAL_TYPES = [
+  { id: "breakfast", label: "Desayuno" },
+  { id: "lunch", label: "Almuerzo" },
+  { id: "snack", label: "Merienda" },
+  { id: "dinner", label: "Cena" }
+];
+
+const ACTIVE_DAY_TARGET = {
+  calories: [2100, 2400],
+  carbs: [210, 270],
+  proteins: [90, 115],
+  fats: [60, 75],
+  fiber: [25, 30]
+};
+
+const ACTIVE_DAY_TIPS = [
+  "+½ taza de arroz, fideos o papa en almuerzo o cena",
+  "Sumá 1 fruta extra 🍎 o un puñado de maní 🥜",
+  "O agregá un yogur más durante el día"
+];
+
+const ACTIVITY_LEVELS = {
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
+const BASE_PORTIONS = {
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
+const PORTION_OPTIONS = {
+  s: { label: "0.8x", multiplier: 0.8, description: "Mas liviano" },
+  m: { label: "1x", multiplier: 1, description: "Base" },
+  l: { label: "1.2x", multiplier: 1.2, description: "Con mas hambre" }
+};
+
+const FOOD_COLORS = {
+  green: { label: "Verde", dot: "#3c9f5a", bg: "#e8f6ec" },
+  red: { label: "Rojo", dot: "#d84c3f", bg: "#fdeceb" },
+  orange: { label: "Naranja", dot: "#e59a2f", bg: "#fff3df" },
+  yellow: { label: "Amarillo", dot: "#d7b62c", bg: "#fff8d9" },
+  purple: { label: "Morado/Azul", dot: "#7f5bb8", bg: "#f1eafd" },
+  brown: { label: "Marrón", dot: "#8b6b4b", bg: "#f3ede5" },
+  white: { label: "Blanco/Marrón", dot: "#8b6b4b", bg: "#f3ede5" }
+};
+
+const FOOD_CATEGORY_OPTIONS = [
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
+const PRESET_INGREDIENTS = [
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
+const MEALS = { breakfast: [], lunch: [], snack: [], dinner: [] };
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
+function goalsFromPerfiles(perfiles = {}) {
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
+async function loadMealsFromJson(url = "comidas.json") {
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
+function validateComidasPayload(data) {
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
+
+
+function createDefaultPlan(days, mealTypes) {
+  const plan = {};
+  days.forEach((day) => {
+    plan[day.id] = {};
+    mealTypes.forEach(({ id }) => {
+      plan[day.id][id] = { mealId: null, portion: "m" };
+    });
+  });
+  return plan;
+}
+
+function normalizePlan(plan, days, mealTypes) {
+  const base = createDefaultPlan(days, mealTypes);
+  days.forEach((day) => {
+    mealTypes.forEach(({ id }) => {
+      if (plan?.[day.id]?.[id]) {
+        base[day.id][id].mealId = plan[day.id][id].mealId ?? null;
+        base[day.id][id].portion = plan[day.id][id].portion ?? "m";
+      }
+    });
+  });
+  return base;
+}
+
+function stripPresetMealsFromPlan(plan, days, mealTypes) {
+  const sanitized = normalizePlan(plan || createDefaultPlan(days, mealTypes), days, mealTypes);
+  days.forEach((day) => {
+    mealTypes.forEach(({ id }) => {
+      sanitized[day.id][id].mealId = null;
+      sanitized[day.id][id].portion = "m";
+    });
+  });
+  return sanitized;
+}
+
+function loadState(storageKey, days, mealTypes) {
+  const raw = localStorage.getItem(storageKey);
+  if (!raw) {
+    return {
+      goal: "pareja",
+      activity: "bajo",
+      basePortion: "normal",
+      plan: createDefaultPlan(days, mealTypes),
+      summaryMode: "day",
+      selectedDay: "monday",
+      activeDays: {},
+      people: 1,
+      profile: { sex: "female", age: "", weight: "", height: "" },
+      profile2: null
+    };
+  }
+  try {
+    const parsed = JSON.parse(raw);
+    return {
+      goal: parsed.goal || "pareja",
+      activity: parsed.activity || "bajo",
+      basePortion: parsed.basePortion || "normal",
+      plan: normalizePlan(parsed.plan, days, mealTypes),
+      summaryMode: parsed.summaryMode === "week" ? "week" : "day",
+      selectedDay: parsed.selectedDay || "monday",
+      activeDays: parsed.activeDays || {},
+      people: parsed.people === 2 ? 2 : 1,
+      profile: parsed.profile || { sex: "female", age: "", weight: "", height: "" },
+      profile2: parsed.profile2 || null
+    };
+  } catch {
+    return {
+      goal: "pareja",
+      activity: "bajo",
+      basePortion: "normal",
+      plan: createDefaultPlan(days, mealTypes),
+      summaryMode: "day",
+      selectedDay: "monday",
+      activeDays: {},
+      people: 1,
+      profile: { sex: "female", age: "", weight: "", height: "" },
+      profile2: null
+    };
+  }
+}
+
+function saveState(storageKey, state) {
+  localStorage.setItem(storageKey, JSON.stringify(state));
+}
+
+
+function buildWeekChip({ name, index }) {
+  const chip = document.createElement("span");
+  chip.className = "week-chip";
+  chip.dataset.weekIndex = String(index);
+
+  const text = document.createTextNode(name);
+  chip.appendChild(text);
+
+  const btn = document.createElement("button");
+  btn.className = "del-btn";
+  btn.dataset.delWeek = String(index);
+  btn.title = "Eliminar";
+  btn.type = "button";
+  btn.textContent = "✕";
+  chip.appendChild(btn);
+
+  return chip;
+}
+
+function openModal(modalEl, triggerEl) {
+  if (!modalEl) return () => {};
+  modalEl.classList.add("open");
+  const focusables = modalEl.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
+  const first = focusables[0];
+  const last = focusables[focusables.length - 1];
+  if (first) first.focus();
+
+  function onKeyDown(e) {
+    if (e.key === "Escape") {
+      closeModal();
+      return;
+    }
+    if (e.key === "Tab" && focusables.length) {
+      if (e.shiftKey && document.activeElement === first) {
+        e.preventDefault();
+        last.focus();
+      } else if (!e.shiftKey && document.activeElement === last) {
+        e.preventDefault();
+        first.focus();
+      }
+    }
+  }
+
+  function closeModal() {
+    modalEl.classList.remove("open");
+    document.removeEventListener("keydown", onKeyDown);
+    if (triggerEl) triggerEl.focus();
+  }
+
+  document.addEventListener("keydown", onKeyDown);
+  return closeModal;
+}
+
+
+// Alias bridge for standalone bundle
+const createDefaultPlanBase = createDefaultPlan;
+const normalizePlanBase = normalizePlan;
+const stripPresetMealsFromPlanBase = stripPresetMealsFromPlan;
+const loadStateFromStorage = loadState;
+const saveStateToStorage = saveState;
+
+let state = { goal: "pareja", activity: "bajo", basePortion: "normal", plan: {}, summaryMode: "day", selectedDay: "monday", activeDays: {}, people: 1, profile: { sex: "female", age: "", weight: "", height: "" }, profile2: null };
+
+function loadState() {
+  const loaded = loadStateFromStorage(STORAGE_KEY, DAYS, MEAL_TYPES);
+  if (!GOALS[loaded.goal]) loaded.goal = "pareja";
+  if (!ACTIVITY_LEVELS[loaded.activity]) loaded.activity = "bajo";
+  if (!BASE_PORTIONS[loaded.basePortion]) loaded.basePortion = "normal";
+  return loaded;
+}
+
+function saveState() {
+  saveStateToStorage(STORAGE_KEY, state);
+}
+
+function createDefaultPlan() {
+  return createDefaultPlanBase(DAYS, MEAL_TYPES);
+}
+
+function normalizePlan(plan) {
+  return normalizePlanBase(plan, DAYS, MEAL_TYPES);
+}
+
+function stripPresetMealsFromPlan(plan) {
+  return stripPresetMealsFromPlanBase(plan, DAYS, MEAL_TYPES);
+}
+
+function mealById(type, id) {
+  if (!id) return null;
+  return MEALS[type].find(meal => meal.id === id) || null;
+}
+
+function entryFor(dayId, mealType) {
+  return state.plan[dayId][mealType];
+}
+
+function portionMultiplier(code) {
+  return PORTION_OPTIONS[code]?.multiplier || 1;
+}
+
+function globalMultiplier() {
+  return ACTIVITY_LEVELS[state.activity].multiplier * BASE_PORTIONS[state.basePortion].multiplier;
+}
+
+function peopleMultiplier() {
+  return state.people || 1;
+}
+
+function scaleMetric(value, multiplier) {
+  return Math.round(value * multiplier);
+}
+
+function mealStats(dayId, mealType) {
+  const entry = entryFor(dayId, mealType);
+  const meal = mealById(mealType, entry.mealId);
+  if (!meal) {
+    return { meal: null, multiplier: 1, calories: 0, carbs: 0, proteins: 0, fats: 0, fiber: 0 };
+  }
+  const multiplier = portionMultiplier(entry.portion) * globalMultiplier() * peopleMultiplier();
+  return {
+    meal,
+    multiplier,
+    calories: scaleMetric(meal.calories, multiplier),
+    carbs: scaleMetric(meal.carbs, multiplier),
+    proteins: scaleMetric(meal.proteins, multiplier),
+    fats: scaleMetric(meal.fats, multiplier),
+    fiber: scaleMetric(meal.fiber || 0, multiplier)
+  };
+}
+
+function customMealStats(dayId, mealTypeId) {
+  const totals = customMealTotals(customMealKey(dayId, mealTypeId));
+  return {
+    calories: totals.calories,
+    carbs: totals.carbs,
+    proteins: totals.proteins,
+    fats: totals.fats,
+    fiber: totals.fiber
+  };
+}
+
+function colorBadgeHTML(colorId) {
+  const color = FOOD_COLORS[colorId];
+  if (!color) return "";
+  return `<span class="color-badge" style="background:${color.bg}; color:${color.dot};"><span class="color-dot" style="background:${color.dot};"></span>${color.label}</span>`;
+}
+
+function collectColorsForMeal(dayId, mealTypeId) {
+  const key = customMealKey(dayId, mealTypeId);
+  const colors = new Set();
+  (customMeals[key] || []).forEach(item => {
+    const ing = ingredients.find(ingredient => ingredient.id === item.ingId);
+    if (ing?.color && FOOD_COLORS[ing.color]) colors.add(ing.color);
+  });
+  return Array.from(colors);
+}
+
+function collectColorsForDay(dayId) {
+  const colors = new Set();
+  MEAL_TYPES.forEach(({ id }) => {
+    collectColorsForMeal(dayId, id).forEach(color => colors.add(color));
+  });
+  return Array.from(colors);
+}
+
+function collectColorsForWeek() {
+  const colors = new Set();
+  DAYS.forEach(day => {
+    collectColorsForDay(day.id).forEach(color => colors.add(color));
+  });
+  return Array.from(colors);
+}
+
+function colorVarietyCheck(colorCount, mode) {
+  if (mode === "day") {
+    if (colorCount >= 2 && colorCount <= 3) return { status: "within", text: "Suficiente", note: "Variedad diaria de colores bien cubierta." };
+    if (colorCount >= 4) return { status: "above", text: "Muy variado", note: "Excelente variedad de colores para el dia." };
+    return { status: "below", text: "Falta color", note: "Intentá sumar 2 o 3 colores en el dia." };
+  }
+  if (colorCount >= 4 && colorCount <= 5) return { status: "within", text: "Ideal", note: "La semana muestra muy buena variedad de vitaminas." };
+  if (colorCount >= 6) return { status: "above", text: "Super variada", note: "Semana excelente en variedad de colores." };
+  return { status: "below", text: "Corta", note: "Buscá llegar a 4 o 5 colores en la semana." };
+}
+
+function ingredientExistsByName(name) {
+  return ingredients.some(ing => ing.name.trim().toLowerCase() === name.trim().toLowerCase());
+}
+
+function ingredientByName(name) {
+  return ingredients.find(ing => ing.name.trim().toLowerCase() === name.trim().toLowerCase()) || null;
+}
+
+function createIngredient(data) {
+  return {
+    id: "ing-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
+    name: data.name,
+    qty: data.qty || "1 porción",
+    emoji: data.emoji || guessEmoji(data.name),
+    calories: data.calories || 0,
+    carbs: data.carbs || 0,
+    proteins: data.proteins || 0,
+    fats: data.fats || 0,
+    fiber: data.fiber || 0,
+    color: data.color || "",
+    category: data.category || ""
+  };
+}
+
+function ensurePresetIngredient(preset) {
+  const existing = ingredientByName(preset.name);
+  if (existing) return existing;
+  const created = createIngredient(preset);
+  ingredients.push(created);
+  saveIngredients(ingredients);
+  renderIngredients();
+  renderPresetIngredients();
+  return created;
+}
+
+const MEAL_TARGET_SPLITS = {
+  breakfast: { calories: 0.25, carbs: 0.28, proteins: 0.22, fats: 0.2, fiber: 0.25 },
+  lunch: { calories: 0.35, carbs: 0.36, proteins: 0.34, fats: 0.32, fiber: 0.3 },
+  snack: { calories: 0.15, carbs: 0.14, proteins: 0.12, fats: 0.12, fiber: 0.15 },
+  dinner: { calories: 0.25, carbs: 0.22, proteins: 0.32, fats: 0.36, fiber: 0.3 }
+};
+
+function categoryOfIngredient(ing) {
+  return presetCategory(ing);
+}
+
+function midpoint(range) {
+  return (range[0] + range[1]) / 2;
+}
+
+function targetForDay(dayId) {
+  if (state.activeDays?.[dayId]) {
+    const p = peopleMultiplier();
+    return {
+      calories: ACTIVE_DAY_TARGET.calories.map(v => Math.round(v * p)),
+      carbs: ACTIVE_DAY_TARGET.carbs.map(v => Math.round(v * p)),
+      proteins: ACTIVE_DAY_TARGET.proteins.map(v => Math.round(v * p)),
+      fats: ACTIVE_DAY_TARGET.fats.map(v => Math.round(v * p)),
+      fiber: ACTIVE_DAY_TARGET.fiber.map(v => Math.round(v * p))
+    };
+  }
+  return currentTarget();
+}
+
+function buildIngredientPools() {
+  const usable = ingredients.filter(ing => (ing.calories || 0) > 0);
+  const byCategory = category => usable.filter(ing => categoryOfIngredient(ing) === category);
+  return {
+    all: usable,
+    fruits: byCategory("Frutas"),
+    veggies: byCategory("Verduras"),
+    proteins: usable.filter(ing => (ing.proteins || 0) >= 8 || /huevo|atun|atún|pollo|carne|cerdo|hamburguesa|lentejas|leche|queso|yogur/.test(ing.name.toLowerCase())),
+    carbs: usable.filter(ing => (ing.carbs || 0) >= 12 || ["Cereales y harinas", "Frutas"].includes(categoryOfIngredient(ing))),
+    fats: usable.filter(ing => (ing.fats || 0) >= 8 || ["Grasas y semillas"].includes(categoryOfIngredient(ing))),
+    fiber: usable.filter(ing => (ing.fiber || 0) >= 3),
+    dairy: byCategory("Lácteos"),
+    grains: byCategory("Cereales y harinas"),
+    legumes: byCategory("Legumbres")
+  };
+}
+
+function rotatePool(pool, offset = 0) {
+  if (!pool.length) return [];
+  const index = ((offset % pool.length) + pool.length) % pool.length;
+  return pool.slice(index).concat(pool.slice(0, index));
+}
+
+function pickFirstAvailable(pool, selectedIds = new Set()) {
+  return pool.find(ing => !selectedIds.has(ing.id)) || pool[0] || null;
+}
+
+function addToMealItems(items, ing, qty = 1) {
+  if (!ing) return;
+  const existing = items.find(item => item.ingId === ing.id);
+  if (existing) existing.qty += qty;
+  else items.push({ ingId: ing.id, qty });
+}
+
+function totalsForItems(items) {
+  return items.reduce((acc, item) => {
+    const ing = ingredients.find(entry => entry.id === item.ingId);
+    if (!ing) return acc;
+    acc.calories += (ing.calories || 0) * item.qty;
+    acc.carbs += (ing.carbs || 0) * item.qty;
+    acc.proteins += (ing.proteins || 0) * item.qty;
+    acc.fats += (ing.fats || 0) * item.qty;
+    acc.fiber += (ing.fiber || 0) * item.qty;
+    return acc;
+  }, { calories: 0, carbs: 0, proteins: 0, fats: 0, fiber: 0 });
+}
+
+function breakfastProteinPool(pools) {
+  const preferred = pools.proteins.filter(ing => /huevo|leche|yogur|queso|mani|maní|nuez|lentejas/.test(ing.name.toLowerCase()) || (ing.proteins || 0) <= 12);
+  return preferred.length ? preferred : pools.proteins;
+}
+
+function mealBlueprint(mealType, pools, seed) {
+  const selected = new Set();
+  const mealItems = [];
+  const rotated = {
+    fruits: rotatePool(pools.fruits, seed),
+    veggies: rotatePool(pools.veggies, seed + 1),
+    proteins: rotatePool(pools.proteins, seed + 2),
+    carbs: rotatePool(pools.carbs, seed + 3),
+    fats: rotatePool(pools.fats, seed + 4),
+    fiber: rotatePool(pools.fiber, seed + 5),
+    dairy: rotatePool(pools.dairy, seed + 6),
+    grains: rotatePool(pools.grains, seed + 7),
+    legumes: rotatePool(pools.legumes, seed + 8)
+  };
+
+  const addPick = pool => {
+    const choice = pickFirstAvailable(pool, selected);
+    if (!choice) return;
+    selected.add(choice.id);
+    addToMealItems(mealItems, choice);
+  };
+
+  if (mealType === "breakfast") {
+    addPick(rotated.grains.length ? rotated.grains : rotated.carbs);
+    addPick(rotated.fruits.length ? rotated.fruits : rotated.carbs);
+    addPick(breakfastProteinPool(rotated));
+  } else if (mealType === "lunch") {
+    addPick(rotated.proteins);
+    addPick(rotated.carbs);
+    addPick(rotated.veggies.length ? rotated.veggies : rotated.fiber);
+    addPick(rotated.fats);
+  } else if (mealType === "snack") {
+    addPick(rotated.fruits.length ? rotated.fruits : rotated.carbs);
+    addPick(breakfastProteinPool(rotated));
+    addPick(rotated.fats);
+  } else {
+    addPick(rotated.proteins);
+    addPick(rotated.veggies.length ? rotated.veggies : rotated.fiber);
+    addPick(rotated.carbs);
+    addPick(rotated.fats);
+  }
+
+  return mealItems.filter(item => item);
+}
+
+function bestPoolForDeficit(deficits, pools, mealType, seed) {
+  const order = [
+    ["proteins", pools.proteins],
+    ["carbs", mealType === "breakfast" || mealType === "snack" ? [...rotatePool(pools.fruits, seed), ...rotatePool(pools.carbs, seed)] : pools.carbs],
+    ["fiber", [...rotatePool(pools.veggies, seed), ...rotatePool(pools.fiber, seed), ...rotatePool(pools.fruits, seed)]],
+    ["fats", pools.fats],
+    ["calories", [...rotatePool(pools.proteins, seed), ...rotatePool(pools.carbs, seed), ...rotatePool(pools.fats, seed)]]
+  ];
+  const top = order
+    .map(([key, pool]) => ({ key, value: deficits[key], pool }))
+    .sort((a, b) => b.value - a.value)[0];
+  return top?.value > 0 ? top.pool : order[4].pool;
+}
+
+function autoFillWeekFromPantry() {
+  const pools = buildIngredientPools();
+  if (pools.all.length < 4) {
+    showToast("Agregá más ingredientes a despensa antes de completar la semana");
+    return;
+  }
+
+  const nextMeals = {};
+  DAYS.forEach((day, dayIndex) => {
+    const dayTarget = targetForDay(day.id);
+    MEAL_TYPES.forEach((mealType, mealIndex) => {
+      const split = MEAL_TARGET_SPLITS[mealType.id];
+      const mealTarget = {
+        calories: midpoint(dayTarget.calories) * split.calories,
+        carbs: midpoint(dayTarget.carbs) * split.carbs,
+        proteins: midpoint(dayTarget.proteins) * split.proteins,
+        fats: midpoint(dayTarget.fats) * split.fats,
+        fiber: midpoint(dayTarget.fiber) * split.fiber
+      };
+      const key = customMealKey(day.id, mealType.id);
+      const seed = dayIndex * 3 + mealIndex;
+      const items = mealBlueprint(mealType.id, pools, seed);
+
+      let totals = totalsForItems(items);
+      let loops = 0;
+      while (totals.calories < mealTarget.calories * 0.85 && loops < 8) {
+        const deficits = {
+          calories: mealTarget.calories - totals.calories,
+          carbs: mealTarget.carbs - totals.carbs,
+          proteins: mealTarget.proteins - totals.proteins,
+          fats: mealTarget.fats - totals.fats,
+          fiber: mealTarget.fiber - totals.fiber
+        };
+        const pool = bestPoolForDeficit(deficits, pools, mealType.id, seed + loops);
+        const pick = pool.find(ing => (items.find(item => item.ingId === ing.id)?.qty || 0) < 2) || pool[0];
+        if (!pick) break;
+        addToMealItems(items, pick);
+        totals = totalsForItems(items);
+        loops += 1;
+      }
+
+      nextMeals[key] = items.filter(item => item.qty > 0);
+    });
+  });
+
+  customMeals = nextMeals;
+  saveCustomMeals(customMeals);
+  render();
+  showToast("✓ Semana completada con ingredientes de despensa");
+}
+
+function presetCategory(item) {
+  if (item.category && FOOD_CATEGORY_OPTIONS.includes(item.category)) return item.category;
+  const n = item.name.toLowerCase();
+  if (/manzana|naranja|banana|ciruela/.test(n)) return "Frutas";
+  if (/lechuga|tomate|zanahoria|pepino|acelga|espinaca|diente de león|ajo|zapallo/.test(n)) return "Verduras";
+  if (/mate|te|cafe/.test(n)) return "Infusiones";
+  if (/pollo|carne|atun|atún|cerdo|bife|huevo|hamburguesa de carne|milanesas/.test(n)) return "Carnes y proteínas";
+  if (/pan|arroz|fideos|ñoquis|polenta|pizza|choclo|batata|papa/.test(n)) return "Cereales y harinas";
+  if (/lentejas|hamburguesa de lentejas/.test(n)) return "Legumbres";
+  if (/leche|queso|yogur/.test(n)) return "Lácteos";
+  if (/aceite|aceitunas|maní|mani|nuez/.test(n)) return "Grasas y semillas";
+  return "Procesados y varios";
+}
+
+function combinedMealStats(dayId, mealTypeId) {
+  const preset = mealStats(dayId, mealTypeId);
+  const custom = customMealStats(dayId, mealTypeId);
+  return {
+    meal: preset.meal,
+    calories: preset.calories + custom.calories,
+    carbs: preset.carbs + custom.carbs,
+    proteins: preset.proteins + custom.proteins,
+    fats: preset.fats + custom.fats,
+    fiber: preset.fiber + custom.fiber
+  };
+}
+
+function targetRange(range) {
+  const multiplier = globalMultiplier() * peopleMultiplier();
+  return range.map(value => Math.round(value * multiplier));
+}
+
+function profilePlan() {
+  const age    = Number(state.profile?.age);
+  const weight = Number(state.profile?.weight);
+  const height = Number(state.profile?.height);
+  const sex    = state.profile?.sex === "male" ? "male" : "female";
+
+  if (!age || !weight || !height) return null;
+
+  const unsafe = age < 14 || age > 90 || weight < 35 || weight > 250 || height < 130 || height > 230;
+  const activityFactor = state.activity === "alto" ? 1.55 : state.activity === "medio" ? 1.375 : 1.2;
+
+  function bmrFor(s, a, w, h) {
+    return s === "male"
+      ? 88.36 + (13.4 * w) + (4.8 * h) - (5.7 * a)
+      : 447.6  + (9.2  * w) + (3.1 * h) - (4.3 * a);
+  }
+
+  const bmr1  = bmrFor(sex, age, weight, height);
+  const bmi1  = weight / ((height / 100) ** 2);
+  const maint1 = bmr1 * activityFactor;
+
+  // Si hay perfil de segunda persona, promedia los dos
+  const p2 = state.profile2;
+  const hasPair = p2 && Number(p2.age) && Number(p2.weight) && Number(p2.height);
+
+  let totalMaintenance, bmi, mode, calories, macroShare;
+
+  if (hasPair) {
+    const sex2    = p2.sex === "male" ? "male" : "female";
+    const age2    = Number(p2.age);
+    const weight2 = Number(p2.weight);
+    const height2 = Number(p2.height);
+    const bmr2    = bmrFor(sex2, age2, weight2, height2);
+    const bmi2    = weight2 / ((height2 / 100) ** 2);
+    const maint2  = bmr2 * activityFactor;
+
+    totalMaintenance = maint1 + maint2;
+    bmi = (bmi1 + bmi2) / 2; // promedio IMC para determinar modo
+
+    const unsafe2 = age2 < 14 || age2 > 90 || weight2 < 35 || weight2 > 250 || height2 < 130 || height2 > 230;
+    if (unsafe || unsafe2) return { unsafe: true };
+  } else {
+    if (unsafe) return { unsafe: true, bmi: bmi1, bmr: Math.round(bmr1), maintenance: Math.round(maint1), mode: "maintenance", target: null };
+    totalMaintenance = maint1;
+    bmi = bmi1;
+  }
+
+  mode = "maintenance";
+  calories = totalMaintenance;
+  macroShare = { carbs: 0.45, proteins: 0.25, fats: 0.3 };
+  const fiber = [25, 30];
+
+  if (bmi < 18.5) {
+    mode = "surplus";
+    calories = totalMaintenance + (hasPair ? 500 : 250);
+    macroShare = { carbs: 0.5, proteins: 0.2, fats: 0.3 };
+  } else if (bmi >= 25) {
+    mode = "deficit";
+    calories = totalMaintenance - (hasPair ? 600 : 300);
+    macroShare = { carbs: 0.35, proteins: 0.3, fats: 0.35 };
+  }
+
+  const baseMultiplier = BASE_PORTIONS[state.basePortion].multiplier;
+  const caloriesRange  = [Math.round((calories - 150) * baseMultiplier), Math.round((calories + 150) * baseMultiplier)];
+  const carbsBase      = (calories * macroShare.carbs / 4) * baseMultiplier;
+  const proteinsBase   = (calories * macroShare.proteins / 4) * baseMultiplier;
+  const fatsBase       = (calories * macroShare.fats / 9) * baseMultiplier;
+  const fiberMult      = hasPair ? 2 : 1;
+  const fiberRange     = fiber.map(v => Math.round(v * fiberMult * baseMultiplier));
+
+  return {
+    unsafe: false,
+    bmi,
+    bmr:  Math.round(hasPair ? (bmr1 + bmrFor(p2?.sex === "male" ? "male" : "female", Number(p2?.age), Number(p2?.weight), Number(p2?.height))) : bmr1),
+    maintenance: Math.round(totalMaintenance),
+    mode,
+    hasPair,
+    target: {
+      calories: caloriesRange,
+      carbs:    [Math.round(carbsBase - 15), Math.round(carbsBase + 15)],
+      proteins: [Math.round(proteinsBase - 12), Math.round(proteinsBase + 12)],
+      fats:     [Math.round(fatsBase - 8),  Math.round(fatsBase + 8)],
+      fiber:    fiberRange
+    }
+  };
+}
+
+function currentTarget() {
+  const plan = profilePlan();
+  if (plan && !plan.unsafe) {
+    return plan.target;
+  }
+  const goal = GOALS[state.goal];
+  return {
+    calories: targetRange(goal.target.calories),
+    carbs: targetRange(goal.target.carbs),
+    proteins: targetRange(goal.target.proteins),
+    fats: targetRange(goal.target.fats),
+    fiber: targetRange(goal.target.fiber)
+  };
+}
+
+function chooseMeal(type, goal, excludeId = null) {
+  const goalData = GOALS[goal];
+  const priorities = goalData.mealBias[type] || ["balanced"];
+  let candidates = [];
+
+  for (const tag of priorities) {
+    const match = MEALS[type].filter(meal => meal.tags.includes(tag) && meal.id !== excludeId);
+    if (match.length) {
+      candidates = match;
+      break;
+    }
+  }
+
+  if (!candidates.length) {
+    candidates = MEALS[type].filter(meal => meal.id !== excludeId);
+  }
+
+  return candidates[Math.floor(Math.random() * candidates.length)];
+}
+
+function buildAutomaticWeek(goal) {
+  const nextPlan = {};
+  DAYS.forEach(day => {
+    nextPlan[day.id] = {};
+    MEAL_TYPES.forEach(({ id }) => {
+      const selected = chooseMeal(id, goal, null);
+      nextPlan[day.id][id] = {
+        mealId: selected ? selected.id : null,
+        portion: goal === "energia" && id !== "dinner" ? "l" : goal === "control" && id === "dinner" ? "s" : "m"
+      };
+    });
+  });
+  state.plan = nextPlan;
+  saveState();
+  render();
+}
+
+function setBalancedWeek() {
+  if (MEALS.breakfast.length === 0) return;
+  const nextPlan = {};
+  DAYS.forEach((day, dayIndex) => {
+    nextPlan[day.id] = {};
+    MEAL_TYPES.forEach(({ id }) => {
+      const balancedMeals = MEALS[id].filter(meal => meal.tags.includes("balanced"));
+      if (!balancedMeals.length) {
+        nextPlan[day.id][id] = { mealId: null, portion: "m" };
+        return;
+      }
+      nextPlan[day.id][id] = {
+        mealId: balancedMeals[dayIndex % balancedMeals.length].id,
+        portion: "m"
+      };
+    });
+  });
+  state.plan = nextPlan;
+  saveState();
+  render();
+}
+
+function randomizeMeal(dayId, mealType) {
+  const currentId = entryFor(dayId, mealType).mealId;
+  const selected = chooseMeal(mealType, state.goal, currentId);
+  state.plan[dayId][mealType].mealId = selected.id;
+  saveState();
+  render();
+}
+
+function dayTotals(dayId) {
+  return MEAL_TYPES.reduce((acc, mealType) => {
+    const meal = combinedMealStats(dayId, mealType.id);
+    acc.calories += meal.calories;
+    acc.carbs += meal.carbs;
+    acc.proteins += meal.proteins;
+    acc.fats += meal.fats;
+    acc.fiber += meal.fiber;
+    return acc;
+  }, { calories: 0, carbs: 0, proteins: 0, fats: 0, fiber: 0 });
+}
+
+function calStatus(calories, dayId) {
+  if (calories === 0) return "";
+  const target = targetForDay(dayId);
+  const [lo, hi] = target.calories;
+  if (calories < lo * 0.85) return "";          // muy poco — sin color aún
+  if (calories <= hi * 1.05) return "cal-ok";   // dentro del rango
+  if (calories <= hi * 1.2)  return "cal-warn"; // levemente por encima
+  return "cal-over";                             // bastante por encima
+}
+
+function calBadge(calories, dayId) {
+  if (calories === 0) return "";
+  const target = targetForDay(dayId);
+  const [lo, hi] = target.calories;
+  if (calories < lo * 0.85) return "";
+  if (calories <= hi * 1.05) return `<span class="cal-badge ok">✓ En rango</span>`;
+  if (calories <= hi * 1.2)  return `<span class="cal-badge warn">↑ Un poco alto</span>`;
+  return `<span class="cal-badge over">↑↑ Por encima</span>`;
+}
+
+function weeklyTotals() {
+  return DAYS.reduce((acc, day) => {
+    const totals = dayTotals(day.id);
+    acc.calories += totals.calories;
+    acc.carbs += totals.carbs;
+    acc.proteins += totals.proteins;
+    acc.fats += totals.fats;
+    acc.fiber += totals.fiber;
+    return acc;
+  }, { calories: 0, carbs: 0, proteins: 0, fats: 0, fiber: 0 });
+}
+
+function averageDay() {
+  const totals = weeklyTotals();
+  return {
+    calories: Math.round(totals.calories / DAYS.length),
+    carbs: Math.round(totals.carbs / DAYS.length),
+    proteins: Math.round(totals.proteins / DAYS.length),
+    fats: Math.round(totals.fats / DAYS.length),
+    fiber: Math.round(totals.fiber / DAYS.length)
+  };
+}
+
+function buildShoppingList() {
+  const counts = new Map();
+  DAYS.forEach(day => {
+    MEAL_TYPES.forEach(({ id }) => {
+      const meal = mealStats(day.id, id);
+      if (meal.meal) {
+        meal.meal.ingredients.forEach(item => {
+          counts.set(item, (counts.get(item) || 0) + portionMultiplier(entryFor(day.id, id).portion));
+        });
+      }
+      const key = customMealKey(day.id, id);
+      (customMeals[key] || []).forEach(item => {
+        const ing = ingredients.find(ingredient => ingredient.id === item.ingId);
+        if (!ing) return;
+        counts.set(ing.name, (counts.get(ing.name) || 0) + item.qty);
+      });
+    });
+  });
+
+  return Array.from(counts.entries())
+    .sort((a, b) => b[1] - a[1])
+    .slice(0, 14)
+    .map(([item, count]) => [item, Math.round(count * 10) / 10]);
+}
+
+function targetCheck(value, range) {
+  if (value < range[0]) return "below";
+  if (value > range[1]) return "above";
+  return "within";
+}
+
+function checkLabel(status) {
+  if (status === "below") return "Por debajo";
+  if (status === "above") return "Por encima";
+  return "En rango";
+}
+
+function statusMessage(key, status) {
+  const messages = {
+    calories: {
+      below: "Puede faltarte energia algunos dias.",
+      above: "Podria ser mas de lo necesario para tu meta.",
+      within: "Queda bien alineado con tu objetivo."
+    },
+    carbs: {
+      below: "Si te notas sin fuerza, aqui puede estar la causa.",
+      above: "Revisa si se juntaron demasiadas harinas en el dia.",
+      within: "Buen soporte de energia para la semana."
+    },
+    proteins: {
+      below: "Conviene sumar una fuente proteica mas firme.",
+      above: "No es grave, pero revisa si hace falta tanta cantidad.",
+      within: "Buen nivel para estructura y saciedad."
+    },
+    fats: {
+      below: "Tal vez faltan grasas buenas como oliva o frutos secos.",
+      above: "Vale revisar quesos, mayonesa o fritos.",
+      within: "Nivel razonable de grasas saludables."
+    },
+    fiber: {
+      below: "Falta fibra: suma verduras, fruta, avena o legumbres.",
+      above: "Fibra alta, perfecto si te cae bien y la repartis en el dia.",
+      within: "Buen nivel de fibra para digestion y saciedad."
+    }
+  };
+
+  return messages[key][status];
+}
+
+function buildTips() {
+  const avg = averageDay();
+  const target = currentTarget();
+  const tips = [];
+
+  if (avg.carbs < target.carbs[0]) {
+    tips.push(["Faltan carbohidratos utiles", "Sube avena, fruta, arroz o papa sobre todo temprano."]);
+  }
+  if (avg.proteins < target.proteins[0]) {
+    tips.push(["Proteina algo corta", "Agrega huevo, pollo, atun, yogur o legumbres en mas comidas."]);
+  }
+  if (avg.fats > target.fats[1]) {
+    tips.push(["Grasa algo alta", "Revisa quesos, mayonesa, fritos o porciones de frutos secos."]);
+  }
+  if (avg.fiber < target.fiber[0]) {
+    tips.push(["Fibra baja", "Suma al menos 2 de estos 3 en el plato: verduras, fruta, integral o legumbre."]);
+  }
+  const weekColors = collectColorsForWeek();
+  const weekColorCheck = colorVarietyCheck(weekColors.length, "week");
+  if (weekColorCheck.status === "below") {
+    tips.push(["Pocos colores en la semana", "Buscá llegar a 4 o 5 colores distintos entre frutas, verduras y legumbres."]);
+  }
+  if (!tips.length) {
+    tips.push(["Semana equilibrada", "Tu promedio diario esta bastante bien para el objetivo actual."]);
+    tips.push(["Mantener variedad", "Alterna pollo, huevo, legumbres y pescado para sostener calidad."]);
+  }
+
+  return tips.slice(0, 3);
+}
+
+function balanceTag(meal) {
+  if (meal.tags.includes("balanced")) {
+    return { text: "Plato completo", className: "ok" };
+  }
+  if (meal.tags.includes("lightCarb")) {
+    return { text: "Mas liviano", className: "warn" };
+  }
+  return { text: "En foco", className: "ok" };
+}
+
+function renderGoals() {
+  const container = document.getElementById("goals");
+  container.innerHTML = Object.entries(GOALS).map(([id, goal]) => `
+    <button class="goal-btn ${state.goal === id ? "active" : ""}" data-goal="${id}">
+      <span class="goal-title">${goal.label}</span>
+      <span class="goal-desc">${goal.description}</span>
+    </button>
+  `).join("");
+
+  container.querySelectorAll("[data-goal]").forEach(button => {
+    button.addEventListener("click", () => {
+      state.goal = button.dataset.goal;
+      saveState();
+      render();
+    });
+  });
+}
+
+function renderProfileOptions() {
+  const activityContainer = document.getElementById("activityOptions");
+  activityContainer.innerHTML = Object.entries(ACTIVITY_LEVELS).map(([id, item]) => `
+    <button class="option-btn ${state.activity === id ? "active" : ""}" data-activity="${id}">
+      ${item.label}
+      <small>${item.description}</small>
+    </button>
+  `).join("");
+
+  activityContainer.querySelectorAll("[data-activity]").forEach(button => {
+    button.addEventListener("click", () => {
+      state.activity = button.dataset.activity;
+      saveState();
+      render();
+    });
+  });
+
+  const portionContainer = document.getElementById("basePortionOptions");
+  portionContainer.innerHTML = Object.entries(BASE_PORTIONS).map(([id, item]) => `
+    <button class="option-btn ${state.basePortion === id ? "active" : ""}" data-base-portion="${id}">
+      ${item.label}
+      <small>${item.description}</small>
+    </button>
+  `).join("");
+
+  portionContainer.querySelectorAll("[data-base-portion]").forEach(button => {
+    button.addEventListener("click", () => {
+      state.basePortion = button.dataset.basePortion;
+      saveState();
+      render();
+    });
+  });
+
+  const peopleContainer = document.getElementById("peopleOptions");
+  const peopleOpts = [
+    { value: 1, label: "👤 1 persona", description: "Solo para vos" },
+    { value: 2, label: "👥 2 personas", description: "Para los dos" }
+  ];
+  peopleContainer.innerHTML = peopleOpts.map(opt => `
+    <button class="option-btn ${(state.people || 1) === opt.value ? "active" : ""}" data-people="${opt.value}">
+      ${opt.label}
+      <small>${opt.description}</small>
+    </button>
+  `).join("");
+
+  peopleContainer.querySelectorAll("[data-people]").forEach(button => {
+    button.addEventListener("click", () => {
+      state.people = parseInt(button.dataset.people);
+      saveState();
+      render();
+    });
+  });
+
+  const peopleLabel = (state.people || 1) === 2 ? "Para dos personas." : "Para una persona.";
+  const plan = profilePlan();
+  const planLabel = plan && !plan.unsafe
+    ? plan.mode === "surplus" ? "Perfil IMC: superávit calórico."
+    : plan.mode === "deficit" ? "Perfil IMC: déficit calórico."
+    : "Perfil IMC: mantenimiento."
+    : GOALS[state.goal].label;
+  document.getElementById("profileSummaryText").textContent = `${planLabel} ${ACTIVITY_LEVELS[state.activity].summary}`;
+  document.getElementById("portionSummaryText").textContent = `${BASE_PORTIONS[state.basePortion].summary} ${peopleLabel}`;
+}
+
+function renderProfileCalculator() {
+  renderProfileCalcBox();
+}
+
+function renderPlanner() {
+  const container = document.getElementById("plannerGrid");
+  const profileMode = profilePlan() && !profilePlan().unsafe
+    ? profilePlan().mode === "surplus" ? "Superávit"
+    : profilePlan().mode === "deficit" ? "Déficit"
+    : "Mantenimiento"
+    : GOALS[state.goal].label;
+  container.innerHTML = DAYS.map(day => {
+    const totals = dayTotals(day.id);
+    const isActiveDay = !!state.activeDays[day.id];
+    return `
+      <article class="day-card ${isActiveDay ? "is-active-day" : ""} ${day.id === "sunday" ? "day-card-wide" : ""}">
+        <h3>${day.label}</h3>
+        <div class="day-meta">Objetivo activo: ${profileMode}</div>
+        <label class="active-day-toggle" title="Marcar como día activo (más movimiento)">
+          <div class="toggle-track ${isActiveDay ? "on" : ""}" data-toggle-day="${day.id}">
+            <div class="toggle-thumb"></div>
+          </div>
+          <span class="toggle-label">${isActiveDay ? "⚡ Día activo" : "Día normal"}</span>
+        </label>
+        <div class="active-day-banner ${isActiveDay ? "show" : ""}">
+          <strong>🔥 Objetivo día activo${(state.people || 1) === 2 ? " (para los dos)" : ""}</strong>
+          Calorías: ${ACTIVE_DAY_TARGET.calories[0]}–${ACTIVE_DAY_TARGET.calories[1]} kcal &nbsp;·&nbsp;
+          Carbos: ${ACTIVE_DAY_TARGET.carbs[0]}–${ACTIVE_DAY_TARGET.carbs[1]} g &nbsp;·&nbsp;
+          Proteína: ${ACTIVE_DAY_TARGET.proteins[0]}–${ACTIVE_DAY_TARGET.proteins[1]} g &nbsp;·&nbsp;
+          Grasas: ${ACTIVE_DAY_TARGET.fats[0]}–${ACTIVE_DAY_TARGET.fats[1]} g &nbsp;·&nbsp;
+          Fibra: ${ACTIVE_DAY_TARGET.fiber[0]}–${ACTIVE_DAY_TARGET.fiber[1]} g
+          <div style="margin-top:6px;opacity:0.85;">💡 ${ACTIVE_DAY_TIPS[Math.floor(Math.random() * ACTIVE_DAY_TIPS.length)]}</div>
+        </div>
+        ${MEAL_TYPES.map(mealType => {
+          const preset      = mealStats(day.id, mealType.id);
+          const custom      = customMealStats(day.id, mealType.id);
+          const combined    = combinedMealStats(day.id, mealType.id);
+          const hasPreset   = !!preset.meal;
+          const hasCustom   = custom.calories > 0 || custom.proteins > 0 || custom.carbs > 0 || custom.fats > 0;
+          const hasAny      = hasPreset || hasCustom;
+          const currentId   = entryFor(day.id, mealType.id).mealId || "";
+          const currentPortion = entryFor(day.id, mealType.id).portion || "m";
+
+          // Platos disponibles para este tipo de comida
+          const availableMeals = MEALS[mealType.id] || [];
+
+          return `
+            <section class="meal-card">
+              <div class="meal-top">
+                <strong>${mealType.label}</strong>
+                <span class="tag ${hasAny ? "ok" : "warn"}">${hasAny ? "Armada" : "Vacía"}</span>
+              </div>
+
+              ${availableMeals.length > 0 ? `
+              <div class="meal-picker-row">
+                <select class="meal-select meal-dropdown"
+                  data-day="${day.id}" data-meal="${mealType.id}">
+                  <option value="">— Sin plato sugerido —</option>
+                  ${availableMeals.map(m => `
+                    <option value="${m.id}" ${m.id === currentId ? "selected" : ""}>${m.name}</option>
+                  `).join("")}
+                </select>
+                <button class="shuffle-btn" data-shuffle-day="${day.id}" data-shuffle-meal="${mealType.id}" title="Sugerir otro plato">🔀</button>
+              </div>
+              ` : ""}
+
+              ${hasPreset ? `
+              <div class="meal-detail">${preset.meal.detail}</div>
+              <div class="meal-ingredients-hint">
+                🛒 ${preset.meal.ingredients.join(" · ")}
+              </div>
+              ` : `
+              <div class="meal-detail" style="color:var(--muted);font-style:italic;font-size:0.83rem;">
+                Elegí un plato arriba o arrastrá ingredientes desde la despensa.
+              </div>
+              `}
+
+              ${hasAny ? `
+              <div class="macro-row">
+                <div class="macro-pill"><span>Kcal</span><strong>${combined.calories}</strong></div>
+                <div class="macro-pill"><span>Carb</span><strong>${combined.carbs}g</strong></div>
+                <div class="macro-pill"><span>Prot</span><strong>${combined.proteins}g</strong></div>
+                <div class="macro-pill"><span>Grasa</span><strong>${combined.fats}g</strong></div>
+                <div class="macro-pill"><span>Fibra</span><strong>${combined.fiber}g</strong></div>
+              </div>
+              ${hasPreset ? `
+              <div class="portion-row">
+                <span class="portion-label">Porción:</span>
+                ${Object.entries(PORTION_OPTIONS).map(([code, opt]) => `
+                  <button class="portion-chip ${currentPortion === code ? "active" : ""}"
+                    data-portion-day="${day.id}" data-portion-meal="${mealType.id}" data-portion-code="${code}">
+                    ${opt.label}
+                  </button>
+                `).join("")}
+              </div>
+              ` : ""}
+              ` : ""}
+
+              ${renderCustomZone(day.id, mealType.id)}
+            </section>
+          `;
+        }).join("")}
+        <div class="day-total ${calStatus(totals.calories, day.id)}">
+          <div class="total-kcal">${totals.calories} kcal ${calBadge(totals.calories, day.id)}</div>
+          <div class="total-macros">Carbohidratos: ${totals.carbs} g | Proteinas: ${totals.proteins} g | Grasas: ${totals.fats} g | Fibra: ${totals.fiber} g</div>
+          ${isActiveDay ? `<div style="margin-top:6px;font-size:0.8rem;color:#b85c1c;font-weight:700;">⚡ Objetivo día activo: ${ACTIVE_DAY_TARGET.calories[0]}–${ACTIVE_DAY_TARGET.calories[1]} kcal · Carbos: ${ACTIVE_DAY_TARGET.carbs[0]}–${ACTIVE_DAY_TARGET.carbs[1]} g · Fibra: ${ACTIVE_DAY_TARGET.fiber[0]}–${ACTIVE_DAY_TARGET.fiber[1]} g</div>` : ""}
+        </div>
+      </article>
+    `;
+  }).join("");
+
+  container.querySelectorAll("[data-toggle-day]").forEach(track => {
+    track.addEventListener("click", (e) => {
+      e.preventDefault();
+      const dayId = track.dataset.toggleDay;
+      state.activeDays[dayId] = !state.activeDays[dayId];
+      saveState();
+      renderPlanner();
+      renderSummary();
+    });
+  });
+
+  // ── Dropdown de platos ──
+  container.querySelectorAll(".meal-dropdown").forEach(sel => {
+    sel.addEventListener("change", () => {
+      const dayId   = sel.dataset.day;
+      const mealId  = sel.dataset.meal;
+      state.plan[dayId][mealId].mealId  = sel.value || null;
+      state.plan[dayId][mealId].portion = "m";
+      saveState();
+      renderPlanner();
+      renderSummary();
+      renderShopping();
+    });
+  });
+
+  // ── Botón shuffle por comida ──
+  container.querySelectorAll(".shuffle-btn").forEach(btn => {
+    btn.addEventListener("click", () => {
+      const dayId  = btn.dataset.shuffleDay;
+      const mealId = btn.dataset.shuffleMeal;
+      const currentId = state.plan[dayId][mealId].mealId;
+      const pool = (MEALS[mealId] || []).filter(m => m.id !== currentId);
+      if (!pool.length) return;
+      const picked = pool[Math.floor(Math.random() * pool.length)];
+      state.plan[dayId][mealId].mealId  = picked.id;
+      state.plan[dayId][mealId].portion = "m";
+      saveState();
+      renderPlanner();
+      renderSummary();
+      renderShopping();
+    });
+  });
+
+  // ── Chips de porción ──
+  container.querySelectorAll("[data-portion-day]").forEach(btn => {
+    btn.addEventListener("click", () => {
+      const dayId  = btn.dataset.portionDay;
+      const mealId = btn.dataset.portionMeal;
+      const code   = btn.dataset.portionCode;
+      state.plan[dayId][mealId].portion = code;
+      saveState();
+      renderPlanner();
+      renderSummary();
+    });
+  });
+
+  if (typeof attachDropZones === "function") attachDropZones();
+}
+
+function renderSummary() {
+  const goal = GOALS[state.goal];
+  const target = currentTarget();
+  const isWeekMode = state.summaryMode === "week";
+
+  // ── Mode toggle buttons ──
+  document.getElementById("modeDayBtn").classList.toggle("active", !isWeekMode);
+  document.getElementById("modeWeekBtn").classList.toggle("active", isWeekMode);
+
+  // ── Day tabs ──
+  const daySelectorWrap = document.getElementById("daySelectorWrap");
+  daySelectorWrap.style.display = isWeekMode ? "none" : "";
+  const tabsContainer = document.getElementById("dayTabs");
+  tabsContainer.innerHTML = DAYS.map(d => {
+    const dt = dayTotals(d.id);
+    const over = dt.calories > target.calories[1] * 1.05;
+    return `<button class="day-tab ${d.id === state.selectedDay ? "active" : ""} ${over ? "over" : ""}" data-day-tab="${d.id}">${d.label}</button>`;
+  }).join("");
+  tabsContainer.querySelectorAll("[data-day-tab]").forEach(btn => {
+    btn.addEventListener("click", () => {
+      state.selectedDay = btn.dataset.dayTab;
+      saveState();
+      renderSummary();
+    });
+  });
+
+  // ── Compute values based on mode ──
+  let display, labelText;
+  if (isWeekMode) {
+    const totals = weeklyTotals();
+    display = averageDay();
+    display.totalCalories = totals.calories;
+    labelText = "Promedio diario (7 días)";
+  } else {
+    const dt = dayTotals(state.selectedDay);
+    display = { ...dt };
+    display.totalCalories = dt.calories;
+    labelText = DAYS.find(d => d.id === state.selectedDay).label;
+  }
+
+  const totalMacroGrams = display.carbs + display.proteins + display.fats;
+  const carbPercent = totalMacroGrams ? Math.round((display.carbs / totalMacroGrams) * 100) : 0;
+  const proteinPercent = totalMacroGrams ? Math.round((display.proteins / totalMacroGrams) * 100) : 0;
+  const fatPercent = totalMacroGrams ? Math.round((display.fats / totalMacroGrams) * 100) : 0;
+  const dailyColors = collectColorsForDay(state.selectedDay);
+  const weeklyColors = collectColorsForWeek();
+  const colorSet = isWeekMode ? weeklyColors : dailyColors;
+  const colorCheck = colorVarietyCheck(colorSet.length, isWeekMode ? "week" : "day");
+  const profile = profilePlan();
+
+  document.getElementById("summaryGoalText").textContent = profile && !profile.unsafe
+    ? `Meta automática por perfil corporal. Ritmo: ${ACTIVITY_LEVELS[state.activity].label}. Porción: ${BASE_PORTIONS[state.basePortion].label}. Personas: ${state.people || 1}.`
+    : `Meta: ${goal.label}. Ritmo: ${ACTIVITY_LEVELS[state.activity].label}. Porcion: ${BASE_PORTIONS[state.basePortion].label}. Personas: ${state.people || 1}.`;
+
+  const isActiveDaySelected = !isWeekMode && !!state.activeDays[state.selectedDay];
+  const p = peopleMultiplier();
+  const scaledActiveTarget = {
+    calories: ACTIVE_DAY_TARGET.calories.map(v => Math.round(v * p)),
+    carbs:    ACTIVE_DAY_TARGET.carbs.map(v    => Math.round(v * p)),
+    proteins: ACTIVE_DAY_TARGET.proteins.map(v => Math.round(v * p)),
+    fats:     ACTIVE_DAY_TARGET.fats.map(v     => Math.round(v * p)),
+    fiber:    ACTIVE_DAY_TARGET.fiber.map(v    => Math.round(v * p))
+  };
+  const effectiveTarget = isActiveDaySelected ? scaledActiveTarget : target;
+
+  document.getElementById("targetBox").innerHTML = `
+    <strong>Rango diario orientativo${isActiveDaySelected ? " ⚡ Día activo" : ""}</strong>
+    <div>Calorias: ${effectiveTarget.calories[0]}-${effectiveTarget.calories[1]} kcal</div>
+    <div>Carbohidratos: ${effectiveTarget.carbs[0]}-${effectiveTarget.carbs[1]} g</div>
+    <div>Proteinas: ${effectiveTarget.proteins[0]}-${effectiveTarget.proteins[1]} g</div>
+    <div>Grasas: ${effectiveTarget.fats[0]}-${effectiveTarget.fats[1]} g</div>
+    <div>Fibra: ${effectiveTarget.fiber[0]}-${effectiveTarget.fiber[1]} g por dia</div>
+    <div>Fibra semanal: ${effectiveTarget.fiber[0] * DAYS.length}-${effectiveTarget.fiber[1] * DAYS.length} g</div>
+    ${isActiveDaySelected ? `<div style="margin-top:8px;font-size:0.8rem;color:#b85c1c;">No cambian las comidas, cambian las cantidades. Sumá ½ taza más de arroz o una fruta extra.</div>` : ""}
+  `;
+
+  // ── Stats block ──
+  const calStatus = targetCheck(display.calories, target.calories);
+  const calColor = calStatus === "within" ? "var(--leaf)" : calStatus === "above" ? "#c0392b" : "var(--sun)";
+  document.getElementById("summaryStats").innerHTML = `
+    <div class="stat">
+      <span>${isWeekMode ? "Promedio diario" : "Total del día"}</span>
+      <strong style="color:${calColor}">${display.calories}</strong>
+      <div>kcal</div>
+    </div>
+    <div class="stat">
+      <span>${isWeekMode ? "Total semanal" : "Rango objetivo"}</span>
+      <strong>${isWeekMode ? display.totalCalories : target.calories[0] + "–" + target.calories[1]}</strong>
+      <div>${isWeekMode ? "kcal sem." : "kcal"}</div>
+    </div>
+    <div class="stat"><span>Proteinas</span><strong>${display.proteins} g</strong></div>
+    <div class="stat"><span>Carbohidratos</span><strong>${display.carbs} g</strong></div>
+    <div class="stat"><span>${isWeekMode ? "Fibra promedio" : "Fibra"}</span><strong>${display.fiber} g</strong></div>
+  `;
+
+  document.getElementById("macroBars").innerHTML = `
+    <div style="margin-bottom:4px"><span class="summary-label">${labelText}</span></div>
+    <div class="bar-block">
+      <div class="bar-label"><span>Carbohidratos</span><strong>${display.carbs} g | ${carbPercent}%</strong></div>
+      <div class="bar-track"><div class="bar-fill" style="width:${carbPercent}%; background:var(--sun)"></div></div>
+    </div>
+    <div class="bar-block">
+      <div class="bar-label"><span>Proteinas</span><strong>${display.proteins} g | ${proteinPercent}%</strong></div>
+      <div class="bar-track"><div class="bar-fill" style="width:${proteinPercent}%; background:var(--leaf)"></div></div>
+    </div>
+    <div class="bar-block">
+      <div class="bar-label"><span>Grasas</span><strong>${display.fats} g | ${fatPercent}%</strong></div>
+      <div class="bar-track"><div class="bar-fill" style="width:${fatPercent}%; background:var(--berry)"></div></div>
+    </div>
+  `;
+
+  // ── Meal breakdown (only in day mode) ──
+  const compareEl = document.getElementById("compareGrid");
+  if (!isWeekMode) {
+    const breakdown = MEAL_TYPES.map(mt => {
+      const key = customMealKey(state.selectedDay, mt.id);
+      const items = customMeals[key] || [];
+      const s = combinedMealStats(state.selectedDay, mt.id);
+      const mealColors = collectColorsForMeal(state.selectedDay, mt.id);
+      return `
+        <div class="meal-breakdown-item">
+          <div>
+            <div class="mb-label">${mt.label}</div>
+            <div class="mb-name" style="${!items.length ? "color:var(--muted);font-style:italic;" : ""}">${items.length ? items.map(item => ingredients.find(ing => ing.id === item.ingId)?.name).filter(Boolean).join(" + ") : "Sin ingredientes"}</div>
+            ${mealColors.length ? `<div class="mb-colors">${mealColors.map(colorBadgeHTML).join("")}</div>` : ""}
+          </div>
+          <div class="mb-kcal">${s.calories} kcal</div>
+        </div>`;
+    }).join("");
+    compareEl.innerHTML = `<div class="meal-breakdown">${breakdown}</div>
+      <div class="vitamin-check">
+        <strong>Variedad de colores: ${colorSet.length} ${colorSet.length === 1 ? "color" : "colores"} | ${colorCheck.text}</strong>
+        <small>${colorCheck.note} ${colorSet.length ? `Hoy estás usando: ${colorSet.map(colorBadgeHTML).join(" ")}` : "Todavía no hay colores cargados en este día."}</small>
+      </div>`;
+  } else {
+    const checks = [
+      ["calories", "Calorias", display.calories, target.calories],
+      ["carbs", "Carbohidratos", display.carbs, target.carbs],
+      ["proteins", "Proteinas", display.proteins, target.proteins],
+      ["fats", "Grasas", display.fats, target.fats],
+      ["fiber", "Fibra", display.fiber, target.fiber]
+    ];
+    compareEl.innerHTML = checks.map(([key, label, value, range]) => {
+      const status = targetCheck(value, range);
+      return `
+        <div class="compare-item">
+          <div class="compare-top"><strong>${label}</strong><span>${checkLabel(status)}</span></div>
+          <small>${value} frente a ${range[0]}-${range[1]}. ${statusMessage(key, status)}</small>
+        </div>`;
+    }).join("") + `
+      <div class="vitamin-check">
+        <strong>Variedad semanal de colores: ${colorSet.length} ${colorSet.length === 1 ? "color" : "colores"} | ${colorCheck.text}</strong>
+        <small>${colorCheck.note} ${colorSet.length ? `En la semana aparecen: ${colorSet.map(colorBadgeHTML).join(" ")}` : "Todavía no hay ingredientes con color asignado en la semana."}</small>
+      </div>`;
+  }
+
+  // ── Insight ──
+  const carbStatus = targetCheck(display.carbs, target.carbs);
+  const proteinStatus = targetCheck(display.proteins, target.proteins);
+  const fatStatus = targetCheck(display.fats, target.fats);
+  const fiberStatus = targetCheck(display.fiber, target.fiber);
+  const calStatusFinal = targetCheck(display.calories, target.calories);
+  const activeDayCount = Object.values(state.activeDays).filter(Boolean).length;
+  let insight = isWeekMode ? `Tu semana se ve bastante equilibrada.${activeDayCount > 0 ? ` Tenés ${activeDayCount} día${activeDayCount > 1 ? "s" : ""} activo${activeDayCount > 1 ? "s" : ""} marcado${activeDayCount > 1 ? "s" : ""} — acordate de sumar ½ taza más de arroz o una fruta extra esos días.` : ""}` : `${labelText} tiene un perfil bastante completo.`;
+
+  if (carbStatus === "below") {
+    insight = "Le faltan carbohidratos: suma avena, arroz, papa o fruta.";
+  } else if (proteinStatus === "below") {
+    insight = "Proteinas algo bajas: sumar huevo, pollo, atun, yogur o legumbres.";
+  } else if (fatStatus === "above") {
+    insight = "Grasas un poco altas: revisar quesos, mayonesa y fritos.";
+  } else if (fiberStatus === "below") {
+    insight = "Fibra algo baja: suma verduras, fruta y algun integral o legumbre durante el dia.";
+  } else if (colorCheck.status === "below") {
+    insight = isWeekMode ? "La semana necesita más colores: intentá llegar a 4 o 5 entre frutas, verduras y legumbres." : "Al día le falta variedad de colores: intentá sumar 2 o 3 para cubrir mejor vitaminas.";
+  } else if (state.goal === "control" && calStatusFinal === "above") {
+    insight = "Para controlar el peso, baja alguna porcion, sobre todo en almuerzos densos.";
+  } else if (state.goal === "energia") {
+    insight = "Buena base para sostener energia sin depender de picoteos improvisados.";
+  } else if (state.goal === "cuerpo") {
+    insight = "Proteinas bien encaminadas para apoyar recuperacion y composicion corporal.";
+  } else if (state.goal === "pareja") {
+    insight = "Plan equilibrado para un dia tranquilo. Porciones normales y variedad de platos completos.";
+  }
+
+  document.getElementById("insightText").textContent = insight;
+}
+
+function renderShopping() {
+  const list = buildShoppingList();
+  const tips = buildTips();
+  document.getElementById("shoppingList").innerHTML = list.map(([item, count]) => `
+    <li>
+      <span>${item}</span>
+      <small>${count} usos aprox.</small>
+    </li>
+  `).join("");
+
+  document.getElementById("tipsList").innerHTML = tips.map(([title, text]) => `
+    <li>
+      <span>${title}</span>
+      <small>${text}</small>
+    </li>
+  `).join("");
+}
+
+function render() {
+  renderGoals();
+  renderProfileOptions();
+  renderProfileCalculator();
+  renderPlanner();
+  renderSummary();
+  renderShopping();
+  renderPresetIngredients();
+}
+
+document.getElementById("modeDayBtn").addEventListener("click", () => {
+  state.summaryMode = "day";
+  saveState();
+  renderSummary();
+});
+document.getElementById("modeWeekBtn").addEventListener("click", () => {
+  state.summaryMode = "week";
+  saveState();
+  renderSummary();
+});
+document.getElementById("suggestWeekBtn").addEventListener("click", () => {
+  if (MEALS.breakfast.length === 0) {
+    showToast("Los platos aún no cargaron. Esperá un momento y reintentá.");
+    return;
+  }
+  buildAutomaticWeek(state.goal);
+  showToast("✨ Semana sugerida según tu objetivo");
+});
+document.getElementById("fillWeekBtn").addEventListener("click", () => {
+  autoFillWeekFromPantry();
+});
+// ── Perfil Inteligente Modal ──────────────────────
+const profileModal    = document.getElementById("profileModal");
+const openProfileBtn  = document.getElementById("openProfileModalBtn");
+const closeProfileBtn = document.getElementById("closeProfileModalBtn");
+const calculateBtn    = document.getElementById("calculateProfileBtn");
+const suggestionBox   = document.getElementById("modalSuggestionBox");
+let closeProfileModalFn = () => {};
+let closeSaveModalFn = () => {};
+
+function renderProfileCalcBox() {
+  const box = document.getElementById("profileCalcBox");
+  const plan = profilePlan();
+  if (!plan || plan.unsafe) { box.style.display = "none"; return; }
+  const modeLabel = plan.mode === "surplus" ? "Superávit calórico" : plan.mode === "deficit" ? "Déficit calórico" : "Mantenimiento";
+  box.style.display = "block";
+  box.innerHTML = `
+    <strong>Plan Inteligente Activado ✅${plan.hasPair ? " — Pareja" : ""}</strong>
+    <div>Gasto total estimado: ${plan.maintenance} kcal${plan.hasPair ? " (suma de los dos)" : ""} · Modo: <strong>${modeLabel}</strong></div>
+    <div style="margin-top:6px;font-size:0.85rem;color:var(--muted);">
+      Objetivo diario: ${plan.target.calories[0]}–${plan.target.calories[1]} kcal ·
+      Prot ${plan.target.proteins[0]}–${plan.target.proteins[1]} g ·
+      Carb ${plan.target.carbs[0]}–${plan.target.carbs[1]} g ·
+      Grasas ${plan.target.fats[0]}–${plan.target.fats[1]} g
+    </div>
+    <button class="tiny-btn" id="clearProfileLink" style="margin-top:8px;border:none;background:transparent;color:var(--accent);cursor:pointer;padding:0;">Borrar perfil</button>
+  `;
+  document.getElementById("clearProfileLink").addEventListener("click", () => {
+    state.profile  = { sex: "female", age: "", weight: "", height: "" };
+    state.profile2 = null;
+    saveState();
+    renderProfileCalcBox();
+    render();
+    showToast("Perfil borrado");
+  });
+}
+
+openProfileBtn.addEventListener("click", () => {
+  const isPair = (state.people || 1) === 2;
+
+  // Título y subtítulo dinámico
+  document.getElementById("profileModalTitle").textContent = isPair ? "👥 Perfil de la pareja" : "👤 Tu Perfil Nutricional";
+  document.getElementById("profileModalSubtitle").textContent = isPair
+    ? "Completá los datos de cada persona. Calculamos el promedio de sus metabolismos para ajustar la meta compartida."
+    : "Completá tus datos y calculamos tu metabolismo basal con la fórmula de Harris-Benedict para sugerirte una meta exacta.";
+  document.getElementById("person1Label").textContent = isPair ? "Persona 1" : "Tu perfil";
+  document.getElementById("profilePerson2Block").style.display = isPair ? "" : "none";
+
+  // Carga perfil persona 1
+  document.getElementById("modalSex").value    = state.profile?.sex    || "female";
+  document.getElementById("modalAge").value    = state.profile?.age    || "";
+  document.getElementById("modalWeight").value = state.profile?.weight || "";
+  document.getElementById("modalHeight").value = state.profile?.height || "";
+
+  // Carga perfil persona 2 si existe
+  document.getElementById("modalSex2").value    = state.profile2?.sex    || "female";
+  document.getElementById("modalAge2").value    = state.profile2?.age    || "";
+  document.getElementById("modalWeight2").value = state.profile2?.weight || "";
+  document.getElementById("modalHeight2").value = state.profile2?.height || "";
+
+  document.getElementById("modalActivity").value = state.activity || "medio";
+  suggestionBox.style.display = "none";
+  calculateBtn.textContent = "Calcular Meta";
+  closeProfileModalFn = openModal(profileModal, openProfileBtn);
+});
+
+closeProfileBtn.addEventListener("click", () => closeProfileModalFn());
+profileModal.addEventListener("click", e => { if (e.target === profileModal) closeProfileModalFn(); });
+
+function calcBMR(sex, age, weight, height) {
+  return sex === "male"
+    ? 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)
+    : 447.6  + (9.2  * weight) + (3.1 * height) - (4.3 * age);
+}
+
+function bmiMode(bmi) {
+  if (bmi < 18.5) return { mode: "surplus",     delta: +250, modeText: "superávit calórico para ganancia muscular", goal: "cuerpo"  };
+  if (bmi >= 25)  return { mode: "deficit",      delta: -300, modeText: "déficit calórico para descenso de grasa",   goal: "control" };
+  return              { mode: "maintenance",  delta: 0,    modeText: "mantenimiento para estabilizar peso",        goal: "energia" };
+}
+
+calculateBtn.addEventListener("click", () => {
+  const isPair   = (state.people || 1) === 2;
+  const activity = document.getElementById("modalActivity").value;
+  const actFactor = activity === "alto" ? 1.55 : activity === "medio" ? 1.375 : 1.2;
+
+  // Persona 1
+  const sex1    = document.getElementById("modalSex").value;
+  const age1    = Number(document.getElementById("modalAge").value);
+  const weight1 = Number(document.getElementById("modalWeight").value);
+  const height1 = Number(document.getElementById("modalHeight").value);
+
+  if (!age1 || !weight1 || !height1) { showToast("Completá los datos de la Persona 1."); return; }
+  if (age1 < 14 || age1 > 90 || weight1 < 35 || weight1 > 250 || height1 < 130 || height1 > 230) {
+    showToast("Valores fuera de rango en Persona 1."); return;
+  }
+
+  const bmr1  = calcBMR(sex1, age1, weight1, height1);
+  const maint1 = bmr1 * actFactor;
+  const bmi1  = weight1 / ((height1 / 100) ** 2);
+  const res1  = bmiMode(bmi1);
+  const target1 = maint1 + res1.delta;
+
+  let avgTarget, avgBmi, assignedGoal, summaryHTML;
+
+  if (isPair) {
+    const sex2    = document.getElementById("modalSex2").value;
+    const age2    = Number(document.getElementById("modalAge2").value);
+    const weight2 = Number(document.getElementById("modalWeight2").value);
+    const height2 = Number(document.getElementById("modalHeight2").value);
+
+    if (!age2 || !weight2 || !height2) { showToast("Completá los datos de la Persona 2."); return; }
+    if (age2 < 14 || age2 > 90 || weight2 < 35 || weight2 > 250 || height2 < 130 || height2 > 230) {
+      showToast("Valores fuera de rango en Persona 2."); return;
+    }
+
+    const bmr2   = calcBMR(sex2, age2, weight2, height2);
+    const maint2 = bmr2 * actFactor;
+    const bmi2   = weight2 / ((height2 / 100) ** 2);
+    const res2   = bmiMode(bmi2);
+    const target2 = maint2 + res2.delta;
+
+    avgTarget = Math.round(target1 + target2);
+    avgBmi    = ((bmi1 + bmi2) / 2).toFixed(1);
+    // Objetivo: el más restrictivo si difieren, para no perjudicar a ninguno
+    assignedGoal = (res1.goal === res2.goal) ? res1.goal : "pareja";
+
+    summaryHTML = `
+      <strong style="color:var(--accent-strong);font-size:1.05rem;">Meta combinada para los dos</strong><br>
+      <div style="margin-top:8px;display:grid;grid-template-columns:1fr 1fr;gap:8px;">
+        <div style="font-size:0.88rem;">
+          <strong>Persona 1</strong> — IMC ${bmi1.toFixed(1)}<br>
+          <span style="color:var(--muted);">${Math.round(target1)} kcal/día · ${res1.modeText}</span>
+        </div>
+        <div style="font-size:0.88rem;">
+          <strong>Persona 2</strong> — IMC ${bmi2.toFixed(1)}<br>
+          <span style="color:var(--muted);">${Math.round(target2)} kcal/día · ${res2.modeText}</span>
+        </div>
+      </div>
+      <div style="margin-top:10px;font-size:0.95rem;">
+        🍽️ Total diario para los dos: <strong>${avgTarget} kcal</strong>
+      </div>`;
+  } else {
+    avgTarget    = Math.round(target1);
+    avgBmi       = bmi1.toFixed(1);
+    assignedGoal = res1.goal;
+    summaryHTML  = `
+      <strong style="color:var(--accent-strong);font-size:1.05rem;">Tu IMC es ${avgBmi}.</strong><br>
+      <span style="font-size:0.95rem;color:var(--ink);">
+        Meta recomendada: <strong>${avgTarget} kcal/día</strong>. ${res1.modeText}.
+      </span>`;
+  }
+
+  if (calculateBtn.textContent === "Calcular Meta") {
+    suggestionBox.style.display = "block";
+    suggestionBox.innerHTML = summaryHTML;
+    calculateBtn.textContent = "Aplicar esta meta";
+  } else {
+    state.profile  = { sex: sex1, age: age1, weight: weight1, height: height1 };
+    if (isPair) {
+      state.profile2 = {
+        sex:    document.getElementById("modalSex2").value,
+        age:    Number(document.getElementById("modalAge2").value),
+        weight: Number(document.getElementById("modalWeight2").value),
+        height: Number(document.getElementById("modalHeight2").value)
+      };
+    } else {
+      state.profile2 = null;
+    }
+    state.activity = activity;
+    state.goal     = assignedGoal;
+    saveState();
+    render();
+    renderProfileCalcBox();
+    closeProfileModalFn();
+    showToast("✓ Perfil y meta aplicados");
+  }
+});
+
+renderProfileCalcBox();
+document.getElementById("resetBtn").addEventListener("click", () => {
+  const savedProfile  = state.profile;
+  const savedActivity = state.activity;
+  const savedGoal     = state.goal;
+  const savedPortion  = state.basePortion;
+  const savedPeople   = state.people;
+  state = {
+    goal: savedGoal,
+    activity: savedActivity,
+    basePortion: savedPortion,
+    plan: createDefaultPlan(),
+    summaryMode: "day",
+    selectedDay: "monday",
+    activeDays: {},
+    people: savedPeople,
+    profile: savedProfile
+  };
+  customMeals = {};
+  saveCustomMeals(customMeals);
+  saveState();
+  render();
+  showToast("✓ Semana reiniciada. Tu perfil se conservó.");
+});
+
+// ── Weeks management ──────────────────────────────────────
+function loadSavedWeeks() {
+  try {
+    return JSON.parse(localStorage.getItem(WEEKS_KEY)) || [];
+  } catch { return []; }
+}
+
+function saveSavedWeeks(weeks) {
+  localStorage.setItem(WEEKS_KEY, JSON.stringify(weeks));
+}
+
+function renderWeeksList() {
+  const weeks = loadSavedWeeks();
+  const list = document.getElementById("weeksList");
+  list.innerHTML = "";
+
+  if (!weeks.length) {
+    const empty = document.createElement("span");
+    empty.style.color = "var(--muted)";
+    empty.style.fontSize = "0.85rem";
+    empty.textContent = "Ninguna semana guardada aun.";
+    list.appendChild(empty);
+    return;
+  }
+
+  weeks.forEach((w, i) => {
+    const chip = buildWeekChip({ name: w.name, index: i });
+    list.appendChild(chip);
+  });
+
+  list.querySelectorAll("[data-week-index]").forEach(chip => {
+    chip.addEventListener("click", (e) => {
+      if (e.target.dataset.delWeek !== undefined) return;
+      const idx = parseInt(chip.dataset.weekIndex);
+      const weeks = loadSavedWeeks();
+      const loaded = weeks[idx];
+      state = {
+        goal: loaded.goal || "cuerpo",
+        activity: loaded.activity || "medio",
+        basePortion: loaded.basePortion || "normal",
+        plan: normalizePlan(loaded.plan || createDefaultPlan()),
+        summaryMode: loaded.summaryMode || "day",
+        selectedDay: loaded.selectedDay || "monday",
+        activeDays: loaded.activeDays || {},
+        people: loaded.people === 2 ? 2 : 1,
+        profile: loaded.profile || { sex: "female", age: "", weight: "", height: "" },
+        profile2: loaded.profile2 || null
+      };
+      customMeals = loaded.customMeals || {};
+      saveCustomMeals(customMeals);
+      saveState();
+      render();
+      showToast(`✓ Semana "${loaded.name}" cargada`);
+    });
+  });
+
+  list.querySelectorAll("[data-del-week]").forEach(btn => {
+    btn.addEventListener("click", (e) => {
+      e.stopPropagation();
+      const idx = parseInt(btn.dataset.delWeek);
+      const weeks = loadSavedWeeks();
+      const name = weeks[idx].name;
+      weeks.splice(idx, 1);
+      saveSavedWeeks(weeks);
+      renderWeeksList();
+      showToast(`Semana "${name}" eliminada`);
+    });
+  });
+}
+
+// Save week modal
+document.getElementById("saveWeekBtn").addEventListener("click", () => {
+  const modal = document.getElementById("saveModal");
+  const input = document.getElementById("weekNameInput");
+  const d = new Date();
+  input.value = `Semana del ${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
+  closeSaveModalFn = openModal(modal, document.getElementById("saveWeekBtn"));
+  setTimeout(() => { input.select(); }, 50);
+});
+
+document.getElementById("cancelSaveBtn").addEventListener("click", () => {
+  closeSaveModalFn();
+});
+
+document.getElementById("saveModal").addEventListener("click", (e) => {
+  if (e.target === e.currentTarget) closeSaveModalFn();
+});
+
+document.getElementById("confirmSaveBtn").addEventListener("click", () => {
+  const name = document.getElementById("weekNameInput").value.trim();
+  if (!name) return;
+  const weeks = loadSavedWeeks();
+  weeks.push({
+    name,
+    goal: state.goal,
+    activity: state.activity,
+    basePortion: state.basePortion,
+    plan: JSON.parse(JSON.stringify(state.plan)),
+    customMeals: JSON.parse(JSON.stringify(customMeals)),
+    summaryMode: state.summaryMode,
+    selectedDay: state.selectedDay,
+    activeDays: JSON.parse(JSON.stringify(state.activeDays || {})),
+    people: state.people || 1,
+    profile: JSON.parse(JSON.stringify(state.profile || { sex: "female", age: "", weight: "", height: "" })),
+    profile2: JSON.parse(JSON.stringify(state.profile2 || null)),
+    savedAt: Date.now()
+  });
+  saveSavedWeeks(weeks);
+  renderWeeksList();
+  closeSaveModalFn();
+  showToast(`✓ "${name}" guardada`);
+});
+
+document.getElementById("weekNameInput").addEventListener("keydown", (e) => {
+  if (e.key === "Enter") document.getElementById("confirmSaveBtn").click();
+});
+
+// ── Toast helper ──────────────────────────────────────────
+let toastTimer;
+function showToast(msg) {
+  const toast = document.getElementById("exportToast");
+  toast.textContent = msg;
+  toast.classList.add("show");
+  clearTimeout(toastTimer);
+  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
+}
+
+// ── Export to Image ───────────────────────────────────────
+document.getElementById("exportImgBtn").addEventListener("click", async () => {
+  showToast("Generando imagen...");
+  const target = document.querySelector(".shell");
+  try {
+    const canvas = await html2canvas(target, {
+      scale: 1.5,
+      useCORS: true,
+      backgroundColor: "#f8f2e8",
+      logging: false
+    });
+    const link = document.createElement("a");
+    link.download = "plan-semanal.png";
+    link.href = canvas.toDataURL("image/png");
+    link.click();
+    showToast("✓ Imagen descargada");
+  } catch (err) {
+    showToast("Error al generar imagen");
+    console.error(err);
+  }
+});
+
+// ── Export to PDF ─────────────────────────────────────────
+document.getElementById("exportPdfBtn").addEventListener("click", async () => {
+  showToast("Generando PDF...");
+  const { jsPDF } = window.jspdf;
+  const target = document.querySelector(".planner");
+  const plannerGrid = document.getElementById("plannerGrid");
+  const previousGridStyles = plannerGrid ? {
+    maxHeight: plannerGrid.style.maxHeight,
+    overflowY: plannerGrid.style.overflowY,
+    overflowX: plannerGrid.style.overflowX,
+    paddingRight: plannerGrid.style.paddingRight
+  } : null;
+  try {
+    if (plannerGrid) {
+      plannerGrid.style.maxHeight = "none";
+      plannerGrid.style.overflowY = "visible";
+      plannerGrid.style.overflowX = "visible";
+      plannerGrid.style.paddingRight = "0";
+    }
+    const canvas = await html2canvas(target, {
+      scale: 1.4,
+      useCORS: true,
+      backgroundColor: "#f8f2e8",
+      logging: false
+    });
+    const imgData = canvas.toDataURL("image/jpeg", 0.85);
+    const pdf = new jsPDF({
+      orientation: canvas.width > canvas.height ? "landscape" : "portrait",
+      unit: "px",
+      format: [canvas.width, canvas.height]
+    });
+    pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
+    pdf.save("plan-semanal.pdf");
+    showToast("✓ PDF descargado");
+  } catch (err) {
+    showToast("Error al generar PDF");
+    console.error(err);
+  } finally {
+    if (plannerGrid && previousGridStyles) {
+      plannerGrid.style.maxHeight = previousGridStyles.maxHeight;
+      plannerGrid.style.overflowY = previousGridStyles.overflowY;
+      plannerGrid.style.overflowX = previousGridStyles.overflowX;
+      plannerGrid.style.paddingRight = previousGridStyles.paddingRight;
+    }
+  }
+});
+
+// ══════════════════════════════════════════════════
+// ── INGREDIENT PANEL & DRAG-DROP SYSTEM ──────────
+// ══════════════════════════════════════════════════
+
+const ING_KEY = "planificador-ingredients-v1";
+const CUSTOM_MEALS_KEY = "planificador-custom-meals-v1";
+
+function guessEmoji(name) {
+  const n = name.toLowerCase();
+  if (/arroz|fideos|pasta|macarron|espagueti/.test(n)) return "🍚";
+  if (/pan|tostada|galleta|bizcocho/.test(n)) return "🍞";
+  if (/pollo|pechuga|muslo/.test(n)) return "🍗";
+  if (/carne|bife|lomo|vacio|peceto|milanesa/.test(n)) return "🥩";
+  if (/huevo/.test(n)) return "🥚";
+  if (/leche/.test(n)) return "🥛";
+  if (/yogur/.test(n)) return "🫙";
+  if (/banana|platano/.test(n)) return "🍌";
+  if (/manzana/.test(n)) return "🍎";
+  if (/naranja|mandarina/.test(n)) return "🍊";
+  if (/tomate/.test(n)) return "🍅";
+  if (/papa|patata/.test(n)) return "🥔";
+  if (/zanahoria/.test(n)) return "🥕";
+  if (/palta|aguacate/.test(n)) return "🥑";
+  if (/atun|pescado|merluza/.test(n)) return "🐟";
+  if (/queso/.test(n)) return "🧀";
+  if (/maní|mani|nuez|almendra|fruto seco/.test(n)) return "🥜";
+  if (/aceite|oliva/.test(n)) return "🫒";
+  if (/avena/.test(n)) return "🌾";
+  if (/zapallo|calabaza/.test(n)) return "🎃";
+  if (/lechuga|espinaca|acelga|verdura/.test(n)) return "🥬";
+  return "🫙";
+}
+
+function loadIngredients() {
+  try {
+    return (JSON.parse(localStorage.getItem(ING_KEY)) || []).map(ing => ({
+      ...ing,
+      fiber: ing.fiber || 0,
+      color: ing.color || "",
+      category: ing.category || ""
+    }));
+  }
+  catch { return []; }
+}
+function saveIngredients(list) {
+  localStorage.setItem(ING_KEY, JSON.stringify(list));
+}
+function loadCustomMeals() {
+  try { return JSON.parse(localStorage.getItem(CUSTOM_MEALS_KEY)) || {}; }
+  catch { return {}; }
+}
+function saveCustomMeals(data) {
+  localStorage.setItem(CUSTOM_MEALS_KEY, JSON.stringify(data));
+}
+
+let ingredients = loadIngredients();
+let customMeals = loadCustomMeals();
+let dragIngId = null;
+let activeTagFilter = null; // tag string or null
+
+function customMealKey(dayId, mealTypeId) {
+  return `${dayId}-${mealTypeId}`;
+}
+
+function customMealTotals(key) {
+  const items = customMeals[key] || [];
+  return items.reduce((acc, item) => {
+    const ing = ingredients.find(i => i.id === item.ingId);
+    if (!ing) return acc;
+    const m = item.qty;
+    acc.calories += Math.round((ing.calories || 0) * m);
+    acc.carbs    += Math.round((ing.carbs    || 0) * m);
+    acc.proteins += Math.round((ing.proteins || 0) * m);
+    acc.fats     += Math.round((ing.fats     || 0) * m);
+    acc.fiber    += Math.round((ing.fiber    || 0) * m);
+    return acc;
+  }, { calories: 0, carbs: 0, proteins: 0, fats: 0, fiber: 0 });
+}
+
+
+// ── Fallback: menú integrado si comidas.json no está disponible ──────────────
+function loadFallbackMeals() {
+  MEALS.breakfast = [];
+  MEALS.lunch = [];
+  MEALS.snack = [];
+  MEALS.dinner = [];
+}
+
+// ── Carga comidas.json y arranca la app ──────────────────
+async function initApp() {
+  // Muestra loading mientras carga el JSON
+  document.getElementById("plannerGrid").innerHTML =
+    '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--muted);font-size:1rem;">Cargando menú...</div>';
+
+  try {
+    const { goals } = await loadMealsFromJson("comidas.json");
+    GOALS = { ...GOALS, ...goals };
+  } catch (err) {
+    console.warn("comidas.json no encontrado, no se pudo inicializar el menú:", err.message);
+    loadFallbackMeals();
+    showToast("No se pudo cargar comidas.json. Revisá la conexión o el archivo.");
+  }
+
+  // Arranca la app normalmente
+  state = loadState();
+  render();
+  renderWeeksList();
+}
+
+initApp();
+
+
+// ── Popup para agregar ingrediente a una comida con clic ──
+let currentPopup = null;
+function openAddIngredientPopup(ingId, anchorBtn) {
+  if (currentPopup) { currentPopup.remove(); currentPopup = null; }
+  const popup = document.createElement("div");
+  popup.className = "add-ing-popup";
+  popup.innerHTML = `<div class="add-ing-popup-title">Agregar a...</div><div class="add-ing-popup-row"><select class="add-ing-day-select">${DAYS.map(d => `<option value="${d.id}">${d.label}</option>`).join("")}</select><select class="add-ing-meal-select">${MEAL_TYPES.map(m => `<option value="${m.id}">${m.label}</option>`).join("")}</select></div><button class="add-ing-confirm">Agregar</button>`;
+  document.body.appendChild(popup);
+  currentPopup = popup;
+  const rect = anchorBtn.getBoundingClientRect();
+  popup.style.position = "fixed";
+  popup.style.top = (rect.bottom + 6) + "px";
+  popup.style.left = Math.min(rect.left, window.innerWidth - 240) + "px";
+  popup.style.zIndex = "9999";
+  popup.querySelector(".add-ing-confirm").addEventListener("click", () => {
+    const dayId = popup.querySelector(".add-ing-day-select").value;
+    const mealTypeId = popup.querySelector(".add-ing-meal-select").value;
+    const key = customMealKey(dayId, mealTypeId);
+    if (!customMeals[key]) customMeals[key] = [];
+    const existing = customMeals[key].find(i => i.ingId === ingId);
+    if (existing) { existing.qty += 1; } else { customMeals[key].push({ ingId, qty: 1 }); }
+    saveCustomMeals(customMeals);
+    render();
+    popup.remove();
+    currentPopup = null;
+    const ing = ingredients.find(i => i.id === ingId);
+    showToast("\u2713 \"" + (ing ? ing.name : "") + "\" agregado");
+  });
+  setTimeout(() => {
+    document.addEventListener("click", function handler(e) {
+      if (!popup.contains(e.target) && e.target !== anchorBtn) { popup.remove(); currentPopup = null; document.removeEventListener("click", handler); }
+    });
+  }, 10);
+}
+// ── Render ingredient chips ──
+function renderIngredients() {
+  const list = document.getElementById("ingredientsList");
+  const search = document.getElementById("ingredientSearch");
+  if (!list) return;
+  const term = (search?.value || "").trim().toLowerCase();
+  const filteredIngredients = ingredients.filter(ing => {
+    if (!term) return true;
+    return [
+      ing.name,
+      ing.qty,
+      FOOD_COLORS[ing.color]?.label || ""
+    ].join(" ").toLowerCase().includes(term);
+  });
+
+  if (!ingredients.length) {
+    list.innerHTML = `<p style="color:var(--muted);font-size:0.82rem;text-align:center;padding:12px 0;">Todavía no agregaste ingredientes.<br>Usá el formulario de arriba.</p>`;
+    return;
+  }
+  if (!filteredIngredients.length) {
+    list.innerHTML = `<p style="color:var(--muted);font-size:0.82rem;text-align:center;padding:12px 0;">No encontré ingredientes con esa búsqueda.</p>`;
+    return;
+  }
+  list.innerHTML = filteredIngredients.map(ing => `
+    <div class="ingredient-chip" draggable="true" data-ing-id="${ing.id}">
+      <span class="chip-icon">${ing.emoji}</span>
+      <div class="chip-info">
+        <div class="chip-name">${ing.name}</div>
+        <div class="chip-macros">${ing.qty} · ${ing.calories} kcal · C:${ing.carbs}g P:${ing.proteins}g G:${ing.fats}g F:${ing.fiber || 0}g</div>
+        ${ing.color ? `<div style="margin-top:5px;">${colorBadgeHTML(ing.color)}</div>` : ""}
+        <select class="chip-category-select" data-category-ing="${ing.id}">
+          <option value="">Categoría automática</option>
+          ${FOOD_CATEGORY_OPTIONS.map(option => `
+            <option value="${option}" ${ing.category === option ? "selected" : ""}>${option}</option>
+          `).join("")}
+        </select>
+      </div>
+      <button class="chip-add" data-add-ing="${ing.id}" title="Agregar a una comida">＋</button>
+      <button class="chip-del" data-del-ing="${ing.id}" title="Eliminar">✕</button>
+    </div>
+  `).join("");
+
+  list.querySelectorAll(".ingredient-chip[draggable]").forEach(chip => {
+    chip.addEventListener("dragstart", e => {
+      dragIngId = chip.dataset.ingId;
+      chip.classList.add("dragging");
+      e.dataTransfer.effectAllowed = "copy";
+    });
+    chip.addEventListener("dragend", () => {
+      chip.classList.remove("dragging");
+      dragIngId = null;
+    });
+  });
+
+  list.querySelectorAll("[data-add-ing]").forEach(btn => {
+    btn.addEventListener("click", e => {
+      e.stopPropagation();
+      openAddIngredientPopup(btn.dataset.addIng, btn);
+    });
+  });
+
+  list.querySelectorAll("[data-category-ing]").forEach(select => {
+    select.addEventListener("change", () => {
+      const ing = ingredients.find(item => item.id === select.dataset.categoryIng);
+      if (!ing) return;
+      ing.category = select.value;
+      saveIngredients(ingredients);
+      renderPresetIngredients();
+    });
+  });
+
+  list.querySelectorAll("[data-del-ing]").forEach(btn => {
+    btn.addEventListener("click", e => {
+      e.stopPropagation();
+      const id = btn.dataset.delIng;
+      ingredients = ingredients.filter(i => i.id !== id);
+      // clean up custom meals referencing this ingredient
+      Object.keys(customMeals).forEach(key => {
+        customMeals[key] = customMeals[key].filter(item => item.ingId !== id);
+      });
+      saveIngredients(ingredients);
+      saveCustomMeals(customMeals);
+      renderIngredients();
+      renderPresetIngredients();
+      render();
+    });
+  });
+}
+
+function renderPresetIngredients() {
+  const list = document.getElementById("presetIngredients");
+  const addAllBtn = document.getElementById("addAllPresetsBtn");
+  const filterBar = document.getElementById("tagFilterBar");
+  if (!list) return;
+
+  const missingPresets = PRESET_INGREDIENTS.filter(item => !ingredientExistsByName(item.name));
+  if (addAllBtn) addAllBtn.style.display = missingPresets.length ? "" : "none";
+
+  // Build full item list (presets + manual ingredients)
+  const presetNames = new Set(PRESET_INGREDIENTS.map(item => item.name.trim().toLowerCase()));
+  const allItems = [
+    ...PRESET_INGREDIENTS.map(item => ({ ...item, source: "preset" })),
+    ...ingredients
+      .filter(ing => !presetNames.has(ing.name.trim().toLowerCase()))
+      .map(ing => ({ ...ing, source: "manual" }))
+  ];
+
+  // Collect all unique semantic tags from items (exclude internal system tags)
+  const systemTags = new Set(["balanced", "highProtein", "highCarb", "lightCarb"]);
+  const allTags = [...new Set(
+    allItems.flatMap(item => (item.tags || []).filter(t => !systemTags.has(t)))
+  )].sort();
+
+  // Render tag filter bar
+  if (filterBar) {
+    filterBar.innerHTML = [
+      `<button class="tag-filter-btn ${activeTagFilter === null ? "active" : ""}" data-tag="">Todos</button>`,
+      ...allTags.map(tag =>
+        `<button class="tag-filter-btn ${activeTagFilter === tag ? "active" : ""}" data-tag="${tag}">${tag}</button>`
+      )
+    ].join("");
+
+    filterBar.querySelectorAll(".tag-filter-btn").forEach(btn => {
+      btn.addEventListener("click", () => {
+        activeTagFilter = btn.dataset.tag || null;
+        renderPresetIngredients();
+      });
+    });
+  }
+
+  // Filter items by active tag
+  const filtered = activeTagFilter
+    ? allItems.filter(item => (item.tags || []).includes(activeTagFilter))
+    : allItems;
+
+  // Group by category
+  const categories = new Map();
+  filtered.forEach(item => {
+    const category = presetCategory(item);
+    if (!categories.has(category)) categories.set(category, []);
+    categories.get(category).push(item);
+  });
+
+  if (!categories.size) {
+    list.innerHTML = `<p style="color:var(--muted);font-size:0.82rem;padding:12px 0;text-align:center;">Sin resultados para "<strong>${activeTagFilter}</strong>".</p>`;
+    return;
+  }
+
+  list.innerHTML = Array.from(categories.entries()).map(([category, items], index) => `
+    <details class="preset-category" ${index < 2 ? "open" : ""}>
+      <summary>
+        <span>${category}</span>
+        <span class="preset-category-count">${items.length} tarjeta${items.length === 1 ? "" : "s"}</span>
+      </summary>
+      <div class="preset-category-body">
+        ${items.map(item => {
+          const exists = ingredientExistsByName(item.name);
+          const isManual = item.source === "manual";
+          const semanticTags = (item.tags || []).filter(t => !systemTags.has(t));
+          return `
+          <div class="preset-card">
+            <div class="preset-top">
+              <div class="preset-name">${item.emoji} ${item.name}</div>
+              ${colorBadgeHTML(item.color)}
+            </div>
+            <div class="preset-meta">
+              ${item.qty} · ${item.calories} kcal · C:${item.carbs}g · P:${item.proteins}g · G:${item.fats}g · F:${item.fiber}g
+            </div>
+            ${semanticTags.length ? `
+              <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:5px;">
+                ${semanticTags.slice(0, 4).map(t => `
+                  <span style="font-size:0.68rem;background:rgba(106,143,78,0.12);color:var(--leaf);border-radius:999px;padding:2px 8px;font-weight:700;cursor:pointer;"
+                        data-quick-tag="${t}">${t}</span>`).join("")}
+              </div>` : ""}
+            <div class="preset-actions">
+              <small style="color:var(--muted);">${isManual ? "Creado por vos" : exists ? "Ya está en despensa" : "Lista para agregar"}</small>
+              <div class="preset-action-buttons">
+                <button class="preset-btn secondary" data-add-week-id="${isManual ? item.id : ""}" data-add-preset-week="${!isManual ? item.name : ""}">A semana</button>
+                ${isManual ? "" : `<button class="preset-btn" data-add-preset="${item.name}" ${exists ? "disabled" : ""}>${exists ? "Agregada" : "Agregar"}</button>`}
+              </div>
+            </div>
+          </div>`;
+        }).join("")}
+      </div>
+    </details>
+  `).join("");
+
+  // Click on tag chip → set filter
+  list.querySelectorAll("[data-quick-tag]").forEach(chip => {
+    chip.addEventListener("click", () => {
+      activeTagFilter = chip.dataset.quickTag;
+      renderPresetIngredients();
+    });
+  });
+
+  list.querySelectorAll("[data-add-preset]").forEach(btn => {
+    btn.addEventListener("click", () => {
+      const preset = PRESET_INGREDIENTS.find(item => item.name === btn.dataset.addPreset);
+      if (!preset || ingredientExistsByName(preset.name)) return;
+      ingredients.push(createIngredient(preset));
+      saveIngredients(ingredients);
+      renderIngredients();
+      renderPresetIngredients();
+      showToast(`✓ "${preset.name}" agregado`);
+    });
+  });
+
+  list.querySelectorAll("[data-add-week-id], [data-add-preset-week]").forEach(btn => {
+    btn.addEventListener("click", () => {
+      let ing = null;
+      if (btn.dataset.addWeekId) {
+        ing = ingredients.find(item => item.id === btn.dataset.addWeekId) || null;
+      } else {
+        const preset = PRESET_INGREDIENTS.find(item => item.name === btn.dataset.addPresetWeek);
+        if (!preset) return;
+        ing = ensurePresetIngredient(preset);
+      }
+      if (!ing) return;
+      openAddIngredientPopup(ing.id, btn);
+    });
+  });
+}
+
+// ── Add ingredient from form ──
+document.getElementById("addIngredientBtn").addEventListener("click", () => {
+  const name = document.getElementById("ingName").value.trim();
+  const qty  = document.getElementById("ingQty").value.trim();
+  const cal  = parseFloat(document.getElementById("ingCal").value)  || 0;
+  const carb = parseFloat(document.getElementById("ingCarb").value) || 0;
+  const prot = parseFloat(document.getElementById("ingProt").value) || 0;
+  const fat  = parseFloat(document.getElementById("ingFat").value)  || 0;
+  const fiber = parseFloat(document.getElementById("ingFiber").value) || 0;
+  const color = document.getElementById("ingColor").value;
+  const category = document.getElementById("ingCategory").value;
+
+  if (!name) { document.getElementById("ingName").focus(); return; }
+
+  const ing = createIngredient({
+    name,
+    qty: qty || "1 porción",
+    emoji: guessEmoji(name),
+    calories: cal,
+    carbs: carb,
+    proteins: prot,
+    fats: fat,
+    fiber,
+    color,
+    category
+  });
+
+  ingredients.push(ing);
+  saveIngredients(ingredients);
+
+  // clear form
+  ["ingName","ingQty","ingCal","ingCarb","ingProt","ingFat","ingFiber","ingColor","ingCategory"].forEach(id => {
+    document.getElementById(id).value = "";
+  });
+  document.getElementById("ingName").focus();
+
+  renderIngredients();
+  renderPresetIngredients();
+  showToast(`✓ "${ing.name}" agregado`);
+});
+
+// enter key on name field
+document.getElementById("ingName").addEventListener("keydown", e => {
+  if (e.key === "Enter") document.getElementById("addIngredientBtn").click();
+});
+
+// ── Render custom meal drop zone inside each meal card ──
+function renderCustomZone(dayId, mealTypeId) {
+  const key = customMealKey(dayId, mealTypeId);
+  const items = customMeals[key] || [];
+  const totals = customMealTotals(key);
+
+  const itemsHTML = items.map(item => {
+    const ing = ingredients.find(i => i.id === item.ingId);
+    if (!ing) return "";
+    const cal  = Math.round((ing.calories||0) * item.qty);
+    return `
+      <div class="dropped-ingredient" data-drop-key="${key}" data-drop-ing="${item.ingId}">
+        <span class="dropped-icon">${ing.emoji}</span>
+        <div class="dropped-info">
+          <div class="dropped-title-row">
+            <span class="dropped-name">${ing.name}</span>
+            <span class="dropped-macros">${cal} kcal</span>
+          </div>
+        </div>
+        <div class="dropped-qty">
+          <button class="qty-btn" data-qty-dec data-qty-key="${key}" data-qty-ing="${item.ingId}">−</button>
+          <span class="qty-val">${item.qty}×</span>
+          <button class="qty-btn" data-qty-inc data-qty-key="${key}" data-qty-ing="${item.ingId}">+</button>
+        </div>
+        ${ing.color ? `<div class="dropped-color">${colorBadgeHTML(ing.color)}</div>` : `<div class="dropped-color"></div>`}
+        <button class="dropped-del" data-rm-key="${key}" data-rm-ing="${item.ingId}" title="Quitar">✕</button>
+      </div>`;
+  }).join("");
+
+  const totalsHTML = items.length ? `
+    <div class="custom-macro-row">
+      <div class="custom-macro-pill"><span>Kcal</span><strong>${totals.calories}</strong></div>
+      <div class="custom-macro-pill"><span>Carb</span><strong>${totals.carbs}g</strong></div>
+      <div class="custom-macro-pill"><span>Prot</span><strong>${totals.proteins}g</strong></div>
+      <div class="custom-macro-pill"><span>Gras</span><strong>${totals.fats}g</strong></div>
+      <div class="custom-macro-pill"><span>Fib</span><strong>${totals.fiber}g</strong></div>
+    </div>` : "";
+
+  return `
+    <div class="custom-meal-zone" data-zone-key="${key}">
+      ${items.length === 0
+        ? `<div class="zone-placeholder">⬅ Arrastrá ingredientes aquí</div>`
+        : itemsHTML + totalsHTML
+      }
+    </div>`;
+}
+
+// ── Attach drop-zone events after renderPlanner builds the DOM ──
+function attachDropZones() {
+  document.querySelectorAll(".custom-meal-zone").forEach(zone => {
+    const key = zone.dataset.zoneKey;
+
+    zone.addEventListener("dragover", e => {
+      e.preventDefault();
+      e.dataTransfer.dropEffect = "copy";
+      zone.classList.add("drag-over");
+    });
+    zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
+    zone.addEventListener("drop", e => {
+      e.preventDefault();
+      zone.classList.remove("drag-over");
+      if (!dragIngId) return;
+      if (!customMeals[key]) customMeals[key] = [];
+      const existing = customMeals[key].find(i => i.ingId === dragIngId);
+      if (existing) {
+        existing.qty += 1;
+      } else {
+        customMeals[key].push({ ingId: dragIngId, qty: 1 });
+      }
+      saveCustomMeals(customMeals);
+      render();
+    });
+
+    // qty buttons
+    zone.querySelectorAll("[data-qty-inc]").forEach(btn => {
+      btn.addEventListener("click", () => {
+        const item = (customMeals[btn.dataset.qtyKey] || []).find(i => i.ingId === btn.dataset.qtyIng);
+        if (item) { item.qty += 1; saveCustomMeals(customMeals); render(); }
+      });
+    });
+    zone.querySelectorAll("[data-qty-dec]").forEach(btn => {
+      btn.addEventListener("click", () => {
+        const arr = customMeals[btn.dataset.qtyKey] || [];
+        const idx = arr.findIndex(i => i.ingId === btn.dataset.qtyIng);
+        if (idx === -1) return;
+        if (arr[idx].qty > 1) { arr[idx].qty -= 1; }
+        else { arr.splice(idx, 1); }
+        saveCustomMeals(customMeals);
+        render();
+      });
+    });
+
+    // remove buttons
+    zone.querySelectorAll("[data-rm-key]").forEach(btn => {
+      btn.addEventListener("click", () => {
+        const arr = customMeals[btn.dataset.rmKey] || [];
+        const idx = arr.findIndex(i => i.ingId === btn.dataset.rmIng);
+        if (idx !== -1) arr.splice(idx, 1);
+        saveCustomMeals(customMeals);
+        render();
+      });
+    });
+  });
+}
+
+renderIngredients();
+renderPresetIngredients();
+
+document.getElementById("ingredientSearch").addEventListener("input", () => {
+  renderIngredients();
+});
+
+document.getElementById("addAllPresetsBtn").addEventListener("click", () => {
+  const missing = PRESET_INGREDIENTS.filter(item => !ingredientExistsByName(item.name));
+  if (!missing.length) {
+    showToast("Las tarjetas rápidas ya están cargadas");
+    return;
+  }
+  ingredients = ingredients.concat(missing.map(createIngredient));
+  saveIngredients(ingredients);
+  renderIngredients();
+  renderPresetIngredients();
+  showToast(`✓ ${missing.length} ingredientes agregados`);
+});
 
EOF
)