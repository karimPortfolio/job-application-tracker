<img src="https://firebasestorage.googleapis.com/v0/b/karim-portfolio-bc1e8.appspot.com/o/hirely%2Flogo-dark.png?alt=media&token=1b10e35e-d2a3-48b0-93dd-cc6fe2b308e1" alt="Hirely, Recruitment Management Platform" width="350px" height="200px" />
## Hirely

Hirely is a modern, scalable Job Application & Recruitment Management Platform designed to help companies efficiently manage their hiring workflow from a single, centralized dashboard.

The platform allows organizations to structure their recruitment process by managing departments, jobs, candidates, and applications, while ensuring clean data isolation in a multi-tenant architecture. It includes essential productivity features such as advanced filtering, pagination, and data export (CSV/XLSX) for operational and reporting needs.

Hirely is built with real-world SaaS patterns in mind, focusing on performance, maintainability, and scalability.

### Screenshots

##### Sign up Page

![Sign up Page](https://firebasestorage.googleapis.com/v0/b/karim-portfolio-bc1e8.appspot.com/o/hirely%2Fsign-up-page.png?alt=media&token=6fbec6f2-0db6-4e1f-9f0b-ed79ec675d35)

##### Sign in Page

![Sign in Page](https://firebasestorage.googleapis.com/v0/b/karim-portfolio-bc1e8.appspot.com/o/hirely%2Fsign-in-page.png?alt=media&token=c95b9c7d-8cd6-4cf1-be66-0b28199ff4ae)


##### Forgot password Page

![Forgot password Page](https://firebasestorage.googleapis.com/v0/b/karim-portfolio-bc1e8.appspot.com/o/hirely%2Fforgot-password-page.png?alt=media&token=15d55781-4259-4dc1-bdb2-563c7f3a527d)

##### Email Verification Page

![Email Verification Page](https://firebasestorage.googleapis.com/v0/b/karim-portfolio-bc1e8.appspot.com/o/hirely%2Femail-verification-page.png?alt=media&token=f4deb321-0e6b-42d9-ab51-bccac63e7153)

##### Onboarding Page

![Onboarding Page](https://firebasestorage.googleapis.com/v0/b/karim-portfolio-bc1e8.appspot.com/o/hirely%2Fonboarding-page.png?alt=media&token=5122493c-74a8-4a35-8c66-2fef404f146a)

##### Dashboard: Departments Page

![Departments Page](https://firebasestorage.googleapis.com/v0/b/karim-portfolio-bc1e8.appspot.com/o/hirely%2Fdashboard.png?alt=media&token=525d6c6c-7ed9-4bbf-8c2d-ac6157b2def2)



### Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind/shadcn UI
- **Backend:** NestJS, MongoDB (Mongoose), Passport JWT, Redis (caching/email flows)
- **Tooling:** Docker, Docker Compose, ESLint, Jest + Supertest for e2e, Excel/CSV export (exceljs)

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

1. **Backend**

```bash
cd backend
cp .env.example .env   # or set the vars below
npm install
npm run start:dev
```

2. **Frontend**

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
