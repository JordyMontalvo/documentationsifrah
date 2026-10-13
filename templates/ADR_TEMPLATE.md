# ADR-[NUMERO]: [Título Breve de la Decisión]

- **Fecha:** YYYY-MM-DD
- **Autor(es):** [Nombre del Desarrollador / Equipo]
- **Estado:** [Propuesto | Aceptado | En Producción | Deprecado]
- **Módulos Afectados:** [server, app, admin, cierre_engine, db]

---

## 1. Contexto y Problema
¿Cuál era el problema o la necesidad técnica que motivó este cambio?
(Ejemplo: *"El cálculo del bono binario en Node.js tardaba 10 minutos al superar los 5,000 usuarios..."*)

---

## 2. Decisión Tomada
¿Qué solución técnica se implementó y por qué se eligió?
(Ejemplo: *"Se migró la lógica al motor en Go en `cierre_engine/` cargando el árbol en memoria RAM..."*)

---

## 3. Cambios en la Base de Datos o Contratos
- **Colecciones modificadas:**
- **Nuevos campos:**
- **Variables de entorno requeridas:**

---

## 4. Consecuencias y Riesgos
- **Impacto positivo:** (Ejemplo: Cálculo en < 15 segundos).
- **Riesgos o cuidados:** (Ejemplo: Asegurarse de compilar el binario con Go 1.20 antes de reiniciar PM2).

---

## 5. Cómo Probar el Cambio
Comandos o pasos manuales para validar que funciona correctamente:
```bash
# Ejemplo:
cd server && npm test
```
