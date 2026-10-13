# 📋 Plan de Reorganización - ai_prediccion/

## 🎯 Objetivo
Reorganizar el proyecto para mayor claridad, eliminar duplicados y mejorar la mantenibilidad.

## 📁 Nueva Estructura Propuesta

```
ai_prediccion/
├── 📄 README.md                           # Documentación principal
├── 📄 DOCUMENTACION_MODELOS_IA.md        # Documentación técnica de modelos
├── 📄 requirements.txt                    # Dependencias Python
│
├── 🚀 src/                               # Código fuente principal
│   ├── api/                              # Servidores API
│   │   ├── mlm_api_server.py            # API principal (datos reales)
│   │   ├── mlm_api_server_quality.py    # API calidad de red
│   │   └── __init__.py
│   │
│   ├── training/                         # Scripts de entrenamiento
│   │   ├── train_real_data.py           # Entrenar con datos reales
│   │   ├── train_quality_model.py       # Entrenar modelo de calidad
│   │   ├── train_optimized.py           # Entrenar modelo optimizado
│   │   ├── create_training_data.py      # Crear datasets
│   │   ├── data_analyzer.py             # Analizar datos
│   │   └── __init__.py
│   │
│   ├── utils/                            # Utilidades compartidas
│   │   ├── mongodb_connector.py         # Conector MongoDB
│   │   ├── config.py                    # Configuraciones
│   │   └── __init__.py
│   │
│   └── testing/                          # Tests del sistema
│       ├── test_api.py                  # Tests de API
│       ├── test_models.py               # Tests de modelos
│       ├── test_quality_model.py        # Tests modelo calidad
│       └── __init__.py
│
├── 🗂️ models/                            # Modelos entrenados (.pkl)
│   ├── mlm_leadership_model_real_data.pkl
│   ├── mlm_leadership_model_network_quality.pkl
│   ├── mlm_leadership_model_optimized.pkl
│   └── README.md                        # Descripción de modelos
│
├── 📊 data/                              # Datasets
│   ├── raw/                             # Datos crudos (opcional)
│   ├── processed/                       # Datos procesados
│   │   ├── mlm_features_real_data.csv
│   │   ├── mlm_features_network_quality.csv
│   │   └── ...
│   └── README.md                        # Descripción de datasets
│
├── 📝 logs/                              # Logs del sistema
│   ├── api_server.log
│   ├── training.log
│   └── .gitkeep
│
├── 📚 docs/                              # Documentación adicional
│   ├── academic/                        # Documentación académica
│   ├── technical/                       # Documentación técnica
│   ├── user/                            # Guías de usuario
│   └── INDEX.md                         # Índice de documentación
│
├── 🔧 scripts/                           # Scripts de utilidad
│   ├── deploy.sh                        # Script de despliegue
│   ├── start_server.sh                  # Iniciar servidor principal
│   ├── start_quality_server.sh          # Iniciar servidor de calidad
│   ├── setup.sh                         # Configuración inicial
│   └── backup_models.sh                 # Backup de modelos
│
└── 🧪 notebooks/                         # Jupyter notebooks (análisis)
    ├── exploratory_analysis.ipynb
    └── model_evaluation.ipynb
```

## 🗑️ Archivos a Eliminar/Consolidar

### Duplicados en scripts/deployment/
- ❌ `scripts/deployment/mlm_api_server.py` → Mover a `src/api/`
- ❌ `scripts/deployment/mlm_api_server_quality.py` → Mover a `src/api/`
- ❌ `scripts/deployment/mlm_api_server_synthetic.py` → Eliminar (no se usa)
- ❌ `scripts/deployment/mlm_api_server_quality_backup.py` → Eliminar (backup)

### Enlaces Simbólicos en Raíz
- ✅ Mantener pero actualizar rutas:
  - `mlm_api_server.py` → apuntar a `src/api/mlm_api_server.py`
  - `mlm_api_server_quality.py` → apuntar a `src/api/mlm_api_server_quality.py`
  - `start_ai_server.sh` → apuntar a `scripts/start_server.sh`

### Scripts de Training
- ✅ Consolidar en `src/training/`:
  - `retrain_with_real_data.py` → `train_real_data.py`
  - `train_network_quality_model.py` → `train_quality_model.py`
  - `retrain_optimized_model.py` → `train_optimized.py`

### Scripts de Testing
- ✅ Consolidar en `src/testing/`:
  - Mantener solo los tests activos
  - Eliminar `simple.py`, `test_simple.py` (muy básicos)

### Archivos de Configuración
- ✅ `scripts/config.py` → Mover a `src/utils/config.py`
- ✅ `scripts/mongodb_connector.py` → Mover a `src/utils/mongodb_connector.py`

### Archivos Obsoletos
- ❌ `scripts/deployment/backup_recovery.sh` → Mover a `scripts/backup_models.sh`
- ❌ `scripts/deployment/monitor_model.py` → Revisar si se usa
- ❌ `scripts/generate_pdf.py` → Eliminar (obsoleto)
- ❌ `scripts/generate_pdf_alternative.sh` → Eliminar (obsoleto)

### Modelo PKL en Raíz
- ❌ `mlm_leadership_model_real_data.pkl` → Ya está en `models/`, eliminar

## ✅ Acciones a Realizar

1. **Crear estructura de directorios**
   ```bash
   mkdir -p src/{api,training,utils,testing}
   mkdir -p data/{raw,processed}
   mkdir -p notebooks
   ```

2. **Mover archivos API**
   ```bash
   mv scripts/deployment/mlm_api_server.py src/api/
   mv scripts/deployment/mlm_api_server_quality.py src/api/
   ```

3. **Mover archivos de entrenamiento**
   ```bash
   cp scripts/training/retrain_with_real_data.py src/training/train_real_data.py
   cp scripts/training/train_network_quality_model.py src/training/train_quality_model.py
   ```

4. **Mover utilidades**
   ```bash
   mv scripts/config.py src/utils/
   mv scripts/mongodb_connector.py src/utils/
   ```

5. **Reorganizar data**
   ```bash
   mv data/*.csv data/processed/
   ```

6. **Crear archivos __init__.py**
   ```bash
   touch src/__init__.py
   touch src/api/__init__.py
   touch src/training/__init__.py
   touch src/utils/__init__.py
   touch src/testing/__init__.py
   ```

7. **Actualizar enlaces simbólicos**
   ```bash
   rm mlm_api_server.py
   ln -s src/api/mlm_api_server.py mlm_api_server.py
   ```

8. **Eliminar duplicados y archivos obsoletos**

9. **Actualizar imports en todos los scripts**

10. **Crear documentación README en cada carpeta**

## 📝 Beneficios de la Nueva Estructura

✅ **Claridad**: Separación clara entre API, training, utils, testing
✅ **Mantenibilidad**: Más fácil encontrar y modificar código
✅ **Escalabilidad**: Estructura preparada para crecimiento
✅ **Profesionalismo**: Sigue estándares de la industria
✅ **Menos duplicación**: Archivos únicos en ubicaciones lógicas



