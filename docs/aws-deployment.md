# AquaPure Cloud AWS Deployment

**Project:** AquaPure Water Treatment Cloud  
**Document Type:** AWS Deployment Guide  
**Version:** 1.0  
**Prepared For:** Academic Submission & AWS Case Study Evaluation

---

## Overview

This document describes the AWS deployment strategy for **AquaPure Water Treatment Cloud**, including EC2 hosting, Docker containerization, database setup, storage, security, and monitoring configuration.

**AquaPure Stack:**

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MySQL |
| Containerization | Docker + Docker Compose |
| Cloud Platform | Amazon Web Services (AWS) |

---

## Deployment Architecture

```text
Internet
   │
   ▼
Application Load Balancer
   │
   ▼
EC2 Instance (Docker Host)
   │
   ├── aquapure-frontend :5173
   └── aquapure-backend  :5001
           │
           ▼
      Amazon RDS MySQL
           │
           ▼
      Amazon S3 Backups
           │
           ▼
      Amazon CloudWatch
```

---

## EC2 Deployment

Amazon EC2 hosts the AquaPure application in a Linux-based cloud server environment.

### Recommended Configuration

| Setting | Value |
|---|---|
| Instance Type | `t3.medium` |
| Operating System | Ubuntu 22.04 LTS |
| Storage | 30 GB gp3 |
| Region | `ap-south-1` |

### EC2 Setup Steps

```bash
sudo apt update
sudo apt install -y git docker.io docker-compose-plugin
sudo usermod -aG docker ubuntu
git clone https://github.com/arhamwho/aquapure-cloud.git
cd aquapure-cloud
./scripts/deploy.sh
```

### EC2 Responsibilities

- Host Docker containers
- Run deployment scripts
- Execute backup and monitoring scripts
- Provide compute for frontend and backend services

---

## Docker Deployment

AquaPure uses Docker to containerize the frontend and backend for consistent deployment.

### Docker Compose Services

| Service | Container Name | Port |
|---|---|---|
| Backend | `aquapure-backend` | 5001 |
| Frontend | `aquapure-frontend` | 5173 |

### Deployment Commands

```bash
docker compose build
docker compose up -d
docker compose ps
```

### Docker Architecture

```text
EC2 Host
   │
   ├── frontend container
   │      └── React + Vite dashboard
   │
   └── backend container
          └── Express API + MySQL connection
```

### Docker Benefits for AquaPure

- Consistent development and production environments
- Simplified deployment using `deploy.sh`
- Isolated frontend and backend services
- Easy scaling to multiple EC2 instances

---

## Security Groups

Security Groups act as virtual firewalls for AquaPure AWS resources.

### Load Balancer Security Group

| Type | Port | Source | Purpose |
|---|---|---|---|
| Inbound | 80 | 0.0.0.0/0 | HTTP access |
| Inbound | 443 | 0.0.0.0/0 | HTTPS access |
| Outbound | 5001 | EC2 SG | Forward API traffic |
| Outbound | 5173 | EC2 SG | Forward frontend traffic |

### EC2 Security Group

| Type | Port | Source | Purpose |
|---|---|---|---|
| Inbound | 22 | Admin IP | SSH administration |
| Inbound | 5001 | Load Balancer SG | Backend API |
| Inbound | 5173 | Load Balancer SG | Frontend access |
| Outbound | 3306 | RDS SG | Database connection |
| Outbound | 443 | 0.0.0.0/0 | Updates and external services |

### RDS Security Group

| Type | Port | Source | Purpose |
|---|---|---|---|
| Inbound | 3306 | EC2 SG | Backend database access |
| Outbound | All | Restricted | No public database access |

---

## RDS Setup

Amazon RDS hosts the AquaPure MySQL database.

### RDS Configuration

| Setting | Value |
|---|---|
| Engine | MySQL 8.0 |
| Instance Class | `db.t3.micro` |
| Database Name | `aquapure` |
| Multi-AZ | Optional for production |
| Public Access | Disabled |

### Database Schema

```sql
CREATE DATABASE aquapure;
USE aquapure;
```

**Tables:**

- `plants`
- `users`
- `alerts`
- `maintenance_logs`
- `water_quality`

### Backend Environment Variables

```env
PORT=5001
DB_HOST=aquapure-db.xxxxx.ap-south-1.rds.amazonaws.com
DB_USER=admin
DB_PASSWORD=secure_password
DB_NAME=aquapure
```

### RDS Connection Flow

```text
Backend Container
      │
      ▼
Port 3306
      │
      ▼
Amazon RDS MySQL
      │
      ▼
AquaPure Tables
```

---

## S3 Setup

Amazon S3 stores AquaPure backup files and exported reports.

### S3 Bucket Configuration

| Setting | Value |
|---|---|
| Bucket Name | `aquapure-backups` |
| Versioning | Enabled |
| Encryption | SSE-S3 or SSE-KMS |
| Public Access | Blocked |

### Folder Structure

```text
aquapure-backups/
   ├── database/
   ├── reports/
   └── logs/
```

### Backup Upload Example

```bash
aws s3 cp backups/aquapure_20260615.sql s3://aquapure-backups/database/
```

---

## CloudWatch Setup

Amazon CloudWatch monitors AquaPure infrastructure and application health.

### Metrics to Monitor

| Metric | Source |
|---|---|
| CPU Utilization | EC2 |
| Memory Usage | EC2 / Custom metrics |
| Disk Usage | EC2 |
| Network Traffic | EC2 / ALB |
| RDS Connections | RDS |
| API Errors | Application logs |

### CloudWatch Architecture

```text
AquaPure Services
      │
      ├── EC2 Metrics
      ├── RDS Metrics
      ├── Container Logs
      └── Custom Application Metrics
              │
              ▼
        Amazon CloudWatch
              │
              ├── Dashboards
              ├── Alarms
              └── Logs
```

### Useful Commands

```bash
docker logs aquapure-backend
docker logs aquapure-frontend
./scripts/monitor.sh
```

### Recommended Alarms

| Alarm | Threshold |
|---|---|
| High CPU | > 80% for 5 minutes |
| High Memory | > 85% |
| Low Disk Space | < 20% free |
| RDS Storage | > 80% used |
| Backend Health Check Failure | `/health` unavailable |

---

## Monitoring Strategy

AquaPure uses a combined monitoring strategy across application and AWS infrastructure layers.

### Application Monitoring

| Component | Method |
|---|---|
| Backend Health | `GET /health` |
| API Availability | `/api/plants`, `/api/alerts`, etc. |
| Dashboard Access | Frontend URL availability |
| Database Connectivity | Backend startup logs |

### Infrastructure Monitoring

| Component | Method |
|---|---|
| CPU / Memory / Disk | CloudWatch + `monitor.sh` |
| Docker Containers | `docker compose ps` |
| Logs | `docker logs` and CloudWatch Logs |
| Alarms | CloudWatch Alarm notifications |

### Monitoring Workflow

```text
System Metrics
      │
      ▼
CloudWatch / monitor.sh
      │
      ▼
Threshold Evaluation
      │
      ├── Normal → Continue Monitoring
      └── Alert → Admin Notification / Auto Recovery
```

---

## Deployment Workflow

```text
1. Launch EC2 Instance
2. Install Docker and Git
3. Clone AquaPure Repository
4. Configure Environment Variables
5. Launch RDS MySQL Instance
6. Create S3 Backup Bucket
7. Configure Security Groups
8. Run deploy.sh
9. Verify /health and Dashboard
10. Enable CloudWatch Monitoring
11. Schedule backup.sh using cron
```

---

## Verification Checklist

| Test | Expected Result |
|---|---|
| Backend Health | `{"status":"healthy"}` |
| Plants API | Returns plant records |
| Alerts API | Returns alert records |
| Maintenance API | Returns maintenance logs |
| Water Quality API | Returns quality records |
| Frontend Dashboard | Loads KPI cards and modules |
| Docker Status | Both containers running |
| RDS Connection | Backend connects successfully |

---

## Conclusion

The AWS deployment strategy for **AquaPure Water Treatment Cloud** provides a secure, scalable, and monitorable cloud environment. Through EC2 hosting, Docker containerization, RDS database management, S3 backup storage, CloudWatch monitoring, and properly configured security groups, AquaPure is ready for academic case study evaluation and production-style cloud deployment.

This deployment model supports all completed AquaPure modules including Dashboard, Plants, Alerts, Maintenance, Water Quality, Reports, Monitoring, Pricing, Architecture, and RBAC Demo functionality.

---

**Document End**
