# Guía de Despliegue y Conexión - Sifrah

Este documento contiene todo el contexto técnico necesario para compilar, empujar cambios y desplegar la aplicación en el servidor de DigitalOcean de forma automatizada, así como reglas de conexión clave.

## 1. Accesos y Credenciales
El entorno de producción se divide en tres piezas principales:
- **Servidor Backend (DigitalOcean)**: `68.183.125.105`
- **Panel Frontend (Vercel)**: `https://sifrah.vercel.app`
- **Base de Datos (AWS)**: `ec2-18-220-240-71.us-east-2.compute.amazonaws.com`

### Llave SSH Local
Para cualquier acceso al servidor de DO, requieres la llave `.pem` ubicada en el escritorio local:
```bash
/Users/jordymontalvo/Desktop/sifrah_dev_key.pem
```

Para ingresar manualmente al servidor, ejecuta:
```bash
ssh -i /Users/jordymontalvo/Desktop/sifrah_dev_key.pem -o StrictHostKeyChecking=no root@68.183.125.105
```

---

## 2. Flujo de Despliegue del Frontend (Admin)
El repositorio **Sifrah_admin** utiliza CI/CD manejado directamente por **Vercel**. 
No necesitas realizar despliegues manuales; basta con hacer un commit y empujar los cambios a GitHub.

```bash
cd /Users/jordymontalvo/proyectos/sifrah/admin
git add .
git commit -m "feat: nueva funcionalidad"
git push origin master
```
*A los pocos segundos de hacer push, Vercel compilará la aplicación de Vue y actualizará la URL pública de forma automática.*

---

## 3. Flujo de Despliegue del Backend (Server)
El código en **Sifrah_server** requiere dos pasos: subida a GitHub y compilación/reinicio manual en DigitalOcean.

### Paso A: Subir cambios locales a GitHub
```bash
cd /Users/jordymontalvo/proyectos/sifrah/server
git add .
git commit -m "feat: actualizacion backend"
git push origin master
```

### Paso B: Comando de Despliegue Automatizado a Producción
Para desplegar el backend sin tener que conectarte e interactuar manualmente por consola, puedes usar un **Comando Mágico (One-Liner)** desde tu máquina local. 
Este comando hace lo siguiente:
1. Se conecta al servidor usando SSH.
2. Carga las variables de entorno de Node (vía NVM) requeridas para que funcionen comandos como `pm2`.
3. Navega al repositorio en `/var/www/sifrah-server` y hace un `git pull`.
4. Re-compila el motor en lenguaje Go (`cierre_engine`) para Linux.
5. Reinicia todos los procesos de Node con `pm2`.

**Ejecuta esto en tu terminal de macOS:**
```bash
ssh -i /Users/jordymontalvo/Desktop/sifrah_dev_key.pem -o StrictHostKeyChecking=no root@68.183.125.105 'bash -c "export NVM_DIR=\"\$HOME/.nvm\"; [ -s \"\$NVM_DIR/nvm.sh\" ] && \\. \"\$NVM_DIR/nvm.sh\"; cd /var/www/sifrah-server && git pull origin master && npm run build && cd cierre_engine && ./build-linux.sh && cd .. && pm2 restart all"'
```

> **Nota importante sobre el Motor de Cierres (Go)**:
> Cuando modificas el código dentro de la carpeta `server/cierre_engine/`, es estrictamente necesario que el archivo `build-linux.sh` se ejecute en el servidor remoto, ya que éste genera el binario en formato Linux (`engine_linux`) que el servidor utiliza en la ruta final de `api/admin/closeds.js`. El one-liner de arriba incluye este paso.

---

## 4. Scripts y la Base de Datos (AWS)
La Base de Datos de MongoDB en producción está montada en una instancia EC2 de AWS con una regla de cortafuegos estricta.

- **Conexiones Locales Fallarán:** Tratar de ejecutar herramientas locales u operaciones directas hacia la URL de mongo desde la computadora en tu casa resultará en un `MongoServerSelectionError: connection timed out`.
- **IP Blanca (Whitelisted):** La única IP que tiene acceso libre a interactuar con la Base de Datos es la del servidor de DigitalOcean (`68.183.125.105`).
- **Solución:** Cuando necesites ejecutar scripts de corrección (ej: `backfill_closed_periods.js`), siempre asegúrate de usar `scp` para enviar el archivo al servidor y correr el comando de `node` directamente en el servidor de DigitalOcean.
