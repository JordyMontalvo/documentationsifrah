# 🤖 Sistema de Predicción de Liderazgo MLM con IA

Sistema completo de Machine Learning para predecir líderes potenciales en redes MLM (Multi-Level Marketing) basado en comportamiento, actividad y métricas de red.

## 📋 Índice

- [Descripción](#-descripción)
- [Características](#-características)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Uso Rápido](#-uso-rápido)
- [Modelos Disponibles](#-modelos-disponibles)
- [API Reference](#-api-reference)
- [Documentación](#-documentación)

---

## 🎯 Descripción

Este proyecto implementa múltiples modelos de Machine Learning para identificar usuarios con alto potencial de liderazgo en empresas MLM. Los modelos analizan:

- 📊 **Comportamiento del usuario** (activaciones, afiliaciones)
- 🌳 **Estructura de red** (tamaño, profundidad, calidad)
- 💰 **Actividad financiera** (transacciones, comisiones)
- 📈 **Patrones de crecimiento** (consistencia, engagement)

### 🎯 Objetivos
- ✅ Identificar líderes potenciales tempranamente
- ✅ Optimizar recursos de capacitación
- ✅ Mejorar retención y crecimiento
- ✅ Tomar decisiones basadas en datos

---

## ✨ Características

- 🧠 **Múltiples modelos ML** (Random Forest, Gradient Boosting)
- 🎯 **2 enfoques distintos**: Datos Reales vs Calidad de Red
- 🚀 **APIs REST** listas para producción
- 📊 **Análisis detallado** con recomendaciones
- 🔄 **Re-entrenamiento** automático con datos nuevos
- 📈 **Métricas de rendimiento** (F1-Score, Accuracy)
- 🐳 **Docker ready** (opcional)

---

## 📁 Estructura del Proyecto

```
ai_prediccion/
├── 📄 README.md                          # Este archivo
├── 📄 DOCUMENTACION_MODELOS_IA.md       # Documentación técnica completa
├── 📄 PLAN_REORGANIZACION.md            # Plan de reorganización
├── 📄 requirements.txt                   # Dependencias Python
│
├── 🚀 src/                              # Código fuente
│   ├── api/                             # Servidores Flask
│   │   ├── mlm_api_server.py           # API principal (datos reales)
│   │   ├── mlm_api_server_quality.py   # API calidad de red
│   │   └── README.md
│   │
│   ├── training/                        # Entrenamiento de modelos
│   │   ├── train_real_data.py          # Entrenar con datos reales
│   │   ├── train_quality_model.py      # Entrenar modelo de calidad
│   │   ├── train_optimized.py          # Modelo optimizado
│   │   ├── create_training_data.py     # Crear datasets
│   │   ├── data_analyzer.py            # Análisis exploratorio
│   │   └── README.md
│   │
│   ├── utils/                           # Utilidades
│   │   ├── mongodb_connector.py        # Conector MongoDB
│   │   ├── config.py                   # Configuraciones
│   │   ├── demo_prediction.py          # Demo de predicciones
│   │   └── README.md
│   │
│   └── testing/                         # Tests
│       ├── test_quality_model.py       # Tests modelo calidad
│       ├── test_real_data_model.py     # Tests modelo real
│       ├── test_system.py              # Tests integración
│       └── README.md
│
├── 🗂️ models/                           # Modelos entrenados (.pkl)
│   ├── mlm_leadership_model_real_data.pkl
│   ├── mlm_leadership_model_network_quality.pkl
│   ├── mlm_leadership_model_optimized.pkl
│   └── README.md
│
├── 📊 data/                             # Datasets
│   ├── processed/                       # Datos procesados
│   │   ├── mlm_features_real_data.csv
│   │   ├── mlm_features_network_quality.csv
│   │   └── ...
│   └── README.md
│
├── 📝 logs/                             # Logs del sistema
│   ├── api_server.log
│   └── training.log
│
├── 📚 docs/                             # Documentación
│   ├── academic/                        # Papers y análisis
│   ├── technical/                       # Docs técnicas
│   ├── user/                            # Guías de usuario
│   └── INDICE_DOCUMENTACION.md
│
└── 🔧 scripts/                          # Scripts de utilidad
    ├── deployment/                      # Scripts de despliegue
    ├── testing/                         # Scripts de testing
    └── training/                        # Scripts de entrenamiento
```

---

## 🚀 Instalación

### Prerrequisitos

- Python 3.8+
- MongoDB 4.0+ (para datos reales)
- pip

### 1. Clonar y Navegar

```bash
cd ai_prediccion/
```

### 2. Crear Entorno Virtual

```bash
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# o
venv\Scripts\activate     # Windows
```

### 3. Instalar Dependencias

```bash
pip install -r requirements.txt
```

### 4. Configurar Variables de Entorno

```bash
# Crear archivo .env
cp .env.example .env

# Editar .env con tus configuraciones
export DB_URL=mongodb://localhost:27017/sifrah
export MODEL_DIR=./models
export PORT=5000
```

### 5. Verificar Instalación

```bash
# Test básico
python src/utils/demo_prediction.py
```

---

## 🎮 Uso Rápido

### Iniciar Servidor de Predicción

```bash
# Servidor principal (datos reales) - Puerto 5000
python src/api/mlm_api_server.py

# Servidor de calidad - Puerto 5002
PORT=5002 python src/api/mlm_api_server_quality.py
```

### Hacer una Predicción

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "plan_level": 3,
    "network_size": 25,
    "children_count": 8,
    "monthly_activations": 3,
    "monthly_affiliations": 2,
    "total_transactions": 15,
    "engagement_score": 450,
    "total_activations": 25,
    "growth_potential": 75
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "prediction": 2,
    "leadership_level": "Alto",
    "probability": 0.85,
    "probabilities": {
      "Bajo": 0.05,
      "Medio": 0.10,
      "Alto": 0.85
    },
    "model_info": {
      "algorithm": "RandomForestClassifier",
      "features_used": 24,
      "model_type": "Real"
    }
  }
}
```

### Re-entrenar Modelo

```bash
# Entrenar con datos reales
cd src/training/
python train_real_data.py

# Entrenar modelo de calidad
python train_quality_model.py
```

---

## 🤖 Modelos Disponibles

### 1. Modelo de Datos Reales
**Archivo:** `models/mlm_leadership_model_real_data.pkl`
**Puerto:** 5000

- **Enfoque:** Predicción basada en todas las métricas disponibles
- **Features:** 24 variables (red, transacciones, activaciones, etc.)
- **Algoritmo:** Random Forest / Gradient Boosting
- **Accuracy:** ~85-95%

**Uso:**
```bash
python src/api/mlm_api_server.py
```

### 2. Modelo de Calidad de Red
**Archivo:** `models/mlm_leadership_model_network_quality.pkl`
**Puerto:** 5002

- **Enfoque:** Calidad sobre cantidad, trabajo en equipo
- **Features:** 15 variables de calidad (actividad mensual, consistencia)
- **Algoritmo:** Random Forest / Gradient Boosting
- **Accuracy:** ~80-90%

**Características especiales:**
- Análisis detallado de calidad de directos
- Recomendaciones personalizadas
- Detección de trabajo en equipo 4+

**Uso:**
```bash
PORT=5002 python src/api/mlm_api_server_quality.py
```

### 3. Modelo Optimizado
**Archivo:** `models/mlm_leadership_model_optimized.pkl`

- **Enfoque:** Menos features, mejor generalización
- **Features:** 12-15 variables más relevantes
- **Algoritmo:** Optimizado con feature selection

---

## 🌐 API Reference

### Endpoints Comunes

#### `GET /health`
Verificar estado del servidor

```bash
curl http://localhost:5000/health
```

#### `POST /predict`
Predicción individual

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"network_size": 25, "monthly_activations": 3, ...}'
```

#### `POST /predict/batch`
Predicciones en lote

```bash
curl -X POST http://localhost:5000/predict/batch \
  -H "Content-Type: application/json" \
  -d '{"users": [{...}, {...}, ...]}'
```

#### `GET /model/info`
Información del modelo cargado

```bash
curl http://localhost:5000/model/info
```

### Endpoints Especiales (Calidad)

#### `POST /analyze/quality`
Análisis detallado de calidad de red

```bash
curl -X POST http://localhost:5002/analyze/quality \
  -H "Content-Type: application/json" \
  -d '{"direct_monthly_activations": 5, ...}'
```

**Respuesta incluye:**
- Análisis de directos
- Análisis personal
- Análisis de red
- Recomendaciones

---

## 📚 Documentación

### Documentación Técnica
- 📄 [**DOCUMENTACION_MODELOS_IA.md**](DOCUMENTACION_MODELOS_IA.md) - Documentación completa de modelos, variables y algoritmos

### READMEs por Módulo
- 🌐 [src/api/README.md](src/api/README.md) - APIs y servidores
- 🎓 [src/training/README.md](src/training/README.md) - Entrenamiento de modelos
- 🛠️ [src/utils/README.md](src/utils/README.md) - Utilidades
- 🧪 [src/testing/README.md](src/testing/README.md) - Tests

### Documentación Adicional
- 📚 [docs/](docs/) - Documentación académica, técnica y de usuario
- 📋 [PLAN_REORGANIZACION.md](PLAN_REORGANIZACION.md) - Plan de estructura

---

## 🧪 Testing

```bash
# Tests específicos
python src/testing/test_quality_model.py
python src/testing/test_real_data_model.py

# Todos los tests
python -m unittest discover -s src/testing

# Con verbose
python -m unittest src.testing.test_quality_model -v
```

---

## 🔧 Configuración Avanzada

### Variables de Entorno

```bash
# MongoDB
DB_URL=mongodb://localhost:27017/sifrah

# Modelos
MODEL_VARIANT=real|quality|optimized
MODEL_PATH=/path/to/model.pkl

# Servidor
PORT=5000
DEBUG=False

# Logs
LOG_LEVEL=INFO
LOG_FILE=logs/api_server.log
```

### Personalizar Modelo

Ver `DOCUMENTACION_MODELOS_IA.md` para:
- Agregar nuevas features
- Cambiar algoritmos
- Ajustar umbrales de clasificación
- Optimizar hiperparámetros

---

## 📊 Métricas de Rendimiento

### Modelos Actuales

| Modelo | Accuracy | F1-Score | Features | Speed |
|--------|----------|----------|----------|-------|
| Datos Reales | ~90% | ~0.85 | 24 | <50ms |
| Calidad de Red | ~85% | ~0.80 | 15 | <40ms |
| Optimizado | ~88% | ~0.83 | 12 | <30ms |

### Interpretación

- **F1-Score >= 0.8**: Modelo excelente ✅
- **F1-Score 0.6-0.8**: Modelo bueno ⚠️
- **F1-Score < 0.6**: Necesita mejoras ❌

---

## 🐳 Docker (Opcional)

```dockerfile
# Dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "src/api/mlm_api_server.py"]
```

```bash
# Build
docker build -t mlm-prediccion .

# Run
docker run -p 5000:5000 -e DB_URL=mongodb://host:27017/sifrah mlm-prediccion
```

---

## 🤝 Integración con Server Principal

El servidor Next.js (`server/`) consume estas APIs:

```javascript
// server/components/mlm-prediction-service.js
const response = await fetch('http://localhost:5000/predict', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(userFeatures)
});

const prediction = await response.json();
console.log(`Liderazgo: ${prediction.data.leadership_level}`);
```

---

## 🐛 Troubleshooting

### Error: Modelo no encontrado
```bash
# Verificar modelos
ls -lh models/*.pkl

# Entrenar si no existe
python src/training/train_real_data.py
```

### Error: MongoDB connection failed
```bash
# Verificar MongoDB está corriendo
mongo --eval "db.adminCommand('ping')"

# Actualizar URL
export DB_URL=mongodb://localhost:27017/sifrah
```

### Error: Features no coinciden
```bash
# Ver features esperadas
curl http://localhost:5000/model/info

# Incluir todas las features en request
```

---

## 📈 Roadmap

- [ ] Deep Learning con TensorFlow
- [ ] Modelo de series temporales
- [ ] Dashboard web de visualización
- [ ] AutoML para optimización
- [ ] Explicabilidad (SHAP values)
- [ ] API GraphQL
- [ ] Modelo ensemble combinando todos
- [ ] Alertas en tiempo real

---

## 📄 Licencia

Uso interno - Sifrah MLM Platform

---

## 👥 Contacto

- **Equipo:** Desarrollo Sifrah
- **Documentación:** Ver `/docs`
- **Issues:** Crear issue en repositorio
- **Logs:** Revisar `/logs`

---

**Versión:** 2.0.0  
**Última actualización:** Octubre 2024  
**Estado:** ✅ Producción
