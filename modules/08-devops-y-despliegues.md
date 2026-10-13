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
