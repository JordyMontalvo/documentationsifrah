# Guía: Instalar MongoDB en EC2 y clonar base desde Atlas

Este documento resume, paso a paso, todo lo que hicimos (y faltaba por hacer) para:
- Instalar y habilitar MongoDB en una instancia EC2
- Crear usuario de aplicación
- Habilitar autenticación
- Abrir el puerto 27017 de forma segura
- Clonar (dump/restore) la base de datos desde Atlas hacia EC2
- Configurar tu aplicación para apuntar a la nueva base
- (Opcional) Habilitar TLS/SSL

Usa estos comandos como referencia y ejecútalos en tu EC2 (Ubuntu) y en tu equipo local según aplique. Ajusta usuarios, contraseñas y URIs antes de ejecutar.

---

## 1) Verificación inicial de MongoDB en EC2
Comprobar que `mongod` está instalado y corriendo, así como su configuración.

- Puertos escuchando (verificar 27017):
  - `ss -ltnp | grep 27017`

- Revisar configuración:
  - `sudo cat /etc/mongod.conf`

- Estado del servicio:
  - `sudo systemctl status mongod`

- Últimas líneas del log de servicio:
  - `sudo journalctl -u mongod -n 80 --no-pager`

- Ping al servidor MongoDB:
  - `mongosh --eval 'db.runCommand({ ping: 1 })'`

---

## 2) Habilitar acceso remoto (bindIp=0.0.0.0)
Para permitir conexiones externas (por ejemplo, Compass desde tu laptop):

- Respaldo del archivo:
  - `sudo cp /etc/mongod.conf /etc/mongod.conf.bak`

- Ajuste del bindIp (en la sección `net:`):
  - `sudo sed -i 's/^\(\s*bindIp:\s*\).*/\1 0.0.0.0/' /etc/mongod.conf`

- Reinicio del servicio:
  - `sudo systemctl restart mongod`

- Verificación que escucha en todas las interfaces:
  - `ss -ltnp | grep 27017`

Nota: Abre el puerto 27017 en el Security Group (ver sección 5) y restringe por IP.

---

## 3) Crear usuario de aplicación “cbm” en la base “sifrah”
Usuario de aplicación con permisos de lectura/escritura y administración en la DB.

- Crear usuario (script en mongosh):
```
mongosh <<'EOF'
const dbName = 'sifrah';
const user = 'cbm';
const pass = '123456';
const roles = [
  { role: 'readWrite', db: dbName },
  { role: 'dbAdmin', db: dbName }
];
const dbRef = db.getSiblingDB(dbName);
dbRef.dropUser(user);
dbRef.createUser({ user, pwd: pass, roles });
print('User created:'); printjson(dbRef.getUser(user));
EOF
```

- Probar login:
  - `mongosh 'mongodb://cbm:123456@127.0.0.1:27017/sifrah?authSource=sifrah&directConnection=true' --eval 'db.runCommand({ ping: 1 })'`

---

## 4) Habilitar autenticación en `mongod.conf`
Asegura que MongoDB requiere usuarios/contraseñas para acceder.

- Respaldo del archivo:
  - `sudo cp /etc/mongod.conf /etc/mongod.conf.sec.bak`

- Si existe la sección `security`, activar `authorization`:
  - `sudo sed -i 's/^\(\s*authorization:\s*\).*/\1enabled/' /etc/mongod.conf`

- Si no existe, añadir la sección al final del archivo:
  - `sudo bash -lc 'printf "\nsecurity:\n  authorization: enabled\n" | sudo tee -a /etc/mongod.conf'`

- Reiniciar servicio:
  - `sudo systemctl restart mongod`

- Probar autenticación con el usuario “cbm”:
  - `mongosh 'mongodb://cbm:123456@127.0.0.1:27017/sifrah?authSource=sifrah&directConnection=true' --eval 'db.runCommand({ ping: 1 })'`

---

## 5) Abrir puerto 27017 en el Security Group de EC2
Permite acceso remoto a MongoDB desde tu IP (evitar 0.0.0.0/0 en producción).

- Vía consola AWS: editar el Security Group asociado a la instancia y añadir una regla Inbound para TCP 27017 con origen `TU_IP_PUBLICA/32`.

- Ejemplo con AWS CLI (requiere CLI configurada):
  - `aws ec2 authorize-security-group-ingress --group-id sg-XXXXXXXX --protocol tcp --port 27017 --cidr TU_IP_PUBLICA/32`

---

## 6) Clonar datos desde Atlas (dump/restore)
Crear un respaldo desde Atlas y restaurarlo en tu EC2.

- Conectarte por SSH a la instancia (desde tu laptop):
  - `ssh -i /ruta/a/tu-key.pem ubuntu@<IP_PUBLICA_EC2>`

- Instalar database tools si faltan:
  - `sudo apt-get update && sudo apt-get install -y mongodb-database-tools`

- Guardar tu URI de Atlas de forma segura:
  - `echo 'mongodb+srv://USUARIO:CONTRASENA@CLUSTER_HOST/BASE?retryWrites=true&w=majority' > ~/.atlas_uri`
  - `chmod 600 ~/.atlas_uri`

- Realizar el dump (toda la base o solo “sifrah”):
  - `mkdir -p ~/dump`
  - Dump completo: `mongodump --forceTableScan --uri "$(cat ~/.atlas_uri)" --out ~/dump`
  - Solo “sifrah”: `mongodump --forceTableScan --uri "$(cat ~/.atlas_uri)" --db sifrah --out ~/dump`

- Restaurar en EC2 (base “sifrah”, con autenticación):
  - `mongorestore --drop --host 127.0.0.1 --port 27017 --username cbm --password '123456' --authenticationDatabase sifrah --db sifrah ~/dump/sifrah`

- Verificar colecciones:
  - `mongosh 'mongodb://cbm:123456@127.0.0.1:27017/sifrah?authSource=sifrah&directConnection=true' --eval 'db.getCollectionNames()'`

- Verificar conteos por colección:
  - `mongosh 'mongodb://cbm:123456@127.0.0.1:27017/sifrah?authSource=sifrah&directConnection=true' --eval 'db.getCollectionNames().forEach(c => print(c, db.getCollection(c).countDocuments()))'`

---

## 7) Conectar tu aplicación a la nueva base
Variables de entorno según dónde corra tu app/servidor.

- Si tu app corre en la misma EC2:
  - `DB_URL=mongodb://cbm:123456@127.0.0.1:27017/sifrah?authSource=sifrah&directConnection=true`
  - `DB_NAME=sifrah`

- Si conectarás desde fuera (tu laptop):
  - `DB_URL=mongodb://cbm:123456@<IP_PUBLICA_EC2>:27017/sifrah?authSource=sifrah`
  - `DB_NAME=sifrah`

- Si tu código usa `MONGODB_URI`:
  - `MONGODB_URI=mongodb://cbm:123456@<IP_PUBLICA_EC2>:27017/sifrah?authSource=sifrah`

> Archivos relevantes en tu proyecto (para revisar/ajustar):
> - server/components/db-connect.js
> - server/config/config-heroku.js
> - Endpoints en server/pages/api/ que usen el conector de DB.

---

## 8) TLS/SSL (opcional, recomendado para producción)
Compass muestra una advertencia si TLS no está habilitado. Para activarlo (auto-firmado de prueba):

- Generar certificado (ajusta `CN` a tu IP o dominio):
  - `openssl req -newkey rsa:4096 -nodes -keyout mongo.key -x509 -days 365 -out mongo.crt -subj "/CN=<IP_PUBLICA_EC2>"`
  - `sudo mkdir -p /etc/ssl/mongo && sudo mv mongo.key mongo.crt /etc/ssl/mongo/`
  - `sudo chown root:root /etc/ssl/mongo/* && sudo chmod 600 /etc/ssl/mongo/mongo.key`

- Añadir configuración TLS a `/etc/mongod.conf`:
  - `sudo bash -lc 'printf "\nnet:\n  tls:\n    mode: preferTLS\n    certificateKeyFile: /etc/ssl/mongo/mongo.key\n    CAFile: /etc/ssl/mongo/mongo.crt\n" | sudo tee -a /etc/mongod.conf'`

- Reiniciar servicio:
  - `sudo systemctl restart mongod`

- Conectar desde Compass activando SSL y especificando el CA si aplica.

---

## 9) Utilidades
- Obtener IP pública y privada en EC2:
  - IP pública: `curl -s http://169.254.169.254/latest/meta-data/public-ipv4`
  - IP privada: `hostname -I | awk '{print $1}'`

- Ver procesos y puertos:
  - `ps aux | grep mongod`
  - `ss -ltnp | grep 27017`

- Reiniciar servicio y ver estado:
  - `sudo systemctl restart mongod`
  - `sudo systemctl status mongod`

---

## 10) Seguridad y buenas prácticas
- Limita el Security Group 27017 a IPs necesarias (idealmente tu IP /32), evita 0.0.0.0/0.
- No guardes credenciales de Atlas en texto plano en repositorios. Usa `~/.atlas_uri` con permisos `600`.
- Considera activar TLS/SSL para mejorar seguridad en tránsito.

---

## 11) Notas de conexión
- Conexión de Compass directa (sin TLS): `mongodb://cbm:123456@<IP_PUBLICA_EC2>:27017/sifrah?authSource=sifrah`
- Si Compass te advierte de TLS, es porque aún no está habilitado. Puedes ignorar para pruebas o activar TLS (sección 8).

---

## 12) Siguiente paso
Si lo deseas, puedo ejecutar el dump/restore por ti. En ese caso, compárteme (por canal seguro) tu URI de Atlas, o ejecútalo tú con los comandos de la sección 6 y me confirmas para ajustar la app a la nueva URI de EC2.

---

## 0) Instalación de MongoDB en Ubuntu (descarga e instalación)
Comandos para instalar el motor MongoDB desde el repositorio oficial en una instancia EC2 con Ubuntu.

- Detectar versión/codename de Ubuntu (para configurar el repo correcto):
```
source /etc/os-release
echo "ID=$ID VERSION_ID=$VERSION_ID VERSION_CODENAME=$VERSION_CODENAME"
```

- Añadir llave y repositorio oficial de MongoDB (ajusta la versión si deseas 7.0):
```
MONGO_VERSION="6.0"
# Importar llave GPG
curl -fsSL https://pgp.mongodb.com/server-${MONGO_VERSION}.asc | \
  sudo gpg -o /usr/share/keyrings/mongodb-server-${MONGO_VERSION}.gpg --dearmor

# Añadir repo (usa VERSION_CODENAME detectado arriba, por ejemplo: jammy, focal)
VERSION_CODENAME=$(source /etc/os-release && echo $VERSION_CODENAME)
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-${MONGO_VERSION}.gpg ] https://repo.mongodb.org/apt/ubuntu ${VERSION_CODENAME}/mongodb-org/${MONGO_VERSION} multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-${MONGO_VERSION}.list
```

- Instalar MongoDB y habilitar el servicio:
```
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl enable --now mongod
sudo systemctl status mongod
```

- Comandos de servicio útiles:
```
sudo systemctl start mongod
sudo systemctl stop mongod
sudo systemctl restart mongod
sudo systemctl status mongod
```

- Verificar proceso y puerto por defecto (27017):
```
ps aux | grep mongod
ss -ltnp | grep 27017
```

---

## 0.1) Configurar puerto y bindIp en /etc/mongod.conf
Ajustar el puerto (por defecto 27017) y la IP de enlace para acceso remoto.

- Respaldar config:
```
sudo cp /etc/mongod.conf /etc/mongod.conf.port.bak
```

- Asegurar sección `net:` con `port` y `bindIp`:
```
# Si la sección net no existe, añadirla al final
sudo bash -lc 'grep -q "^net:" /etc/mongod.conf || printf "\nnet:\n  port: 27017\n  bindIp: 0.0.0.0\n" | sudo tee -a /etc/mongod.conf'

# Si ya existe, forzar valores (cuidado con la indentación YAML)
sudo sed -i 's/^\(\s*port:\s*\).*/\1 27017/' /etc/mongod.conf
sudo sed -i 's/^\(\s*bindIp:\s*\).*/\1 0.0.0.0/' /etc/mongod.conf
```

- Reiniciar servicio y verificar:
```
sudo systemctl restart mongod
ss -ltnp | grep 27017
```

- (Opcional) UFW firewall local — normalmente en AWS controlas acceso via Security Group, pero si usas UFW:
```
sudo ufw allow from TU_IP_PUBLICA to any port 27017 proto tcp
sudo ufw status
```

- Abrir puerto 27017 en el Security Group (preferible y más seguro en AWS):
```
# En consola AWS: agregar regla Inbound TCP 27017 restringida a TU_IP_PUBLICA/32
# Con AWS CLI (requiere configuración previa):
aws ec2 authorize-security-group-ingress --group-id sg-XXXXXXXX --protocol tcp --port 27017 --cidr TU_IP_PUBLICA/32
```

---

## 1) Verificación inicial de MongoDB en EC2
Comprobar que `mongod` está instalado y corriendo, así como su configuración.

- Puertos escuchando (verificar 27017):
  - `ss -ltnp | grep 27017`

- Revisar configuración:
  - `sudo cat /etc/mongod.conf`

- Estado del servicio:
  - `sudo systemctl status mongod`

- Últimas líneas del log de servicio:
  - `sudo journalctl -u mongod -n 80 --no-pager`

- Ping al servidor MongoDB:
  - `mongosh --eval 'db.runCommand({ ping: 1 })'`

---

## 2) Habilitar acceso remoto (bindIp=0.0.0.0)
Para permitir conexiones externas (por ejemplo, Compass desde tu laptop):

- Respaldo del archivo:
  - `sudo cp /etc/mongod.conf /etc/mongod.conf.bak`

- Ajuste del bindIp (en la sección `net:`):
  - `sudo sed -i 's/^\(\s*bindIp:\s*\).*/\1 0.0.0.0/' /etc/mongod.conf`

- Reinicio del servicio:
  - `sudo systemctl restart mongod`

- Verificación que escucha en todas las interfaces:
  - `ss -ltnp | grep 27017`

Nota: Abre el puerto 27017 en el Security Group (ver sección 5) y restringe por IP.

---

## 3) Crear usuario de aplicación “cbm” en la base “sifrah”
Usuario de aplicación con permisos de lectura/escritura y administración en la DB.

- Crear usuario (script en mongosh):
```
mongosh <<'EOF'
const dbName = 'sifrah';
const user = 'cbm';
const pass = '123456';
const roles = [
  { role: 'readWrite', db: dbName },
  { role: 'dbAdmin', db: dbName }
];
const dbRef = db.getSiblingDB(dbName);
dbRef.dropUser(user);
dbRef.createUser({ user, pwd: pass, roles });
print('User created:'); printjson(dbRef.getUser(user));
EOF
```

- Probar login:
  - `mongosh 'mongodb://cbm:123456@127.0.0.1:27017/sifrah?authSource=sifrah&directConnection=true' --eval 'db.runCommand({ ping: 1 })'`

---

## 4) Habilitar autenticación en `mongod.conf`
Asegura que MongoDB requiere usuarios/contraseñas para acceder.

- Respaldo del archivo:
  - `sudo cp /etc/mongod.conf /etc/mongod.conf.sec.bak`

- Si existe la sección `security`, activar `authorization`:
  - `sudo sed -i 's/^\(\s*authorization:\s*\).*/\1enabled/' /etc/mongod.conf`

- Si no existe, añadir la sección al final del archivo:
  - `sudo bash -lc 'printf "\nsecurity:\n  authorization: enabled\n" | sudo tee -a /etc/mongod.conf'`

- Reiniciar servicio:
  - `sudo systemctl restart mongod`

- Probar autenticación con el usuario “cbm”:
  - `mongosh 'mongodb://cbm:123456@127.0.0.1:27017/sifrah?authSource=sifrah&directConnection=true' --eval 'db.runCommand({ ping: 1 })'`

---

## 5) Abrir puerto 27017 en el Security Group de EC2
Permite acceso remoto a MongoDB desde tu IP (evitar 0.0.0.0/0 en producción).

- Vía consola AWS: editar el Security Group asociado a la instancia y añadir una regla Inbound para TCP 27017 con origen `TU_IP_PUBLICA/32`.

- Ejemplo con AWS CLI (requiere CLI configurada):
  - `aws ec2 authorize-security-group-ingress --group-id sg-XXXXXXXX --protocol tcp --port 27017 --cidr TU_IP_PUBLICA/32`

---

## 6) Clonar datos desde Atlas (dump/restore)
Crear un respaldo desde Atlas y restaurarlo en tu EC2.

- Conectarte por SSH a la instancia (desde tu laptop):
  - `ssh -i /ruta/a/tu-key.pem ubuntu@<IP_PUBLICA_EC2>`

- Instalar database tools si faltan:
  - `sudo apt-get update && sudo apt-get install -y mongodb-database-tools`

- Guardar tu URI de Atlas de forma segura:
  - `echo 'mongodb+srv://USUARIO:CONTRASENA@CLUSTER_HOST/BASE?retryWrites=true&w=majority' > ~/.atlas_uri`
  - `chmod 600 ~/.atlas_uri`

- Realizar el dump (toda la base o solo “sifrah”):
  - `mkdir -p ~/dump`
  - Dump completo: `mongodump --forceTableScan --uri "$(cat ~/.atlas_uri)" --out ~/dump`
  - Solo “sifrah”: `mongodump --forceTableScan --uri "$(cat ~/.atlas_uri)" --db sifrah --out ~/dump`

- Restaurar en EC2 (base “sifrah”, con autenticación):
  - `mongorestore --drop --host 127.0.0.1 --port 27017 --username cbm --password '123456' --authenticationDatabase sifrah --db sifrah ~/dump/sifrah`

- Verificar colecciones:
  - `mongosh 'mongodb://cbm:123456@127.0.0.1:27017/sifrah?authSource=sifrah&directConnection=true' --eval 'db.getCollectionNames()'`

- Verificar conteos por colección:
  - `mongosh 'mongodb://cbm:123456@127.0.0.1:27017/sifrah?authSource=sifrah&directConnection=true' --eval 'db.getCollectionNames().forEach(c => print(c, db.getCollection(c).countDocuments()))'`

---

## 7) Conectar tu aplicación a la nueva base
Variables de entorno según dónde corra tu app/servidor.

- Si tu app corre en la misma EC2:
  - `DB_URL=mongodb://cbm:123456@127.0.0.1:27017/sifrah?authSource=sifrah&directConnection=true`
  - `DB_NAME=sifrah`

- Si conectarás desde fuera (tu laptop):
  - `DB_URL=mongodb://cbm:123456@<IP_PUBLICA_EC2>:27017/sifrah?authSource=sifrah`
  - `DB_NAME=sifrah`

- Si tu código usa `MONGODB_URI`:
  - `MONGODB_URI=mongodb://cbm:123456@<IP_PUBLICA_EC2>:27017/sifrah?authSource=sifrah`

> Archivos relevantes en tu proyecto (para revisar/ajustar):
> - server/components/db-connect.js
> - server/config/config-heroku.js
> - Endpoints en server/pages/api/ que usen el conector de DB.

---

## 8) TLS/SSL (opcional, recomendado para producción)
Compass muestra una advertencia si TLS no está habilitado. Para activarlo (auto-firmado de prueba):

- Generar certificado (ajusta `CN` a tu IP o dominio):
  - `openssl req -newkey rsa:4096 -nodes -keyout mongo.key -x509 -days 365 -out mongo.crt -subj "/CN=<IP_PUBLICA_EC2>"`
  - `sudo mkdir -p /etc/ssl/mongo && sudo mv mongo.key mongo.crt /etc/ssl/mongo/`
  - `sudo chown root:root /etc/ssl/mongo/* && sudo chmod 600 /etc/ssl/mongo/mongo.key`

- Añadir configuración TLS a `/etc/mongod.conf`:
  - `sudo bash -lc 'printf "\nnet:\n  tls:\n    mode: preferTLS\n    certificateKeyFile: /etc/ssl/mongo/mongo.key\n    CAFile: /etc/ssl/mongo/mongo.crt\n" | sudo tee -a /etc/mongod.conf'`

- Reiniciar servicio:
  - `sudo systemctl restart mongod`

- Conectar desde Compass activando SSL y especificando el CA si aplica.

---

## 9) Utilidades
- Obtener IP pública y privada en EC2:
  - IP pública: `curl -s http://169.254.169.254/latest/meta-data/public-ipv4`
  - IP privada: `hostname -I | awk '{print $1}'`

- Ver procesos y puertos:
  - `ps aux | grep mongod`
  - `ss -ltnp | grep 27017`

- Reiniciar servicio y ver estado:
  - `sudo systemctl restart mongod`
  - `sudo systemctl status mongod`

---

## 10) Seguridad y buenas prácticas
- Limita el Security Group 27017 a IPs necesarias (idealmente tu IP /32), evita 0.0.0.0/0.
- No guardes credenciales de Atlas en texto plano en repositorios. Usa `~/.atlas_uri` con permisos `600`.
- Considera activar TLS/SSL para mejorar seguridad en tránsito.

---

## 11) Notas de conexión
- Conexión de Compass directa (sin TLS): `mongodb://cbm:123456@<IP_PUBLICA_EC2>:27017/sifrah?authSource=sifrah`
- Si Compass te advierte de TLS, es porque aún no está habilitado. Puedes ignorar para pruebas o activar TLS (sección 8).

---

## 12) Siguiente paso
Si lo deseas, puedo ejecutar el dump/restore por ti. En ese caso, compárteme (por canal seguro) tu URI de Atlas, o ejecútalo tú con los comandos de la sección 6 y me confirmas para ajustar la app a la nueva URI de EC2.