# Guía de Migración de MongoDB a PostgreSQL (Prisma)

Esta documentación recopila todos los problemas, retos y soluciones encontrados durante la prueba de concepto para migrar SIFRAH de MongoDB a PostgreSQL usando Prisma ORM.

## Resumen del Entorno
* **Punto de partida:** Aplicación en Node.js, Express y Next.js conectada a MongoDB usando un `MongoWrapper` dinámico.
* **Destino:** PostgreSQL usando Prisma ORM y un `PrismaWrapper` para intentar mantener retrocompatibilidad con las consultas tipo MongoDB (ej. `$in`, `$gte`).
* **Estado actual:** Revertido a MongoDB temporalmente en `server/components/db.js`.

---

## Retos y Problemas Encontrados

### 1. Ausencia de Esquemas Estrictos en MongoDB vs. Prisma
En MongoDB, los documentos son libres (schemaless). En las consultas de Prisma, los campos requeridos deben estar **declarados explícitamente** en `schema.prisma`. 
* **Problema:** El login falló porque los campos `password` y `type` no existían en el modelo `User` de Prisma, a pesar de que el código backend de `api/admin/auth/login.js` los solicitaba para autenticar administradores.
* **Solución futura:** Asegurarse de realizar un mapeo exhaustivo de todos los campos que el código utiliza para cada colección y reflejarlos en `schema.prisma` (ej. agregar `password String?` y `type String?` en `User`).

### 2. Base de Datos de Prisma Vacía
Al generar las tablas de PostgreSQL con `npx prisma db push`, la base de datos se crea **vacía**.
* **Problema:** No se podía hacer login con el administrador ni cargar el árbol (`tree`) porque no existían datos en PostgreSQL, a pesar de que MongoDB sí los tiene. El endpoint del `tree` de admin colapsaba porque buscaba un ID fijo de raíz (`5f0e0b67af92089b5866bcd0`) que no existía, devolviendo `undefined`.
* **Solución futura:** 
  1. Escribir un script ETL (Extract, Transform, Load) que migre todos los datos de MongoDB hacia PostgreSQL antes de realizar el cambio de conexión.
  2. Implementar validaciones de seguridad en los endpoints (ej. `if (!node) return`) para manejar bases de datos relacionales incompletas sin causar Crash/Errores 500.

### 3. Incompatibilidad de Filtros (Booleans y `$in`)
El `PrismaWrapper` en `server/components/db.js` traduce las consultas de estilo Mongo a Prisma.
* **Problema:** En MongoDB es común buscar `{ virtual: { $in: [null, false] } }`. Al pasarlo por el wrapper, este lo traducía a `{ virtual: { in: [null, false] } }` en Prisma. Sin embargo, Prisma **no soporta el operador `in` para campos booleanos** y lanza una excepción fatal de validación.
* **Solución implementada/futura:** En el traductor `translateMongoToPrismaQuery` de `db.js`, interceptar cuando se intenta usar `$in` con `[null, false]` sobre campos booleanos obligatorios, y reescribirlo a `{ equals: false }`.

### 4. Valores `undefined` en Consultas de Array
En Node.js/MongoDB, al extraer un arreglo de IDs y obtener valores `undefined`, Mongo simplemente los ignora en un filtro `$in`.
* **Problema:** Prisma genera una excepción fatal y bloquea el Request (HTTP 500) si un array dentro de un filtro `.in` contiene valores `undefined`. Esto ocurría frecuentemente en las utilidades `ids()`, `_ids()` y `parent_ids()` en `server/components/lib.js` al mapear listas donde algunos elementos no tenían ciertas propiedades.
* **Solución implementada/futura:** Refactorizar las utilidades para que filtren siempre los valores nulos (`.filter(id => id != null)`) y eliminen duplicados (`[...new Set(...)]`) antes de entregar la lista de IDs a la consulta de Prisma.

### 5. Estructura de Retorno (Key mismatches)
* **Problema:** Al intentar corregir los errores de base de datos vacía, se modificaron temporalmente las respuestas JSON del servidor (ej. devolviendo `{ tree: rootNode }` en lugar de `{ node: rootNode }`). El frontend (Vue.js) es altamente sensible a las llaves de respuesta y colapsará la renderización (`TypeError: Cannot read properties of undefined`) si la estructura no coincide exactamente con la que Mongo devolvía.
* **Solución futura:** Mantener intactas las interfaces de respuesta HTTP. El backend debe simular exactamente la misma estructura de datos (incluyendo sub-documentos y arreglos `_id`) que Vue espera.

---

## Pasos para Retomar la Migración en el Futuro

1. **Revisar `schema.prisma`:** Asegúrate de que **todos** los campos usados en las rutas de Next.js y componentes Vue estén modelados (incluso los dinámicos como `Json?`).
2. **Crear script de Seed/ETL:** Migra todos los datos actuales de `sifrah` (Mongo) a Postgres asegurando coherencia referencial e IDs (los objectId de Mongo deben caber en Strings de Postgres o usar UUIDs mapeados).
3. **Activar PrismaWrapper:** Volver a cambiar en `server/components/db.js` la exportación a `PrismaWrapper` para las colecciones testeadas.
4. **Test Unitarios/Integración:** Probar específicamente los filtros de búsqueda y la carga del Árbol (Tree) y las Afiliaciones, que son los módulos con consultas más complejas.
