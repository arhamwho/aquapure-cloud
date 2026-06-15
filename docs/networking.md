# AquaPure Cloud Networking Design

**Project:** AquaPure Water Treatment Cloud  
**Document Type:** Cloud Networking Architecture Reference  
**Version:** 1.0  
**Prepared For:** Academic Submission & AWS Case Study Evaluation

---

## Overview

Networking is a core component of any cloud-based enterprise application. For **AquaPure Water Treatment Cloud**, a reliable and secure network architecture ensures that users can access the water treatment dashboard, the backend API can communicate with the database, and administrative operations remain protected from unauthorized access.

In cloud infrastructure, networking provides:

- **Connectivity** between users, applications, and databases
- **Isolation** of sensitive components such as backend APIs and RDS instances
- **Security** through firewalls, security groups, and controlled access paths
- **Scalability** to support growing plant data, alerts, and monitoring workloads
- **Observability** through services such as Amazon CloudWatch

Without proper networking design, AquaPure would expose critical systems to security risks, performance bottlenecks, and unreliable communication between frontend, backend, and database layers.

A well-designed AWS network ensures that AquaPure operates as a secure, scalable, and production-ready water treatment management platform.

---

## Virtual Private Cloud (VPC)

A **Virtual Private Cloud (VPC)** is an isolated virtual network within AWS where AquaPure cloud resources are deployed.

### VPC Purpose

The VPC acts as AquaPure's private network boundary in AWS. All EC2 instances, load balancers, RDS databases, and security controls operate inside this logically separated environment.

**Key Functions:**

| Function | Description |
|---|---|
| Network Isolation | Separates AquaPure resources from other AWS customers |
| Traffic Control | Defines how data flows between subnets and services |
| Security Enforcement | Applies security groups, route tables, and ACLs |
| Resource Organization | Groups related infrastructure into public and private tiers |

---

### Isolation of Resources

A VPC ensures that AquaPure backend services, databases, and administrative tools are not directly exposed to the public internet unless explicitly configured.

**Isolation Benefits:**

- Frontend and backend components can be placed in separate subnets
- Database instances remain in private subnets with no direct internet access
- Internal service communication occurs within controlled IP ranges
- Unauthorized external access is blocked by default

This layered isolation supports enterprise security requirements for water treatment operations management.

---

### Secure Communication

Secure communication within the VPC is achieved through:

- **Private IP addressing** for internal service-to-service traffic
- **Security Groups** acting as virtual firewalls
- **Route Tables** directing traffic between subnets and gateways
- **HTTPS/SSL** for encrypted user-facing communication
- **IAM Roles** for secure AWS service access without hard-coded credentials

**AquaPure VPC Architecture:**

```text
Internet
   │
   ▼
Load Balancer
   │
   ▼
Public Subnet
   │
   ▼
Private Subnet
   │
   ▼
RDS Database
```

**Traffic Flow Explanation:**

1. Users access AquaPure through the internet
2. Requests arrive at the **Application Load Balancer (ALB)**
3. The load balancer forwards traffic to resources in the **Public Subnet**
4. The frontend communicates with the backend API in the **Private Subnet**
5. The backend connects securely to **Amazon RDS MySQL** within the private network

This design prevents direct public access to the database and backend API infrastructure.

---

## Subnet Design

Subnet design divides the AquaPure VPC into logical network segments based on security and accessibility requirements.

### Public Subnet

The public subnet hosts resources that require controlled internet access.

**Components:**

| Resource | Purpose |
|---|---|
| Application Load Balancer | Distributes incoming user traffic |
| Frontend Access | Serves React dashboard to authorized users |
| NAT Gateway (optional) | Allows outbound internet access from private resources |

**Characteristics:**

- Connected to an **Internet Gateway**
- Assigned public IP addresses where required
- Protected by Security Groups and firewall rules

---

### Private Subnet

The private subnet hosts internal AquaPure services that should not be directly accessible from the internet.

**Components:**

| Resource | Purpose |
|---|---|
| Backend API | Node.js + Express application on port 5001 |
| Amazon RDS MySQL | Stores plants, alerts, maintenance, and water quality data |

**Characteristics:**

- No direct inbound internet access
- Accessible only from approved internal sources
- Higher security for sensitive application and database layers

---

### Benefits of Subnet Segmentation

| Benefit | Explanation |
|---|---|
| Improved Security | Sensitive backend and database systems remain hidden from public networks |
| Reduced Attack Surface | Only necessary services are exposed externally |
| Better Traffic Control | Network paths can be restricted by role and service |
| Operational Clarity | Public-facing and internal systems are logically separated |
| Compliance Support | Supports enterprise and academic security evaluation requirements |

---

## IP Addressing

IP addressing defines how devices and services communicate within the AquaPure VPC.

### Private IP

A **Private IP** address is used for communication within the VPC and is not reachable from the public internet.

**AquaPure Usage:**

- Backend API server internal communication
- RDS database connections from backend EC2 instances
- Internal Docker container networking in private deployment zones

**Example:**

```text
Backend EC2 Private IP: 10.0.2.15
RDS Private IP:         10.0.2.30
```

---

### Public IP

A **Public IP** address allows resources to communicate over the internet.

**AquaPure Usage:**

- Application Load Balancer endpoint
- Temporary public access during development or testing
- NAT Gateway public interface for outbound updates

Public IPs should be assigned only to resources that require external connectivity.

---

### CIDR Blocks

A **CIDR block** defines the range of IP addresses available within a network.

**AquaPure Example Design:**

| Network Segment | CIDR Block | Purpose |
|---|---|---|
| VPC | `10.0.0.0/16` | Main AquaPure cloud network |
| Public Subnet | `10.0.1.0/24` | Load balancer and frontend access |
| Private Subnet | `10.0.2.0/24` | Backend API and RDS database |

**CIDR Explanation:**

- `10.0.0.0/16` provides 65,536 IP addresses for the VPC
- `10.0.1.0/24` provides 256 addresses for public resources
- `10.0.2.0/24` provides 256 addresses for private resources

This addressing scheme supports current AquaPure deployment needs and future expansion.

---

## Security Groups

**Security Groups** act as virtual firewalls for EC2 instances, load balancers, and RDS databases. They control inbound and outbound traffic at the instance level.

### AquaPure Security Group Rules

| Service | Port | Protocol | Purpose |
|---|---|---|---|
| HTTP | 80 | TCP | Redirect or serve web traffic |
| HTTPS | 443 | TCP | Secure user access to AquaPure dashboard |
| SSH | 22 | TCP | Administrative server access |
| Backend API | 5001 | TCP | AquaPure Express API communication |
| MySQL | 3306 | TCP | Backend to RDS database connection |

---

### Example Security Group Configuration

**Load Balancer Security Group:**

```text
Inbound:
  HTTPS  443  from 0.0.0.0/0
  HTTP   80   from 0.0.0.0/0

Outbound:
  Backend API 5001 to Backend Security Group
```

**Backend Security Group:**

```text
Inbound:
  API 5001 from Load Balancer Security Group
  SSH 22   from Admin IP / Bastion Host

Outbound:
  MySQL 3306 to RDS Security Group
  HTTPS 443  to internet for updates
```

**RDS Security Group:**

```text
Inbound:
  MySQL 3306 from Backend Security Group only

Outbound:
  None required for standard AquaPure usage
```

---

### Inbound Traffic

**Inbound traffic** refers to data entering a resource.

**AquaPure Examples:**

- Users sending HTTPS requests to the load balancer
- Load balancer forwarding requests to the backend API
- Backend connecting to the RDS MySQL database

Inbound rules should allow only the minimum required sources and ports.

---

### Outbound Traffic

**Outbound traffic** refers to data leaving a resource.

**AquaPure Examples:**

- Backend sending query results to the frontend through the load balancer path
- Backend retrieving software updates from external repositories
- CloudWatch sending monitoring metrics and logs

Outbound rules should be restricted to trusted destinations wherever possible.

---

## Firewall Rules

Firewall rules enforce network security policies across the AquaPure cloud environment.

### Least Privilege Principle

The **least privilege principle** means each service is granted only the minimum network access required to perform its function.

**AquaPure Application:**

| Resource | Allowed Access |
|---|---|
| Load Balancer | Public HTTPS only |
| Backend API | Internal access from load balancer |
| RDS Database | Internal access from backend only |
| Admin SSH | Restricted to authorized IP addresses |

This reduces the risk of unauthorized access and limits potential damage from security incidents.

---

### Restrict Database Access

The AquaPure MySQL database must never be exposed directly to the public internet.

**Database Protection Measures:**

- Place RDS in a **Private Subnet**
- Allow port `3306` only from the backend security group
- Disable public accessibility on RDS
- Use strong authentication and encrypted connections where supported

**Example Rule:**

```text
Allow MySQL 3306 only from Backend Security Group
Deny all other inbound database traffic
```

---

### Secure API Access

The AquaPure backend API on port `5001` should be accessible only through approved network paths.

**Secure API Practices:**

- Do not expose port `5001` directly to the internet in production
- Route API traffic through the load balancer or internal network
- Apply CORS and application-level validation
- Monitor API logs for suspicious activity

This ensures that plant, alert, maintenance, and water quality data remain protected.

---

## Secure Administrative Access

Administrative access must be tightly controlled to protect AquaPure servers, containers, and database infrastructure.

### SSH Keys

**SSH keys** provide secure authentication for Linux server administration.

**AquaPure Usage:**

- Connect to EC2 instances for deployment and troubleshooting
- Manage Docker containers and application logs
- Execute backup and monitoring scripts

**Best Practice:**

```bash
ssh -i aquapure-key.pem ubuntu@ec2-public-ip
```

Password-only SSH access should be avoided in production environments.

---

### Bastion Host

A **Bastion Host** is a hardened jump server placed in the public subnet that administrators use to access private resources.

**AquaPure Usage:**

```text
Administrator
   │
   ▼
Bastion Host (Public Subnet)
   │
   ▼
Backend EC2 / Private Resources
```

**Benefits:**

- Centralized administrative entry point
- Reduced exposure of private servers
- Easier audit and access control

---

### VPN Access

A **Virtual Private Network (VPN)** provides encrypted remote access to the AquaPure VPC as if the administrator were on the internal network.

**Use Cases:**

- Secure remote administration
- Private access to backend monitoring tools
- Enterprise compliance for internal-only systems

VPN access is recommended for production AquaPure deployments.

---

### IAM Roles

**AWS Identity and Access Management (IAM) Roles** provide secure permissions for AWS services without storing long-term credentials on EC2 instances.

**AquaPure Usage:**

| IAM Role | Purpose |
|---|---|
| EC2 Instance Role | Access CloudWatch, S3 backups, and AWS APIs |
| RDS Monitoring Role | Enable enhanced database monitoring |
| Deployment Role | Support CI/CD and automated deployment scripts |

IAM roles support secure cloud operations while reducing credential management risk.

---

## AquaPure Networking Architecture

The following diagram represents the complete AquaPure networking and monitoring architecture on AWS.

```text
Users
   │
Internet
   │
Load Balancer
   │
Frontend
   │
Backend
   │
RDS MySQL

CloudWatch Monitoring
```

---

### Architecture Explanation

| Layer | Component | Role |
|---|---|---|
| User Layer | Web Browser | Accesses AquaPure dashboard and reports |
| Internet Layer | Public Network | Routes external user requests |
| Load Balancer | AWS ALB | Distributes traffic securely |
| Frontend Layer | React + Vite | Displays dashboard, alerts, and plant data |
| Backend Layer | Node.js + Express | Provides REST APIs on port 5001 |
| Database Layer | Amazon RDS MySQL | Stores operational and water quality data |
| Monitoring Layer | Amazon CloudWatch | Tracks CPU, memory, storage, and logs |

---

### AquaPure API Network Flow

```text
User Browser
   │
   ▼
HTTPS Request (443)
   │
   ▼
Application Load Balancer
   │
   ▼
Frontend Container / EC2
   │
   ▼
Backend API (5001)
   │
   ▼
RDS MySQL (3306)
```

This architecture aligns with AquaPure's current application stack:

- React frontend
- Express backend
- MySQL database
- Docker-based deployment
- CloudWatch-style monitoring

---

## Future Scalability

The AquaPure networking design supports future growth as the platform expands to more plants, users, and regions.

### Auto Scaling

**Auto Scaling** automatically adjusts the number of EC2 instances based on traffic demand.

**AquaPure Benefits:**

- Handles increased dashboard usage during peak monitoring periods
- Maintains API performance under load
- Reduces cost during low-traffic periods

---

### Multi-AZ Deployment

**Multi-AZ (Availability Zone)** deployment distributes AquaPure resources across multiple data centers within a region.

**Benefits:**

| Benefit | Description |
|---|---|
| High Availability | Service continues if one AZ fails |
| Fault Tolerance | Protects against data center outages |
| Database Resilience | RDS Multi-AZ improves recovery capability |

---

### Multi-Region Deployment

**Multi-Region** deployment extends AquaPure to additional geographic regions.

**Use Cases:**

- Disaster recovery
- Reduced latency for global users
- Business continuity planning

Example:

- Primary Region: `ap-south-1` (Mumbai)
- Secondary Region: `ap-southeast-1` (Singapore)

---

### Load Balancing

**Load Balancing** distributes incoming traffic across multiple frontend and backend instances.

**AquaPure Benefits:**

- Improved response time for dashboard users
- Better fault tolerance during instance failure
- Support for rolling deployments and zero-downtime updates

As AquaPure grows, load balancing becomes essential for enterprise-grade reliability.

---

## Conclusion

Networking design is a critical success factor for **AquaPure Water Treatment Cloud**. A secure VPC architecture, subnet segmentation, controlled IP addressing, security groups, firewall rules, and protected administrative access together create a robust cloud environment suitable for enterprise water treatment operations.

**Key Networking Practices Implemented:**

| Area | AquaPure Implementation |
|---|---|
| VPC Design | Isolated cloud network for all services |
| Subnet Strategy | Public frontend access, private backend and database |
| IP Addressing | Structured CIDR blocks for scalable growth |
| Security Groups | Controlled ports for HTTP, HTTPS, SSH, API, and MySQL |
| Firewall Policy | Least privilege and restricted database access |
| Admin Access | SSH keys, bastion host, VPN, and IAM roles |
| Monitoring | CloudWatch integration for infrastructure visibility |
| Scalability | Support for Auto Scaling, Multi-AZ, and Load Balancing |

This networking model ensures that AquaPure users can securely access plant data, alerts, maintenance records, and water quality analytics while backend systems and databases remain protected within a professionally designed AWS cloud infrastructure.

The design supports current development and deployment workflows—including Docker containers, Express APIs, MySQL storage, and operational scripts—while providing a strong foundation for future enterprise expansion and academic AWS case study evaluation.

---

**Document End**
