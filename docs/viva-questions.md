# Viva Preparation — 30 Questions and Model Answers

**Project:** AquaPure Water Treatment Management System  
**Document Type:** Viva Examination Guide  
**Version:** 2.0

---

## Section A — Project Overview

### Q1. What is AquaPure?

**Answer:** AquaPure is a Water Treatment Management System that provides a web-based dashboard for monitoring treatment plants, water quality, maintenance tasks, alerts, and operational reports. It is built using React, Node.js, MySQL, Docker, and deployed on AWS EC2.

---

### Q2. What problem does AquaPure solve?

**Answer:** It centralizes water treatment operations that are traditionally managed through manual records. Operators and managers can view plant status, quality readings, and alerts in real time through a single cloud-accessible platform.

---

### Q3. What are the main objectives of your project?

**Answer:** To develop a full-stack web application, implement REST APIs with MySQL, containerize using Docker, deploy on AWS EC2 with NGINX, automate operations using cron jobs, and document Linux and cloud administration practices.

---

## Section B — Frontend (React)

### Q4. Why did you choose React for the frontend?

**Answer:** React provides component-based architecture suitable for dashboard UIs, supports single-page application navigation via React Router, integrates well with charting libraries like Recharts, and has strong community support through Vite for fast development.

---

### Q5. How many pages does your frontend have?

**Answer:** Ten pages: Dashboard, Plants, Water Quality, Maintenance, Alerts, Reports, Monitoring, Pricing, Architecture, and Workflow.

---

### Q6. How does the frontend communicate with the backend?

**Answer:** Using Axios HTTP client in `frontend/src/services/api.js`. In production, API calls use the same origin through NGINX (`VITE_API_URL=""`), so requests go to `/api/plants`, `/api/alerts`, etc.

---

### Q7. What is RBAC in your project?

**Answer:** Role-Based Access Control restricts navigation based on user role. Three demo roles are implemented: Admin (full access), Manager (operations), and Executive (reports and overview). The role switcher is in the sidebar for demonstration purposes.

---

### Q8. How do you export reports?

**Answer:** The Reports page uses jsPDF and jspdf-autotable to generate a PDF operational summary from live API data via `exportOperationalSummary.js`.

---

## Section C — Backend (Node.js)

### Q9. Why Node.js and Express?

**Answer:** Node.js enables JavaScript on the server, matching the frontend language. Express provides lightweight REST API routing, middleware support, and integrates efficiently with the mysql2 database driver.

---

### Q10. List your REST API endpoints.

**Answer:**

- `GET /health` — Health check
- `GET /api/plants` — Plant records
- `GET /api/alerts` — Alert records
- `GET /api/maintenance` — Maintenance logs
- `GET /api/water-quality` — Quality readings

---

### Q11. What is the API response format?

**Answer:** All resource endpoints return JSON: `{ "success": true, "count": <number>, "data": [<records>] }`.

---

### Q12. How does the backend connect to MySQL?

**Answer:** Using mysql2/promise connection pool in `backend/config/db.js`. Environment variables (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`) configure the connection. `testConnection()` verifies connectivity before server startup.

---

### Q13. What happens if the database connection fails?

**Answer:** The server calls `process.exit(1)` and does not start, preventing the API from serving requests without database access.

---

## Section D — Database (MySQL)

### Q14. Name the database tables.

**Answer:** `users`, `plants`, `water_quality`, `maintenance_logs`, and `alerts`.

---

### Q15. What data does the water_quality table store?

**Answer:** Plant ID, pH level, chlorine level, quality score, and timestamp (`created_at`).

---

### Q16. Where is the schema defined?

**Answer:** In `database/schema.sql` at the project root.

---

## Section E — Docker and DevOps

### Q17. Why use Docker?

**Answer:** Docker ensures consistent environments between development and production. Frontend and backend run in isolated containers with defined ports, dependencies, and restart policies.

---

### Q18. What containers does AquaPure use?

**Answer:** `aquapure-frontend` (port 5173) and `aquapure-backend` (port 5001), defined in `docker-compose.yml`.

---

### Q19. What does `docker compose up -d` do?

**Answer:** It builds (if needed) and starts all services in detached mode (background), creating the network and volumes specified in docker-compose.yml.

---

### Q20. What is the purpose of `deploy.sh`?

**Answer:** It automates deployment: git pull, npm install for backend and frontend, docker compose build, and docker compose up -d.

---

## Section F — NGINX and Networking

### Q21. What is the role of NGINX?

**Answer:** NGINX acts as a reverse proxy on port 80. It forwards `/` to the frontend container and `/api/*` to the backend container, providing a single public entry point.

---

### Q22. Why not expose ports 5001 and 5173 directly?

**Answer:** Exposing only port 80 through NGINX improves security, enables future SSL termination, and provides a clean URL structure for users accessing the public IPv4 address.

---

### Q23. What are Security Groups?

**Answer:** AWS Security Groups are virtual firewalls controlling inbound and outbound traffic to EC2 instances. AquaPure allows SSH (22) and HTTP (80) inbound.

---

## Section G — Linux and Automation

### Q24. What Linux commands did you use for deployment?

**Answer:** `ssh`, `sudo apt install`, `systemctl`, `docker`, `docker compose`, `crontab -e`, `chmod`, `ls`, `df`, and `curl`.

---

### Q25. What is a cron job?

**Answer:** A cron job is a scheduled task on Linux. AquaPure uses cron to run backup scripts daily at 2:00 AM.

---

### Q26. Explain the cron expression `0 2 * * *`.

**Answer:** Run at minute 0, hour 2 (2:00 AM), every day of the month, every month, every day of the week.

---

### Q27. What does `backup.sh` do?

**Answer:** It reads database credentials from `backend/.env`, runs `mysqldump` on the `aquapure` database, and saves a timestamped SQL file in the `backups/` directory.

---

### Q28. What is SCP?

**Answer:** Secure Copy Protocol (SCP) transfers files over SSH. It was used to copy NGINX configuration and environment files to the EC2 instance securely.

---

## Section H — Cloud and Git

### Q29. Why AWS EC2?

**Answer:** EC2 provides scalable cloud compute for hosting Docker containers and NGINX. It supports Ubuntu 26.04 LTS, public IPv4 access, security groups, and SSH key authentication suitable for academic cloud deployment.

---

### Q30. How is Git used in the project?

**Answer:** Git tracks all source code. The repository is hosted on GitHub at `arhamwho/aquapure-cloud`. Deployment uses `git clone` on EC2 and `git pull` in `deploy.sh` for updates.

---

## Quick Reference — Key Numbers

| Item | Value |
|---|---|
| Backend Port | 5001 |
| Frontend Port | 5173 |
| NGINX Port | 80 |
| MySQL Port | 3306 |
| EC2 Public IP | 13.201.74.168 |
| GitHub Repo | arhamwho/aquapure-cloud |
| Database Name | aquapure |
| AWS Region | ap-south-1 |

---

**Document End**
