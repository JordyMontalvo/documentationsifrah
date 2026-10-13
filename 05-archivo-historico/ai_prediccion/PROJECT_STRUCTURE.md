# 📁 ESTRUCTURA ORGANIZADA DEL PROYECTO MLM LEADERSHIP PREDICTION

## 🏗️ **ESTRUCTURA DE CARPETAS**

```
ml-prediction/
├── 📄 README.md                    # Documentación principal del proyecto
├── 📄 requirements.txt             # Dependencias Python
├── 📄 PROJECT_STRUCTURE.md         # Este archivo (estructura del proyecto)
│
├── 📁 data/                        # Datos extraídos de MongoDB
│   ├── activations.csv             # Datos de activaciones
│   ├── affiliations.csv            # Datos de afiliaciones
│   ├── collects.csv                # Datos de recolecciones
│   ├── transactions.csv            # Datos de transacciones
│   ├── tree.csv                    # Estructura de red MLM
│   └── users.csv                   # Datos de usuarios
│
├── 📁 models/                      # Modelos entrenados
│   ├── mlm_leadership_model.pkl           # Modelo original (sintético)
│   └── mlm_leadership_model_real_data.pkl # Modelo con datos reales ⭐
│
├── 📁 scripts/                     # Scripts de Python y Shell
│   ├── 📁 training/                # Scripts de entrenamiento
│   │   ├── mlm_leadership_model.py
│   │   ├── mlm_leadership_model_fixed.py
│   │   ├── create_training_data.py
│   │   ├── data_analyzer.py
│   │   └── retrain_with_real_data.py
│   │
│   ├── 📁 testing/                 # Scripts de pruebas
│   │   ├── test_debug.py
│   │   ├── test_real_data_model.py
│   │   ├── test_simple.py
│   │   ├── test_step_by_step.py
│   │   ├── test_system.py
│   │   └── test_trained_model.py
│   │
│   ├── 📁 deployment/              # Scripts de despliegue
│   │   ├── mlm_api_server.py
│   │   ├── start_ai_server.sh
│   │   ├── monitor_model.py
│   │   └── backup_recovery.sh
│   │
│   ├── mongodb_connector.py        # Conector a MongoDB
│   ├── demo_prediction.py          # Demostración del modelo
│   ├── config.py                   # Configuración del sistema
│   ├── setup.sh                    # Script de instalación
│   ├── run_analysis.sh             # Script de análisis
│   ├── generate_pdf.py             # Generador de PDF
│   └── generate_pdf_alternative.sh # Generador alternativo
│
├── 📁 docs/                        # Documentación completa
│   ├── 📁 academic/                # Documentación académica
│   │   ├── DOCUMENTACION_ACADEMICA.md
│   │   ├── MEMORIA_ENTRENAMIENTO_MODELO.md
│   │   └── MEMORIA_IMPLEMENTACION.md
│   │
│   ├── 📁 user/                    # Manuales de usuario
│   │   ├── MANUAL_USUARIO.md
│   │   ├── QUICK_START_WHEN_YOU_RETURN.md
│   │   └── TROUBLESHOOTING.md
│   │
│   ├── 📁 technical/               # Documentación técnica
│   │   ├── MANUAL_TECNICO.md
│   │   ├── INSTALACION_COMPLETADA.md
│   │   ├── INTEGRACION_IA_ADMIN.md
│   │   ├── IMPLEMENTACION_ADMIN.md
│   │   ├── CORRECCIONES_ADMIN.md
│   │   └── CORRECCIONES_CORS_API.md
│   │
│   ├── DOCUMENTACION_SISTEMA_COMPLETA.md
│   ├── INDICE_DOCUMENTACION.md
│   ├── RESUMEN_EJECUTIVO_CLIENTE.md
│   ├── RESUMEN_EJECUTIVO_FINAL.md
│   ├── RESUMEN_EJECUTIVO.md
│   ├── DOCUMENTACION_CLIENTE.html
│   └── DOCUMENTACION_CLIENTE.pdf
│
├── 📁 logs/                        # Archivos de logs
│   └── output.log                  # Log de salida
│
├── 📁 tests/                       # Tests unitarios (futuro)
├── 📁 results/                     # Resultados de análisis (futuro)
├── 📁 venv/                        # Entorno virtual Python
└── 📁 __pycache__/                 # Cache de Python
```

## 🎯 **DESCRIPCIÓN DE CARPETAS**

### **📁 data/**
Contiene todos los datos extraídos de MongoDB:
- **CSV files**: Datos reales de usuarios, transacciones, red MLM
- **Origen**: Base de datos MongoDB de Sifrah
- **Uso**: Entrenamiento y validación de modelos

### **📁 models/**
Contiene los modelos de Machine Learning entrenados:
- **Modelo original**: Basado en datos sintéticos
- **Modelo real**: Basado en datos reales de MongoDB ⭐
- **Formato**: Archivos .pkl (pickle)

### **📁 scripts/**
Scripts organizados por función:

#### **📁 training/**
Scripts para entrenar y desarrollar modelos:
- `retrain_with_real_data.py` - Entrenamiento con datos reales
- `data_analyzer.py` - Análisis de datos
- `create_training_data.py` - Generación de datos sintéticos

#### **📁 testing/**
Scripts para probar y validar modelos:
- `test_real_data_model.py` - Prueba del modelo con datos reales
- `test_trained_model.py` - Prueba del modelo entrenado
- Scripts de debugging y validación

#### **📁 deployment/**
Scripts para producción y despliegue:
- `mlm_api_server.py` - Servidor API Flask
- `start_ai_server.sh` - Script de inicio del servidor
- `monitor_model.py` - Monitoreo del modelo
- `backup_recovery.sh` - Backup y recuperación

### **📁 docs/**
Documentación completa organizada:

#### **📁 academic/**
Documentación académica y técnica:
- Memorias de implementación
- Documentación académica
- Análisis técnico

#### **📁 user/**
Manuales para usuarios finales:
- Manual de usuario
- Guía de inicio rápido
- Solución de problemas

#### **📁 technical/**
Documentación técnica para desarrolladores:
- Manual técnico
- Guías de instalación
- Correcciones y mejoras

## 🚀 **ARCHIVOS PRINCIPALES**

### **📄 README.md**
Documentación principal del proyecto con:
- Descripción del sistema
- Instrucciones de instalación
- Guía de uso básico

### **📄 requirements.txt**
Dependencias Python necesarias:
- pandas, numpy, scikit-learn
- xgboost, lightgbm
- flask, pymongo
- matplotlib, seaborn

### **📄 PROJECT_STRUCTURE.md**
Este archivo que documenta la estructura organizada.

## ✅ **BENEFICIOS DE LA ORGANIZACIÓN**

1. **📁 Separación clara**: Cada tipo de archivo tiene su lugar
2. **🔍 Fácil navegación**: Estructura intuitiva y lógica
3. **👥 Colaboración**: Diferentes roles pueden encontrar su documentación
4. **🔄 Mantenimiento**: Fácil de mantener y actualizar
5. **📚 Documentación**: Organizada por audiencia y propósito
6. **🚀 Escalabilidad**: Estructura preparada para crecimiento

## 🎯 **PRÓXIMOS PASOS**

1. **Actualizar rutas**: Modificar scripts para usar la nueva estructura
2. **Crear symlinks**: Para compatibilidad con scripts existentes
3. **Documentar cambios**: Actualizar README.md con nueva estructura
4. **Validar funcionamiento**: Probar que todo funciona con la nueva organización

---

**Fecha de organización**: 31 de Agosto, 2024  
**Organizado por**: Claude Sonnet 4  
**Estado**: ✅ **PROYECTO COMPLETAMENTE ORGANIZADO** 