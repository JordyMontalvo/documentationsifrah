# 06. Esquemas y Diccionario de Datos de MongoDB

La base de datos `sifrah` corre en MongoDB 6.x en AWS EC2 (Ohio). A continuación se documentan las 5 colecciones centrales con sus campos reales para evitar alucinaciones en modelos de IA:

---

## 👤 1. Colección `users` (Distribuidores y Clientes)

```json
{
  "_id": "ObjectId",
  "name": "Carlos Mendoza",
  "email": "carlos@example.com",
  "phone": "+51999888777",
  "document_type": "DNI",
  "document_number": "74839201",
  "affiliate_code": "CARLOSM",
  "sponsor_id": "ObjectId(sponsor)",
  "binary_parent_id": "ObjectId(parent_binario)",
  "binary_side": "left", // "left" | "right"
  "current_rank": "ESMERALDA", // "BRONCE" | "PLATA" | "ORO" | "ZAFIRO" | "ESMERALDA" | "DIAMANTE"
  "wallet_balance": 1450.50, // Saldo disponible en soles (PEN)
  "wallet_reserved": 0.00,   // Saldo temporalmente bloqueado en solicitud de retiro
  "is_active_current_period": true,
  "personal_points": 80,
  "group_points_left": 12400,
  "group_points_right": 9800,
  "created_at": "ISODate"
}
```

---

## 📦 2. Colección `orders` (Pedidos y Activaciones)

```json
{
  "_id": "ObjectId",
  "order_number": "ORD-2026-9481",
  "user_id": "ObjectId",
  "period_id": "2026-10-Q1",
  "channel": "shared_store", // null | "shared_store" (compras desde link externo de socio)
  "status": "APPROVED", // "PENDING" | "APPROVED" | "REJECTED" | "DELIVERED"
  "payment_method": "VOUCHER", // "VOUCHER" | "IZIPAY" | "MERCADOPAGO" | "WALLET"
  "voucher_url": "https://sifrah-storage.b-cdn.net/vouchers/voucher_9481.jpg",
  "voucher_status": "APPROVED",
  "buyer": { // Presente cuando channel === "shared_store"
    "name": "María Gómez",
    "document": "45678912",
    "phone": "987654321",
    "email": "maria@cliente.com"
  },
  "items": [
    {
      "product_id": "ObjectId",
      "sku": "REJ-01",
      "name": "Rejuvenece Colágeno Hidrolizado",
      "quantity": 2,
      "unit_price": 140.00,
      "points_per_unit": 40,
      "subtotal": 280.00,
      "subtotal_points": 80
    }
  ],
  "total_amount": 280.00,
  "total_points": 80,
  "shipping_address": {
    "department": "Lima",
    "province": "Lima",
    "district": "Miraflores",
    "address_line": "Av. Larco 1234 Dpto 501"
  },
  "created_at": "ISODate"
}
```

---

## 💸 3. Colección `transactions` (Ledger Contable & Billetera)

```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId",
  "period_id": "2026-10-Q1",
  "type": "BONUS_UNILEVEL", // "BONUS_SPONSOR" | "BONUS_UNILEVEL" | "BONUS_BINARY" | "BONUS_VIP" | "WITHDRAWAL" | "PURCHASE"
  "amount": 340.20,
  "currency": "PEN",
  "description": "Comisión Residual Unilevel Nivel 2 y 3 - Periodo Q1 Octubre",
  "balance_before": 1110.30,
  "balance_after": 1450.50,
  "status": "COMPLETED",
  "hash": "e3b0c44298fc1c149afbf4c8996fb924...",
  "created_at": "ISODate"
}
```

---

## 🌿 4. Colección `products` (Catálogo Nutricional)

```json
{
  "_id": "ObjectId",
  "sku": "DET-01",
  "name": "Detox Clorofila & Spirulina",
  "short_description": "Desintoxicante digestivo y alcalinizante natural",
  "member_price": 90.00,
  "public_price": 140.00,
  "points": 40,
  "stock_global": 450,
  "health_tags": ["digestion", "gastritis", "higado_graso", "alcalinizante", "energia"],
  "contraindications": ["insuficiencia_renal_severa"],
  "is_active_store": true,
  "is_internal_item": false // Si es true, se oculta del asistente y e-commerce
}
```

---

## 💬 5. Colección `assistant_conversations` (Analítica de IA)

```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId", // Opcional si es prospecto anónimo
  "ref_code": "LUIS2026",
  "query": "Tengo problemas de gastritis y ardor en el estómago",
  "detected_ailments": ["gastritis", "ardor_estomacal", "acidez"],
  "recommended_products": ["REGENERA_T", "DETOX_CHLOROPHYLL"],
  "recommended_combo": "COMBO_DIGESTIVO_PRO",
  "total_points": 80,
  "model_used": "gemini-3.5-flash-lite",
  "latency_ms": 1280,
  "created_at": "ISODate"
}
```

---

## 🎙️ 6. Colección `broadcasts` (Audio en Vivo)

Encuentros/transmisiones en vivo. Separada de `audios` (Biblioteca de audios grabados).

```json
{
  "_id": "ObjectId",
  "id": "9f1c…",                       // lib.rand()
  "title": "Conecta con tu propósito", // requerido
  "author": "Jesús Muñoz",             // expositor (default "Equipo SIFRAH")
  "description": "Encuentro de liderazgo y desarrollo personal.",
  "image": "https://sifraht.b-cdn.net/audios/portada.jpg",
  "scheduled_start": "2026-12-02T00:00:00.000Z", // UTC; ingresado en hora de Perú (19:00)
  "scheduled_end": "2026-12-02T01:30:00.000Z",
  "timezone": "America/Lima",
  "status": "scheduled",               // "scheduled" | "live" | "ended" | "cancelled"
  "stream_url": "",                    // vacío = AZURACAST_STREAM_URL
  "station": "",                       // vacío = AZURACAST_STATION
  "live_started_at": "ISODate",        // al pasar a live
  "live_ended_at": "ISODate",          // al pasar a ended
  "created_at": "ISODate",
  "updated_at": "ISODate"
}
```

* Solo un encuentro debe estar en `live` a la vez (el admin finaliza el anterior al poner otro en vivo).
* Publicar o programar (`scheduled`) **no** significa transmitir.
