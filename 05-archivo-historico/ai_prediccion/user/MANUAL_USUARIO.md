# 👥 MANUAL DE USUARIO - Sistema MLM Leadership Prediction

## 📋 **INFORMACIÓN GENERAL**

**Audiencia**: Administradores y usuarios del panel de administración  
**Propósito**: Guía completa para usar el sistema de predicción de líderes MLM  
**Nivel**: Usuario final (no requiere conocimientos técnicos)

## 🚀 **INICIO RÁPIDO**

### **Paso 1: Acceder al Sistema**
1. Abre tu navegador web
2. Ve a: `http://localhost:8081/ai-predictions`
3. Verifica que aparezca la interfaz de IA Predictions

### **Paso 2: Verificar Estado del Sistema**
- **Modelo de IA**: Debe mostrar "Modelo cargado" en verde
- **Total de usuarios**: Debe mostrar el número total de usuarios analizados
- **Estadísticas**: Debe mostrar distribución de Alto/Medio/Bajo potencial

## 🎯 **INTERFAZ PRINCIPAL**

### **Panel Superior (Dashboard)**
```
┌─────────────────────────────────────────────────────────────────┐
│                    DASHBOARD DE PREDICCIONES IA                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📊 Total Usuarios: 395    🥇 Alto: 16    🥈 Medio: 45    🥉 Bajo: 334  │
│  📈 Probabilidad Promedio: 69%    🔄 Última Actualización: Hace 5 min   │
│                                                                 │
│  [🔄 Actualizar Predicciones]    [📊 Ver Estadísticas]    [🔍 Filtros]  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### **Tabla de Predicciones**
```
┌─────┬──────────────┬──────────┬────────────┬─────────┬─────────┬─────────────┬─────────┐
│Rank │   Usuario    │Nivel IA  │Probabilidad│Score IA │   Red   │  Actividad  │Acciones │
├─────┼──────────────┼──────────┼────────────┼─────────┼─────────┼─────────────┼─────────┤
│ #1  │ Mario Luis   │  Alto    │   75.2%    │  100    │8 miembros│3 activ.    │👁️ Det.│
│ #2  │ Elvis Dany   │  Alto    │   72.8%    │   95    │7 miembros│5 activ.    │👁️ Det.│
│ #3  │ Teofila      │  Alto    │   70.1%    │   92    │6 miembros│4 activ.    │👁️ Det.│
└─────┴──────────────┴──────────┴────────────┴─────────┴─────────┴─────────────┴─────────┘
```

## 🔍 **FUNCIONALIDADES PRINCIPALES**

### **1. Ver Predicciones de IA**
- **Ranking**: Posición del usuario en el sistema (1 = mejor)
- **Nivel IA**: Clasificación automática (Alto/Medio/Bajo)
- **Probabilidad**: Confianza de la predicción (0-100%)
- **Score IA**: Puntuación de liderazgo (0-100 puntos)
- **Red**: Tamaño de la red MLM del usuario
- **Actividad**: Activaciones y afiliaciones mensuales

### **2. Filtros y Búsqueda**
```
┌─────────────────────────────────────────────────────────────────┐
│                        FILTROS Y BÚSQUEDA                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🔍 Buscar: [________________] (nombre, email, DNI)           │
│                                                                 │
│  📊 Filtrar por nivel: [Todos ▼] [Alto] [Medio] [Bajo]        │
│                                                                 │
│  📅 Ordenar por: [Ranking ▼] [Score IA] [Red] [Actividad]     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### **Opciones de Filtrado:**
- **Todos**: Muestra todos los usuarios
- **Alto**: Solo usuarios de alto potencial
- **Medio**: Solo usuarios de medio potencial
- **Bajo**: Solo usuarios de bajo potencial

#### **Opciones de Ordenamiento:**
- **Ranking**: Ordena por posición en el ranking
- **Score IA**: Ordena por puntuación de liderazgo
- **Red**: Ordena por tamaño de red MLM
- **Actividad**: Ordena por nivel de actividad

### **3. Ver Detalles del Usuario**
Haz clic en **👁️ Detalles** para ver información completa:

```
┌─────────────────────────────────────────────────────────────────┐
│                    DETALLES DEL USUARIO                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📋 INFORMACIÓN BÁSICA                                         │
│  • Nombre: Mario Luis                                          │
│  • Email: mario@email.com                                      │
│  • Plan: Master                                                │
│                                                                 │
│  🧠 PREDICCIÓN IA                                              │
│  • Nivel: Alto                                                 │
│  • Probabilidad: 75.2%                                         │
│  • Score IA: 100                                               │
│                                                                 │
│  🌐 RED MLM                                                     │
│  • Tamaño: 8 miembros                                          │
│  • Profundidad: 2 niveles                                      │
│  • Eficiencia: 85%                                             │
│                                                                 │
│  📈 ACTIVIDAD                                                   │
│  • Activaciones/mes: 3                                         │
│  • Afiliaciones/mes: 1                                         │
│  • Engagement: 78                                              │
│                                                                 │
│  📊 PROBABILIDADES POR NIVEL                                   │
│  • Bajo: 15.2%    ████████░░ 15.2%                            │
│  • Medio: 9.6%    █████░░░░░  9.6%                            │
│  • Alto: 75.2%    ████████████████████████████████████████ 75.2% │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### **4. Actualizar Predicciones**
- **Botón "🔄 Actualizar Predicciones"**: Recalcula todas las predicciones
- **Proceso automático**: Analiza todos los usuarios de la base de datos
- **Tiempo estimado**: 2-5 minutos para 395 usuarios
- **Indicador de progreso**: Muestra el estado de la actualización

## 🏆 **SISTEMA DE MEDALLAS**

### **Interpretación de Medallas**
```
👑 Corona Real     → Líder excepcional (90+ puntos)
🥇 Oro Elite       → Líder de alto nivel (80+ puntos)
🥈 Plata Premium   → Líder consolidado (70+ puntos)
🥉 Bronce Plus     → Líder emergente (60+ puntos)
⭐ Estrella Dorada  → Potencial alto (50+ puntos)
🔶 Diamante        → Potencial medio-alto (40+ puntos)
💎 Cristal         → Potencial medio (30+ puntos)
🌟 Estrella        → Potencial básico (20+ puntos)
✨ Novato          → En desarrollo (<20 puntos)
```

### **Cómo se Calculan las Medallas**
Las medallas se basan en múltiples factores:
- **40% Red MLM**: Tamaño y profundidad de la red
- **30% Actividad**: Activaciones y afiliaciones mensuales
- **20% Plan**: Nivel del plan y antigüedad
- **10% Engagement**: Participación y retención

## 📊 **ESTADÍSTICAS Y MÉTRICAS**

### **Panel de Estadísticas**
```
┌─────────────────────────────────────────────────────────────────┐
│                        ESTADÍSTICAS                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📈 DISTRIBUCIÓN DE POTENCIAL                                  │
│  • Alto: 16 usuarios (4.1%)    ████░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  • Medio: 45 usuarios (11.4%)  ████████████████████░░░░░░░░░░  │
│  • Bajo: 334 usuarios (84.6%)  ███████████████████████████████ │
│                                                                 │
│  🎯 MÉTRICAS CLAVE                                             │
│  • Probabilidad promedio: 69%                                  │
│  • Usuarios analizados: 395                                    │
│  • Última actualización: Hace 5 minutos                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### **Interpretación de Métricas**
- **Alto potencial (4.1%)**: Usuarios con características excepcionales de liderazgo
- **Medio potencial (11.4%)**: Usuarios con buen potencial de desarrollo
- **Bajo potencial (84.6%)**: Usuarios que necesitan más desarrollo y apoyo

## 🔧 **OPERACIONES AVANZADAS**

### **1. Exportar Datos**
- **Formato**: Los datos se pueden copiar desde la tabla
- **Selección**: Usa Ctrl+A para seleccionar toda la tabla
- **Pegado**: Pega en Excel o Google Sheets

### **2. Análisis de Tendencias**
- **Comparar períodos**: Actualiza predicciones regularmente
- **Seguir usuarios**: Monitorea el progreso de líderes potenciales
- **Identificar patrones**: Busca características comunes en líderes

### **3. Toma de Decisiones**
- **Inversión en entrenamiento**: Prioriza usuarios de alto potencial
- **Mentoría**: Asigna mentores a usuarios de medio potencial
- **Soporte**: Proporciona recursos a usuarios de bajo potencial

## 📱 **RESPONSIVIDAD Y ACCESO**

### **Dispositivos Soportados**
- ✅ **Desktop**: Pantallas grandes (1200px+)
- ✅ **Laptop**: Pantallas medianas (768px-1199px)
- ✅ **Tablet**: Pantallas pequeñas (480px-767px)
- ✅ **Móvil**: Pantallas muy pequeñas (<480px)

### **Navegadores Compatibles**
- ✅ **Chrome**: Versión 90+
- ✅ **Firefox**: Versión 88+
- ✅ **Safari**: Versión 14+
- ✅ **Edge**: Versión 90+

## 🚨 **SOLUCIÓN DE PROBLEMAS COMUNES**

### **Problema 1: "Modelo no cargado"**
**Síntoma**: El sistema muestra "Modelo no disponible" en rojo
**Solución**: 
1. Verifica que el servidor Python esté corriendo
2. Contacta al administrador del sistema

### **Problema 2: "Error cargando predicciones"**
**Síntoma**: Mensaje de error al cargar la página
**Solución**:
1. Recarga la página (F5)
2. Verifica la conexión a internet
3. Contacta al administrador si persiste

### **Problema 3: "Datos no actualizados"**
**Síntoma**: Las predicciones parecen desactualizadas
**Solución**:
1. Haz clic en "🔄 Actualizar Predicciones"
2. Espera 2-5 minutos a que se complete
3. Recarga la página

### **Problema 4: "Filtros no funcionan"**
**Síntoma**: Los filtros no cambian los resultados
**Solución**:
1. Verifica que hayas seleccionado un filtro
2. Limpia la búsqueda si hay texto en el campo
3. Recarga la página

## 📞 **SOPORTE Y CONTACTO**

### **Niveles de Soporte**
- **Nivel 1**: Problemas de interfaz y uso básico
- **Nivel 2**: Problemas de funcionalidad y datos
- **Nivel 3**: Problemas técnicos del sistema

### **Información de Contacto**
- **Administrador del Sistema**: Claude Sonnet 4
- **Fecha de Implementación**: 19 de Agosto, 2024
- **Versión del Sistema**: 2.0.0
- **Documentación Técnica**: `MANUAL_TECNICO.md`

### **Recursos de Ayuda**
- **Manual Técnico**: Para desarrolladores y administradores
- **Documentación del Sistema**: Visión general completa
- **Guía de Troubleshooting**: Solución de problemas específicos

## 🔮 **FUNCIONALIDADES FUTURAS**

### **Próximas Mejoras**
- [ ] **Exportación a Excel/PDF**: Descarga directa de reportes
- [ ] **Alertas automáticas**: Notificaciones de usuarios prometedores
- [ ] **Gráficos interactivos**: Visualizaciones avanzadas de datos
- [ ] **Comparación temporal**: Análisis de progreso a lo largo del tiempo
- [ ] **Dashboard ejecutivo**: Resumen para toma de decisiones

### **Sugerencias de Usuario**
- Envía sugerencias al administrador del sistema
- Participa en pruebas de nuevas funcionalidades
- Proporciona feedback sobre la usabilidad

---

**Fecha de creación**: 19 de Agosto, 2024  
**Versión**: 2.0.0 (Manual Completo)  
**Audiencia**: Usuarios finales del sistema  
**Próxima actualización**: 26 de Agosto, 2024 