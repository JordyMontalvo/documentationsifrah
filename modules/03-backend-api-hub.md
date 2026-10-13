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
