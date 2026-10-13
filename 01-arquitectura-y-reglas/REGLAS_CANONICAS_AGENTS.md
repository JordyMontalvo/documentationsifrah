# Sifrah Ecosystem • Master AI Developer Guide (AGENTS.md)

Este documento es la **fuente de verdad canónica** para cualquier agente de inteligencia artificial (Cursor, Claude Code, GitHub Copilot, Antigravity, Windsurf, Aider) o desarrollador humano que trabaje en el repositorio de **Sifrah**.

---

## 🏛️ 1. Arquitectura y Stack Tecnológico

Sifrah es una plataforma empresarial híbrida de e-commerce y multinivel (MLM) con inteligencia artificial clínica y cálculo financiero de alta concurrencia:

| Capa | Directorio | Tecnología | Propósito |
| :--- | :--- | :--- | :--- |
| **App Distribuidor** | `app/` | Vue.js (2/3), Capacitor 5, Vuex | Oficina virtual móvil (Android/iOS) y web para socios de red. |
| **Panel Corporativo** | `admin/` | Vue.js, Tailwind/CSS, Vercel | Backoffice para tesorería, validación de vouchers y almacenes. |
| **API Hub Monolítico** | `server/` | Node.js, Next.js / Express, PM2 | Más de 120 endpoints REST en `api.serve-sifrah.xyz` (DigitalOcean). |
| **Motor de Cierre MLM** | `cierre_engine/` | Golang 1.20+, Goroutines | Cálculo masivo de rangos y bonos en RAM en < 15 segundos. |
| **Asistente RAG & Salud**| `server/components/`| Gemini 3.5/3.8 Flash, RAG | Triage médico, recomendación ponderada y combos de 80 PTS. |
| **Modelos ML Liderazgo**| `ai_prediccion/`| Python Flask (5000/5002), Scikit | Modelos predictivos de retención, volumen y churn de líderes. |
| **Persistencia Central**| `db/` (Remoto) | MongoDB 6.x en AWS EC2 (Ohio) | Base de datos `sifrah` en `ec2-18-220-240-71.us-east-2.compute.amazonaws.com:27017`. |
| **CDN & Almacenamiento**| Externo | Bunny.net Edge Storage | Hospedaje y entrega de vouchers bancarios y multimedia. |

---

## ⚠️ 2. Reglas Inquebrantables del Negocio (Anti-Alucinación)

Cualquier IA que genere código DEBE respetar estrictamente estas directrices:

### 1. Billetera y Saldos (Prevención de Doble Gasto)
* **NUNCA** modificar directamente el saldo de un usuario (`user.wallet_balance`) con una operación de base de datos directa.
* **SIEMPRE** utilizar el mutex de bloqueo en [`server/components/wallet-lock.js`](file:///Users/jordymontalvo/proyectos/sifrah/server/components/wallet-lock.js).
* Todo movimiento de saldo debe generar una transacción auditable en la colección `transactions` con estado, hash y motivo.

### 2. Motor de Cierre MLM y Compresión Dinámica
* El árbol multinivel contiene relaciones unilevel (`sponsor_id`) y binarias (`binary_parent`, `binary_side: "left"|"right"`).
* **Compresión Dinámica:** Si un distribuidor intermedio no calificó con sus puntos personales requeridos en el periodo, el motor de cierre **NO** pierde el volumen: lo comprime hacia la línea ascendente activa calificada más cercana.
* La lógica contable del cierre se procesa en el binario compilado de Go en `cierre_engine/`, nunca en scripts lentos de Node.

### 3. Triage Clínico y Guardrails del Asistente IA
* En [`server/components/ai-catalog.js`](file:///Users/jordymontalvo/proyectos/sifrah/server/components/ai-catalog.js), **NUNCA** eliminar ni saltarse la función `evaluateMedicalGuardrails(query)`.
* Si la consulta del usuario menciona condiciones de emergencia médica (infarto, hemorragia activa, tumor/cáncer, asfixia, dolor torácico severo), el bot **BLOQUEA** cualquier recomendación comercial de suplementos y responde con una derivación urgente a un centro hospitalario.
* Los productos son complementos nutricionales coadyuvantes, nunca fármacos curativos sustitutos.

### 4. Seguridad de la Base de Datos AWS MongoDB
* La base de datos de producción reside en una instancia AWS EC2 en Ohio.
* **PROHIBIDO** ejecutar `db.dropDatabase()`, `db.collection.drop()`, `deleteMany({})` o alterar índices sin WHERE específico.
* Para desarrollo local, utiliza una réplica local o variables `.env` de pruebas.

---

## 📂 3. Mapa de Rutas de Archivos ("¿Dónde está qué?")

| Si necesitas modificar... | Archivo / Directorio Clave |
| :--- | :--- |
| **Visualizador de Árbol Genealógico** | `app/src/views/Tree.vue` |
| **Proceso de Activación / Carrito de Puntos** | `app/src/views/Activation.vue` |
| **Retiros y Cobro de Comisiones** | `app/src/views/Collect.vue` y `server/components/wallet-lock.js` |
| **Widget Flotante del Asistente** | `app/src/components/SifrahAssistant.vue` |
| **Ruta API del Chatbot Asistente** | `server/pages/api/app/assistant.js` |
| **Catálogo RAG, Dolencias y Combos** | `server/components/ai-catalog.js` |
| **Validación Administrativa de Vouchers** | `admin/src/views/ValidacionVouchers.vue` |
| **Kardex y Stock de Sucursales** | `admin/src/views/Kadex.vue` |
| **Cálculo de Bonos y Rangos en Go** | `cierre_engine/main.go` y `cierre_engine/engine/` |
| **Conexión a MongoDB** | `server/components/db.js` |
| **Configuración de Procesos PM2** | `ecosystem.config.js` |

---

## 💻 4. Comandos de Desarrollo y Ejecución

### Backend Node.js / Next.js (`server/`):
```bash
cd server
npm install
npm run dev        # Servidor de desarrollo local
npm run build      # Compilación de producción
```

### Frontend App Móvil (`app/`):
```bash
cd app
npm install
npm run serve      # Dev server en navegador
npx cap sync       # Sincronizar cambios web hacia Android/iOS
npx cap open android # Abrir en Android Studio
```

### Frontend Admin Backoffice (`admin/`):
```bash
cd admin
npm install
npm run serve      # Dev server panel administrativo
npm run build      # Build para Vercel
```

### Motor de Cierre en Go (`cierre_engine/`):
```bash
cd cierre_engine
go build -o cierre_bin main.go # Compilar binario nativo
go test ./...                  # Correr pruebas unitarias
```

---

## 🤖 5. Protocolo de Trabajo para Asistentes IA

Al generar código para este repositorio:
1. **Respeta los comentarios y docstrings existentes** sin eliminarlos.
2. **Utiliza sintaxis de enlace de Markdown** (`[nombre](file:///ruta)`) para referenciar archivos modificados.
3. **No uses Tailwind en componentes Vanilla CSS** existentes a menos que el módulo ya lo implemente.
4. **Verifica siempre la idempotencia y concurrencia** en operaciones de billetera y stock.
5. **Asegúrate de que los IDs y atributos de accesibilidad** estén presentes en nuevos componentes interactivos.
