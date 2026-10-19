# Guía de Despliegue y Conexión - Sifrah

Este documento describe cómo se despliegan y se conectan las piezas de producción de Sifrah.

## 1. Accesos y Entornos de Producción

- **Backend (DigitalOcean Droplet):** `68.183.125.105`, nombre de host `serve-sifrah`.
- **Frontend (Vercel):** `https://sifrah.vercel.app`, desplegado desde `Sifrah_admin`.
- **Base de datos (AWS EC2):** MongoDB en `us-east-2` (Ohio). Solo acepta conexiones desde la IP del droplet.

### Acceso SSH

- **Despliegue automático (CI):** usa el usuario `deploy` y la llave dedicada de CI. No usa root.
- **Acceso manual de administración:** la llave de desarrollo `~/.ssh/sifrah_dev_key`, usuario `root`. Esto es temporal: el login de root se cerrará cuando el despliegue esté validado.

Conexión manual con alias recomendado en `~/.ssh/config`:

```ssh-config
Host sifrah-prod
    HostName 68.183.125.105
    User root
    IdentityFile ~/.ssh/sifrah_dev_key
    IdentitiesOnly yes
```

Después: `ssh sifrah-prod`.

**Importante:** no uses `StrictHostKeyChecking no`. Desactiva la verificación del servidor. Si necesitas aceptar la huella por primera vez, hazlo con `StrictHostKeyChecking ask` y compárala con la registrada.

**Copias de la llave:** existen copias en `~/.ssh/`, en el Escritorio y en `~/proyectos/`. La del Escritorio puede sincronizarse con iCloud. La copia de trabajo es la de `~/.ssh/`.

---

## 2. Frontend (Admin) en Vercel

El repositorio **Sifrah_admin** se despliega solo con Vercel. Basta con hacer commit y push a `master`; Vercel compila y publica la nueva versión en pocos segundos.

```bash
cd admin/
git add .
git commit -m "feat: nueva funcionalidad"
git push origin master
```

---

## 3. Backend (Server): despliegue automático

El repositorio **Sifrah_server** se despliega solo. Cada `push` a `master` ejecuta el workflow `Deploy a DigitalOcean` (`.github/workflows/deploy-do.yml`).

### Flujo

```bash
cd server/
git add .
git commit -m "feat: actualización backend"
git push origin master
```

Al terminar el push, GitHub Actions:

1. Se conecta por SSH al droplet como `deploy`, con la llave `DO_SSH_KEY`.
2. Verifica el servidor con la huella guardada en `DO_KNOWN_HOSTS`.
3. Ejecuta `sudo /usr/local/bin/sifrah-deploy`, un script fijo propiedad de root que hace:
   - `git pull origin master` en `/var/www/sifrah-server`.
   - `npm run build`.
   - Compila el motor Go de `cierre_engine` con `build-linux.sh`.
   - `pm2 restart sifrah-server`.

Cada paso va en su propia línea del script, así que un fallo detiene el deploy antes del reinicio. La app seguirá corriendo con la versión anterior.

**Seguimiento:** `gh run list -R JordyMontalvo/Sifrah_server --workflow "Deploy a DigitalOcean"`.

### Secretos del repositorio

Configurados en `JordyMontalvo/Sifrah_server` → Settings → Secrets → Actions:

| Secreto | Contenido |
|---|---|
| `DO_HOST` | IP del droplet |
| `DO_USER` | `deploy` |
| `DO_SSH_KEY` | llave privada de CI (`sifrah_deploy_ci`) |
| `DO_KNOWN_HOSTS` | huella del servidor |

Los valores no van en el repo. Si cambia la llave o el servidor, actualízalos con `gh secret set`.

### Importante: quién puede disparar un deploy

**Cualquier push a `master` despliega a producción**, sin revisión. Quien tenga permiso de escritura en el repo puede desplegar, y el script corre código del repo con privilegios de root en el servidor. Hoy `master` no tiene protección de rama. Antes de dar acceso a alguien nuevo, valida ese riesgo.

### Revertir un deploy

Si un deploy rompe producción, revierte el commit y haz push:

```bash
cd server/
git revert <sha-del-commit-malo>
git push origin master
```

El revert dispara otro deploy con el código anterior.

### Probar sin riesgo

No pruebes con código roto en `master` salvo que sea necesario. Para verificar el wrapper, el procedimiento usado fue: añadir un `exit 1` temporal en `cierre_engine/build-linux.sh`, confirmar que el deploy termina en `failure` y que pm2 no se reinicia, y luego revertir.

### Configuración del servidor (una sola vez)

El usuario `deploy` y el wrapper se instalan con `drafts/setup-deploy-user.sh` (en `~/Projects/agente-mantenimiento/drafts/`). Ese script:

- Crea el usuario `deploy` sin contraseña, con acceso solo por llave.
- Instala `/usr/local/bin/sifrah-deploy` (propiedad de root).
- Da `sudo` sin contraseña únicamente para ese script.

Es seguro volver a ejecutarlo: no recrea el usuario y reescribe el wrapper y el sudoers.

### Notas sobre el motor de cierres (Go)

Si cambias `server/cierre_engine/`, el deploy compila `build-linux.sh` en el servidor. Ese paso genera `engine_linux`, que usa `pages/api/admin/closeds.js`. No necesitas ejecutarlo a mano.

### Lo que todavía no está resuelto

- El login de root por SSH sigue activo con la llave de desarrollo. Se cierra cuando el despliegue esté validado.
- `master` no tiene protección de rama.
- Hay un archivo de respaldo `.env` sin seguimiento en `/var/www/sifrah-server`. Conviene moverlo fuera del repo.

---

## 4. Base de datos y cortafuegos de AWS

La base de datos de MongoDB está en una instancia EC2 con un Security Group estricto:

- **Conexiones desde tu Mac fallarán:** un intento directo desde una red externa termina en `MongoServerSelectionError: connection timed out`.
- **IP permitida:** solo la del droplet de DigitalOcean (`68.183.125.105`).
- **Scripts de corrección:** súbelos con `scp` al servidor y ejecútalos desde allí, por ejemplo `backfill_closed_periods.js`.
