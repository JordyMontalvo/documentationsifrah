# 02. Frontends: Sifrah App & Backoffice Admin

## 📱 1. Sifrah App (`app/`) - Oficina Virtual de Socios

La aplicación móvil y web utilizada diariamente por los distribuidores de la red para gestionar sus equipos, compras y comisiones.

### Stack Tecnológico
- **Framework:** Vue.js (Vue 2/3 con Vue Router y Vuex).
- **Runtime Móvil:** Capacitor 5 (genera bundles nativos para Android y iOS).
- **Estilos:** CSS modular con componentes interactivos.

### Vistas Críticas (`app/src/views/`):
1. **`Tree.vue` (Árbol Genealógico Dinámico):**
   - Renderiza tanto la estructura **Unilevel** (patrocinio directo) como la red **Binaria** (pierna izquierda y pierna derecha).
   - Implementa paneo, zoom y navegación por niveles de profundidad.
2. **`Activation.vue` (Carrito de Compras & Puntos):**
   - Calcula en tiempo real el volumen de puntos personales (PTS) acumulados en el pedido.
   - Valida si el distribuidor alcanza la calificación del mes (ej. 40 PTS o 80 PTS).
3. **`Collect.vue` (Billetera Virtual):**
   - Consulta de saldo disponible para retiro.
   - Historial de bonos acreditados.
   - Solicitud de transferencia bancaria hacia cuentas locales (BCP, Interbank, BBVA).
4. **`components/SifrahAssistant.vue` (Widget de Salud Flotante):**
   - Burbuja flotante con microinteracciones de pulso y saludo animado.
   - Envía el código de referido del distribuidor (`refCode`) en cada consulta para atribuir ventas automáticas de suplementos.
5. **`public/SharedStore.vue` y `StoreCheckout.vue` (Tienda Externa Compartida):**
   - Catálogo público accesible por `/tienda/:userId` donde clientes externos compran a Precio Público.
   - Puntos (PTS) ocultos para el público externo; formulario de entrega y pago con voucher o tarjeta.

---

## 💼 2. Sifrah Admin (`admin/`) - Panel Corporativo

Panel de control para la dirección corporativa, finanzas y operaciones logísticas.

### Vistas Críticas (`admin/src/views/`):
1. **`ValidacionVouchers.vue` (Validador de Pagos):**
   - Visor de imágenes de comprobantes subidos por distribuidores.
   - Permite aprobar o rechazar pedidos con actualización inmediata de stock y puntos.
2. **`Kadex.vue` (Control de Inventario y Almacenes):**
   - Control de entradas, salidas y transferencias de productos por sucursal física.
3. **Gestión de Periodos de Cierre:**
   - Interfaz corporativa para disparar el cálculo masivo de bonos quincenales y mensuales mediante llamada al motor de Go.
4. **`StoreOrders.vue` (Gestor de Compras de Tienda Compartida - Tab "Tienda"):**
   - Tab dedicado dentro de Afiliaciones (`/tienda`).
   - Muestra las órdenes de clientes externos, comprador, socio dueño del link, productos, importe y la columna **Puntos** acumulados para el socio.
   - Al aprobar la orden, acredita automáticamente los puntos al socio vendedor en su red.
