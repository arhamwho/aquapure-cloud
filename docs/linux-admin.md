# AquaPure Linux Administration

**Project:** AquaPure Water Treatment Cloud  
**Document Type:** Linux Administration Reference  
**Version:** 1.0  
**Prepared For:** Academic Submission & AWS Case Study Evaluation

---

## Overview

Linux administration is a foundational discipline for operating cloud-based applications such as **AquaPure Water Treatment Cloud**. The AquaPure platform relies on Linux-based environments for hosting the Node.js backend, React frontend, Docker containers, MySQL database connectivity, monitoring scripts, and automated backup operations.

Effective Linux administration enables administrators to:

- Manage users and access control on production servers
- Organize, secure, and maintain application files
- Monitor CPU, memory, storage, and running processes
- Install and manage software packages
- Review application and system logs for troubleshooting
- Start, stop, and restart services reliably
- Automate recurring tasks such as database backups

In an AWS deployment, Linux administration skills are applied directly on **Amazon EC2** instances running Ubuntu or Amazon Linux, within **Docker containers**, and through operational scripts that support deployment, monitoring, and disaster recovery workflows.

---

## User Management

User management ensures that only authorized personnel can access AquaPure servers, scripts, and deployment environments.

### `whoami`

Displays the username of the currently logged-in user.

```bash
whoami
```

**Purpose:** Confirms which account is executing commands. This is essential before performing privileged operations on EC2 or local development machines.

**Example Output:**

```text
ubuntu
```

---

### `id`

Displays the user ID (UID), group ID (GID), and group memberships of the current user.

```bash
id
```

**Purpose:** Verifies user identity and permissions. Useful when troubleshooting access issues on Linux servers.

**Example Output:**

```text
uid=1000(ubuntu) gid=1000(ubuntu) groups=1000(ubuntu),4(adm),27(sudo)
```

---

### `useradd`

Creates a new user account on a Linux system.

```bash
sudo useradd -m -s /bin/bash aquapure_admin
```

**Purpose:** Creates dedicated accounts for administrators, developers, or operators instead of using the root account for daily tasks.

**Common Options:**
- `-m` — Creates a home directory
- `-s /bin/bash` — Sets the default shell

---

### `passwd`

Sets or updates a user's password.

```bash
sudo passwd aquapure_admin
```

**Purpose:** Secures user accounts by enforcing authentication before server access.

---

### `usermod`

Modifies an existing user account.

```bash
sudo usermod -aG docker aquapure_admin
```

**Purpose:** Updates user properties such as group membership. In AquaPure deployments, adding a user to the `docker` group allows container management without repeated `sudo` usage.

---

## File Management

File management commands are used to navigate, organize, and maintain AquaPure project directories, scripts, logs, and backup files.

### `pwd`

Prints the current working directory.

```bash
pwd
```

**Purpose:** Confirms the active directory before running deployment or backup commands.

**Example Output:**

```text
/home/ubuntu/AquaPure-Cloud
```

---

### `ls -la`

Lists all files and directories, including hidden files, with detailed information.

```bash
ls -la
```

**Purpose:** Displays file names, permissions, ownership, size, and modification dates. Useful when verifying project structure on EC2.

**Example Output:**

```text
drwxr-xr-x  8 ubuntu ubuntu 4096 Jun 15 10:30 .
drwxr-xr-x  3 ubuntu ubuntu 4096 Jun 15 09:00 ..
drwxr-xr-x  6 ubuntu ubuntu 4096 Jun 15 10:00 backend
drwxr-xr-x  2 ubuntu ubuntu 4096 Jun 15 10:20 scripts
```

---

### `mkdir`

Creates a new directory.

```bash
mkdir backups
```

**Purpose:** Creates folders such as `backups/`, `logs/`, or environment-specific directories required by AquaPure operations.

---

### `cp`

Copies files or directories.

```bash
cp database/schema.sql backups/schema_backup.sql
```

**Purpose:** Creates duplicate files for backup, migration, or configuration management.

---

### `mv`

Moves or renames files and directories.

```bash
mv old-config.env backend/.env
```

**Purpose:** Organizes project files or renames configuration files during deployment setup.

---

### `rm`

Removes files or directories.

```bash
rm old_logfile.log
```

**Purpose:** Deletes unnecessary or outdated files. Should be used carefully in production environments.

**Safer Directory Removal:**

```bash
rm -r temp_folder
```

---

## File Permissions

Linux file permissions control who can read, write, or execute files. Proper permission management is critical for securing AquaPure backend configuration, scripts, and backup files.

### `ls -l`

Displays detailed file permissions and ownership.

```bash
ls -l scripts/backup.sh
```

**Example Output:**

```text
-rwxr-xr-x 1 ubuntu ubuntu 1024 Jun 15 10:00 scripts/backup.sh
```

**Permission Breakdown:**

| Section | Meaning |
|---|---|
| `-` | File type |
| `rwx` | Owner permissions: read, write, execute |
| `r-x` | Group permissions: read, execute |
| `r-x` | Others permissions: read, execute |

---

### `chmod`

Changes file permissions.

```bash
chmod +x scripts/backup.sh
chmod 755 scripts/deploy.sh
```

**Purpose:** Makes shell scripts executable and restricts access to sensitive files.

**Example Permission Values:**

| Value | Permission |
|---|---|
| `7` | read, write, execute |
| `5` | read, execute |
| `4` | read only |

---

### `chown`

Changes file or directory ownership.

```bash
sudo chown ubuntu:ubuntu scripts/backup.sh
```

**Purpose:** Assigns ownership of files to the correct Linux user or group, especially after deployment or file transfer operations.

---

## Storage Monitoring

Storage monitoring ensures that AquaPure servers and containers have sufficient disk space for application files, Docker images, logs, and database backups.

### `df -h`

Displays disk space usage in human-readable format.

```bash
df -h
```

**Purpose:** Monitors overall filesystem usage on EC2 instances and identifies risk of disk exhaustion.

**Example Output:**

```text
Filesystem      Size  Used Avail Use% Mounted on
/dev/xvda1       20G  8.2G   11G  44% /
```

---

### `du -sh`

Displays the total size of a directory.

```bash
du -sh backups/
du -sh /var/lib/docker
```

**Purpose:** Identifies which directories consume the most storage. Useful for monitoring backup folder growth and Docker storage usage.

**Example Output:**

```text
120M    backups/
```

---

## Process Monitoring

Process monitoring helps administrators track running applications, identify failures, and manage system performance on AquaPure servers.

### `top`

Displays real-time system processes and resource usage.

```bash
top
```

**Purpose:** Monitors CPU and memory consumption by active processes. Useful when investigating backend performance issues.

---

### `ps aux`

Lists all running processes in detailed format.

```bash
ps aux | grep node
```

**Purpose:** Identifies whether AquaPure backend or frontend processes are running. Commonly used during troubleshooting.

**Example Output:**

```text
ubuntu   1234  0.5  2.1  node server.js
```

---

### `kill`

Terminates a running process using its Process ID (PID).

```bash
kill 1234
kill -9 1234
```

**Purpose:** Stops unresponsive or incorrect processes. The `-9` option forcefully terminates a process when graceful shutdown fails.

---

## Memory Monitoring

Memory monitoring ensures that AquaPure backend services, Docker containers, and database operations have adequate RAM available.

### `free -m`

Displays memory usage in megabytes on Linux systems.

```bash
free -m
```

**Purpose:** Shows total, used, free, and available memory. Important for EC2 capacity planning.

**Example Output:**

```text
              total        used        free      shared  buff/cache   available
Mem:           7941        3120        2100         120        2721        4500
Swap:             0           0           0
```

---

### `vm_stat` (macOS Equivalent)

Displays virtual memory statistics on macOS systems.

```bash
vm_stat
```

**Purpose:** Provides memory usage information during local development on Mac systems. Useful when running AquaPure locally with Docker Desktop.

**Example Output:**

```text
Pages free:                               102400.
Pages active:                             204800.
Pages inactive:                           153600.
Pages wired down:                          51200.
```

---

## Package Management

Package management commands install and maintain software dependencies required by AquaPure frontend, backend, Docker, and system utilities.

### `npm install`

Installs Node.js project dependencies.

```bash
cd backend
npm install
```

**Purpose:** Installs Express, MySQL drivers, and other backend packages required by AquaPure API services.

```bash
cd frontend
npm install
```

**Purpose:** Installs React, Vite, Axios, and dashboard dependencies.

---

### `apt install`

Installs packages on Debian/Ubuntu-based Linux systems.

```bash
sudo apt update
sudo apt install mysql-client docker.io -y
```

**Purpose:** Installs system tools on Ubuntu EC2 instances, such as MySQL client utilities and Docker.

---

### `yum install`

Installs packages on Red Hat/CentOS/Amazon Linux systems.

```bash
sudo yum install git docker -y
```

**Purpose:** Installs required software on Amazon Linux EC2 instances used in AWS deployments.

---

### `brew install`

Installs packages on macOS using Homebrew.

```bash
brew install mysql
brew install --cask docker
```

**Purpose:** Installs development tools on local Mac machines during AquaPure development and testing.

---

## Log Monitoring

Log monitoring is essential for diagnosing application errors, container failures, and deployment issues in AquaPure Cloud.

### `docker logs aquapure-backend`

Displays logs from the AquaPure backend Docker container.

```bash
docker logs aquapure-backend
```

**Purpose:** Reviews backend startup messages, API errors, and database connection logs.

---

### `docker logs aquapure-frontend`

Displays logs from the AquaPure frontend Docker container.

```bash
docker logs aquapure-frontend
```

**Purpose:** Identifies frontend build issues, Vite startup problems, and runtime errors.

---

### Follow Logs in Real Time

```bash
docker logs -f aquapure-backend
docker logs -f aquapure-frontend
```

**Purpose:** Streams live logs for continuous monitoring during deployment and testing.

---

### `tail -f logfile.log`

Displays the last lines of a log file and updates in real time.

```bash
tail -f logs/application.log
```

**Purpose:** Monitors application log files for errors, warnings, and operational events.

---

## Service Management

Service management commands control system and application services running on Linux servers.

### `systemctl start`

Starts a service.

```bash
sudo systemctl start docker
sudo systemctl start mysql
```

**Purpose:** Starts required services before deploying or running AquaPure containers and database connections.

---

### `systemctl stop`

Stops a running service.

```bash
sudo systemctl stop mysql
```

**Purpose:** Safely stops services during maintenance or troubleshooting.

---

### `systemctl status`

Displays the current status of a service.

```bash
sudo systemctl status docker
sudo systemctl status mysql
```

**Purpose:** Verifies whether essential services are active, failed, or inactive.

**Example Output:**

```text
Active: active (running)
```

---

### `systemctl restart`

Restarts a service.

```bash
sudo systemctl restart docker
```

**Purpose:** Applies configuration changes or recovers services after errors without rebooting the entire server.

---

## Cron Job Automation

Cron jobs automate recurring administrative tasks such as database backups, log cleanup, and health checks.

### Example Cron Entry

```bash
0 2 * * * /home/ubuntu/AquaPure-Cloud/scripts/backup.sh
```

**Cron Schedule Explanation:**

| Field | Value | Meaning |
|---|---|---|
| Minute | `0` | At minute 0 |
| Hour | `2` | At 2:00 AM |
| Day of Month | `*` | Every day |
| Month | `*` | Every month |
| Day of Week | `*` | Every day of the week |

**Purpose:** Executes the AquaPure backup script automatically every day at 2:00 AM.

---

### How Automated Backups Work in AquaPure

1. The cron scheduler triggers `scripts/backup.sh` at the scheduled time.
2. The script reads database credentials from `backend/.env`.
3. `mysqldump` exports the `aquapure` MySQL database.
4. The backup file is stored in the `backups/` directory with a timestamp.
5. Administrators can restore data if required.

**Example Backup File:**

```text
backups/aquapure_20260615_020000.sql
```

---

### Edit Cron Jobs

```bash
crontab -e
```

**Purpose:** Opens the cron table for the current user to add or modify scheduled tasks.

---

## AquaPure Infrastructure Usage

Linux administration is applied throughout the AquaPure Water Treatment Cloud infrastructure in the following areas:

### EC2 Servers

Amazon EC2 instances run Linux operating systems that host:

- Docker Engine
- AquaPure backend and frontend containers
- Deployment scripts
- Monitoring utilities
- Scheduled backup jobs

Administrators use Linux commands to manage users, monitor resources, inspect logs, and maintain server health.

---

### Docker Containers

AquaPure uses Docker to containerize the application stack:

| Container | Port | Purpose |
|---|---|---|
| `aquapure-backend` | 5001 | Express API and MySQL integration |
| `aquapure-frontend` | 5173 | React dashboard |

Linux administration supports:

- Building and starting containers
- Monitoring container logs
- Managing container resource usage
- Restarting failed services

---

### Backend Deployment

The AquaPure backend deployment process uses Linux administration for:

```bash
git pull
npm install
docker compose build
docker compose up -d
```

These operations are automated through `scripts/deploy.sh` and require proper file permissions, process monitoring, and service management.

---

### Monitoring

AquaPure monitoring activities include:

- CPU usage tracking
- Memory utilization checks
- Disk space monitoring
- Docker container health verification

These tasks are supported by:

```bash
./scripts/monitor.sh
docker compose ps
docker logs aquapure-backend
```

Monitoring ensures stable operation of water treatment dashboards, APIs, and database services.

---

### Backup Operations

Backup operations protect AquaPure data against loss. Linux administration enables:

- Scheduled cron jobs
- MySQL database export
- Secure storage in the `backups/` directory
- Recovery support for business continuity

**Backup Command:**

```bash
./scripts/backup.sh
```

This aligns with AWS disaster recovery practices using **Amazon S3** and **AWS Backup** in production environments.

---

## Conclusion

Linux administration plays a critical role in the successful deployment, operation, and maintenance of **AquaPure Water Treatment Cloud**. Through effective use of user management, file management, permission control, process monitoring, package installation, log analysis, service management, and cron automation, administrators can ensure a secure and reliable cloud environment.

The following Linux administration activities were performed and documented for AquaPure:

| Activity | AquaPure Application |
|---|---|
| User Management | Secure EC2 and deployment access |
| File Management | Organize scripts, configs, and backups |
| Permission Control | Protect scripts and sensitive files |
| Storage Monitoring | Monitor disk usage and backup growth |
| Process Monitoring | Track backend and container processes |
| Memory Monitoring | Ensure sufficient system resources |
| Package Management | Install Node.js, Docker, and MySQL tools |
| Log Monitoring | Troubleshoot backend and frontend issues |
| Service Management | Control Docker and database services |
| Cron Automation | Schedule daily database backups |

These practices support AquaPure's cloud architecture on **AWS EC2**, **Docker**, **MySQL**, and operational automation scripts, making the platform suitable for enterprise water treatment management and academic case study evaluation.

---

**Document End**
