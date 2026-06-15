# AquaPure Cloud AWS Pricing

**Project:** AquaPure Water Treatment Cloud  
**Document Type:** AWS Cost Estimation & Optimization Guide  
**Version:** 1.0  
**Prepared For:** Academic Submission & AWS Case Study Evaluation

---

## Overview

Cost management is a critical component of cloud architecture design. This document provides an estimated monthly AWS pricing breakdown for **AquaPure Water Treatment Cloud** based on a small-to-medium production deployment suitable for academic case study evaluation and pilot enterprise usage.

AquaPure AWS infrastructure includes:

- EC2 application hosting
- RDS MySQL database
- S3 backup storage
- CloudWatch monitoring
- Data transfer
- Backup services

---

## AWS Pricing Table

| AWS Service | Purpose in AquaPure | Estimated Monthly Cost (USD) |
|---|---|---|
| **Amazon EC2** | Host Docker containers for frontend and backend | $38.50 |
| **Amazon RDS** | MySQL database for plants, alerts, maintenance, water quality | $24.00 |
| **Amazon S3** | Backup storage for SQL dumps and reports | $6.75 |
| **Amazon CloudWatch** | CPU, memory, logs, and alarm monitoring | $9.25 |
| **Data Transfer** | Internet egress and inter-service communication | $5.00 |
| **AWS Backup / Snapshots** | RDS snapshots and backup retention | $4.00 |
| **Monthly Total** | Complete AquaPure cloud operation estimate | **$87.50** |

---

## Service Details

### Amazon EC2

**Purpose:** Runs AquaPure Docker containers for React frontend and Express backend.

**Recommended Instance:** `t3.medium`

| Resource | Specification |
|---|---|
| vCPU | 2 |
| Memory | 4 GB |
| Use Case | Frontend + Backend containers |

**AquaPure Workload:**

- React dashboard on port 5173
- Express API on port 5001
- Docker Compose deployment

**Estimated Cost:** $38.50/month

---

### Amazon RDS

**Purpose:** Managed MySQL database for AquaPure operational data.

**Recommended Instance:** `db.t3.micro`

**Database Name:** `aquapure`

**Tables:**

- `plants`
- `users`
- `alerts`
- `maintenance_logs`
- `water_quality`

**Estimated Cost:** $24.00/month

---

### Amazon S3

**Purpose:** Durable storage for database backups, exported reports, and disaster recovery files.

**Example Bucket Structure:**

```text
s3://aquapure-backups/
   ├── database/
   ├── reports/
   └── logs/
```

**Estimated Cost:** $6.75/month

---

### Amazon CloudWatch

**Purpose:** Monitors AquaPure infrastructure health and application performance.

**Monitored Metrics:**

- CPU usage
- Memory usage
- Storage usage
- Network traffic
- Container logs

**Estimated Cost:** $9.25/month

---

### Data Transfer

**Purpose:** Covers outbound internet traffic and inter-AZ communication.

**AquaPure Usage:**

- Dashboard user access
- API responses
- Backup uploads to S3
- Report downloads

**Estimated Cost:** $5.00/month

---

### Backups

**Purpose:** RDS automated backups, manual snapshots, and S3 backup retention.

**AquaPure Backup Sources:**

- `scripts/backup.sh`
- RDS automated snapshots
- S3 backup bucket storage

**Estimated Cost:** $4.00/month

---

## Monthly Cost Summary

```text
EC2              $38.50
RDS              $24.00
S3                $6.75
CloudWatch        $9.25
Data Transfer     $5.00
Backups           $4.00
────────────────────────
TOTAL            $87.50
```

This estimate aligns with the AquaPure **Pricing Module** dashboard used for case study presentation.

---

## Cost Architecture Diagram

```text
AquaPure Monthly AWS Spend
          │
          ├── EC2 (44%)
          ├── RDS (27%)
          ├── CloudWatch (11%)
          ├── S3 (8%)
          ├── Data Transfer (6%)
          └── Backups (4%)
```

---

## Optimization Strategies

### 1. Right-Size EC2 Instances

Start with `t3.small` or `t3.medium` and scale only when monitoring shows sustained high CPU or memory usage.

### 2. Use Reserved Instances

For long-term AquaPure deployments, Reserved Instances can reduce EC2 and RDS costs significantly.

### 3. Enable S3 Lifecycle Policies

Move older backups to lower-cost storage tiers:

```text
Standard Storage
      │
      ▼
Infrequent Access
      │
      ▼
Glacier / Archive
```

### 4. Optimize CloudWatch Logs

- Set log retention limits
- Avoid excessive custom metrics
- Use alarms only for critical thresholds

### 5. Minimize Data Transfer Costs

- Use CloudFront for frontend delivery in production
- Keep backend-to-RDS communication inside the VPC
- Compress backup files before upload when appropriate

### 6. Automate Shutdown for Dev Environments

For non-production testing environments:

- Stop EC2 instances after lab hours
- Use smaller RDS instances for development
- Delete unused snapshots and backup files

### 7. Monitor Cost with AWS Budgets

Create AWS Budget alerts to notify administrators when monthly spend exceeds expected AquaPure operational limits.

---

## Pricing Scenarios

| Scenario | Estimated Monthly Cost |
|---|---|
| Development / Academic Demo | $40–$60 |
| Small Production Deployment | $80–$100 |
| Multi-AZ Production | $140–$180 |
| Multi-Region Enterprise | $250+ |

---

## Conclusion

The estimated monthly cost of **$87.50** provides a realistic AWS pricing model for **AquaPure Water Treatment Cloud**. EC2 and RDS represent the largest cost components, while S3, CloudWatch, data transfer, and backups support reliability, monitoring, and disaster recovery at a manageable cost.

Through right-sizing, reserved capacity, lifecycle policies, and cost monitoring, AquaPure can maintain a secure and scalable cloud platform while optimizing AWS spending for academic and enterprise use cases.

---

**Document End**
