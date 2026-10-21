# 💎 Sifrah Documentation & AI Developer Hub

Repositorio oficial y portal interactivo de arquitectura, especificaciones técnicas y guía de desarrollo asistido por IA para el ecosistema **Sifrah** (E-commerce MLM, Motor Financiero en Go y Asistente Nutricional RAG).

---

## 🚀 Inicio Rápido

### Visualizar el Portal de Documentación:
Puedes abrir el portal directamente en tu navegador o levantarlo con un servidor local:

```bash
# Opción 1: Abrir directamente en macOS
open index.html

# Opción 2: Servidor local HTTP
npm run dev
# Accede a http://localhost:8080 en tu navegador
```

---

## 🤖 Cómo Usar este Repositorio con tu IA de Desarrollo

Este proyecto está configurado bajo el estándar **AI-Ready** para asistentes como **Cursor, Claude Code, GitHub Copilot, Antigravity y Windsurf**:

1. **Lectura Automática de Reglas:**
   - [`AGENTS.md`](file:///Users/jordymontalvo/proyectos/sifrah/sifrah-docs/AGENTS.md): Fuente de verdad de arquitectura, contratos de datos y reglas de negocio.
   - [`.cursorrules`](file:///Users/jordymontalvo/proyectos/sifrah/sifrah-docs/.cursorrules): Instrucciones específicas para el editor Cursor.
2. **Botón de 1-Click Copy:**
   - Abre `index.html` y ve a la pestaña **`🤖 AI Dev Playbook`**.
   - Haz clic en **`[📋 Copiar Contexto Maestro]`** y pégalo como primer mensaje en tu sesión de Claude o ChatGPT.
3. **Plantillas de Prompts Listas:**
   - Revisa [`modules/07-ai-playbook-prompts.md`](file:///Users/jordymontalvo/proyectos/sifrah/sifrah-docs/modules/07-ai-playbook-prompts.md) para copiar recetas de prompts diseñadas para crear endpoints, modificar bonos en Go o extender el catálogo de salud.

---

## 📁 Estructura del Repositorio (Organizado en 6 Ejes Lógicos)

```text
sifrah-docs/
├── index.html                   # 🌐 Portal maestro con Topología 3D, Lector de Docs y AI Playbook
├── docs-data.js                 # ⚡ Catálogo indexado de todos los documentos Markdown y PDF (lo genera build-docs.js)
├── AGENTS.md                    # 🤖 Manual maestro canónico para agentes de IA
├── CONTRIBUTING.md              # 📘 Protocolo oficial de contribución para el equipo
├── .cursorrules                 # ⚡ Reglas automáticas para Cursor IDE
├── package.json                 # 📦 Scripts de visualización local (npm run dev)
│
├── 01-arquitectura-y-reglas/     # 🏛️ Visión global, topología y reglas inquebrantables de negocio
├── 02-desarrollo-por-capas/       # 💻 Frontend (App/Admin), Backend Node.js y Motor Cierre Go
├── 03-ia-salud-y-datos/           # 🧠 Asistente RAG, Triage clínico, Modelos Churn y Esquemas Mongo
├── 04-devops-y-despliegues/       # 🚀 DigitalOcean, PM2, Backups Bunny y Google Play Store
├── 05-archivo-historico/          # 📚 Toda la documentación previa organizada por subsistema
│   ├── server/                  # Documentación de endpoints, email, backups, CORS
│   ├── app/                     # Documentación de componentes, afiliados, debug
│   ├── admin/                   # Documentación de backoffice y árboles MLM
│   ├── db/                      # Modelado de datos y sistemas de rangos
│   ├── ai_prediccion/           # Memorias técnicas y manuales de modelos predictivos
│   ├── infraestructura/         # Procedimientos de migración y servidores
│   └── funcionales/             # Documentos funcionales Word/PDF de negocio
├── 06-manuales-de-usuario/        # 📖 Manuales paso a paso con capturas reales (Markdown + PDF imprimible)
│   └── img/                     # Capturas anotadas, una carpeta por manual
│
├── archify_diagrams/            # 📊 Diagramas interactivos vectoriales (Archify Engine)
└── templates/                   # 📝 Plantillas ADR para registrar decisiones mayores
```

---

## 👥 Cómo Alimentar y Colaborar en esta Documentación

Para agregar nuevas características o documentar cambios en el sistema:
1. Crea o actualiza el archivo Markdown en el eje temático correspondiente (`01-`, `02-`, `03-`, `04-`, `06-`):
   - Documentación técnica de una funcionalidad → `02-`, `03-` o `04-` según la capa.
   - Manual de usuario (paso a paso con capturas) → `06-manuales-de-usuario/`: un `.md` con las capturas en `img/<manual>/` (rutas relativas a la raíz, p. ej. `06-manuales-de-usuario/img/<manual>/paso.png`) y, si existe, su PDF imprimible al lado.
   - Documento funcional o propuesta de negocio (Word/PDF) → `05-archivo-historico/funcionales/`. Si es un `.docx`, súbelo también convertido a PDF: los navegadores no muestran Word.
   - **Los PDF se indexan solos** y se abren en el lector PDF integrado del portal (miniaturas, zoom, pantalla completa y descarga). Para darle un título legible, añádelo a `PDF_TITLES` en `build-docs.js`; si no, se deriva del nombre del archivo. Los enlaces a `.pdf` o `.md` dentro de un documento también se abren en el lector.
   - El lector PDF completo funciona con `npm run dev` o GitHub Pages. Si abres `index.html` con doble clic (`file://`), se usa el visor nativo del navegador.
2. Si tomas decisiones importantes de arquitectura, usa la plantilla [templates/ADR_TEMPLATE.md](file:///Users/jordymontalvo/proyectos/sifrah/sifrah-docs/templates/ADR_TEMPLATE.md).
3. Re-indexa el catálogo ejecutando:
   ```bash
   npm run build-docs
   ```
4. Haz commit y push a la rama `master`:
   ```bash
   git add .
   git commit -m "docs: actualizar módulo de comisiones"
   git push origin master
   ```

---

## 🌐 Publicación en GitHub Pages

Este repositorio está preparado para funcionar como una web estática en **GitHub Pages**:
1. Entra a tu repositorio: `https://github.com/JordyMontalvo/documentationsifrah`.
2. Ve a **Settings > Pages**.
3. En **Source**, selecciona `Deploy from a branch` -> rama `master` -> carpeta `/ (root)`.
4. ¡Listo! Tendrás el portal interactivo y el visor de documentos en vivo en la web.
