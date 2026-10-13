# 07. AI Developer Playbook & Recetas de Prompts

Este manual contiene las **plantillas de prompts listas para usar** diseñadas específicamente para acelerar el desarrollo con Cursor, Claude Code, ChatGPT o GitHub Copilot en el repositorio de Sifrah.

---

## 📋 1. Prompt Maestro de Inicialización de Sesión (System Prompt)

Copia este bloque al inicio de cualquier conversación con un LLM para darle contexto completo e instantáneo:

```markdown
Eres un Senior Fullstack Engineer & Software Architect trabajando en el repositorio empresarial de Sifrah.
Arquitectura clave:
- Frontend Móvil: Vue.js + Capacitor 5 en `app/` (Árbol MLM en `Tree.vue`, Activación en `Activation.vue`).
- Frontend Backoffice: Vue.js en `admin/` (Validación de vouchers en `ValidacionVouchers.vue`).
- Backend Hub: Node.js / Next.js en `server/` (Monolito en PM2, conexión a MongoDB vía `server/components/db.js`).
- Motor de Cierre MLM: Golang 1.20 en `cierre_engine/` (Goroutines concurrentes, compresión dinámica en RAM).
- Asistente de Salud: RAG semántico + Gemini 3.5/3.8 Flash en `server/components/ai-catalog.js`.
- Base de datos: MongoDB 6.x en AWS EC2 Ohio (`sifrah`).

Reglas críticas inquebrantables:
1. NUNCA alteres el saldo de un usuario sin pasar por el mutex en `server/components/wallet-lock.js`.
2. NUNCA omitas el triage clínico de `evaluateMedicalGuardrails` al modificar el chatbot de bienestar.
3. Respeta siempre la compresión dinámica del plan de compensación multinivel.
4. Preserva los comentarios y tipos existentes en el código.
```

---

## 🔌 2. Receta: Crear un Nuevo Endpoint Seguro en `server/`

```markdown
Necesito crear un nuevo endpoint en el backend de Sifrah:
- Ruta: POST /api/app/[nombre_del_endpoint]
- Ubicación: dentro de `server/pages/api/app/[nombre].js`
Requisitos:
1. Validar el token JWT de sesión del socio desde los headers de autorización.
2. Usar la conexión existente de `server/components/db.js` reutilizando el pool de Mongo.
3. Si la operación involucra movimientos de saldo, envuélvela con `withWalletLock` de `server/components/wallet-lock.js`.
4. Manejar errores con bloques try/catch devolviendo status HTTP semánticos (400, 401, 500) y JSON estructurado `{ success: false, error: "mensaje" }`.
5. Proporcionar un ejemplo de prueba con `curl`.
```

---

## 🌿 3. Receta: Extender el Asistente AI con un Nuevo Combo de Salud

```markdown
Quiero registrar un nuevo combo de suplementos en el Asistente de Bienestar de Sifrah:
- Archivo objetivo: `server/components/ai-catalog.js`
- Combo: [Nombre del Combo, ej. COMBO_RESPIRATORIO_PRO]
- Productos incluidos: [Producto A + Producto B]
- Puntos MLM generados: 80 PTS
Requisitos:
1. Registrar los tags de dolencias clave en la matriz ponderada (dolencia: peso 5, tag: peso 3, beneficio: peso 2).
2. Asegurar que las dolencias leves mapeen a este combo, pero que los síntomas graves sigan siendo interceptados por `evaluateMedicalGuardrails`.
3. Mantener la propagación del `refCode` del distribuidor para que el botón de compra final atribuya la venta.
```

---

## ⚡ 4. Receta: Agregar una Regla de Bono en el Motor de Go (`cierre_engine/`)

```markdown
Quiero implementar un nuevo cálculo de bono en el motor de cierre de Sifrah:
- Directorio objetivo: `cierre_engine/`
- Nombre del bono: [ej. Bono Liderazgo Zafiro]
Requisitos:
1. Implementar la función como una Goroutine concurrente coordinada con `sync.WaitGroup` en `main.go`.
2. Leer los volúmenes directamente de las estructuras en RAM del árbol genealógico sin hacer queries a la base de datos dentro del loop.
3. Respetar la regla de compresión dinámica: saltar patrocinadores no activos en el periodo.
4. Escribir el resultado acumulado en la estructura de liquidación contable final.
5. Incluir un test unitario en Go (`_test.go`) con un árbol mock de 10 usuarios.
```
