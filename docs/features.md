# Chapter 2 — System Features

**Project:** AquaPure Water Treatment Management System  
**Document Type:** Functional Specification  
**Version:** 2.0  
**Status:** Implemented (Academic Submission)

---

## Overview

AquaPure Water Treatment Management System is a full-stack cloud-enabled platform for monitoring water treatment plants, tracking water quality, managing maintenance tasks, and generating operational reports. The system is implemented using React, Node.js, Express, MySQL, Docker, and AWS EC2.

---

## Implemented Modules

| Module | Route | Backend API | Status |
|---|---|---|---|
| Operations Dashboard | `/` | Aggregates `/api/*` data | COMPLETED |
| Plant Management | `/plants` | `GET /api/plants` | COMPLETED |
| Water Quality | `/water-quality` | `GET /api/water-quality` | COMPLETED |
| Maintenance | `/maintenance` | `GET /api/maintenance` | COMPLETED |
| Alerts | `/alerts` | `GET /api/alerts` | COMPLETED |
| Reports | `/reports` | API data + PDF export | COMPLETED |
| Monitoring | `/monitoring` | System metrics UI | COMPLETED |
| AWS Pricing | `/pricing` | Documentation view | COMPLETED |
| Architecture | `/architecture` | Diagram display | COMPLETED |
| Workflow | `/workflow` | Process documentation | COMPLETED |

---

## Feature Details

### 1. User Management (RBAC Demo)

- Role-based navigation using `frontend/src/config/rbac.js`
- Supported roles: **Admin**, **Manager**, **Executive**
- Demo role switcher in sidebar (no login authentication)
- `users` table defined in MySQL schema (API not yet implemented)

### 2. Plant Management

- View all registered treatment plants
- Display plant name, city, status, and capacity
- Data sourced from `plants` table via REST API

### 3. Water Quality Monitoring

- View pH, chlorine, and quality score readings
- Chart visualization using Recharts
- Data sourced from `water_quality` table

### 4. Maintenance Management

- View maintenance tasks and assignment status
- Data sourced from `maintenance_logs` table

### 5. Alerts

- View system alerts with severity and status
- Data sourced from `alerts` table

### 6. Reports and Analytics

- Operational summary KPI cards
- PDF export via jsPDF and jspdf-autotable

### 7. Monitoring Dashboard

- CPU, memory, and storage monitoring concepts
- Integrated with `scripts/monitor.sh` documentation

### 8. Cloud Documentation Views

- AWS pricing estimates
- System and AWS architecture diagrams
- Operational workflow documentation

---

## Technology Features

| Feature | Implementation |
|---|---|
| REST API | Express.js on port 5001 |
| Database | MySQL (`aquapure`) via mysql2 connection pool |
| Frontend SPA | React 18 + Vite + React Router |
| Containerization | Docker + Docker Compose |
| Reverse Proxy | NGINX on port 80 (EC2) |
| Automation | `backup.sh`, `deploy.sh`, `monitor.sh`, cron |
| Version Control | Git + GitHub (`arhamwho/aquapure-cloud`) |
| Cloud Hosting | AWS EC2 (Public IPv4: deployment verified) |

---

## Planned Enhancements (Not Yet Implemented)

- Full user authentication and JWT login
- CRUD APIs for plants, alerts, and maintenance
- Amazon RDS instead of host MySQL
- HTTPS with SSL certificate on NGINX

---

**Document End**
