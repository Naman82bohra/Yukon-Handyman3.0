# Yukon Handyman 3.0 API Documentation

> Version: **1.0.0**
>
> Project: **Yukon Handyman 3.0**
>
> Status: **Planning / Future Implementation**

---

# Overview

The Yukon Handyman 3.0 API is designed to support the website, customer portal, administration dashboard, AI-powered features, and third-party integrations.

Current Version:
```
v1
```

Future Versions:
```
v2
v3
```

---

# Base URL

```http
https://api.yukonhandyman.ca/v1/
```

---

# Authentication

Some endpoints require authentication.

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# Content Type

```http
Content-Type: application/json
```

---

# API Modules

- Services
- Projects
- Reviews
- Quote System
- Careers
- Contact
- Portfolio
- Finance
- Weather
- Search
- Notifications
- Admin Dashboard

---

# Services API

## Get All Services

```http
GET /services
```

### Response

```json
[
  {
    "id": 1,
    "title": "Roofing",
    "description": "Professional roofing solutions",
    "icon": "/images/icons/roof.svg"
  }
]
```

---

## Get Service Details

```http
GET /services/{id}
```

Example

```http
GET /services/1
```

---

# Projects API

## Get All Projects

```http
GET /projects
```

---

## Get Project

```http
GET /projects/{id}
```

---

# Reviews API

## Get Reviews

```http
GET /reviews
```

---

## Featured Reviews

```http
GET /reviews/featured
```

---

# Quote API

## Submit Quote Request

```http
POST /quote
```

Example Body

```json
{
  "name": "John Doe",
  "email": "john@email.com",
  "phone": "8673223366",
  "service": "Roofing",
  "message": "Need a new roof"
}
```

Response

```json
{
  "status": "success",
  "quoteId": 10234
}
```

---

## AI Quote Estimator

```http
POST /quote/estimate
```

Example Body

```json
{
  "service": "Flooring",
  "propertySize": "2500 sqft",
  "complexity": "Medium",
  "timeline": "2 Months"
}
```

---

# Careers API

## Submit Job Application

```http
POST /careers/apply
```

Supports:

- Resume Upload
- Certificates Upload
- Cover Letter

---

# Contact API

## Contact Form

```http
POST /contact
```

---

## Business Information

```http
GET /business
```

---

# Finance API

## Finance Options

```http
GET /finance/options
```

---

## Finance Application

```http
GET /finance/apply
```

Redirects users to Financeit.

---

# Portfolio API

## Portfolio Categories

```http
GET /portfolio
```

Categories:

- Renovation
- Roofing
- Cleaning
- Snow Removal

---

# Weather API

## Seasonal Maintenance Tips

```http
GET /weather
```

---

# Search API

```http
GET /search?q=roof
```

---

# Notification API

```http
GET /notifications
```

---

# Admin API

## Login

```http
POST /admin/login
```

---

## Dashboard

```http
GET /admin/dashboard
```

---

## Create Project

```http
POST /admin/projects
```

---

## Update Project

```http
PUT /admin/projects/{id}
```

---

## Delete Project

```http
DELETE /admin/projects/{id}
```

---

## Upload Media

```http
POST /upload
```

Supports:

- Images
- Videos
- PDF
- Resume Files

---

# Error Responses

## 200 OK

```json
{
    "status":"success"
}
```

---

## 400 Bad Request

```json
{
    "status":"error",
    "message":"Invalid Request"
}
```

---

## 401 Unauthorized

```json
{
    "status":"error",
    "message":"Authentication Required"
}
```

---

## 404 Not Found

```json
{
    "status":"error",
    "message":"Resource Not Found"
}
```

---

## 500 Internal Server Error

```json
{
    "status":"error",
    "message":"Internal Server Error"
}
```

---

# Third-Party Integrations

## HouseCall Pro

- Quote Requests
- Booking
- Lead Capture
- Reviews

---

## Financeit

- Financing Banner
- Eligibility Check
- Apply Now

---

## Google Maps

- Business Location
- Service Areas
- Directions

---

## OpenWeather API

- Weather Data
- Seasonal Maintenance Tips

---

## Facebook

- Project Portfolio
- Social Feed

---

## EmailJS / Backend Mail Service

- Contact Form
- Quote Form
- Career Applications

---

# Future APIs

The following APIs are planned for future releases:

- AI Concierge
- AI Quote Assistant
- AI Room Visualizer
- Customer Dashboard
- Employee Dashboard
- Booking Calendar
- Online Payments
- Live Job Tracking
- CRM Integration
- Push Notifications
- Analytics Dashboard

---

# API Versioning

```
v1
│
├── Services
├── Projects
├── Reviews
├── Quotes
├── Careers
├── Contact
├── Finance
└── Portfolio
```

---

# Recommended Backend Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | PostgreSQL / MongoDB |
| ORM | Prisma |
| Authentication | JWT |
| Storage | AWS S3 / Cloudinary |
| Email | Resend / SendGrid |
| Maps | Google Maps API |
| Weather | OpenWeather API |
| Deployment | Railway / Render |
| Frontend | Vercel |
| CDN | Cloudflare |

---

# License

© 2026 Yukon Handyman 3.0

All Rights Reserved.