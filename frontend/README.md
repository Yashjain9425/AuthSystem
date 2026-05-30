# RBAC System — Spring Boot + React

## Setup

### Backend
cd backend
mvn clean install
mvn spring-boot:run
# Runs on http://localhost:8080
# Swagger UI: http://localhost:8080/swagger-ui/index.html

### Frontend
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173

## Test Accounts
Register via UI with role USER or ADMIN.

## Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/public      → all
- GET  /api/user        → USER + ADMIN
- GET  /api/admin       → ADMIN only