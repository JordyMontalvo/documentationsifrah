# 📊 Documentación Completa - Sistema de Predicción de Liderazgo MLM

## 🎯 Descripción General

Este sistema utiliza Machine Learning para predecir el potencial de liderazgo de usuarios en una red MLM (Multi-Level Marketing) basándose en su comportamiento, actividad en la red y métricas de desempeño.

---

## 🤖 Modelos de Predicción Disponibles

### 1. **Modelo de Datos Reales** (Real Data Model)
**Archivo:** `mlm_leadership_model_real_data.pkl`
**Ubicación:** `models/`
**Puerto API:** 5000

#### Descripción
Modelo entrenado con datos reales de MongoDB que considera todas las métricas disponibles del negocio MLM.

#### Algoritmo
- **Random Forest** o **Gradient Boosting Classifier**
- Selección automática del mejor modelo basado en métricas F1-Score
- Optimización con validación cruzada

#### Variables Utilizadas (24 features)

| Variable | Descripción | Rango/Tipo |
|----------|-------------|------------|
| `user_id` | Identificador único del usuario | String |
| `plan_level` | Nivel del plan (1=basic, 2=pioneer, 3=master, 4=diamond, 5=crown) | 1-5 |
| `days_since_affiliation` | Días desde que se afilió al negocio | 0-∞ |
| `points` | Puntos acumulados totales | Float |
| `affiliation_points` | Puntos específicos de afiliación | Float |
| `network_level` | Nivel calculado en la jerarquía (basado en tamaño de red) | 1-4 |
| `children_count` | Número de referidos directos (hijos en el árbol) | Integer |
| `network_size` | Tamaño total de la red (incluyendo descendientes indirectos) | Integer |
| `total_transactions` | Número total de transacciones realizadas | Integer |
| `total_transaction_value` | Valor total de todas las transacciones | Float |
| `avg_transaction_value` | Valor promedio por transacción | Float |
| `total_affiliations` | Número total de afiliaciones (compras recurrentes) | Integer |
| `total_affiliation_value` | Valor total de afiliaciones | Float |
| `avg_affiliation_value` | Valor promedio por afiliación | Float |
| `affiliation_frequency` | Frecuencia de afiliaciones (afiliaciones/días) | Float |
| `total_activations` | Número total de activaciones de productos | Integer |
| `total_activation_value` | Valor total de activaciones | Float |
| `avg_activation_value` | Valor promedio por activación | Float |
| `total_collects` | Número de recolecciones/retiros realizados | Integer |
| `total_collect_value` | Valor total recolectado | Float |
| `avg_collect_value` | Valor promedio por recolección | Float |
| `engagement_score` | Score calculado de engagement (fórmula ponderada) | Float |
| `growth_potential` | Potencial de crecimiento calculado | Float |
| `leadership_score` | Score de liderazgo calculado | Float |

#### Fórmulas de Cálculo

```python
# Engagement Score
engagement_score = (
    children_count * 10 +
    network_size * 2 +
    total_transactions * 5 +
    total_transaction_value * 0.1 +
    total_affiliations * 8 +
    affiliation_frequency * 100 +
    total_activations * 6
)

# Leadership Score
leadership_score = 0
if network_size >= 20: leadership_score += 30
elif network_size >= 10: leadership_score += 20
elif network_size >= 5: leadership_score += 10

if total_transactions >= 15: leadership_score += 25
elif total_transactions >= 8: leadership_score += 15
elif total_transactions >= 3: leadership_score += 5

if total_affiliations >= 10: leadership_score += 20
elif total_affiliations >= 5: leadership_score += 12
elif total_affiliations >= 2: leadership_score += 5

if plan_level >= 4: leadership_score += 15
elif plan_level >= 3: leadership_score += 10
elif plan_level >= 2: leadership_score += 5

if engagement_score >= 500: leadership_score += 10
elif engagement_score >= 200: leadership_score += 5
```

#### Etiquetas de Clasificación
- **Clase 0 (Bajo):** Score < percentil 25
- **Clase 1 (Medio):** Score entre percentil 25-75
- **Clase 2 (Alto):** Score >= percentil 75

---

### 2. **Modelo de Calidad de Red** (Network Quality Model)
**Archivo:** `mlm_leadership_model_network_quality.pkl`
**Ubicación:** `models/`
**Puerto API:** 5002

#### Descripción
Modelo enfocado en la **calidad sobre la cantidad**. Prioriza la actividad mensual consistente y el trabajo en equipo real sobre el tamaño bruto de la red.

#### Filosofía del Modelo
> "Importa más tener 4 personas que trabajan activamente cada mes, que tener 100 personas inactivas en la red."

#### Algoritmo
- **Random Forest** o **Gradient Boosting Classifier**
- Optimizado para detectar patrones de consistencia y productividad

#### Variables Principales (15 features de calidad)

| Variable | Descripción | Importancia |
|----------|-------------|-------------|
| `monthly_activations` | Activaciones mensuales promedio | ⭐⭐⭐⭐⭐ |
| `monthly_affiliations` | Afiliaciones mensuales promedio | ⭐⭐⭐⭐⭐ |
| `activity_consistency` | Consistencia de activación (0-1) | ⭐⭐⭐⭐⭐ |
| `team_coactivation_4plus` | Indicador: >=4 en red hacen lo mismo | ⭐⭐⭐⭐⭐ |
| `direct_monthly_activations` | Directos que se activan mensualmente | ⭐⭐⭐⭐ |
| `direct_affiliates_count` | Directos que se han afiliado | ⭐⭐⭐⭐ |
| `direct_productivity_ratio` | Ratio de directos productivos | ⭐⭐⭐⭐ |
| `personal_monthly_activations` | Activaciones personales en últimos 3 meses | ⭐⭐⭐⭐ |
| `personal_activation_consistency` | Consistencia personal (0-1) | ⭐⭐⭐⭐ |
| `months_activated` | Meses con al menos 1 activación | ⭐⭐⭐ |
| `productive_network_size` | Tamaño de red productiva (no pasiva) | ⭐⭐⭐ |
| `network_quality_score` | Score de calidad de red (0-100) | ⭐⭐⭐ |
| `children_count` | Número de directos | ⭐⭐ |
| `network_size` | Tamaño total de red | ⭐⭐ |
| `plan_level` | Nivel del plan actual | ⭐ |

#### Fórmulas de Calidad

```python
# Activity Consistency (Consistencia de Activación)
months_since_affiliation = days_since_affiliation / 30.0
monthly_activations = total_activations / months_since_affiliation
activity_consistency = min(monthly_activations / 3.0, 1.0)  # 3 activaciones/mes = 100%

# Team Co-activation 4+ (Trabajo en Equipo)
team_coactivation_4plus = (
    (direct_monthly_activations >= 4) OR
    ((direct_productivity_ratio >= 0.5) AND (total_directs >= 4)) OR
    ((direct_affiliates >= 4) AND (direct_activation_ratio >= 0.5))
) ? 1 : 0

# Network Quality Score (0-100)
network_quality_score = (
    0.4 * activity_consistency +
    0.3 * min(monthly_affiliations / 2.0, 1.0) +
    0.3 * min(children_count / 4.0, 1.0)
) * 100.0

# Productive Network Size
productive_network_size = (activity_consistency > 0.3) ? children_count : 0
```

#### Criterios de Liderazgo (Calidad)

```python
quality_score = 0

# 50% - Trabajo en equipo + Actividad mensual
if team_coactivation_4plus AND monthly_act >= 3 AND monthly_aff >= 2:
    quality_score += 50
elif team_coactivation_4plus AND monthly_act >= 2:
    quality_score += 35
elif monthly_act >= 1 AND monthly_aff >= 1:
    quality_score += 20
elif monthly_act >= 1 OR monthly_aff >= 1:
    quality_score += 10

# 30% - Consistencia personal
if activity_consistency >= 0.8: quality_score += 30
elif activity_consistency >= 0.5: quality_score += 20
elif activity_consistency >= 0.2: quality_score += 10

# 20% - Soporte de red
if children_count >= 8 OR network_size >= 20: quality_score += 20
elif children_count >= 4 OR network_size >= 10: quality_score += 15
elif children_count >= 2 OR network_size >= 5: quality_score += 10
```

#### Análisis de Calidad Incluido

El modelo proporciona análisis detallado:

```json
{
  "direct_analysis": {
    "total_directos": 10,
    "directos_afiliados": 6,
    "directos_activos_mensual": 4,
    "ratio_productividad": "40%",
    "calidad_directos": "Alta|Media|Baja"
  },
  "personal_analysis": {
    "activaciones_mensuales": 3,
    "consistencia_activacion": "90%",
    "meses_con_activacion": 8,
    "disciplina_personal": "Alta|Media|Baja"
  },
  "network_analysis": {
    "calidad_red_score": "75.0/100",
    "red_productiva_tamaño": 8,
    "calidad_general": "Alta|Media|Baja"
  },
  "recommendations": [
    "Sugerencias específicas basadas en los datos"
  ]
}
```

---

### 3. **Modelo Heurístico** (Baseline Heuristic Model)
**Archivo:** `ai_model_clean/app.py`
**Puerto API:** 5000 (configurable)

#### Descripción
Modelo simplificado que no requiere entrenamiento. Usa reglas heurísticas ponderadas para calcular un score de liderazgo.

#### Uso
- Fallback cuando los modelos ML no están disponibles
- Pruebas rápidas sin dependencias de ML
- Baseline para comparar rendimiento

#### Variables Esperadas (24 features)

```python
FEATURE_KEYS = [
    "plan_level", "points", "affiliation_points",
    "network_size", "network_depth", "children_count",
    "monthly_activations", "monthly_affiliations", "engagement_score",
    "total_activations", "days_since_affiliation", "growth_potential",
    "leadership_score", "total_affiliations", "retention_score",
    "activity_frequency", "total_transaction_value", "average_transaction_value",
    "referrals_direct", "referrals_indirect", "recent_activity_days",
    "activity_consistency", "tree_branching_factor", "children_growth_rate"
]
```

#### Fórmula Heurística

```python
def compute_score(features):
    ns = clamp01(network_size / 50.0)
    es = clamp01(engagement_score / 100.0)
    ma = clamp01(monthly_activations / 10.0)
    mf = clamp01(monthly_affiliations / 5.0)
    pl = clamp01(plan_level / 5.0)
    ta = clamp01(total_activations / 20.0)
    gp = clamp01(growth_potential / 100.0)
    rs = clamp01(retention_score / 100.0)
    
    score = (
        ns * 0.20 +
        es * 0.20 +
        ma * 0.15 +
        mf * 0.15 +
        pl * 0.10 +
        ta * 0.10 +
        gp * 0.05 +
        rs * 0.05
    )
    return score

# Score -> Distribución de probabilidad
if score < 0.33:
    {"Bajo": alto%, "Medio": bajo%, "Alto": 0%}
elif score < 0.66:
    {"Bajo": 0%, "Medio": alto%, "Alto": medio%}
else:
    {"Bajo": 0%, "Medio": 0%, "Alto": 100%}
```

---

## 🔌 APIs y Endpoints

### Servidor Principal (Puerto 5000)
**Archivo:** `mlm_api_server.py`

```
GET  /health
     → Estado del servidor y modelo

POST /predict
     → Predicción individual
     Body: {features...}
     Response: {
       "success": true,
       "data": {
         "prediction": 2,
         "leadership_level": "Alto",
         "probability": 0.85,
         "probabilities": {"Bajo": 0.05, "Medio": 0.10, "Alto": 0.85}
       }
     }

POST /predict/batch
     → Predicciones en lote
     Body: {"users": [{features...}, ...]}

GET  /model/info
     → Información del modelo cargado

POST /compare
     → Comparar predicciones entre modelos
```

### Servidor de Calidad (Puerto 5002)
**Archivo:** `mlm_api_server_quality.py`

```
GET  /health
POST /predict
POST /predict/batch

POST /analyze/quality
     → Análisis detallado de calidad de red
     Response incluye: direct_analysis, personal_analysis,
                       network_analysis, recommendations

GET  /model/info
```

### Servidor Heurístico (Puerto 5000)
**Archivo:** `ai_model_clean/app.py`

```
GET  /health
POST /predict
GET  /model/info
```

---

## 📦 Dependencias

### Modelos ML (ai_prediccion)
```
pymongo>=4.6.0
pandas>=2.2.0
numpy>=1.26.0
scikit-learn>=1.4.0
matplotlib>=3.8.0
seaborn>=0.13.0
jupyter>=1.0.0
plotly>=5.18.0
xgboost>=2.0.0
lightgbm>=4.2.0
imbalanced-learn>=0.11.0
python-dotenv>=1.0.0
flask>=2.3.0
flask-cors>=4.0.0
```

### Modelo Heurístico (ai_model_clean)
```
Flask==2.3.3
numpy==1.26.4
joblib==1.4.2
```

---

## 🚀 Cómo Usar los Modelos

### 1. Iniciar Servidor de Predicción (Datos Reales)

```bash
cd ai_prediccion/
export MODEL_VARIANT=real
export PORT=5000
python mlm_api_server.py
```

### 2. Iniciar Servidor de Calidad

```bash
cd ai_prediccion/
export PORT=5002
python mlm_api_server_quality.py
```

### 3. Iniciar Modelo Heurístico

```bash
cd ai_model_clean/
export PORT=5000
python app.py
```

### 4. Hacer Predicción

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
    "engagement_score": 450
  }'
```

---

## 🔄 Re-entrenar Modelos

### Modelo de Datos Reales
```bash
cd ai_prediccion/scripts/training/
python retrain_with_real_data.py
```

### Modelo de Calidad de Red
```bash
cd ai_prediccion/scripts/training/
python train_network_quality_model.py
```

---

## 📊 Métricas de Rendimiento

### Evaluación de Modelos
- **Accuracy**: Precisión general del modelo
- **F1-Score**: Balance entre precisión y recall (principal métrica)
- **Classification Report**: Precisión por clase
- **Feature Importance**: Variables más influyentes

### Interpretación de Resultados
- **F1-Score >= 0.8**: Modelo excelente ✅
- **F1-Score 0.6-0.8**: Modelo bueno ⚠️
- **F1-Score < 0.6**: Modelo necesita mejoras ❌

---

## 💡 Recomendaciones de Uso

### Cuándo usar cada modelo:

1. **Modelo de Datos Reales** → Para análisis general y predicciones estándar
2. **Modelo de Calidad** → Para identificar líderes basados en trabajo en equipo y consistencia
3. **Modelo Heurístico** → Para pruebas rápidas o cuando no hay modelos ML disponibles

### Mejores Prácticas

1. **Actualizar datos regularmente**: Re-entrenar modelos cada mes con datos nuevos
2. **Monitorear rendimiento**: Verificar métricas de predicción periódicamente
3. **Validar resultados**: Comparar predicciones con resultados reales del negocio
4. **Combinar modelos**: Usar ensemble de múltiples modelos para mayor precisión

---

## 🐛 Troubleshooting

### Error: "Modelo no encontrado"
```bash
# Verificar que el modelo existe
ls -lh models/*.pkl

# Si no existe, entrenar:
cd scripts/training/
python retrain_with_real_data.py
```

### Error: "Features no coinciden"
```bash
# Ver features esperadas
curl http://localhost:5000/model/info

# Ajustar request con todas las features requeridas
```

### Error: "MongoDB connection failed"
```bash
# Verificar conexión MongoDB
mongo --eval "db.adminCommand('ping')"

# Actualizar URL de conexión en scripts/mongodb_connector.py
```

---

## 📚 Archivos Importantes

```
ai_prediccion/
├── models/                          # Modelos entrenados (.pkl)
│   ├── mlm_leadership_model_real_data.pkl
│   ├── mlm_leadership_model_network_quality.pkl
│   ├── mlm_leadership_model_optimized.pkl
│   └── mlm_leadership_model_strict.pkl
├── data/                            # Datasets procesados
│   ├── mlm_features_real_data.csv
│   └── mlm_features_network_quality.csv
├── mlm_api_server.py               # API principal
├── mlm_api_server_quality.py       # API de calidad
└── scripts/
    ├── training/                    # Scripts de entrenamiento
    ├── testing/                     # Scripts de prueba
    └── deployment/                  # Scripts de despliegue
```

---

## ✨ Conclusión

Este sistema proporciona predicciones robustas de liderazgo MLM usando:
- **Machine Learning** avanzado (Random Forest, Gradient Boosting)
- **Múltiples perspectivas** (datos reales vs calidad de red)
- **APIs flexibles** para integración fácil
- **Análisis detallado** con recomendaciones accionables

Para soporte adicional, consultar los scripts en `scripts/testing/` o revisar logs en `logs/`.



