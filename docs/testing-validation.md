# Chapter 8 — Testing and Validation

**Project:** AquaPure Water Treatment Management System  
**Document Type:** Test Plan and Validation Report  
**Version:** 2.0

---

## Overview

This document records functional, API, Docker, cloud deployment, and security testing performed on AquaPure before final submission.

---

## 1. Functional Testing

| ID | Test Case | Steps | Expected Result | Status |
|---|---|---|---|---|
| FT-01 | Dashboard Load | Open `http://13.201.74.168/` | KPI cards display | PASS |
| FT-02 | Plants Module | Navigate to `/plants` | Plant table populated | PASS |
| FT-03 | Water Quality | Navigate to `/water-quality` | Chart and readings display | PASS |
| FT-04 | Maintenance | Navigate to `/maintenance` | Task list displays | PASS |
| FT-05 | Alerts | Navigate to `/alerts` | Alert list displays | PASS |
| FT-06 | Reports PDF | Click Export PDF on Reports page | PDF file downloads | PASS |
| FT-07 | RBAC Admin | Select Admin role | All menu items visible | PASS |
| FT-08 | RBAC Manager | Select Manager role | Operations menu only | PASS |
| FT-09 | RBAC Executive | Select Executive role | Reports menu only | PASS |
| FT-10 | Architecture Page | Navigate to `/architecture` | Diagrams display | PASS |

![Functional Test Evidence](screenshots/figures/figure-12-dashboard-overview.png)

*Figure 12 – Dashboard functional test showing live API data integration.*

---

## 2. API Testing

### Local Testing

```bash
curl http://localhost:5001/health
curl http://localhost:5001/api/plants
curl http://localhost:5001/api/alerts
curl http://localhost:5001/api/maintenance
curl http://localhost:5001/api/water-quality
```

### Cloud Testing (via NGINX)

```bash
curl http://13.201.74.168/health
curl http://13.201.74.168/api/plants
curl http://13.201.74.168/api/alerts
curl http://13.201.74.168/api/maintenance
curl http://13.201.74.168/api/water-quality
```

| Endpoint | Expected Response | Status |
|---|---|---|
| `/health` | `{"status":"healthy"}` | PASS |
| `/api/plants` | `{ success: true, count, data }` | PASS |
| `/api/alerts` | `{ success: true, count, data }` | PASS |
| `/api/maintenance` | `{ success: true, count, data }` | PASS |
| `/api/water-quality` | `{ success: true, count, data }` | PASS |

---

## 3. Docker Validation

```bash
docker compose ps
docker logs aquapure-backend
docker logs aquapure-frontend
sudo docker ps
```

| Check | Expected | Status |
|---|---|---|
| Backend container running | Up, port 5001 | PASS |
| Frontend container running | Up, port 5173 | PASS |
| Backend MySQL connection | "MySQL connected successfully" in logs | PASS |
| Restart policy | unless-stopped | PASS |

---

## 4. Cloud Deployment Validation

| Check | Method | Expected | Status |
|---|---|---|---|
| EC2 SSH access | `ssh -i key.pem ubuntu@IP` | Connection successful | PASS |
| Public web access | Browser → Public IPv4 | Dashboard loads | PASS |
| NGINX running | `systemctl status nginx` | active (running) | PASS |
| NGINX proxy | `curl http://IP/api/plants` | JSON response | PASS |
| Git clone | Repository on EC2 | Project files present | PASS |

---

## 5. Security Testing

| ID | Test | Method | Expected | Status |
|---|---|---|---|---|
| ST-01 | SSH key-only access | Login with .pem key | No password login | PASS |
| ST-02 | Key file permissions | `chmod 400` on .pem | Restricted access | PASS |
| ST-03 | Database isolation | Security group review | Port 3306 not public | PASS |
| ST-04 | API via proxy | Access through NGINX :80 | No direct public API required | PASS |
| ST-05 | Environment secrets | `.env` in .gitignore | Not committed to GitHub | PASS |

---

## Test Summary

| Category | Tests | Passed | Failed |
|---|---|---|---|
| Functional | 10 | 10 | 0 |
| API | 5 | 5 | 0 |
| Docker | 4 | 4 | 0 |
| Cloud Deployment | 5 | 5 | 0 |
| Security | 5 | 5 | 0 |
| **Total** | **29** | **29** | **0** |

---

**Document End**
