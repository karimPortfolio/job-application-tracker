## Hirely

Hirely is a modern, scalable Job Application & Recruitment Management Platform designed to help companies efficiently manage their hiring process from a single dashboard.

The platform enables organizations to structure their recruitment workflow by managing departments, jobs, candidates, and applications, while maintaining clean data separation for multi-company environments. It provides advanced features such as filtering, pagination, exporting data (CSV/XLSX), and a clean, intuitive UI built for productivity.

The backend is built with NestJS and MongoDB (Mongoose) following best practices for modular architecture, performance, and maintainability. The frontend is developed using Next.js with shadcn/ui and Tailwind CSS, offering a modern, accessible, and responsive user experience.

Hirely is designed with scalability in mind, supporting:
- Multi-tenant company architecture
- Optimized database queries
- Clean separation of business logic using services and hooks
- Reusable and extensible components
- Production-ready export and data handling features
- This project demonstrates real-world SaaS patterns, clean code practices, and a strong 
- focus on developer experience and long-term maintainability.

This project demonstrates real-world SaaS patterns, clean code practices, and a strong focus on developer experience and long-term maintainability.

### Tech Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind/shadcn UI
- **Backend:** NestJS, MongoDB (Mongoose), Passport JWT, Redis (caching/email flows)
- **Tooling:** Docker Compose, ESLint, Jest + Supertest for e2e, Excel/CSV export (exceljs)

### Core Features
- Email/password auth with email verification and password reset
- Companies, departments, jobs, and candidates management with pagination, sorting, and server-side filters
- Unified Filters bar with Apply/Clear and backend sync
- Data export to CSV/Excel per resource (e.g., departments)
- Responsive UI 

### Architecture
- `/frontend`: Next.js app (UI, filters, exports, auth flows)
- `/backend`: NestJS API (auth, companies, departments, jobs, users, exports)
- `docker-compose.yml`: local stack (api, web, mongo, redis)

### Prerequisites
- Node 18+ and npm/pnpm
- Docker & Docker Compose (for the simplest start)

### Quick Start (Docker)
```bash
docker-compose up --build
```
- API available at `http://localhost:3001/api/v1`
- Web app at `http://localhost:3000`

### Local Development (separate services)
1) **Backend**
```bash
cd backend
cp .env.example .env   # or set the vars below
npm install
npm run start:dev
```
2) **Frontend**
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables (backend)
Create `backend/.env` (and `backend/.env.test` for e2e). Example:
```
PORT=3001
MONGO_URI=mongodb://localhost:27017/db_job_application_tracker
JWT_SECRET=changeme
REDIS_HOST=localhost
REDIS_PORT=6379
EMAIL_FROM=no-reply@example.com
```

### Key Scripts
- Backend: `npm run start:dev`, `npm run test:e2e -- departments.e2e-spec.ts`
- Frontend: `npm run dev`, `npm run lint`
- Docker: `docker-compose up --build`

### Testing
- E2E (backend): spins up in-memory MongoDB and hits real HTTP endpoints (auth, departments, export)
- Frontend: lint/type-check via Next.js toolchain

### Exports
- Departments endpoint: `GET /api/v1/departments/export?format=csv|xlsx` (filters/query respected)
- Frontend `ExportButton` consumes this endpoint with current filters

### Notes
- Sensitive env files are ignored by git (`.env*`). If you ever tracked one, remove from index and rotate secrets.
- Filters Apply button sends a single backend request; Clear all resets filters and refetches.
