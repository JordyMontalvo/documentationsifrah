# Documentación Técnica y Funcional: Sistema Sifrah Admin

<div style="text-align: center; padding: 20px; border: 2px solid #3b82f6; border-radius: 10px; background-color: #f0f7ff; margin-bottom: 40px;">
  <h1 style="color: #1e40af; margin-bottom: 10px;">SIFRAH ADMIN</h1>
  <h2 style="color: #3b82f6; margin-top: 0;">Manual Maestro de Sistema y Operaciones</h2>
  <p style="font-size: 1.1em; color: #4b5563;">Versión 1.0 | Marzo 2026</p>
  <hr style="border: 0; border-top: 1px solid #93c5fd; margin: 20px 0;">
  <p style="font-weight: bold; color: #1e3a8a;">Confidencial y Exclusivo para Sifrah</p>
</div>

## 1. Resumen Ejecutivo

El sistema **Sifrah Admin** es una plataforma integral de administración diseñada para gestionar un ecosistema de Marketing Multinivel (MLM) de alto rendimiento. La solución centraliza la gestión de usuarios, el seguimiento de estructuras organizacionales complejas, el procesamiento de comisiones financieras, y la distribución de contenidos digitales y físicos.

Integrando capacidades de Inteligencia Artificial para la predicción de liderazgo y calidad, Sifrah Admin se posiciona como una herramienta estratégica para la toma de decisiones basada en datos.

---

## 2. Arquitectura Técnica

### 2.1 Stack de Tecnologías
El sistema está construido sobre tecnologías modernas y escalables:

*   **Frontend**: Vue.js 2.6.x (Framework progresivo de JavaScript).
*   **Gestión de Estado**: Vuex (Almacenamiento centralizado de datos).
*   **Enrutamiento**: Vue Router (Control de navegación SPA).
*   **Interfaz de Usuario (UI)**: Buefy / Bulma (Framework CSS basado en Flexbox).
*   **Visualización de Datos**: 
    *   **D3.js**: Para el renderizado de árboles MLM complejos.
    *   **Chart.js**: Para paneles de estadísticas dinámicos.
*   **Comunicación API**: Axios.
*   **Gestión de Medios**: Integración con ImageKit para optimización de imágenes.

### 2.2 Estructura del Proyecto
```text
Sifrah_admin/
├── src/
│   ├── components/     # Componentes reutilizables (Tablas, Cards, Nodos MLM)
│   ├── views/          # Vistas principales del sistema (Dashboard, Users, MLM)
│   ├── store.js        # Configuración de Vuex
│   ├── router.js       # Definición de rutas y guardianes de navegación
│   ├── api.js          # Capa de servicios y peticiones HTTP
│   └── main.js         # Punto de entrada de la aplicación
├── public/             # Activos estáticos
└── package.json        # Dependencias y scripts
```

---

## 3. Módulos del Sistema: Detalle Funcional

### 3.1 Panel de Control (Dashboard)
El corazón visual del sistema. Proporciona una vista rápida del estado de salud del negocio.
*   **Métricas Clave**: Visualización de ventas, nuevos registros y activaciones.
*   **Configuración Dinámica**: El módulo `DashboardConfig` permite personalizar qué métricas son visibles para el administrador.
*   **Gráficos**: Tendencias de crecimiento mensual y rendimiento por niveles.

### 3.2 Ecosistema MLM (Multi-Level Marketing)
Es el módulo más avanzado del sistema, permitiendo el control total de la red.
*   **Visualización de Árbol (MLM Tree)**:
    *   Renderizado dinámico de la estructura jerárquica.
    *   Filtros por Rango: Bronce, Plata, Oro, Platino y Diamante.
    *   Filtros por Estado: Activo, Inactivo, Pendiente.
    *   Zoom y navegación interactiva.
*   **Sistema de Rangos**:
    *   Cálculo de requisitos para ascenso (referidos directos, volumen de ventas).
    *   Indicadores visuales distintivos para cada rango.

### 3.3 Gestión de Comunidad y Usuarios
*   **Directorio de Usuarios**: Búsqueda avanzada por DNI, Nombre o Email.
*   **Módulo de Afiliaciones**: Control de nuevos prospectos y procesos de onboarding.
*   **Activaciones**: Seguimiento detallado de cuándo un miembro de la red pasa a estado activo mediante el cumplimiento de requisitos.

### 3.4 Catálogo y Contenido Digital
Sifrah Admin funciona también como un gestor de contenido (CMS) educativo:
*   **Libros y Audios**: Administración de materiales descargables o consultables.
*   **Flyers y Materiales**: Repositorio de recursos de marketing para los distribuidores.
*   **Banner System**: Gestión de publicidad interna y avisos en las aplicaciones de usuario.

### 3.5 Operaciones, Almacén e Inventario
*   **Kardex (Kadex)**: Control detallado de entradas y salidas de productos físicos.
*   **Stock y Oficinas**: Gestión multisuccursal para el control de inventario local.
*   **Delivery Management**: Módulo logístico para el seguimiento de entregas de productos a los usuarios finales.

### 3.6 Finanzas y Wallet
*   **Billetera Electrónica (Wallet)**: Control de saldos acumulados por los usuarios.
*   **Módulo de Pagos (Pay)**: Procesamiento de retiros y bonificaciones.
*   **Métodos de Pago**: Configuración de pasarelas y transferencias bancarias.
*   **Cierres de Periodo**: Funcionalidad para cortar ciclos de comisiones y consolidar estados financieros.

### 3.7 Inteligencia Artificial (Módulo Predictive)
Un diferencial tecnológico del sistema Sifrah:
*   **Leadership Predictions**: Algoritmos que identifican líderes potenciales basándose en su comportamiento de red.
*   **AI Quality Predictions**: Evaluación de la calidad del crecimiento de la red y detección temprana de deserción (churn).

---

## 4. Guía de Operación para el Administrador

### 4.1 Navegación Principal
El sistema utiliza una barra lateral (Sidebar) dividida en secciones lógicas:
1.  **Dashboard**: Análisis rápido.
2.  **Red MLM**: Árboles y estructuras.
3.  **Comunidad**: Usuarios y Afiliados.
4.  **Almacén**: Productos, Stock y Kardex.
5.  **Finanzas**: Pagos y Wallet.
6.  **IA**: Reportes predictivos.

### 4.2 Proceso de Cierre de Ciclo
Para garantizar la integridad de las comisiones:
1.  Navegar al módulo de **Períodos**.
2.  Verificar que todas las transacciones del período estén procesadas.
3.  Ejecutar el cierre de ciclo para transferir saldos generados a la Wallet de los usuarios.

---

## 5. Configuración y Despliegue

### 5.1 Requisitos de Entorno
*   Node.js (versión recomendada 10.x - 12.x para compatibilidad con Vue CLI 3).
*   Navegador moderno (Chrome, Edge o Firefox).

### 5.2 Comandos de Instalación
```bash
# Instalación de dependencias
npm install

# Ejecución en modo desarrollo (Ecosistema Local)
npm run serve

# Compilación para producción
npm run build
```

### 5.3 Variables de Entorno
El sistema utiliza archivos `.env.production` para configurar URLs de API e integraciones de terceros como ImageKit.

---

## 6. Conclusión y Próximos Pasos
Sifrah Admin es una plataforma robusta que ofrece una ventaja competitiva en el sector MLM. La integración de gestión jerárquica con análisis predictivo permite no solo administrar la red actual, sino proyectar el crecimiento futuro con precisión.

---

<footer style="margin-top: 50px; text-align: center; font-size: 0.9em; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 20px;">
  © 2026 Sifrah. Todos los derechos reservados.
  <br>
  Documentación generada automáticamente por Antigravity AI.
</footer>
