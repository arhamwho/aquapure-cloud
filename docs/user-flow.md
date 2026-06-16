# Chapter 3 — User Flow

**Project:** AquaPure Water Treatment Management System  
**Document Type:** User Interaction Flow  
**Version:** 2.0

---

## User Roles

| Role | Access Level | Menu Items |
|---|---|---|
| Admin | Full system access | Dashboard, Plants, Water Quality, Maintenance, Alerts, Reports, Monitoring, Pricing, Architecture, Workflow |
| Manager | Operations focus | Dashboard, Plants, Water Quality, Maintenance, Alerts, Monitoring, Workflow |
| Executive | Overview and reports | Dashboard, Reports, Monitoring, Pricing, Architecture |

---

## Primary User Flow

```text
1. User opens AquaPure in browser
         │
         ▼
2. NGINX (port 80) forwards request to React frontend
         │
         ▼
3. Dashboard loads and calls backend REST APIs
         │
         ▼
4. Express backend queries MySQL database
         │
         ▼
5. JSON response rendered in UI components
```

---

## Dashboard Flow

1. User navigates to `/` (Operations Dashboard)
2. Frontend calls:
   - `GET /api/plants`
   - `GET /api/alerts`
   - `GET /api/maintenance`
   - `GET /api/water-quality`
3. KPI cards display totals for plants, alerts, maintenance, and quality
4. Water quality chart renders historical readings

---

## Plant Management Flow

1. User selects **Plants** from sidebar
2. Frontend requests `GET /api/plants`
3. Plant table displays name, city, status, and capacity
4. Loading and error states handled by `PageState` component

---

## Reports Flow

1. User selects **Reports**
2. System aggregates live API data into operational summary
3. User clicks **Export PDF**
4. `exportOperationalSummary.js` generates downloadable PDF report

---

## Role Switching Flow (Demo)

1. User opens **Demo: Switch Role** dropdown in sidebar
2. Selects Admin, Manager, or Executive
3. `RoleContext` updates allowed navigation paths
4. `RoleGuard` restricts unauthorized routes

---

## Deployment Access Flow (Production)

```text
Internet User
      │
      ▼
Public IPv4 (EC2) :80
      │
      ▼
NGINX Reverse Proxy
      ├── /      → Frontend container (:5173)
      └── /api/* → Backend container (:5001)
                      │
                      ▼
                 MySQL Database
```

---

## Administrator Deployment Flow

1. SSH into EC2 using key pair (`aquapure-key.pem`)
2. Clone repository from GitHub
3. Run `docker compose up -d`
4. Configure NGINX site (`nginx/aquapure.conf`)
5. Schedule cron jobs for backup automation
6. Verify `/health` and dashboard access

---

**Document End**
