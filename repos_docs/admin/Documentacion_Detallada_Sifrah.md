# Documentación Técnica Avanzada: Sifrah Admin Ecosystem

<div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 60px 40px; border-radius: 20px; color: white; text-align: center; margin-bottom: 50px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <h1 style="font-size: 3.5em; margin: 0; letter-spacing: 2px;">SIFRAH</h1>
  <h2 style="font-size: 1.5em; font-weight: 300; margin-top: 10px; opacity: 0.9;">ADMINISTRACIÓN INTEGRAL Y ANÁLISIS PREDICTIVO</h2>
  <div style="width: 100px; height: 4px; background: #fbbf24; margin: 30px auto;"></div>
  <p style="font-size: 1.2em;">Manual Técnico de Referencia y Operaciones</p>
  <p style="margin-top: 20px; font-size: 0.9em; opacity: 0.7;">Versión 2.0 | Marzo 2026</p>
</div>

## 1. Introducción al Ecosistema Sifrah

Sifrah Admin no es solo un panel de administración; es un motor de crecimiento para redes de mercadeo multinivel (MLM). El sistema combina la gestión operativa tradicional con capacidades de **Machine Learning** para identificar el talento y predecir el comportamiento de los líderes de la red.

---

## 2. Arquitectura de Software Profunda

### 2.1 Stack Tecnológico Detallado

| Capa | Tecnología | Propósito |
| :--- | :--- | :--- |
| **Frontend Core** | Vue.js 2.6.10 | Framework de componentes reactivos. |
| **State Management** | Vuex 3.0.1 | Gestión centralizada de sesión y estados globales. |
| **Styles** | Bulma / Buefy | Framework CSS basado en Flexbox para diseño responsivo. |
| **ML Visualization** | D3.js 7.9.0 | Renderizado de estructuras de red arbóreas con alto rendimiento. |
| **Charts** | Chart.js 4.5.0 | Paneles de control y métricas de rendimiento. |
| **HTTP Client** | Axios | Gestión de peticiones asíncronas al backend. |
| **Media** | ImageKit JS | Optimización y entrega de activos visuales mediante CDN. |

### 2.2 Integración con Backend (API Reference)
El sistema se comunica con un servidor Node.js/Mongoose mediante los siguientes endpoints principales:

*   **Usuarios**: `GET /admin/users` (con filtros avanzados de balance virtual y disponibilidad).
*   **Gestión MLM**: `GET /admin/tree` y `POST /admin/tree` (para reestructuración de red).
*   **Finanzas**: `/admin/pay` (procesamiento), `/admin/wallet` (saldos), `/admin/periods` (cierres).
*   **IA Predictiva**: `/mlm-api/health` (estado del modelo) y `/admin/ai-leadership-predictions`.

---

## 3. Módulo MLM: Lógica y Algoritmos de Red

### 3.1 Estructura Jerárquica y Recursividad
El sistema gestiona la red mediante una estructura de árbol donde cada nodo representa un distribuidor.
*   **Cálculo de Red**: Se utilizan algoritmos recursivos (`countMembers`, `calculateTotalCommissions`) para recorrer la profundidad de la red (hasta el nivel N definido por el administrador).
*   **Estadísticas en Tiempo Real**: El sistema calcula instantáneamente el "Nivel Máximo", "Miembros Activos" y "Comisiones Totales" al cargar el árbol.

### 3.2 Sistema de Rangos y Calificación
El sistema implementa un código de colores y estados para la rápida identificación visual:

| Rango | Identificador Visual | Requisito Típico (Simulado) |
| :--- | :--- | :--- |
| **Bronce** | Marrón (#cd7f32) | Miembro inicial. |
| **Plata** | Gris (#c0c0c0) | 5 referidos directos. |
| **Oro** | Dorado (#ffd700) | 10 directos + $5,000 ventas. |
| **Platino** | Platino (#e5e4e2) | 20 directos + $15,000 ventas. |
| **Diamante** | Azul Diamante (#b9f2ff) | 50 directos + $50,000 ventas. |

### 3.3 Visualización Interactiva (D3.js Implementation)
La vista `MLMTree.vue` permite:
*   **Filtro por Rango y Estado**: Oculta o resalta dinámicamente nodos según criterios de salud de cuenta.
*   **Búsqueda Dinámica**: Resalta con animación de "pulso" a los usuarios encontrados por nombre, DNI o email.
*   **Expansión Controlada**: El administrador puede ajustar el slider de niveles para evitar la sobrecarga visual de redes masivas.

---

## 4. Inteligencia Artificial y Modelos Predictivos

### 4.1 Modelo de Liderazgo (AI Predictions)
Utiliza un modelo externo entrenado (Gradient Boosting) para calificar a los usuarios.
*   **Features de Entrada**: Tamaño de red, profundidad, activaciones mensuales, engagement score.
*   **Métricas del Modelo**:
    *   **Score de Liderazgo**: Valor numérico del potencial.
    *   **Probabilidad**: Certeza del modelo sobre la clasificación (Bajo, Medio, Alto).
    *   **Ranking**: Posicionamiento global del usuario dentro del ecosistema de líderes.

### 4.2 Modelo de Calidad (AI Quality)
Enfoque especializado en la retención y la "calidad" de los directos.
*   **Ratio de Productividad**: Porcentaje de directos que realizan activaciones mensuales consistentes.
*   **Score de Calidad de Red**: Evaluación de 0 a 100 sobre la salud del crecimiento.
*   **Futuros Líderes**: Segmentación automática de usuarios con alto potencial que aún no han alcanzado rangos superiores.

---

## 5. Gestión Financiera y Operativa

### 5.1 Sistema de Wallet y Pagos
*   **Procesamiento de Comisiones**: Las comisiones se generan tras la validación de activaciones y se consolidan en el módulo de Períodos.
*   **Retiros (Pay)**: El administrador puede autorizar y registrar pagos directos descontando el saldo de la Wallet del usuario.
*   **Métodos de Pago**: Configuración dinámica de cuentas bancarias y pasarelas soportadas.

### 5.2 Inventario y Logística (Kardex)
*   **Kardex (Kadex)**: Registro de auditoría para cada SKU, permitiendo trazabilidad total de entradas (compras) y salidas (ventas/activaciones).
*   **Oficinas y Stock**: Gestión de inventario descentralizado por sucursal física.
*   **Delivery**: Seguimiento de estados de envío (Pendiente, En Camino, Entregado, Cancelado).

---

## 6. Configuración Técnica y Mantenimiento

### 6.1 Despliegue en Producción
```bash
# Instalación limpia
npm ci

# Generación del bundle optimizado para producción
npm run build
```
Los archivos compilados se encuentran en la carpeta `dist/`, listos para ser servidos por un servidor web como Nginx o Apache.

### 6.2 Variables Criticas (.env)
*   `VUE_APP_SERVER`: URL base del servidor de API.
*   `VUE_APP_IMAGEKIT`: ID de cliente para la gestión de imágenes.

---

<footer style="margin-top: 100px; text-align: center; color: #4b5563; border-top: 1px solid #e5e7eb; padding-top: 30px;">
  <p><b>SIFRAH - Sistema de Gestión Inteligente</b></p>
  <p>© 2026 Reservados todos los derechos. Documento propiedad de Sifrah.</p>
</footer>
