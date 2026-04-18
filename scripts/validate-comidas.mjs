 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/scripts/validate-comidas.mjs b/scripts/validate-comidas.mjs
new file mode 100644
index 0000000000000000000000000000000000000000..f81e07a438ce3bff63b073aafaa942db3a50015d
--- /dev/null
+++ b/scripts/validate-comidas.mjs
@@ -0,0 +1,25 @@
+import fs from "node:fs";
+import path from "node:path";
+import { fileURLToPath } from "node:url";
+import { validateComidasPayload } from "../js/data.js";
+
+const __dirname = path.dirname(fileURLToPath(import.meta.url));
+const root = path.resolve(__dirname, "..");
+const filePath = path.join(root, "comidas.json");
+
+try {
+  const raw = fs.readFileSync(filePath, "utf8");
+  const data = JSON.parse(raw);
+  const errors = validateComidasPayload(data);
+
+  if (errors.length) {
+    console.error("❌ comidas.json inválido:");
+    errors.forEach((error) => console.error(` - ${error}`));
+    process.exit(1);
+  }
+
+  console.log("✅ comidas.json válido");
+} catch (error) {
+  console.error(`❌ No se pudo validar comidas.json: ${error.message}`);
+  process.exit(1);
+}
 
EOF
)