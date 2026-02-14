<img src="https://firebasestorage.googleapis.com/v0/b/karim-portfolio-bc1e8.appspot.com/o/hirely%2Flogo-dark.png?alt=media&token=1b10e35e-d2a3-48b0-93dd-cc6fe2b308e1" alt="Hirely, Recruitment Management Platform" width="350px" height="200px" />

## Hirely

Hirely is a modern, scalable Job Application & Recruitment Management Platform designed to help companies efficiently manage their hiring workflow from a single, centralized dashboard.

The platform allows organizations to structure their recruitment process by managing departments, jobs, candidates, and applications, while ensuring clean data isolation in a multi-tenant architecture. It includes essential productivity features such as advanced filtering, pagination, and data export (CSV/XLSX) for operational and reporting needs.

Hirely is built with real-world SaaS patterns in mind, focusing on performance, maintainability, and scalability.

### Screenshots

##### Sign In Page

![Sign up Page](https://d2frdw0337g930.cloudfront.net/public/signin-page.png)

##### Dashboard Page

<img src="https://d2frdw0337g930.cloudfront.net/public/dashboard-page.png" />


##### Jobs Page

<img src="https://d2frdw0337g930.cloudfront.net/public/jobs-page.png" />

##### Create New Job Page

<img src="https://d2frdw0337g930.cloudfront.net/public/jobs-creation-page.png" />

##### Onboarding Page

![Onboarding Page](https://firebasestorage.googleapis.com/v0/b/karim-portfolio-bc1e8.appspot.com/o/hirely%2Fonboarding-page.png?alt=media&token=5122493c-74a8-4a35-8c66-2fef404f146a)

##### Dashboard: Departments Page

![Departments Page](https://firebasestorage.googleapis.com/v0/b/karim-portfolio-bc1e8.appspot.com/o/hirely%2Fdashboard.png?alt=media&token=525d6c6c-7ed9-4bbf-8c2d-ac6157b2def2)

##### Dashboard Video
<a href="https://d2frdw0337g930.cloudfront.net/public/hirely-video.mp4" target="_blank" >
<img src="https://d2frdw0337g930.cloudfront.net/public/applications-page.png" />
</a>


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

### Performance & Optimization
- Redis caching for frequently accessed data
- Lean MongoDB queries for better memory usage
- Indexed database queries for scalability
- Stream-based exports to prevent memory overload

### Author

##### Mohamed Karim Balla
Contact me: 
<a href="https://www.linkedin.com/in/karimballa/">Linkedin</a>
<a href="mailto:mohamedkarimballa@gmail.com">Email</a>
