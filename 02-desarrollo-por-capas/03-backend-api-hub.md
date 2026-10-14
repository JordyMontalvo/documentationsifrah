# 03. Backend API Hub (`server/`)

El servidor central de Sifrah es un API Hub monolítico en Node.js que orquesta la autenticación, pasarelas de pago, consultas a MongoDB y la integración con el motor de Go.

---

## 🔒 1. Blindaje Contable (`server/components/wallet-lock.js`)

Para prevenir el ataque clásico de **doble gasto** (cuando un distribuidor envía dos peticiones de retiro de saldo en el mismo milisegundo), el sistema implementa un mecanismo de mutex locking a nivel de usuario.

```javascript
// Patrón de uso seguro de billetera:
const { withWalletLock } = require('../components/wallet-lock');

async function procesarRetiro(userId, monto) {
  return await withWalletLock(userId, async (session) => {
    // 1. Leer saldo actual bajo bloqueo atómico
    const user = await db.users.findOne({ _id: userId }, { session });
    if (user.wallet_balance < monto) {
      throw new Error('Saldo insuficiente');
    }

    // 2. Descontar saldo y registrar transacción
    await db.users.updateOne(
      { _id: userId },
      { $inc: { wallet_balance: -monto } },
      { session }
    );

    await db.transactions.insertOne({
      user_id: userId,
      type: 'WITHDRAWAL',
      amount: monto,
      status: 'PENDING_APPROVAL',
      created_at: new Date()
    }, { session });

    return { success: true };
  });
}
```

---

## 💳 2. Pasarelas de Pago Integradas

1. **IziPay Checkout:**
   - Tokenización de tarjetas de crédito y débito.
   - Verificación de webhooks criptográficos mediante firma HMAC SHA-256.
2. **MercadoPago:**
   - Checkout Pro para billeteras digitales (Yape, Plin y PagoEfectivo).
3. **BunnyCDN Upload:**
   - Subida directa de comprobantes de pago hacia el bucket de almacenamiento de Bunny.net.

---

## 📊 3. Capa de Base de Datos (`server/components/db.js`)

- Mantiene un pool persistente de conexiones hacia el servidor MongoDB en AWS EC2 Ohio (`27017`).
- Incluye el `ProductWrapper` que filtra productos de uso interno (material promocional, limpieza) para presentar un catálogo limpio tanto al e-commerce como al asistente RAG.

---

## 🛒 4. Tienda Externa y Gestión de Puntos (`server/pages/api/`)

1. **`POST /api/public/store-checkout`:**
   - Procesa la compra del cliente externo en el enlace del socio (`/tienda/[userId]`).
   - Calcula el total acumulado de puntos de los productos (`item.points * item.total`).
   - Crea un registro en `activations` con `channel: "shared_store"` asignado a `userId: owner.id`.
2. **`GET /api/admin/store-orders`:**
   - Lista todas las compras con `channel: "shared_store"`.
   - Incluye `points` por pedido y totales en el `summary` para la vista corporativa.
3. **`POST /api/admin/activations` (Acción `approve` / `cancel`):**
   - Al aprobar: suma `activation.points` a `user.points` del socio vendedor, evalúa si califica a activo (`points >= 120`), ejecuta `lib.updateTotalPointsCascade` y maneja con seguridad pedidos sin almacén físico (`office: null`).
   - Al anular: revierte los puntos exactos del socio y actualiza la cascada del árbol.
