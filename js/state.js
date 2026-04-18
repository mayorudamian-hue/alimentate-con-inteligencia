diff --git a/js/state.js b/js/state.js
new file mode 100644
index 0000000000000000000000000000000000000000..cb412286bbe77d4d3f8f459f99b3383914e2ede5
--- /dev/null
+++ b/js/state.js
@@ -0,0 +1,84 @@
+export function createDefaultPlan(days, mealTypes) {
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
+export function normalizePlan(plan, days, mealTypes) {
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
+export function stripPresetMealsFromPlan(plan, days, mealTypes) {
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
+export function loadState(storageKey, days, mealTypes) {
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
+export function saveState(storageKey, state) {
+  localStorage.setItem(storageKey, JSON.stringify(state));
+}
