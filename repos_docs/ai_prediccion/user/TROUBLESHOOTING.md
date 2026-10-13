# 🚨 GUÍA DE TROUBLESHOOTING - Sistema MLM Leadership Prediction

## 📋 **INFORMACIÓN GENERAL**

**Propósito**: Solución rápida de problemas comunes del sistema  
**Audiencia**: Usuarios, administradores y desarrolladores  
**Nivel**: Desde básico hasta técnico avanzado

## 🔍 **DIAGNÓSTICO RÁPIDO**

### **Checklist de Verificación**
```
□ Servidor Python corriendo en puerto 5001
□ Servidor Node.js corriendo en puerto 3000
□ Admin panel corriendo en puerto 8081
□ MongoDB accesible y funcionando
□ Modelo .pkl cargado correctamente
□ CORS configurado para todos los orígenes
□ Todas las dependencias instaladas
```

### **Comandos de Verificación Rápida**
```bash
# Verificar servidores
curl http://localhost:5001/health
curl http://localhost:3000/api/mlm-api/health
curl http://localhost:8081

# Verificar puertos
netstat -tulpn | grep :5001
netstat -tulpn | grep :3000
netstat -tulpn | grep :8081

# Verificar procesos
ps aux | grep python
ps aux | grep node
```

## 🚨 **PROBLEMAS CRÍTICOS**

### **1. ERROR: "Modelo no disponible"**

#### **Síntomas**
- Interfaz muestra "Modelo no disponible" en rojo
- No se pueden hacer predicciones
- Error 500 en endpoints de IA

#### **Causas Posibles**
1. **Servidor Python no está corriendo**
2. **Modelo .pkl no encontrado**
3. **Dependencias Python faltantes**
4. **Error en carga del modelo**

#### **Soluciones**

##### **Solución 1: Verificar Servidor Python**
```bash
cd ml-prediction
./start_ai_server.sh

# Verificar logs
tail -f output.log
```

##### **Solución 2: Verificar Modelo**
```bash
# Verificar que el archivo existe
ls -la mlm_leadership_model.pkl

# Verificar tamaño (debe ser ~400KB)
du -h mlm_leadership_model.pkl

# Probar carga del modelo
python3 -c "import pickle; pickle.load(open('mlm_leadership_model.pkl', 'rb'))"
```

##### **Solución 3: Instalar Dependencias**
```bash
cd ml-prediction
source venv/bin/activate
pip install -r requirements.txt
pip install flask-cors
```

##### **Solución 4: Reiniciar Servidor**
```bash
# Matar procesos existentes
pkill -f "python.*mlm_api_server"
pkill -f "flask"

# Reiniciar
./start_ai_server.sh
```

### **2. ERROR: "Error cargando predicciones"**

#### **Síntomas**
- Mensaje de error en la interfaz
- Tabla vacía o con errores
- Errores en consola del navegador

#### **Causas Posibles**
1. **Servidor Node.js no está corriendo**
2. **Error en conexión MongoDB**
3. **Error en servicio de IA**
4. **Problema de CORS**

#### **Soluciones**

##### **Solución 1: Verificar Servidor Node.js**
```bash
cd server
npm run dev

# Verificar logs
tail -f server.log
```

##### **Solución 2: Verificar MongoDB**
```bash
# Verificar conexión
mongo sifrah --eval "db.users.count()"

# Verificar colecciones
mongo sifrah --eval "show collections"
```

##### **Solución 3: Verificar CORS**
```bash
# Verificar configuración CORS
cat middleware-cors.js

# Verificar orígenes permitidos
grep "allowedOrigins" middleware-cors.js
```

##### **Solución 4: Reiniciar Servicios**
```bash
# Reiniciar todo
cd server && npm run dev &
cd ../admin && npm run serve &
cd ../ml-prediction && ./start_ai_server.sh &
```

### **3. ERROR: "Input X contains NaN"**

#### **Síntomas**
- Error 500 en predicciones
- Logs muestran "Input X contains NaN"
- Predicciones fallan para algunos usuarios

#### **Causas Posibles**
1. **Features con valores null/undefined**
2. **Datos corruptos en MongoDB**
3. **Error en cálculo de features**
4. **Modelo espera diferentes features**

#### **Soluciones**

##### **Solución 1: Verificar Features**
```bash
# Verificar estructura de datos
mongo sifrah --eval "db.users.findOne()"

# Verificar colecciones relacionadas
mongo sifrah --eval "db.affiliations.findOne()"
mongo sifrah --eval "db.activations.findOne()"
```

##### **Solución 2: Corregir Cálculo de Features**
```javascript
// En mlm-ai-service.js, agregar validación
const safeValue = (value) => {
  if (value === null || value === undefined || isNaN(value)) {
    return 0;
  }
  return Number(value);
};
```

##### **Solución 3: Verificar Modelo**
```bash
# Verificar features esperadas
python3 -c "
import pickle
model_data = pickle.load(open('mlm_leadership_model.pkl', 'rb'))
print('Features:', model_data['feature_columns'])
"
```

### **4. ERROR: "CORS policy"**

#### **Síntomas**
- Error en consola del navegador
- "Access to XMLHttpRequest blocked by CORS policy"
- No se pueden hacer requests desde admin panel

#### **Causas Posibles**
1. **CORS no configurado correctamente**
2. **Orígenes no incluidos en allowedOrigins**
3. **Middleware CORS no aplicado**
4. **Configuración incorrecta en servidores**

#### **Soluciones**

##### **Solución 1: Verificar Configuración CORS**
```javascript
// En middleware-cors.js
const allowedOrigins = [
  'http://localhost:8081',
  'http://localhost:8082', 
  'http://localhost:3000',
  'https://yourdomain.com'
];
```

##### **Solución 2: Verificar Middleware**
```bash
# Verificar que CORS esté aplicado
grep -r "applyCORS" server/

# Verificar en endpoints
grep -r "setHeader.*CORS" server/
```

##### **Solución 3: Configurar CORS en Python**
```python
# En mlm_api_server.py
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:8081', 'http://localhost:3000'])
```

## 🔧 **PROBLEMAS DE RENDIMIENTO**

### **1. Predicciones Lentas**

#### **Síntomas**
- Tiempo de respuesta >2 segundos
- Interfaz se congela durante predicciones
- Timeouts en requests

#### **Soluciones**

##### **Solución 1: Optimizar MongoDB**
```bash
# Crear índices para queries frecuentes
mongo sifrah --eval "
db.users.createIndex({id: 1})
db.affiliations.createIndex({userId: 1})
db.activations.createIndex({userId: 1})
db.transactions.createIndex({user_id: 1})
"
```

##### **Solución 2: Implementar Cache**
```javascript
// Agregar cache simple
const predictionCache = new Map();

async function getCachedPrediction(userId) {
  if (predictionCache.has(userId)) {
    return predictionCache.get(userId);
  }
  
  const prediction = await getPrediction(userId);
  predictionCache.set(userId, prediction);
  return prediction;
}
```

##### **Solución 3: Optimizar Features**
```javascript
// Reducir queries innecesarios
const features = await Promise.all([
  getUserFeatures(userId),
  getNetworkFeatures(userId),
  getActivityFeatures(userId)
]);
```

### **2. Memoria Alta**

#### **Síntomas**
- Uso de memoria >500MB
- Servidor se ralentiza
- Crashes por falta de memoria

#### **Soluciones**

##### **Solución 1: Limpiar Cache**
```javascript
// Limpiar cache periódicamente
setInterval(() => {
  predictionCache.clear();
}, 300000); // 5 minutos
```

##### **Solución 2: Optimizar Queries**
```javascript
// Usar proyecciones para reducir datos
const user = await db.collection('users')
  .findOne({ _id: userId }, { 
    projection: { 
      name: 1, 
      email: 1, 
      plan: 1,
      points: 1 
    } 
  });
```

##### **Solución 3: Paginación Eficiente**
```javascript
// Implementar paginación en base de datos
const users = await db.collection('users')
  .find({})
  .skip((page - 1) * limit)
  .limit(limit)
  .toArray();
```

## 📊 **PROBLEMAS DE DATOS**

### **1. Predicciones Incorrectas**

#### **Síntomas**
- Todos los usuarios clasificados igual
- Probabilidades siempre 100%
- Rankings no realistas

#### **Soluciones**

##### **Solución 1: Verificar Modelo**
```bash
# Probar modelo con datos conocidos
python3 -c "
import pickle
model_data = pickle.load(open('mlm_leadership_model.pkl', 'rb'))
print('Modelo:', type(model_data['model']))
print('Features:', len(model_data['feature_columns']))
"
```

##### **Solución 2: Verificar Features**
```javascript
// Log de features enviadas
console.log('Features enviadas:', features);

// Verificar que no sean todas iguales
const uniqueValues = new Set(Object.values(features));
console.log('Valores únicos:', uniqueValues.size);
```

##### **Solución 3: Reentrenar Modelo**
```bash
# Si el modelo está sobreajustado
cd ml-prediction
python3 mlm_leadership_model.py
```

### **2. Datos Faltantes**

#### **Síntomas**
- Usuarios sin predicciones
- Features con valores 0
- Errores en cálculo de métricas

#### **Soluciones**

##### **Solución 1: Verificar Integridad de Datos**
```bash
# Verificar usuarios sin datos relacionados
mongo sifrah --eval "
db.users.aggregate([
  { \$lookup: { from: 'affiliations', localField: 'id', foreignField: 'userId', as: 'affs' }},
  { \$match: { affs: { \$size: 0 }}},
  { \$count: 'usuarios_sin_afiliaciones' }
])
"
```

##### **Solución 2: Valores por Defecto**
```javascript
// Establecer valores por defecto
const defaultFeatures = {
  plan_level: 1,
  network_size: 0,
  monthly_activations: 0,
  // ... más valores por defecto
};

const features = { ...defaultFeatures, ...userFeatures };
```

##### **Solución 3: Limpiar Datos**
```bash
# Eliminar usuarios corruptos
mongo sifrah --eval "
db.users.deleteMany({
  \$or: [
    { name: null },
    { email: null },
    { plan: null }
  ]
})
"
```

## 🌐 **PROBLEMAS DE RED**

### **1. Conexión Rechazada**

#### **Síntomas**
- "Connection refused"
- "ECONNREFUSED"
- No se puede conectar a servidores

#### **Soluciones**

##### **Solución 1: Verificar Puertos**
```bash
# Verificar qué está usando cada puerto
lsof -i :5001
lsof -i :3000
lsof -i :8081

# Matar procesos conflictivos
sudo kill -9 $(lsof -t -i:5001)
sudo kill -9 $(lsof -t -i:3000)
```

##### **Solución 2: Verificar Firewall**
```bash
# Verificar reglas de firewall
sudo ufw status

# Permitir puertos si es necesario
sudo ufw allow 5001
sudo ufw allow 3000
sudo ufw allow 8081
```

##### **Solución 3: Verificar Configuración de Red**
```bash
# Verificar interfaces de red
ip addr show

# Verificar routing
route -n
```

### **2. Timeouts de Conexión**

#### **Síntomas**
- Requests tardan mucho tiempo
- "Request timeout"
- Conexiones se cierran

#### **Soluciones**

##### **Solución 1: Aumentar Timeouts**
```javascript
// En mlm-ai-service.js
const response = await axios.post(url, data, {
  timeout: 30000, // 30 segundos
  headers: { 'Content-Type': 'application/json' }
});
```

##### **Solución 2: Implementar Retry**
```javascript
// Implementar reintentos automáticos
async function retryRequest(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

## 🔄 **PROBLEMAS DE ACTUALIZACIÓN**

### **1. Predicciones No Se Actualizan**

#### **Síntomas**
- Datos desactualizados
- Cambios no reflejados
- Cache obsoleto

#### **Soluciones**

##### **Solución 1: Forzar Actualización**
```bash
# Reiniciar todos los servicios
cd server && npm run dev &
cd ../admin && npm run serve &
cd ../ml-prediction && ./start_ai_server.sh &
```

##### **Solución 2: Limpiar Cache**
```javascript
// Limpiar cache del navegador
localStorage.clear();
sessionStorage.clear();

// Recargar página
window.location.reload();
```

##### **Solución 3: Verificar Base de Datos**
```bash
# Verificar última modificación
mongo sifrah --eval "
db.users.aggregate([
  { \$sort: { _id: -1 }},
  { \$limit: 1 },
  { \$project: { _id: 1, updatedAt: 1 }}
])
"
```

### **2. Errores en Actualización Batch**

#### **Síntomas**
- Error al hacer clic en "Actualizar Predicciones"
- Proceso se interrumpe
- Usuarios sin actualizar

#### **Soluciones**

##### **Solución 1: Verificar Logs**
```bash
# Ver logs del servidor
tail -f server/server.log
tail -f ml-prediction/output.log
```

##### **Solución 2: Actualización Incremental**
```javascript
// Implementar actualización por lotes pequeños
const batchSize = 10;
for (let i = 0; i < users.length; i += batchSize) {
  const batch = users.slice(i, i + batchSize);
  await processBatch(batch);
  await new Promise(resolve => setTimeout(resolve, 1000));
}
```

##### **Solución 3: Verificar Recursos**
```bash
# Verificar uso de memoria y CPU
top -p $(pgrep node)
top -p $(pgrep python)

# Verificar espacio en disco
df -h
```

## 📱 **PROBLEMAS DE INTERFAZ**

### **1. Interfaz No Responde**

#### **Síntomas**
- Botones no funcionan
- Tabla no se actualiza
- JavaScript errors en consola

#### **Soluciones**

##### **Solución 1: Verificar Consola del Navegador**
```javascript
// Abrir DevTools (F12)
// Verificar errores en Console
// Verificar errores en Network
```

##### **Solución 2: Verificar Vue.js**
```javascript
// Verificar que Vue esté funcionando
console.log('Vue version:', Vue.version);
console.log('Component mounted:', this.$el);
```

##### **Solución 3: Recargar Página**
```bash
# Recargar completamente
Ctrl + F5 (Windows/Linux)
Cmd + Shift + R (Mac)
```

### **2. Problemas de Responsividad**

#### **Síntomas**
- Interfaz no se adapta a móviles
- Elementos se superponen
- Scroll horizontal no deseado

#### **Soluciones**

##### **Solución 1: Verificar CSS**
```css
/* Asegurar responsividad */
@media (max-width: 768px) {
  .predictions-table {
    font-size: 12px;
  }
  
  .user-cell {
    max-width: 150px;
  }
}
```

##### **Solución 2: Verificar Meta Tags**
```html
<!-- En index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## 🚀 **PROBLEMAS DE DESPLIEGUE**

### **1. Error en Heroku**

#### **Síntomas**
- Build falla
- App no inicia
- Logs muestran errores

#### **Soluciones**

##### **Solución 1: Verificar Buildpack**
```bash
# Verificar buildpacks
heroku buildpacks --app your-app-name

# Agregar buildpack de Node.js si es necesario
heroku buildpacks:add heroku/nodejs
```

##### **Solución 2: Verificar Variables de Entorno**
```bash
# Verificar variables configuradas
heroku config --app your-app-name

# Configurar variables necesarias
heroku config:set NODE_ENV=production --app your-app-name
heroku config:set MONGODB_URI=your-mongo-uri --app your-app-name
```

##### **Solución 3: Verificar Logs de Heroku**
```bash
# Ver logs en tiempo real
heroku logs --tail --app your-app-name

# Ver logs específicos
heroku logs --app your-app-name | grep "Error"
```

### **2. Error en Vercel**

#### **Síntomas**
- Deploy falla
- Build errors
- App no funciona en producción

#### **Soluciones**

##### **Solución 1: Verificar Configuración**
```json
// En vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ]
}
```

##### **Solución 2: Verificar Variables de Entorno**
```bash
# En dashboard de Vercel
# Agregar variables:
# MONGODB_URI
# API_URL
# CORS_ORIGIN
```

## 📞 **CONTACTO Y SOPORTE**

### **Información de Contacto**
- **Desarrollador**: Claude Sonnet 4
- **Fecha de Implementación**: 19 de Agosto, 2024
- **Versión del Sistema**: 2.0.0

### **Recursos de Ayuda**
- **Manual Técnico**: `MANUAL_TECNICO.md`
- **Documentación del Sistema**: `DOCUMENTACION_SISTEMA_COMPLETA.md`
- **Manual de Usuario**: `MANUAL_USUARIO.md`

### **Comandos de Emergencia**
```bash
# Reiniciar todo el sistema
cd /home/saywite/Documents/sifrah
./scripts/restart-services.sh

# Verificar estado completo
./scripts/test-system.sh

# Backup de configuración
./scripts/backup-config.sh
```

---

**Fecha de creación**: 19 de Agosto, 2024  
**Versión**: 2.0.0 (Guía Completa de Troubleshooting)  
**Estado**: ✅ COMPLETAMENTE DOCUMENTADO  
**Próxima actualización**: 26 de Agosto, 2024 