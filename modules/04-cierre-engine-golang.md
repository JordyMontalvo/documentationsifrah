# 04. Motor de Cierre de Periodos en Go (`cierre_engine/`)

El motor de cálculo masivo desarrollado en **Golang 1.20+** es el componente de mayor rendimiento técnico del ecosistema Sifrah. Resuelve el cálculo de comisiones, rangos y bonos para miles de distribuidores en menos de 15 segundos.

---

## ⚡ 1. Arquitectura de Alto Rendimiento

### El Problema Tradicional:
En sistemas MLM basados únicamente en Node.js o PHP, calcular árboles genealógicos recursivos contra la base de datos toma entre 20 y 45 minutos y satura la CPU.

### La Solución en Go:
1. **Carga en RAM (Grafo en Memoria):** Lee los usuarios y sus compras del periodo una sola vez y construye el árbol genealógico completo en estructuras de memoria RAM nativas de Go.
2. **Concurrencia con Goroutines:** Dispara hilos ligeros concurrentes para calcular los distintos bonos en paralelo.
3. **Escritura Atómica en Lote:** Persiste el resultado final en el ledger contable de MongoDB en una sola pasada.

---

## 🌲 2. Compresión Dinámica

Una de las reglas más críticas del plan multinivel de Sifrah:
- Si un distribuidor $B$ (patrocinado por $A$) no realizó su compra mínima de activación de puntos (PTS) en el mes, **queda inactivo**.
- El motor de Go comprime la red dinámicamente: las compras del equipo descendiente de $B$ se computan directamente para $A$, garantizando que los bonos no se queden "atrapados" en nodos inactivos.

---

## 💰 3. Bonos Calculados

1. **Bono de Patrocinio:** Comisión directa por la afiliación de nuevos distribuidores en primer nivel.
2. **Bono Residual Unilevel:** Porcentajes escalonados calculados sobre el volumen de compras de los niveles 1 al 7.
3. **Bono Binario / Equilibrio:** Cálculo del porcentaje sobre la pierna menor (menor volumen) de la red binaria.
4. **Bono Generacional VIP:** Premio por desarrollo de líderes que alcanzan rangos Diamante o superiores.
5. **Bono de Ahorro / Fondo Global:** Retención porcentual programada para metas anuales de los socios.

---

## 🛠️ 4. Compilación y Ejecución

```bash
cd cierre_engine

# Compilación a binario nativo optimizado
go build -ldflags="-s -w" -o cierre_bin main.go

# Ejecución manual pasando el ID del periodo a liquidar
./cierre_bin --periodo=2026-10-Q1
```
