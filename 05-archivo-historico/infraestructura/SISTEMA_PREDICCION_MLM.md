# 🌐 Sistema Completo de Predicción MLM - Arquitectura Global

## 📋 Descripción General

Este documento describe la arquitectura completa del sistema de predicción de liderazgo MLM para Sifrah, incluyendo todos los componentes: modelos de IA, APIs, backend y frontend.

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (Vue.js - app/)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Dashboard   │  │  Admin Panel │  │  User Views  │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          │ HTTP/REST        │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────────┐
│              BACKEND (Next.js - server/)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  API Routes  │  │  Components  │  │  Middleware  │         │
│  │  /api/*      │  │  Services    │  │  Auth/CORS   │         │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘         │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          │ HTTP             │ MongoDB          │
          ▼                  ▼                  ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  AI Prediction  │  │    MongoDB      │  │  External APIs  │
│  Services       │  │    Database     │  │  (Email, etc)   │
│  (Flask)        │  │                 │  │                 │
└─────────┬───────┘  └─────────────────┘  └─────────────────┘
          │
          │ HTTP/REST
          ▼
┌─────────────────────────────────────────────────────────────────┐
│              MODELOS DE IA (Python)                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │  Real Data Model │  │  Quality Model   │  │  Heuristic   │ │
│  │  Port: 5000      │  │  Port: 5002      │  │  Fallback    │ │
│  │  ai_prediccion/  │  │  ai_prediccion/  │  │  ai_model_   │ │
│  │                  │  │                  │  │  clean/      │ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura de Componentes

### 1. **ai_prediccion/** - Sistema Principal de IA

**Propósito:** Modelos de Machine Learning entrenados para predicción de liderazgo

**Tecnologías:**
- Python 3.8+
- scikit-learn, pandas, numpy
- Flask (API REST)
- MongoDB (datos de entrenamiento)

**Modelos:**
- ✅ Modelo de Datos Reales (puerto 5000)
- ✅ Modelo de Calidad de Red (puerto 5002)
- ✅ Modelo Optimizado

**Endpoints:**
```
GET  /health
POST /predict
POST /predict/batch
GET  /model/info
POST /analyze/quality  (solo quality model)
```

**Documentación:** [ai_prediccion/README.md](ai_prediccion/README.md)

---

### 2. **ai_model_clean/** - Modelo Heurístico Fallback

**Propósito:** Modelo simple sin ML para fallback y prototipos

**Tecnologías:**
- Python 3.8+
- Flask, numpy
- Algoritmo basado en reglas

**Características:**
- ✅ No requiere entrenamiento
- ✅ Predicciones rápidas (<10ms)
- ✅ Fácil de entender y modificar
- ✅ Misma API que modelos ML

**Cuándo usar:**
- Prototipos rápidos
- Fallback cuando ML no disponible
- Baseline para comparar modelos

**Documentación:** [ai_model_clean/README.md](ai_model_clean/README.md)

---

### 3. **server/** - Backend Principal (Next.js)

**Propósito:** Backend de la plataforma, APIs REST, lógica de negocio

**Tecnologías:**
- Next.js 9.4.4
- MongoDB 3.5.9
- Express 4.21.2
- Nodemailer (emails)

**Componentes:**
```
server/
├── pages/api/              # Endpoints REST
│   ├── admin/              # Admin endpoints
│   ├── app/                # App endpoints
│   ├── auth/               # Autenticación
│   └── email/              # Sistema de emails
├── components/             # Servicios compartidos
│   ├── db.js               # MongoDB connection
│   ├── mlm-prediction-service.js  # Consume IA APIs
│   └── email-service.js    # Envío de emails
├── middleware/             # Middlewares (CORS, auth)
└── templates/              # Templates HTML
```

**Integración con IA:**
```javascript
// server/components/mlm-prediction-service.js
const AI_SERVICE_URL = process.env.PYTHON_API_URL || 'http://localhost:5000';

async function getPrediction(userFeatures) {
  const response = await fetch(`${AI_SERVICE_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userFeatures)
  });
  return await response.json();
}
```

**Documentación:** [server/README.md](server/README.md)

---

### 4. **app/** - Frontend (Vue.js)

**Propósito:** Interfaz de usuario de la plataforma MLM

**Tecnologías:**
- Vue.js 2.6
- Vuex (state management)
- Vue Router
- Stylus/CSS

**Características:**
- Dashboard de usuario
- Panel de administración
- Visualización de red MLM
- Gestión de afiliaciones

**Conexión con Backend:**
```javascript
// app/src/api.js
const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000';

async function getLeadershipPrediction(userId) {
  const response = await axios.get(`${API_URL}/api/admin/ai-leadership-predictions/${userId}`);
  return response.data;
}
```

---

### 5. **db/** - Scripts de Base de Datos

**Propósito:** Scripts para gestión y mantenimiento de MongoDB

**Contenido:**
- Scripts de inicialización
- Migraciones de datos
- Backups y restore
- Seeds de datos de prueba

---

## 🔄 Flujo de Predicción Completo

### 1. Usuario solicita predicción desde Frontend

```javascript
// app/src/views/admin/users.vue
async getPrediction(userId) {
  this.loading = true;
  const response = await this.$http.get(
    `/api/admin/ai-leadership-predictions/${userId}`
  );
  this.prediction = response.data;
  this.loading = false;
}
```

### 2. Backend procesa la solicitud

```javascript
// server/pages/api/admin/ai-leadership-predictions.js
export default async (req, res) => {
  // 1. Obtener usuario de MongoDB
  const user = await db.collection('users').findOne({ id: userId });
  
  // 2. Extraer features del usuario
  const features = extractUserFeatures(user);
  
  // 3. Llamar al servicio de IA
  const prediction = await mlmPredictionService.predict(features);
  
  // 4. Guardar predicción en DB (opcional)
  await savePrediction(userId, prediction);
  
  // 5. Retornar resultado
  res.json({ success: true, data: prediction });
};
```

### 3. Servicio de IA realiza predicción

```python
# ai_prediccion/src/api/mlm_api_server.py
@app.route('/predict', methods=['POST'])
def predict_leadership():
    data = request.get_json()
    
    # Preparar features
    features_array = mlm_model.prepare_features(data)
    
    # Escalar
    features_scaled = mlm_model.scaler.transform(features_array)
    
    # Predecir
    prediction = mlm_model.model.predict(features_scaled)[0]
    proba = mlm_model.model.predict_proba(features_scaled)[0]
    
    return jsonify({
        'success': True,
        'data': {
            'prediction': int(prediction),
            'leadership_level': map_label(prediction),
            'probability': float(proba[prediction]),
            'probabilities': format_probabilities(proba)
        }
    })
```

### 4. Resultado vuelve al Frontend

```javascript
// app/src/views/admin/users.vue
<div class="prediction-card">
  <h3>Predicción de Liderazgo</h3>
  <div :class="['level', prediction.leadership_level.toLowerCase()]">
    {{ prediction.leadership_level }}
  </div>
  <div class="probability">
    Confianza: {{ (prediction.probability * 100).toFixed(1) }}%
  </div>
  <div class="probabilities">
    <div>Bajo: {{ (prediction.probabilities.Bajo * 100).toFixed(1) }}%</div>
    <div>Medio: {{ (prediction.probabilities.Medio * 100).toFixed(1) }}%</div>
    <div>Alto: {{ (prediction.probabilities.Alto * 100).toFixed(1) }}%</div>
  </div>
</div>
```

---

## 🚀 Despliegue Completo

### Opción 1: Desarrollo Local

```bash
# Terminal 1: MongoDB
mongod --dbpath /data/db

# Terminal 2: Modelo de IA (Real Data)
cd ai_prediccion/
source venv/bin/activate
python src/api/mlm_api_server.py

# Terminal 3: Modelo de Calidad (opcional)
cd ai_prediccion/
PORT=5002 python src/api/mlm_api_server_quality.py

# Terminal 4: Backend Next.js
cd server/
npm install
npm run dev

# Terminal 5: Frontend Vue.js
cd app/
npm install
npm run serve

# Terminal 6: Admin Panel
cd admin/
npm install
npm run serve
```

**URLs:**
- Frontend App: http://localhost:8080
- Admin Panel: http://localhost:8081
- Backend API: http://localhost:3000
- IA Real Data: http://localhost:5000
- IA Quality: http://localhost:5002

---

### Opción 2: Producción con PM2

```bash
# Instalar PM2
npm install -g pm2

# Iniciar servicios
pm2 start ecosystem.config.js

# Ver estado
pm2 status

# Ver logs
pm2 logs
```

**ecosystem.config.js:**
```javascript
module.exports = {
  apps: [
    {
      name: 'server',
      script: 'server/server.js',
      env: { NODE_ENV: 'production', PORT: 3000 }
    },
    {
      name: 'ai-real',
      script: 'ai_prediccion/src/api/mlm_api_server.py',
      interpreter: 'python3',
      env: { PORT: 5000, MODEL_VARIANT: 'real' }
    },
    {
      name: 'ai-quality',
      script: 'ai_prediccion/src/api/mlm_api_server_quality.py',
      interpreter: 'python3',
      env: { PORT: 5002 }
    }
  ]
};
```

---

### Opción 3: Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  mongodb:
    image: mongo:4.4
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  ai-prediccion:
    build: ./ai_prediccion
    ports:
      - "5000:5000"
    environment:
      - DB_URL=mongodb://mongodb:27017/sifrah
      - MODEL_VARIANT=real
    depends_on:
      - mongodb

  ai-quality:
    build: ./ai_prediccion
    ports:
      - "5002:5002"
    environment:
      - DB_URL=mongodb://mongodb:27017/sifrah
      - PORT=5002
    depends_on:
      - mongodb

  server:
    build: ./server
    ports:
      - "3000:3000"
    environment:
      - DB_URL=mongodb://mongodb:27017/sifrah
      - PYTHON_API_URL=http://ai-prediccion:5000
    depends_on:
      - mongodb
      - ai-prediccion

  app:
    build: ./app
    ports:
      - "80:80"
    depends_on:
      - server

volumes:
  mongo-data:
```

```bash
# Iniciar todo
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

---

## 🔧 Variables de Entorno

### ai_prediccion/
```bash
DB_URL=mongodb://localhost:27017/sifrah
MODEL_VARIANT=real|quality|optimized
MODEL_PATH=/path/to/model.pkl
PORT=5000
DEBUG=False
LOG_LEVEL=INFO
```

### server/
```bash
NODE_ENV=production
PORT=3000
DB_URL=mongodb://localhost:27017/sifrah
PYTHON_API_URL=http://localhost:5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:8080
```

### app/
```bash
VUE_APP_API_URL=http://localhost:3000
VUE_APP_ENV=production
```

---

## 📊 Monitoreo y Logs

### Logs de IA
```bash
# Ver logs en tiempo real
tail -f ai_prediccion/logs/api_server.log

# Logs de entrenamiento
tail -f ai_prediccion/logs/training.log
```

### Logs del Backend
```bash
# Next.js logs
tail -f server/.next/*.log

# PM2 logs
pm2 logs server
```

### Métricas
```bash
# Estado de servicios
pm2 status

# Uso de recursos
pm2 monit
```

---

## 🐛 Troubleshooting

### Problema: IA no responde
```bash
# Verificar que el servicio está corriendo
curl http://localhost:5000/health

# Ver logs
tail -f ai_prediccion/logs/api_server.log

# Reiniciar
pm2 restart ai-real
```

### Problema: MongoDB connection failed
```bash
# Verificar MongoDB
mongo --eval "db.adminCommand('ping')"

# Verificar URL en .env
echo $DB_URL
```

### Problema: Features no coinciden
```bash
# Ver features esperadas
curl http://localhost:5000/model/info | jq '.feature_columns'

# Verificar en código
cat server/components/mlm-prediction-service.js
```

---

## 📈 Métricas del Sistema

### Performance
- **Predicción individual:** <50ms
- **Predicción batch (100 usuarios):** <2s
- **Throughput:** ~1000 predicciones/min
- **Uptime:** >99.9%

### Precisión de Modelos
- **Modelo Real Data:** ~90% accuracy, F1=0.85
- **Modelo Quality:** ~85% accuracy, F1=0.80
- **Modelo Heurístico:** ~65% accuracy (fallback)

---

## 🔄 Mantenimiento

### Re-entrenar modelos (mensual)
```bash
cd ai_prediccion/src/training/
python train_real_data.py
python train_quality_model.py

# Reiniciar APIs
pm2 restart ai-real ai-quality
```

### Backup de modelos
```bash
cd ai_prediccion/
tar -czf models_backup_$(date +%Y%m%d).tar.gz models/
mv models_backup_*.tar.gz backups/
```

### Actualizar dependencias
```bash
# Python
pip list --outdated
pip install -U package-name

# Node.js
npm outdated
npm update
```

---

## 📚 Documentación Completa

### Por Componente
- [ai_prediccion/README.md](ai_prediccion/README.md) - Sistema de IA
- [ai_prediccion/DOCUMENTACION_MODELOS_IA.md](ai_prediccion/DOCUMENTACION_MODELOS_IA.md) - Modelos técnicos
- [ai_model_clean/README.md](ai_model_clean/README.md) - Modelo heurístico
- [server/README.md](server/README.md) - Backend
- [app/README.md](app/README.md) - Frontend

### APIs
- [src/api/README.md](ai_prediccion/src/api/README.md) - Endpoints de IA
- [src/training/README.md](ai_prediccion/src/training/README.md) - Entrenamiento
- [src/utils/README.md](ai_prediccion/src/utils/README.md) - Utilidades
- [src/testing/README.md](ai_prediccion/src/testing/README.md) - Tests

---

## 🎯 Próximos Pasos

### Corto Plazo (1-3 meses)
- [ ] Implementar caching de predicciones
- [ ] Dashboard de métricas en tiempo real
- [ ] Alertas automáticas para líderes potenciales
- [ ] Tests de integración completos

### Mediano Plazo (3-6 meses)
- [ ] Modelo de series temporales
- [ ] Deep Learning con TensorFlow
- [ ] AutoML para optimización
- [ ] API GraphQL

### Largo Plazo (6-12 meses)
- [ ] Explicabilidad con SHAP values
- [ ] Recomendaciones personalizadas
- [ ] Modelo de detección de anomalías
- [ ] Sistema de A/B testing de modelos

---

## 👥 Equipo y Contacto

- **Desarrollo:** Equipo Sifrah
- **IA/ML:** Especialistas en Machine Learning
- **Backend:** Equipo Next.js
- **Frontend:** Equipo Vue.js

---

**Versión del Sistema:** 2.0.0  
**Última actualización:** Octubre 2024  
**Estado:** ✅ Producción



