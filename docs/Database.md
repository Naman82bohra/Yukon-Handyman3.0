# Yukon Handyman 3.0 Database Documentation

> Version: **1.0.0**
>
> Project: **Yukon Handyman 3.0**
>
> Database: **PostgreSQL (Recommended)**

---

# Overview

The Yukon Handyman 3.0 database is designed to support the current marketing website while remaining scalable for future features such as:

* Customer Portal
* Admin Dashboard
* AI Quote Estimator
* Career Applications
* Project Management
* Online Booking
* CRM Integration
* Analytics

During early development, static content may be loaded from JSON files. As the platform grows, all content can migrate into the relational database described below.

---

# Recommended Database

```
PostgreSQL 17
```

Alternative:

* MongoDB
* MySQL

ORM

```
Prisma ORM
```

---

# Entity Relationship Diagram (Conceptual)

```
Users
   │
   ├── Quotes
   ├── Reviews
   ├── Applications
   └── Bookings

Services
   │
   └── Projects

Projects
   │
   └── Gallery

Admin
   │
   ├── Services
   ├── Reviews
   ├── Projects
   └── Settings
```

---

# Tables

## Users

| Field      | Type      |
| ---------- | --------- |
| id         | UUID      |
| first_name | VARCHAR   |
| last_name  | VARCHAR   |
| email      | VARCHAR   |
| phone      | VARCHAR   |
| role       | ENUM      |
| created_at | TIMESTAMP |

---

## Services

| Field       | Type    |
| ----------- | ------- |
| id          | UUID    |
| title       | VARCHAR |
| slug        | VARCHAR |
| category    | VARCHAR |
| description | TEXT    |
| image       | VARCHAR |
| featured    | BOOLEAN |
| active      | BOOLEAN |

---

## Projects

| Field        | Type    |
| ------------ | ------- |
| id           | UUID    |
| service_id   | UUID    |
| title        | VARCHAR |
| location     | VARCHAR |
| description  | TEXT    |
| facebook_url | TEXT    |
| completed_at | DATE    |

---

## Gallery

| Field        | Type    |
| ------------ | ------- |
| id           | UUID    |
| project_id   | UUID    |
| image_url    | TEXT    |
| before_after | BOOLEAN |

---

## Reviews

| Field         | Type    |
| ------------- | ------- |
| id            | UUID    |
| customer_name | VARCHAR |
| rating        | INTEGER |
| review        | TEXT    |
| source        | VARCHAR |
| featured      | BOOLEAN |

---

## Quote Requests

| Field           | Type      |
| --------------- | --------- |
| id              | UUID      |
| customer_name   | VARCHAR   |
| email           | VARCHAR   |
| phone           | VARCHAR   |
| service         | VARCHAR   |
| message         | TEXT      |
| estimated_price | VARCHAR   |
| status          | ENUM      |
| created_at      | TIMESTAMP |

Status Values

* Pending
* Contacted
* Approved
* Completed
* Cancelled

---

## Career Applications

| Field          | Type    |
| -------------- | ------- |
| id             | UUID    |
| full_name      | VARCHAR |
| email          | VARCHAR |
| phone          | VARCHAR |
| position       | VARCHAR |
| experience     | INTEGER |
| resume         | TEXT    |
| certifications | TEXT    |
| status         | ENUM    |

---

## Contact Messages

| Field      | Type      |
| ---------- | --------- |
| id         | UUID      |
| name       | VARCHAR   |
| email      | VARCHAR   |
| subject    | VARCHAR   |
| message    | TEXT      |
| created_at | TIMESTAMP |

---

## Business Settings

| Field        | Type    |
| ------------ | ------- |
| id           | UUID    |
| company_name | VARCHAR |
| phone        | VARCHAR |
| email        | VARCHAR |
| address      | TEXT    |
| finance_url  | TEXT    |
| logo         | TEXT    |

---

## Service Areas

| Field         | Type    |
| ------------- | ------- |
| id            | UUID    |
| city          | VARCHAR |
| province      | VARCHAR |
| response_time | VARCHAR |

---

## FAQs

| Field      | Type |
| ---------- | ---- |
| id         | UUID |
| question   | TEXT |
| answer     | TEXT |
| service_id | UUID |

---

# Relationships

```
Services
    │
    ├── Projects
    ├── FAQs
    └── Quotes

Projects
    │
    └── Gallery

Users
    │
    ├── Quotes
    ├── Reviews
    └── Career Applications
```

---

# Indexes

Create indexes on:

* email
* service_id
* project_id
* created_at
* featured
* slug

---

# File Storage

Store uploaded files outside the database.

Recommended:

* AWS S3
* Cloudinary

Database stores only the file URL.

---

# Security

* UUID primary keys
* Parameterized queries
* Prisma ORM
* Password hashing (bcrypt)
* JWT authentication
* HTTPS only
* SQL injection protection

---

# Backup Strategy

* Daily automatic backups
* Weekly snapshots
* Monthly archive
* Point-in-time recovery

---

# Future Tables

The following tables are planned for Yukon Handyman 4.0:

* appointments
* invoices
* payments
* employees
* schedules
* notifications
* ai_estimations
* chatbot_sessions
* maintenance_plans
* customer_portal
* admin_logs
* analytics
* subscriptions

---

# Recommended Stack

Database

```
PostgreSQL
```

ORM

```
Prisma
```

Hosting

```
Supabase
```

or

```
Neon PostgreSQL
```

Admin Tool

```
Prisma Studio
```

---

# Database Version

```
Version: 1.0.0

Status: Planned Architecture
```
