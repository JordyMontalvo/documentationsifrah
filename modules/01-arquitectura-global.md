# 01. Arquitectura Global del Ecosistema Sifrah

## 🌐 Visión General

Sifrah es una plataforma tecnológica que combina:
1. **Comercio electrónico y red multinivel (MLM)** con planes de compensación Unilevel y Binario Híbrido.
2. **Motor de liquidación financiera masiva** en Golang con concurrencia por Goroutines.
3. **Asistente médico-nutricional RAG** impulsado por Google Gemini 3.5 Flash Lite y Gemini 3.8 Flash con salvaguardas clínicas.
4. **Modelos predictivos de liderazgo y retención** desarrollados con Scikit-Learn en Python.

---

## 🏛️ Topología de Infraestructura Cloud

```mermaid
graph TD
    subgraph Clientes ["1. Capa de Clientes"]
        App["📱 Sifrah App (Android / iOS / Web)<br/>Capacitor 5 + Vue.js"]
        Admin["💼 Backoffice Corporativo<br/>Vue.js (Vercel)"]
        Store["🛒 Tienda E-commerce Clientes"]
    end

    subgraph DO ["2. DigitalOcean Droplet (68.183.125.105)"]
        Nginx["🛡️ Nginx Reverse Proxy (SSL :443)"]
        NodeServer["⚡ API Hub Monolítico (Node.js/Next.js :3000)<br/>PM2 Managed"]
        GoEngine["🚀 Motor Cierre en Go (cierre_engine)<br/>Compresión Dinámica"]
        RAG["🧠 Asistente RAG & Triage Clínico<br/>ai-catalog.js"]
    end

    subgraph AWS ["3. Amazon Web Services (Ohio us-east-2)"]
        Mongo["🍃 MongoDB 6.x Cluster Dedicated<br/>Port :27017 / Database: sifrah"]
    end

    subgraph CloudServices ["4. Servicios Externos & Cloud"]
        Gemini["✨ Google Gemini AI (3.5 / 3.8 Flash)<br/>1.3s Latencia"]
        Bunny["🐰 Bunny.net Edge Storage<br/>Comprobantes & Vouchers CDN"]
        Payments["💳 IziPay & MercadoPago<br/>Webhooks de Pago"]
    end

    App -->|HTTPS REST| Nginx
    Admin -->|HTTPS REST| Nginx
    Store -->|HTTPS REST| Nginx

    Nginx --> NodeServer
    NodeServer --> RAG
    NodeServer --> GoEngine
    NodeServer -->|Pool TCP| Mongo
    GoEngine -->|Lectura RAM & Escritura Ledger| Mongo

    RAG -->|Prompt + Contexto| Gemini
    NodeServer --> Bunny
    NodeServer --> Payments
```

---

## ⚙️ Componentes Clave

### 1. Servidor de Producción (DigitalOcean)
- **IP Pública:** `68.183.125.105`
- **Ruta del Proyecto:** `/var/www/sifrah-server`
- **Dominio API:** `api.serve-sifrah.xyz`
- **Gestor de Procesos:** PM2 con cluster mode y auto-reinicio.
- **Acceso SSH:** Llave privada `sifrah_dev_key.pem`.

### 2. Base de Datos Central (AWS EC2)
- **Host:** `ec2-18-220-240-71.us-east-2.compute.amazonaws.com`
- **Puerto:** `27017`
- **Autenticación:** Credenciales seguras con usuario administrativo y réplicas.
- **Backups:** Automatizados con script `mongodump` comprimido y subido diariamente a Bunny.net Storage.

### 3. Diagramas Vectoriales Interactivos
El repositorio incluye diagramas vectoriales interactivos compilados con **Archify**:
- [`sifrah-architecture.html`](file:///Users/jordymontalvo/proyectos/sifrah/sifrah-docs/archify_diagrams/sifrah-architecture.html): Mapeo completo navegable de componentes.
- [`sifrah-cierre-workflow.html`](file:///Users/jordymontalvo/proyectos/sifrah/sifrah-docs/archify_diagrams/sifrah-cierre-workflow.html): Flujo animado del cierre de periodo.
- [`sifrah-assistant-sequence.html`](file:///Users/jordymontalvo/proyectos/sifrah/sifrah-docs/archify_diagrams/sifrah-assistant-sequence.html): Secuencia RAG de interacción con el asistente de salud.
