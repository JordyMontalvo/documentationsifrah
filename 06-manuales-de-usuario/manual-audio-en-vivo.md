# Manual de usuario: Audio en vivo

Manual para publicar, transmitir y escuchar encuentros en vivo dentro de SIFRAH. Versión 1 · 21 de octubre de 2026.

📄 **Versión imprimible:** [SIFRAH_Manual_Audio_en_Vivo.pdf](06-manuales-de-usuario/SIFRAH_Manual_Audio_en_Vivo.pdf) (13 páginas).

| Rol | Qué hace | Sección |
| :--- | :--- | :--- |
| **Administrador** | Crea el encuentro, lo pone en vivo cuando el expositor ya transmite y lo finaliza al terminar. | 3 |
| **Expositor** | Habla desde el Web DJ en una computadora con Firefox. No instala nada. | 4 |
| **Socio** | Escucha dentro de SIFRAH, en Audios › En vivo, desde la web o el celular. | 5 |

> ⚠️ **Regla de oro:** el expositor transmite **primero** (en Firefox) y solo después el administrador pulsa **Poner en vivo**. Así ningún socio encuentra un encuentro "en vivo" en silencio.

---

## 1. Cómo funciona

Intervienen tres personas y cada una actúa en un orden. El paso clave es el 4: el administrador pone en vivo solo cuando el expositor ya está transmitiendo.

![Flujo completo de un encuentro en vivo: 3 roles, 8 pasos](06-manuales-de-usuario/img/audio-en-vivo/diagrama-flujo.png)

> ℹ️ Los socios escuchan con **10 a 20 segundos de retraso** respecto a lo que dice el expositor. Es normal en este tipo de transmisión.

---

## 2. Antes de empezar

> 🦊 **El expositor debe usar Firefox.** En Chrome la transmisión se corta a los pocos segundos. Descárgalo gratis en mozilla.org/firefox.

| Quién | Qué necesita | Detalle |
| :--- | :--- | :--- |
| Administrador | Usuario del panel administrativo de SIFRAH | Menú **Herramientas › Audio en vivo** |
| Expositor | Computadora con **Firefox** actualizado | Transmitir desde el celular aún no está disponible |
| Expositor | Micrófono | El de la laptop sirve; uno externo suena mejor. Conéctalo antes de abrir el navegador |
| Expositor | **Auriculares** si escuchará la transmisión | Evitan el eco entre micrófono y parlantes |
| Expositor | Usuario `sifrah_dj` y su contraseña | La entrega el responsable técnico, en privado |
| Expositor | Internet estable (cable o buen Wi-Fi) | Una caída de red corta la transmisión |
| Socio | Cuenta de SIFRAH afiliada | App web o navegador del celular |

---

## 3. Administrador: publicar y controlar

El administrador decide **cuándo los socios ven el encuentro en vivo**. Guardar o programar no lo pone en el aire: solo el botón **Poner en vivo** lo hace.

### A. Crear el encuentro (días u horas antes)

1. En el panel administrativo abre **Herramientas** y elige **Audio en vivo**.

   ![Paso 1: menú Herramientas › Audio en vivo](06-manuales-de-usuario/img/audio-en-vivo/admin-1-menu.png)

2. Pulsa **Nuevo encuentro**.

   ![Paso 2: botón Nuevo encuentro](06-manuales-de-usuario/img/audio-en-vivo/admin-2-nuevo.png)

3. Completa **Título** (obligatorio), **Expositor**, **Descripción**, **Portada** (imagen cuadrada) e **Inicio y fin** en **hora de Perú**. Deja **vacíos** "Estación AzuraCast" y "URL del Stream": el sistema usa los correctos.
4. Pulsa **Crear encuentro**. Queda como **Programado** y aparece a los socios en "Próximas transmisiones".

   ![Pasos 3 y 4: formulario del encuentro (las etiquetas moradas indican campos que se dejan vacíos)](06-manuales-de-usuario/img/audio-en-vivo/admin-3-formulario.png)

### B. Poner en vivo (al empezar)

1. Confirma con el expositor que **ya está transmitiendo** en el Web DJ (sección 4).
2. En la fila del encuentro pulsa **Poner en vivo**. La etiqueta cambia a **EN VIVO**. Si había otro encuentro en vivo, el sistema pide confirmación y lo finaliza.

   ![Paso B.2: Poner en vivo](06-manuales-de-usuario/img/audio-en-vivo/admin-4-poner-en-vivo.png)

Los socios que entren a Audios lo verán de inmediato; los que ya estaban dentro, en menos de 1 minuto.

### C. Finalizar (al terminar)

1. Pulsa **Finalizar**. La etiqueta cambia a **Finalizado**.
2. Pide al expositor que pulse **STOP STREAMING**.

   ![Paso C.1: Finalizar](06-manuales-de-usuario/img/audio-en-vivo/admin-5-finalizar.png)

> ℹ️ **Otras acciones:** **Editar** cambia textos, portada u horario sin afectar el estado. **Cancelar** retira un encuentro programado. **Eliminar** lo borra. Mientras un encuentro está en vivo **lo ven todos los socios**: para pruebas usa un título como "Prueba técnica".

---

## 4. Expositor: transmitir

El expositor transmite desde **Firefox, en una computadora**, entrando a una página web. Los números de la imagen coinciden con los pasos.

![Página del Web DJ: radio.serve-sifrah.xyz/public/sifrah/dj](06-manuales-de-usuario/img/audio-en-vivo/webdj-1-pasos.png)

1. Abre **Firefox** y entra a **radio.serve-sifrah.xyz/public/sifrah/dj**.
2. En **Username** escribe `sifrah_dj`.
3. En **Password** escribe la contraseña. Si la pegas, revisa que no quede un punto o espacio al final.
4. Deja **Sample Rate** en 44.1 kHz y **Bit Rate** en 128 kbps (ya vienen así).
5. Pulsa **START STREAMING**. El botón cambia a **STOP STREAMING**.
6. En **Microphone Source** elige tu micrófono.
7. Pulsa el **botón rojo del micrófono** para activarlo. Si Firefox pregunta, pulsa **Permitir**.
8. Avisa al administrador: *"ya estoy transmitiendo"*, para que pulse **Poner en vivo**.

**✅ Durante la transmisión**

- Habla con normalidad: los socios te oyen 10–20 s después.
- **No cierres ni cambies la pestaña** del Web DJ.
- No dejes que la computadora entre en reposo.
- Opcional: escribe el tema en **Update Metadata**.
- Para escucharte, usa auriculares y otro dispositivo.

**⏹ Al terminar**

1. Pulsa **STOP STREAMING**.
2. Avisa al administrador para que pulse **Finalizar**.

---

## 5. Socios: cómo escuchar

Los socios escuchan **dentro de SIFRAH**, sin descargar otra aplicación.

1. Ingresa a SIFRAH y abre el **menú ☰** (arriba a la izquierda).

   ![1: abre el menú](06-manuales-de-usuario/img/audio-en-vivo/app-1-menu.png)

2. Toca **Universidad Sifrah** y luego **Audios**. También puedes usar el atajo **Audios** de la pantalla de Inicio.

   ![2: Universidad Sifrah › Audios](06-manuales-de-usuario/img/audio-en-vivo/app-1-universidad.png)

3. Si hay una transmisión, se abre sola la pestaña **En vivo**. Si no, se abre **Biblioteca**.
4. Pulsa **Escuchar**. El audio empieza en unos segundos.

   ![3 y 4: se abre En vivo, pulsa Escuchar](06-manuales-de-usuario/img/audio-en-vivo/app-4-en-vivo.png)

5. Usa **Pausar** y la barra de **volumen**. Al volver a Escuchar te conecta al momento actual.

   ![5: escuchando, con Pausar y volumen](06-manuales-de-usuario/img/audio-en-vivo/app-5-escuchando.png)

### Qué significa cada pantalla

| Lo que ves | Qué significa | Qué hacer |
| :--- | :--- | :--- |
| Tarjeta gris **"Estamos fuera del aire"** | No hay transmisión ahora | Revisa "Próximas transmisiones" y pulsa **Recordarme** |
| Tarjeta fucsia con **EN VIVO** | Hay una transmisión en curso | Pulsa **Escuchar** |
| **"Conectando…"** | El audio está cargando | Espera unos segundos |
| Ondas y **"Estás escuchando en vivo"** | Ya estás escuchando | Ajusta el volumen |
| **"Esperando al expositor…"** | Empezó, pero el expositor aún no se conecta | Espera; se activa solo |
| **"Estamos en vivo · Escuchar"** en Biblioteca | Empezó una transmisión mientras navegabas | Tócalo para ir a En vivo |
| **"No pudimos comprobar la transmisión"** | Problema de conexión | Revisa tu internet y pulsa **Reintentar** |

![Aviso en Biblioteca cuando empieza una transmisión](06-manuales-de-usuario/img/audio-en-vivo/app-6-aviso-biblioteca.png)

![“Esperando al expositor…”](06-manuales-de-usuario/img/audio-en-vivo/app-7-esperando.png)

### Recordarme: guardar una transmisión en tu calendario

1. En **Próximas transmisiones**, pulsa **Recordarme**.

   ![Fuera del aire + Recordarme](06-manuales-de-usuario/img/audio-en-vivo/app-2-fuera-del-aire.png)

2. Elige **Google Calendar** o **Apple / Outlook (.ics)**.

   ![Elige tu calendario](06-manuales-de-usuario/img/audio-en-vivo/app-3-recordarme.png)

El evento queda con fecha y hora de Perú, e incluye un enlace que te lleva directo a En vivo.

---

## 6. Checklist del día del encuentro

Marca cada casilla en orden. Los tiempos son una guía.

**30 min antes**

- [ ] **Admin:** el encuentro existe en **Audio en vivo** como **Programado**, con título, expositor y portada.
- [ ] **Expositor:** computadora enchufada, internet estable, **Firefox** abierto y micrófono conectado.
- [ ] **Expositor:** entra al Web DJ y confirma que el usuario y la contraseña funcionan.

**5 min antes**

- [ ] **Expositor:** pulsa **START STREAMING**, elige el micrófono y lo activa.
- [ ] **Expositor:** avisa al administrador: *"ya estoy transmitiendo"*.
- [ ] **Admin:** pulsa **Poner en vivo**.
- [ ] **Admin:** en su celular entra a **Audios › En vivo**, pulsa **Escuchar** y confirma que se oye.

**Durante**

- [ ] **Expositor:** no cierra la pestaña del Web DJ ni deja que la computadora entre en reposo.

**Al terminar**

- [ ] **Expositor:** pulsa **STOP STREAMING**.
- [ ] **Admin:** pulsa **Finalizar**.
- [ ] **Admin:** confirma en el celular que aparece "Estamos fuera del aire".

---

## 7. Problemas frecuentes

La mayoría se resuelve en segundos. Si nada funciona: **STOP STREAMING**, recarga la página y vuelve a empezar.

| Problema | Causa probable | Solución |
| :--- | :--- | :--- |
| El Web DJ no deja entrar | Contraseña mal escrita; al pegarla se coló un punto o espacio | Escríbela a mano, respetando mayúsculas y minúsculas |
| La transmisión se corta a los pocos segundos | Se está usando **Chrome** | Usa **Firefox** |
| Los socios ven "Esperando al expositor…" | El encuentro está en vivo, pero el expositor no transmite | El expositor pulsa START STREAMING y activa el micrófono; se arregla solo en menos de 1 minuto |
| Se oye silencio | Micrófono apagado o mal elegido | Revisa **Microphone Source** y el botón rojo del micrófono |
| Hay eco o un pitido | El micrófono capta los parlantes | Usa auriculares o baja el volumen del otro dispositivo |
| El socio no ve el encuentro | Aún no se pulsó **Poner en vivo** | Pulsarlo; el socio sale y vuelve a entrar a Audios |
| "Este sitio no se puede alcanzar" al abrir el Web DJ | La red de la oficina guardó una respuesta antigua del dominio | Prueba con datos móviles, o cambia el DNS de la computadora a `1.1.1.1` |
| "No pudimos comprobar la transmisión" | Internet del socio inestable | Revisar la conexión y pulsar **Reintentar** |

---

## 8. Enlaces y accesos

| Para | Enlace o dato |
| :--- | :--- |
| Expositor · Transmitir (Web DJ) | **radio.serve-sifrah.xyz/public/sifrah/dj** |
| Expositor · Usuario | `sifrah_dj` |
| Expositor · Contraseña | La entrega el responsable técnico, en privado |
| Expositor · Navegador | **Firefox** · mozilla.org/firefox |
| Admin · Gestionar encuentros | Panel administrativo › **Herramientas › Audio en vivo** |
| Socio · Escuchar | SIFRAH › menú ☰ › **Universidad Sifrah › Audios › En vivo** |

> 🔒 Por seguridad, la contraseña del Web DJ **no se escribe en este manual** ni se envía por grupos de chat.

Documentación técnica relacionada: [Audio en vivo con AzuraCast](02-desarrollo-por-capas/audio-en-vivo-azuracast.md). Propuesta funcional original (Mixlr, con maquetas): [Propuesta_Audio_en_Vivo_Mixlr_SIFRAH.pdf](05-archivo-historico/funcionales/Propuesta_Audio_en_Vivo_Mixlr_SIFRAH.pdf).

*Las capturas usan datos de ejemplo ("Conecta con tu propósito", Jesús Muñoz) con fines ilustrativos.*
