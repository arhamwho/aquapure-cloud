# AquaPure Cloud Automation

**Project:** AquaPure Water Treatment Cloud  
**Document Type:** Operations Automation Reference  
**Version:** 2.0  
**Prepared For:** Academic Submission & Viva Evaluation

---

## Overview

Automation reduces manual effort, improves reliability, and supports consistent operations for **AquaPure Water Treatment Cloud**. The project uses shell scripts, Docker Compose, and cron scheduling to automate deployment, monitoring, and database backup tasks.

Automation ensures that AquaPure administrators can:

- Deploy frontend and backend services consistently
- Monitor system health proactively
- Protect water treatment data through scheduled backups
- Reduce human error during routine maintenance

---

## Project Automation Architecture

```text
Cron Scheduler
      │
      ├── backup.sh ──────► MySQL Dump ──────► backups/
      │
      ├── deploy.sh ──────► git pull + npm install + Docker
      │
      └── monitor.sh ─────► CPU / Memory / Disk / Containers
```

---

## backup.sh

**Location:** `scripts/backup.sh`

### Purpose

Automates MySQL database backup for the AquaPure `aquapure` database.

### Functionality

- Reads database credentials from `backend/.env`
- Creates the `backups/` directory if it does not exist
- Uses `mysqldump` to export all AquaPure tables:
  - `plants`
  - `users`
  - `alerts`
  - `maintenance_logs`
  - `water_quality`
- Saves backup with timestamp filename

### Example Command

```bash
./scripts/backup.sh
```

### Example Output File

```text
backups/aquapure_20260615_020000.sql
```

### Sample Script Logic

```bash
TIMESTAMP="$(date +"%Y%m%d_%H%M%S")"
BACKUP_FILE="${BACKUP_DIR}/aquapure_${TIMESTAMP}.sql"
mysqldump -h "${DB_HOST}" -u "${DB_USER}" "${DB_NAME}" > "${BACKUP_FILE}"
```

---

## deploy.sh

**Location:** `scripts/deploy.sh`

### Purpose

Automates AquaPure application deployment using Git, npm, and Docker Compose.

### Functionality

1. Pulls latest code from Git repository
2. Installs backend dependencies
3. Installs frontend dependencies
4. Rebuilds Docker containers
5. Starts AquaPure services in detached mode

### Example Command

```bash
./scripts/deploy.sh
```

### Deployment Flow

```text
git pull
   │
   ▼
npm install (backend)
   │
   ▼
npm install (frontend)
   │
   ▼
docker compose build
   │
   ▼
docker compose up -d
   │
   ▼
Frontend :5173  +  Backend :5001
```

### Services Started

| Container | Port | Purpose |
|---|---|---|
| `aquapure-frontend` | 5173 | React dashboard |
| `aquapure-backend` | 5001 | Express API |

---

## monitor.sh

**Location:** `scripts/monitor.sh`

### Purpose

Provides a quick operational health check for AquaPure infrastructure.

### Functionality

- Displays CPU usage
- Displays memory usage
- Displays disk usage
- Shows Docker container status

### Example Command

```bash
./scripts/monitor.sh
```

### Monitoring Output Sections

```text
CPU Usage
Memory Usage
Disk Usage
Docker Containers
```

This script supports the AquaPure **Monitoring Module** and aligns with Amazon CloudWatch monitoring practices in production.

---

## Cron Scheduling

Cron jobs automate recurring administrative tasks on Linux and EC2 servers.

### Example Cron Entry (Production)

```bash
0 2 * * * /home/ubuntu/aquapure-cloud/scripts/backup.sh >> /home/ubuntu/cron.log 2>&1
```

### Verified EC2 Cron Entry (Deployment)

```bash
0 2 * * * echo "AquaPure Backup Job" >> /home/ubuntu/cron.log
```

This entry was configured on the deployment EC2 instance (`ubuntu@ip-172-31-6-206`) using `crontab -e`.

### Schedule Explanation

| Field | Value | Meaning |
|---|---|---|
| Minute | `0` | At minute 0 |
| Hour | `2` | At 2:00 AM daily |
| Day | `*` | Every day |
| Month | `*` | Every month |
| Weekday | `*` | Every weekday |

### Edit Cron Jobs

```bash
crontab -e
```

### Additional Automation Examples

```bash
0 3 * * 0 /home/ubuntu/AquaPure-Cloud/scripts/monitor.sh >> /var/log/aquapure-monitor.log 2>&1
0 4 * * * docker system prune -f
```

---

## Automated Maintenance

Automated maintenance reduces downtime and ensures AquaPure services remain healthy.

### Maintenance Automation Areas

| Area | Automation Method |
|---|---|
| Dependency Updates | `deploy.sh` with Git pull and npm install |
| Container Restart | Docker Compose restart policies |
| Log Review | `docker logs` and `tail -f` monitoring |
| Health Checks | `/health` endpoint and `monitor.sh` |
| Database Backup | Scheduled `backup.sh` execution |

### Docker Restart Policy

```yaml
restart: unless-stopped
```

This ensures AquaPure containers automatically restart after server reboot or unexpected failure.

### Recommended Maintenance Schedule

| Task | Frequency |
|---|---|
| Database Backup | Daily |
| System Monitoring | Daily |
| Deployment Update | Weekly or on release |
| Log Cleanup | Weekly |
| Security Patch Review | Monthly |

---

## Backup Strategy

AquaPure uses a layered backup strategy to protect operational and water quality data.

### Local Backup Strategy

```text
MySQL Database
      │
      ▼
backup.sh
      │
      ▼
backups/aquapure_TIMESTAMP.sql
```

### Backup Scope

| Table | Data Protected |
|---|---|
| `plants` | Plant names, cities, status, capacity |
| `users` | User accounts and roles |
| `alerts` | System alert records |
| `maintenance_logs` | Maintenance tasks and assignments |
| `water_quality` | pH, chlorine, and quality scores |

### Production Backup Strategy

In AWS production environments, AquaPure backups should extend to:

```text
Local mysqldump
      │
      ▼
Amazon S3 Bucket
      │
      ▼
AWS Backup / RDS Snapshots
```

### Backup Best Practices

- Run backups during low-traffic hours
- Store backups in separate storage locations
- Test restore procedures regularly
- Retain multiple backup versions
- Encrypt backup files in production

---

## AquaPure Automation Benefits

| Benefit | Impact |
|---|---|
| Reliability | Consistent deployment and backup execution |
| Security | Reduced manual access to production systems |
| Efficiency | Faster recovery and lower operational overhead |
| Scalability | Supports growing plant and alert data volumes |
| Compliance | Supports academic and enterprise audit requirements |

---

## Conclusion

Automation is essential for operating **AquaPure Water Treatment Cloud** in development and production environments. The scripts `backup.sh`, `deploy.sh`, and `monitor.sh`, combined with cron scheduling and Docker automation, provide a professional operational foundation aligned with AWS cloud best practices.

These automation practices support dashboard availability, API reliability, database protection, and infrastructure monitoring across the complete AquaPure platform.

---

**Document End**
