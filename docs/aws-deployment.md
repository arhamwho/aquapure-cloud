# AquaPure Cloud AWS Deployment

**Project:** AquaPure Water Treatment Management System  
**Document Type:** AWS Deployment Guide  
**Version:** 2.0  
**Prepared For:** Academic Submission & Viva Evaluation

---

## Overview

This document describes the AWS deployment strategy for **AquaPure Water Treatment Management System**, including EC2 hosting, Docker containerization, NGINX reverse proxy, database setup, automation, security, and monitoring configuration.

**AquaPure Stack (Deployed):**

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MySQL (host-based on EC2) |
| Containerization | Docker + Docker Compose |
| Reverse Proxy | NGINX (port 80) |
| Cloud Platform | Amazon EC2 |
| Version Control | Git + GitHub |

---

## Deployment and Infrastructure

### AWS EC2 Deployment

| Setting | Value |
|---|---|
| Service | Amazon EC2 |
| Region | ap-south-1 (Mumbai) |
| Operating System | **Ubuntu 26.04 LTS** |
| Instance Type | t3.micro / t3.medium |
| Public IPv4 | 13.201.74.168 |
| Private IP | 172.31.6.206 |
| SSH User | ubuntu |
| SSH Key | aquapure-key.pem |

### Ubuntu 26.04 LTS

The deployment instance runs Ubuntu 26.04 LTS (codename: Resolute). Package management uses `apt`:

```bash
sudo apt update
sudo apt install -y git docker.io docker-compose-plugin nginx
```

### Docker

Docker Engine runs AquaPure containers on EC2:

```bash
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker ubuntu
docker --version
```

### Docker Compose

Orchestrates frontend and backend services:

```bash
docker compose build
docker compose up -d
docker compose ps
```

| Container | Port |
|---|---|
| aquapure-frontend | 5173 |
| aquapure-backend | 5001 |

### NGINX

NGINX reverse proxy on port 80 routes public traffic:

| Path | Target |
|---|---|
| `/` | Frontend (127.0.0.1:5173) |
| `/api/*` | Backend (127.0.0.1:5001) |
| `/health` | Backend health check |

Configuration: `nginx/aquapure.conf`

```bash
sudo cp nginx/aquapure.conf /etc/nginx/sites-available/aquapure
sudo ln -sf /etc/nginx/sites-available/aquapure /etc/nginx/sites-enabled/aquapure
sudo nginx -t && sudo systemctl reload nginx
```

### GitHub

Source code repository:

- **URL:** https://github.com/arhamwho/aquapure-cloud
- **Branch:** main
- **Clone:** `git clone https://github.com/arhamwho/aquapure-cloud.git`

### Cron Jobs

Automated daily backup on EC2:

```bash
crontab -e
```

```cron
0 2 * * * /home/ubuntu/aquapure-cloud/scripts/backup.sh >> /home/ubuntu/cron.log 2>&1
```

### SCP Secure File Transfer

Transfer configuration files securely to EC2:

```bash
scp -i ~/Downloads/aquapure-key.pem nginx/aquapure.conf ubuntu@13.201.74.168:~/aquapure-cloud/nginx/
scp -i ~/Downloads/aquapure-key.pem backend/.env ubuntu@13.201.74.168:~/aquapure-cloud/backend/
```

### Security Groups

| Type | Port | Source | Purpose |
|---|---|---|---|
| Inbound SSH | 22 | Admin IP | EC2 administration |
| Inbound HTTP | 80 | 0.0.0.0/0 | Public web access |
| Inbound HTTPS | 443 | 0.0.0.0/0 | Future SSL |
| Outbound | All | 0.0.0.0/0 | Updates, Git, packages |

### Public IPv4 Deployment

Application accessible at:

- Dashboard: `http://13.201.74.168/`
- Health: `http://13.201.74.168/health`
- API: `http://13.201.74.168/api/plants`

---

## Deployment Architecture

### Current Deployment (Implemented)

```text
Internet
   │
   ▼
Public IPv4 (13.201.74.168)
   │
   ▼
NGINX (:80)
   │
   ├── /     → aquapure-frontend (:5173)
   └── /api  → aquapure-backend (:5001)
                    │
                    ▼
               MySQL (host)
```

### Production Extension (Documented)

```text
Internet
   │
   ▼
Application Load Balancer
   │
   ▼
EC2 Instance(s)
   │
   ├── NGINX → Frontend + Backend containers
   │
   ▼
Amazon RDS MySQL
   │
   ▼
Amazon S3 Backups + CloudWatch
```

---

## Deployment Procedure

### Step 1 — Launch EC2

Launch Ubuntu 26.04 LTS instance with public IPv4 in ap-south-1.

### Step 2 — Configure Security Groups

Allow SSH (22) and HTTP (80).

### Step 3 — Generate SSH Key Pair

Download `aquapure-key.pem` and set permissions:

```bash
chmod 400 ~/Downloads/aquapure-key.pem
```

### Step 4 — Connect via SSH

```bash
ssh -i ~/Downloads/aquapure-key.pem ubuntu@13.201.74.168
```

### Step 5 — Install Docker

```bash
sudo apt update
sudo apt install -y docker.io
sudo usermod -aG docker ubuntu
```

### Step 6 — Install Docker Compose

```bash
sudo apt install -y docker-compose-plugin
docker compose version
```

### Step 7 — Clone Repository

```bash
git clone https://github.com/arhamwho/aquapure-cloud.git
cd aquapure-cloud
```

### Step 8 — Run Docker Compose

```bash
docker compose build
docker compose up -d
```

### Step 9 — Verify Containers

```bash
sudo docker ps
curl http://localhost:5001/health
```

### Step 10 — Configure NGINX

```bash
sudo apt install -y nginx
sudo cp nginx/aquapure.conf /etc/nginx/sites-available/aquapure
sudo ln -sf /etc/nginx/sites-available/aquapure /etc/nginx/sites-enabled/aquapure
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

### Step 11 — Configure Cron Jobs

```bash
crontab -e
# Add: 0 2 * * * /home/ubuntu/aquapure-cloud/scripts/backup.sh >> /home/ubuntu/cron.log 2>&1
```

---

## Deployment Verification

See `docs/deployment-evidence.md` for complete figure gallery.

| Figure | Description |
|---|---|
| Figure 1 | AWS EC2 Instance Running |
| Figure 2 | Security Group Configuration |
| Figure 3 | Docker Installation Verification |
| Figure 4 | Docker Compose Configuration |
| Figure 5 | Application Running After Deployment |
| Figure 6 | NGINX Service Running |
| Figure 7 | Cron Job Configuration |
| Figure 8 | SCP File Transfer |
| Figure 9 | GitHub / Project Repository |
| Figure 10 | System Architecture Diagram |
| Figure 11 | AWS Architecture Diagram |

---

## Docker Deployment

### Docker Compose Services

| Service | Container Name | Port |
|---|---|---|
| Backend | `aquapure-backend` | 5001 |
| Frontend | `aquapure-frontend` | 5173 |

### Deployment Script

```bash
./scripts/deploy.sh
```

Automates: git pull → npm install → docker compose build → docker compose up -d

---

## Security Groups (Detailed)

### EC2 Security Group

| Type | Port | Source | Purpose |
|---|---|---|---|
| Inbound | 22 | Admin IP | SSH administration |
| Inbound | 80 | 0.0.0.0/0 | HTTP via NGINX |
| Outbound | 443 | 0.0.0.0/0 | Package updates |

### RDS Security Group (Production Extension)

| Type | Port | Source | Purpose |
|---|---|---|---|
| Inbound | 3306 | EC2 SG | Backend database access |

---

## RDS Setup (Production Extension)

| Setting | Value |
|---|---|
| Engine | MySQL 8.0 |
| Instance Class | db.t3.micro |
| Database Name | aquapure |
| Public Access | Disabled |

### Backend Environment Variables

```env
PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=aquapure
```

For RDS:

```env
DB_HOST=aquapure-db.xxxxx.ap-south-1.rds.amazonaws.com
```

---

## S3 Setup (Production Extension)

| Setting | Value |
|---|---|
| Bucket Name | aquapure-backups |
| Versioning | Enabled |
| Public Access | Blocked |

```bash
aws s3 cp backups/aquapure_20260615.sql s3://aquapure-backups/database/
```

---

## CloudWatch Setup (Production Extension)

Monitor EC2 CPU, memory, disk, container logs, and `/health` endpoint availability.

```bash
docker logs aquapure-backend
./scripts/monitor.sh
```

---

## Verification Checklist

| Test | Expected Result |
|---|---|
| Backend Health | `{"status":"healthy"}` |
| Plants API | Returns plant records |
| Alerts API | Returns alert records |
| Frontend Dashboard | Loads KPI cards |
| Docker Status | Both containers running |
| NGINX Status | active (running) |
| Cron Job | Listed in crontab -l |

---

## Conclusion

The AWS deployment strategy for **AquaPure Water Treatment Management System** provides a secure, documented, and verifiable cloud environment. Through EC2 hosting on Ubuntu 26.04 LTS, Docker containerization, NGINX reverse proxy, cron automation, GitHub version control, and SCP file transfer, AquaPure is ready for academic submission and viva evaluation.

For the complete report, see `docs/final-report.md`.

---

**Document End**
