/**
 * SIFRAH DOCS COMPILER
 * Escanea recursivamente todos los archivos .md en sifrah-docs y genera docs-data.js
 * para que el lector funcione 100% offline y sin problemas de CORS en navegador.
 */

const fs = require('fs');
const path = require('path');

function walk(dir) {
  let list = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item.startsWith('.') || item === 'node_modules' || item === 'archify_diagrams' || item === 'templates') continue;
    const full = path.join(dir, item);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      list = list.concat(walk(full));
    } else if (item.endsWith('.md')) {
      list.push(full);
    }
  }
  return list;
}

const files = walk(__dirname);
console.log(`[build-docs] Indexando ${files.length} archivos Markdown...`);

const catalog = [];

files.forEach((f) => {
  const relPath = path.relative(__dirname, f);
  const content = fs.readFileSync(f, 'utf8');
  const filename = path.basename(f);

  // Extraer el primer H1
  const lines = content.split('\n');
  const titleLine = lines.find((l) => l.trim().startsWith('# '));
  const title = titleLine ? titleLine.replace(/^#\s+/, '').trim() : filename;

  // Determinar Categoría
  let category = '01. Arquitectura y Reglas';
  if (relPath.startsWith('06-manuales-de-usuario')) category = '06. Manuales de Usuario';
  else if (relPath.startsWith('02-desarrollo-por-capas')) category = '02. Desarrollo por Capas';
  else if (relPath.startsWith('03-ia-salud-y-datos')) category = '03. IA, Salud y Datos';
  else if (relPath.startsWith('04-devops-y-despliegues')) category = '04. DevOps y Despliegues';
  else if (relPath.startsWith('05-archivo-historico')) {
    if (relPath.includes('/admin/')) category = '05. Archivo Histórico (Admin)';
    else if (relPath.includes('/app/')) category = '05. Archivo Histórico (App)';
    else if (relPath.includes('/server/')) category = '05. Archivo Histórico (Server)';
    else if (relPath.includes('/db/')) category = '05. Archivo Histórico (DB)';
    else if (relPath.includes('/ai_prediccion/')) category = '05. Archivo Histórico (AI Predicción)';
    else if (relPath.includes('/infraestructura/')) category = '05. Archivo Histórico (Infraestructura)';
    else if (relPath.includes('/funcionales/')) category = '05. Archivo Histórico (Funcionales)';
    else category = '05. Archivo Histórico General';
  } else if (relPath === 'AGENTS.md' || relPath === 'CONTRIBUTING.md' || relPath === 'README.md') {
    category = '01. Arquitectura y Reglas';
  }

  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const lineCount = lines.length;
  const readTimeMinutes = Math.max(1, Math.round(words / 190));

  catalog.push({
    title,
    filename,
    category,
    relPath,
    wordCount: words,
    lineCount,
    readTimeMinutes,
    content
  });
});

catalog.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));

const targetFile = path.join(__dirname, 'docs-data.js');
const jsOutput = '/* AUTO-GENERATED SIFRAH DOCUMENTATION STORE */\nwindow.SIFRAH_DOCS = ' + JSON.stringify(catalog, null, 2) + ';\n';
fs.writeFileSync(targetFile, jsOutput, 'utf8');

console.log(`[build-docs] ✅ Compilación exitosa en docs-data.js (${catalog.length} documentos listos).`);
