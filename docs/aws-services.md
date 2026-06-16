# Chapter 4 — AWS Services Used

**Project:** AquaPure Water Treatment Management System  
**Document Type:** Cloud Services Reference  
**Version:** 2.0

---

## Overview

AquaPure is deployed on Amazon Web Services using EC2 for application hosting. Additional AWS services are documented for production scalability and academic case study evaluation.

---

## Services Implemented in Current Deployment

| AWS Service | Purpose in AquaPure | Status |
|---|---|---|
| **Amazon EC2** | Host Ubuntu 26.04 LTS, Docker, NGINX, AquaPure containers | **DEPLOYED** |
| **EC2 Security Groups** | Firewall rules for SSH (22), HTTP (80), application ports | **CONFIGURED** |
| **Elastic IP / Public IPv4** | Public access to deployed application | **ACTIVE** |
| **EC2 Key Pair** | Secure SSH authentication (`aquapure-key.pem`) | **IN USE** |

### Deployment Details

| Setting | Value |
|---|---|
| Region | `ap-south-1` (Mumbai) |
| Instance OS | Ubuntu 26.04 LTS |
| Public IPv4 | `13.201.74.168` (deployment instance) |
| Private IP | `172.31.6.206` |
| Repository | `https://github.com/arhamwho/aquapure-cloud` |

---

## Services Documented for Production Extension

| AWS Service | Purpose | Status |
|---|---|---|
| Amazon RDS | Managed MySQL for `aquapure` database | Documented |
| Amazon S3 | SQL backup and report storage | Documented |
| Amazon CloudWatch | Metrics, logs, and alarms | Documented |
| Application Load Balancer | HTTPS traffic distribution | Documented |
| AWS Backup | Automated snapshot retention | Documented |
| Amazon VPC | Isolated network with public/private subnets | Documented |

---

## EC2 Architecture (Current)

```text
Internet
   │
   ▼
Public IPv4 (13.201.74.168)
   │
   ▼
EC2 Instance (Ubuntu 26.04 LTS)
   │
   ├── NGINX (:80)
   ├── aquapure-frontend container (:5173)
   ├── aquapure-backend container (:5001)
   └── MySQL (host / local connection)
```

---

## Security Group Rules (Recommended)

| Type | Port | Source | Purpose |
|---|---|---|---|
| Inbound SSH | 22 | Admin IP | EC2 administration |
| Inbound HTTP | 80 | 0.0.0.0/0 | Public web access via NGINX |
| Inbound HTTPS | 443 | 0.0.0.0/0 | Future SSL termination |
| Outbound All | All | 0.0.0.0/0 | Package updates, Git pull |

**Note:** Ports 5001 and 5173 should remain accessible only via localhost through NGINX in production.

---

## Cost Reference

See `docs/aws-pricing.md` for estimated monthly cost of **$87.50 USD** for a full production stack including RDS, S3, and CloudWatch.

---

**Document End**
