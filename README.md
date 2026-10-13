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

## 📁 Estructura del Repositorio

```text
sifrah-docs/
├── index.html                   # Portal interactivo con visualizador 3D y visor Archify
├── AGENTS.md                    # Manual maestro canónico para agentes de IA
├── .cursorrules                 # Reglas automáticas para Cursor IDE
├── package.json                 # Scripts de visualización local
│
├── archify_diagrams/            # Diagramas interactivos compilados con Archify
│   ├── sifrah-architecture.html # Mapa global interactivo
│   ├── sifrah-cierre-workflow.html # Flujo animado de cierre MLM
│   └── sifrah-assistant-sequence.html # Secuencia RAG & LLM
│
└── modules/                     # Módulos técnicos en Markdown
    ├── 01-arquitectura-global.md
    ├── 02-frontends-app-admin.md
    ├── 03-backend-api-hub.md
    ├── 04-cierre-engine-golang.md
    ├── 05-ia-rag-asistente.md
    ├── 06-esquemas-mongodb.md
    ├── 07-ai-playbook-prompts.md
    └── 08-devops-y-despliegues.md
```

---

## 👥 Cómo Alimentar y Colaborar en esta Documentación

Para agregar nuevas características o documentar cambios en el sistema:
1. Crea o actualiza el archivo Markdown correspondiente en `modules/`.
2. Si creas nuevos endpoints o colecciones, actualiza [`modules/06-esquemas-mongodb.md`](file:///Users/jordymontalvo/proyectos/sifrah/sifrah-docs/modules/06-esquemas-mongodb.md) y [`AGENTS.md`](file:///Users/jordymontalvo/proyectos/sifrah/sifrah-docs/AGENTS.md).
3. Si actualizas un diagrama de arquitectura, modifica el archivo `.candidate.json` correspondiente en `archify_diagrams/`.
4. Haz commit y push al repositorio de GitHub:
   ```bash
   git add .
   git commit -m "docs: actualizar módulo de comisiones"
   git push origin main
   ```

---

## 🌐 Publicación en GitHub Pages (Opcional)

Este repositorio está preparado para funcionar como una web estática en **GitHub Pages**:
1. Sube este repositorio a GitHub (ej. `github.com/tu-organizacion/sifrah-docs`).
2. Ve a **Settings > Pages**.
3. En **Source**, selecciona `Deploy from a branch` -> rama `main` -> carpeta `/ (root)`.
4. ¡Listo! Tendrás el portal interactivo accesible públicamente en `https://tu-organizacion.github.io/sifrah-docs/`.
