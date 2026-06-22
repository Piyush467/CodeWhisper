# CodeSage - AI-Powered Code Review & Debugging Platform

CodeSage is a full-stack AI code review platform that helps developers inspect, debug, refactor, and improve code with the power of Google Gemini. It accepts source code, analyzes quality and risk, detects issues, explains what went wrong, and returns a cleaner improved version with actionable suggestions.

The project is built with a production-style MERN architecture, protected authentication, review history, Gemini-powered structured responses, secure cookies, rate limiting, sanitization, and a premium dark glassmorphic dashboard experience.

---

## Core Highlights

- **AI Code Review Engine**: Sends user code to Gemini and returns structured review output with improved code, explanations, detected issues, and suggestions.
- **Secure User Authentication**: Register, login, logout, and session verification using JWT stored inside HTTP-only cookies.
- **Private Review History**: Every review is saved per user in MongoDB with paginated history, detail view, and delete support.
- **Smart Review Cache**: Reuses exact code/language review results through an in-memory LRU-style cache to reduce repeated Gemini calls.
- **Input Validation & Sanitization**: Validates email, password, code, language, and strips unsafe control characters before processing.
- **Schema-Safe AI Parsing**: Cleans markdown-wrapped JSON, validates AI response fields, and falls back safely when Gemini fails.
- **Modern Developer UI**: React + Vite dashboard with code editor, language selector, side-by-side original/improved code panels, issue cards, suggestions, toast alerts, and responsive layouts.
- **Backend Reliability Layer**: Centralized async handlers, global error middleware, CORS configuration, request logging, health check, and graceful crash handling.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router, Axios, Lucide React |
| Backend | Node.js, Express.js, CommonJS |
| Database | MongoDB, Mongoose |
| AI Provider | Google Gemini via `@google/generative-ai` |
| Auth | JWT, bcryptjs, HTTP-only cookies |
| Security | CORS, express-rate-limit, validation, sanitization |
| Testing | Native Node.js test runner |

---

## Project Structure

```text
CodeSage/
├── backend/
│   ├── config/                 # MongoDB, CORS, Gemini client setup
│   ├── controllers/            # Auth, review, and history controllers
│   ├── middlewares/            # Auth, validation, sanitization, rate limit, errors
│   ├── models/                 # User and Review Mongoose schemas
│   ├── routes/                 # Express API route modules
│   ├── services/
│   │   ├── ai/                 # Gemini service, prompt builder, parser, validator, fallback
│   │   ├── auth/               # JWT and password services
│   │   └── review/             # Cache, issue extraction, review formatting
│   ├── tests/                  # Backend test suite
│   ├── utils/                  # Constants, logger, pagination, validators, sanitizers
│   ├── app.js                  # Express app configuration
│   ├── server.js               # Server bootstrap and DB connection
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/                # Axios instance and API wrappers
│   │   ├── components/         # Auth, editor, review, history, common UI components
│   │   ├── context/            # Auth and review global state
│   │   ├── hooks/              # Custom React hooks
│   │   ├── layouts/            # Auth and dashboard layouts
│   │   ├── pages/              # Login, register, dashboard, detail, not found
│   │   ├── routes/             # App routes and protected route guard
│   │   ├── utils/              # Date, copy, sanitize, constants helpers
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js          # Vite dev server and API proxy
│   └── package.json
│
└── README.md
```

---

## Backend API Map

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Create account and set auth cookie |
| `POST` | `/api/auth/login` | Public | Login user and set auth cookie |
| `POST` | `/api/auth/logout` | Public | Clear auth cookie |
| `GET` | `/api/auth/me` | Private | Return current logged-in user |

### Code Review

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/review` | Private | Submit code for Gemini AI review |

### Review History

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/review-history/history` | Private | Get paginated review history |
| `GET` | `/api/review-history/:id` | Private | Get one full review by ID |
| `DELETE` | `/api/review-history/:id` | Private | Delete one review from history |

### Health

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Server health check |

---

## Setup Instructions

### 1. Prerequisites

Install these before running the project:

- Node.js 18+
- npm
- MongoDB local server or MongoDB Atlas URI
- Google Gemini API key

### 2. Configure Backend Environment

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/codesage
JWT_SECRET=your-super-secure-jwt-secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
FRONTEND_URLS=
NODE_ENV=development
COOKIE_SAMESITE=lax
GEMINI_API_KEY=your-google-gemini-api-key
GEMINI_MODEL=gemini-2.5-flash
```

### 3. Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/health
```

### 4. Run Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

The Vite dev server proxies `/api` requests to:

```text
http://127.0.0.1:5000
```

For local frontend environment variables, create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

`VITE_API_URL` can be either the backend root URL or the full API URL. Both of these are valid:

```env
VITE_API_URL=https://your-backend-domain.com
VITE_API_URL=https://your-backend-domain.com/api
```

---

## Deployment Fix For `/api/auth/*` 404 Errors

If the browser console shows errors like:

```text
api/auth/me 404
api/auth/register 404
api/auth/login 404
```

the deployed frontend is calling `/api` on the frontend hosting domain instead of your Express backend. Fix it by setting these environment variables in your hosting dashboards and redeploying.

### Frontend hosting environment

```env
VITE_API_URL=https://your-backend-domain.com
```

Example:

```env
VITE_API_URL=https://codesage-api.onrender.com
```

### Backend hosting environment

```env
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
COOKIE_SAMESITE=none
```

If you have more than one allowed frontend domain, use:

```env
FRONTEND_URLS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
```

After changing `VITE_API_URL`, rebuild and redeploy the frontend because Vite injects environment variables at build time.

---

## Available Scripts

### Backend

```bash
npm run dev      # Start backend with nodemon
npm start        # Start backend with node
npm test         # Run backend tests
```

### Frontend

```bash
npm run dev      # Start Vite dev server
npm run build    # Build frontend for production
npm run preview  # Preview production build
```

---

## Review Response Shape

When code is reviewed successfully, the backend returns:

```json
{
  "success": true,
  "cached": false,
  "review": {
    "id": "review_id",
    "originalCode": "submitted source code",
    "improvedCode": "refactored source code",
    "explanation": "high-level explanation",
    "detectedIssues": [
      {
        "type": "bug",
        "severity": "high",
        "line": 12,
        "description": "issue description",
        "recommendation": "recommended fix"
      }
    ],
    "suggestions": ["practical improvement"],
    "language": "javascript",
    "createdAt": "2026-06-22T00:00:00.000Z"
  }
}
```

Supported issue types:

```text
bug, security, performance, style, readability
```

Supported severity levels:

```text
critical, high, medium, low
```

Supported languages include JavaScript, TypeScript, Python, Java, C++, C#, Go, Rust, PHP, Ruby, HTML, CSS, and SQL.

---

## Security Features

- **HTTP-only Cookie Auth**: JWT is stored in a cookie instead of browser local storage.
- **Password Hashing**: Passwords are hashed with bcrypt before saving.
- **Protected Routes**: Review submission and review history require an authenticated session.
- **Rate Limiting**: Auth and review routes are protected from excessive requests.
- **CORS Controls**: Backend accepts configured frontend origins and credentials.
- **Code Sanitization**: Removes null bytes and unsafe control characters from submitted code.
- **AI Fallback Handling**: If Gemini times out or returns invalid output, the backend responds with a safe fallback review.

---

## Testing

Run backend tests:

```bash
cd backend
npm test
```

The test suite covers:

- password hashing and verification
- JWT generation and validation
- AI JSON response parsing
- AI schema validation defaults
- review cache behavior
- code sanitization
- pagination formatting
- input validators

---

## UI Experience

CodeSage ships with a polished dark interface inspired by cyber-security review dashboards:

- glassmorphic panels
- indigo, teal, violet, and severity-based accents
- sticky authenticated dashboard header
- review history sidebar
- responsive editor workspace
- side-by-side original and improved code comparison
- issue severity badges
- suggestions and explanation panels
- modal confirmation for deleting review sessions
- toast-based user feedback

---

## Production Notes

Before deploying:

- Use a strong `JWT_SECRET`.
- Set `NODE_ENV=production`.
- Set `FRONTEND_URL` to the deployed frontend domain.
- Store secrets in the hosting provider's environment variable manager.
- Use MongoDB Atlas or a managed MongoDB instance.
- Build the frontend with `npm run build`.
- Keep Gemini API keys private and never commit `.env` files.

---

## Project Identity

CodeSage is designed as an AI coding mentor: fast enough for daily debugging, structured enough for serious review workflows, and polished enough to feel like a real developer product.
