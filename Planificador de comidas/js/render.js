 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/js/render.js b/js/render.js
new file mode 100644
index 0000000000000000000000000000000000000000..1393c281fffde32c16ad53b649da7a52893a9b8c
--- /dev/null
+++ b/js/render.js
@@ -0,0 +1,52 @@
+export function buildWeekChip({ name, index }) {
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
+export function openModal(modalEl, triggerEl) {
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
 
EOF
)