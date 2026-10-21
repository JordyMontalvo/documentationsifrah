# 08. Infraestructura, DevOps & Guía de Despliegues

Este documento detalla los procedimientos operativos estándar para el mantenimiento y despliegue del ecosistema Sifrah en sus entornos de nube.

---

## 🌊 1. Despliegue en DigitalOcean Droplet (Backend Hub)

- **Dirección IP:** `68.183.125.105`
- **Usuario:** `root`
- **Directorio de Producción:** `/var/www/sifrah-server`
- **Llave SSH:** `sifrah_dev_key.pem`

### Conexión por Terminal:
```bash
ssh -i /ruta/a/sifrah_dev_key.pem root@68.183.125.105
```

### Script de Despliegue Rápido (One-Liner):
```bash
cd /var/www/sifrah-server && \
git pull origin master && \
npm install --production && \
cd cierre_engine && go build -o cierre_bin main.go && cd .. && \
pm2 reload ecosystem.config.js --update-env
```

### Monitoreo de Procesos con PM2:
```bash
pm2 status                # Ver estado de procesos
pm2 logs sifrah-api       # Ver logs en tiempo real
pm2 restart sifrah-api    # Reiniciar servidor API
```

---

## ☁️ 2. Base de Datos Central MongoDB en AWS EC2 (Ohio)

- **Instancia:** EC2 Ubuntu dedicada en región `us-east-2`.
- **DNS Público:** `ec2-18-220-240-71.us-east-2.compute.amazonaws.com`
- **Puerto Seguro:** `27017`
- **Estrategia de Respaldos:**
  Un cron job diario ejecuta un `mongodump` comprimido con gzip y lo sube con clave encriptada hacia Bunny.net Storage:
  ```bash
  mongodump --uri="mongodb://user:pass@localhost:27017/sifrah" --archive="/backups/sifrah_$(date +%F).gz" --gzip
  ```

---

## ▲ 3. Despliegue de Frontends

### Sifrah Admin en Vercel:
- Vinculado al repositorio Git en la rama `master`.
- Cada push a producción dispara automáticamente una build y despliegue en CDN global en `sifrah.vercel.app`.

### Sifrah App Móvil (Android Google Play):
1. Sincronizar activos web:
   ```bash
   cd app && npm run build && npx cap sync android
   ```
2. Generar Android App Bundle (.aab) firmado:
   ```bash
   cd android && ./gradlew bundleRelease
   ```
3. El archivo generado en `app/build/outputs/bundle/release/app-release.aab` se sube a Google Play Console.

---

## 🎙️ 4. Servidor de Audio en Vivo (AzuraCast)

Droplet dedicado **separado** del backend (el streaming consume ancho de banda y no debe afectar a la API).

- **Droplet:** `sifrahCast` · `24.199.93.133` · `s-2vcpu-2gb` · Ubuntu 24.04 · swap 2 GB.
- **Dominio:** `radio.serve-sifrah.xyz` (registro A) con HTTPS de Let's Encrypt (renovación automática).
- **Instalación:** Docker oficial en `/var/azuracast` (`docker.sh`, canal Stable).
- **Conexión por terminal:**
  ```bash
  ssh -i sifrah_dev_key.pem -o IdentitiesOnly=yes root@24.199.93.133
  ```
- **Variables nuevas en el backend** (`/var/www/sifrah-server/.env`): `AZURACAST_BASE_URL`, `AZURACAST_STATION`, `AZURACAST_STREAM_URL`. Aplicar con `pm2 restart sifrah-server --update-env` (cargar nvm antes).
- **No borrar** la playlist "Fuera del aire (silencio)": sin ella el estado en vivo no se detecta.
- Configuración, operación y troubleshooting completos en [`../02-desarrollo-por-capas/audio-en-vivo-azuracast.md`](../02-desarrollo-por-capas/audio-en-vivo-azuracast.md).
