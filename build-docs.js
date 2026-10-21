/**
 * SIFRAH DOCS COMPILER
 * Escanea recursivamente todos los archivos .md y .pdf en sifrah-docs y genera docs-data.js
 * para que el lector funcione 100% offline y sin problemas de CORS en navegador.
 * Los PDF se indexan como entradas `type: 'pdf'` y el lector los abre con su visor integrado.
 */

const fs = require('fs');
const path = require('path');

// Títulos legibles para los PDF (si un PDF no aparece aquí, se deriva del nombre de archivo).
const PDF_TITLES = {
  'SIFRAH_Manual_Audio_en_Vivo.pdf': 'Manual de usuario: Audio en vivo (PDF imprimible)',
  'Guia_Publicacion_Google_Play_Sifrah.pdf': 'Guía de publicación en Google Play',
  'DOCUMENTACION_CLIENTE.pdf': 'Sistema MLM Leadership Prediction: documentación para cliente',
  'Documento_Funcional_Validacion_Vouchers_SIFRAH.pdf': 'Documento funcional: Validación de vouchers',
  'Logica_Promociones_SIFRAH.pdf': 'Lógica de promociones SIFRAH',
  'Propuesta_Audio_en_Vivo_Mixlr_SIFRAH.pdf': 'Propuesta funcional: Audio en vivo (Mixlr)',
  'bono_ahorro_sifrah.pdf': 'Documento funcional: Bono de Ahorro',
  'bono_generacional_vip_sifrah.pdf': 'Documento funcional: Bono Generacional VIP',
  'eliminacion y bloqueo de codigos sifrah.pdf': 'Eliminación y bloqueo de códigos SIFRAH'
};

function walk(dir) {
  let list = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    if (item.startsWith('.') || item === 'node_modules' || item === 'archify_diagrams' || item === 'templates') continue;
    const full = path.join(dir, item);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      list = list.concat(walk(full));
    } else if (item.endsWith('.md') || item.toLowerCase().endsWith('.pdf')) {
      list.push(full);
    }
  }
  return list;
}

function categoryFor(relPath) {
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
  return category;
}

function pdfTitleFromFilename(filename) {
  const base = filename.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  return base.charAt(0).toUpperCase() + base.slice(1);
}

function formatSize(bytes) {
  return bytes >= 1024 * 1024 ? (bytes / (1024 * 1024)).toFixed(1) + ' MB' : Math.round(bytes / 1024) + ' KB';
}

const files = walk(__dirname);
const pdfCount = files.filter((f) => f.toLowerCase().endsWith('.pdf')).length;
console.log(`[build-docs] Indexando ${files.length - pdfCount} archivos Markdown y ${pdfCount} PDF...`);

const catalog = [];

files.forEach((f) => {
  const relPath = path.relative(__dirname, f);
  const filename = path.basename(f);
  const category = categoryFor(relPath);

  if (filename.toLowerCase().endsWith('.pdf')) {
    const sizeBytes = fs.statSync(f).size;
    const title = PDF_TITLES[filename] || pdfTitleFromFilename(filename);
    // El contenido es una ficha breve: permite buscar el PDF y copiar su contexto para IA.
    const content = `# ${title}\n\nDocumento PDF · ${category} · ${formatSize(sizeBytes)}\n\nArchivo: \`${relPath}\``;
    catalog.push({
      type: 'pdf',
      title,
      filename,
      category,
      relPath,
      sizeBytes,
      wordCount: 0,
      lineCount: 0,
      readTimeMinutes: 0,
      content
    });
    return;
  }

  const content = fs.readFileSync(f, 'utf8');

  // Extraer el primer H1
  const lines = content.split('\n');
  const titleLine = lines.find((l) => l.trim().startsWith('# '));
  const title = titleLine ? titleLine.replace(/^#\s+/, '').trim() : filename;

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
