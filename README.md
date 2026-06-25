# CodeWhisper --- AI-Powered Code Review Platform

![CodeWhisper Banner](https://img.shields.io/badge/CodeWhisper-AI%20Code%20Reviewer-6366f1?style=for-the-badge&logo=google-gemini&logoColor=white)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://code-whisper-red.vercel.app/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)
```
# 🤖 CodeWhisper

**Production-ready AI-powered code review platform built with the MERN
stack, Google Gemini, Redis, Docker, and JWT Authentication.**

**🌐 Live Demo:** https://code-whisper-red.vercel.app/

```{=html}
</p>
```

------------------------------------------------------------------------

## ✨ Overview

CodeWhisper helps developers review, debug, refactor and improve code
using Google's Gemini AI. It provides secure authentication, persistent
review history, Redis-powered caching, Dockerized local development, and
a modern glassmorphic UI.

------------------------------------------------------------------------

## 🚀 Features

- **AI Code Review Engine** — Submits code to Gemini and returns structured output: improved code, detected issues, explanation, and suggestions
- **Strict JSON Schema Output** — Gemini responses are schema-locked and validated, preventing hallucination-shaped bugs
- **Redis Distributed Cache** — Exact code+language submissions served from Redis cache, cutting repeat review latency from ~5s to sub-100ms
- **Side-by-side Diff View** — Monaco-style original vs refactored code comparison with line-numbered panels
- **Paginated Review History** — Every review saved per user in MongoDB with full detail view and delete support
- **Secure Authentication** — JWT stored in HttpOnly cookies with bcrypt password hashing
- **Endpoint-Specific Rate Limiting** — 15 auth requests/15 min, 30 AI reviews/hour
- **Prompt Injection Protection** — Input sanitization, null byte stripping, and 50,000 character budget enforcement
- **Docker Compose Deployment** — Full stack (React, Express, MongoDB, Redis) containerized with one-command setup
- **AI Fallback Handling** — Safe fallback response if Gemini times out or returns invalid output
- **XSS Protection** — Dynamic HTML encoding on AI summaries alongside React's built-in escaping

------------------------------------------------------------------------

## 🏗️ Architecture

``` text
                React + Vite
                     │
                     ▼
            Express.js REST API
          ┌──────────┴──────────┐
          ▼                     ▼
     Google Gemini         Redis Cache
          │                     │
          └──────────┬──────────┘
                     ▼
               MongoDB Atlas
```

------------------------------------------------------------------------

## 🛠️ Tech Stack

  Layer            Technology
  ---------------- ----------------------------------
  Frontend         React, Vite, React Router, Axios
  Backend          Node.js, Express.js
  Database         MongoDB Atlas
  AI               Google Gemini
  Cache            Redis
  Authentication   JWT, HTTP-only Cookies, bcrypt
  DevOps           Docker, Docker Compose
  Deployment       Vercel, Render

------------------------------------------------------------------------

## 📁 Project Structure

```
CodeWhisper/
├── backend/
│   ├── config/                 # MongoDB, CORS, Gemini client setup
│   ├── controllers/            # Auth, review, and history controllers
│   ├── middlewares/            # AuthGuard, RateLimit, Sanitize, Validation, Error
│   ├── models/                 # User and Review Mongoose schemas
│   ├── routes/                 # Express API route modules
│   ├── services/
│   │   ├── ai/                 # Gemini service, prompt builder, parser, validator
│   │   ├── auth/               # JWT and password services
│   │   └── review/             # Redis cache, issue extraction, review formatting
│   ├── tests/                  # Backend integration test suite
│   ├── utils/                  # Logger, pagination, sanitizer helpers
│   ├── app.js                  # Express app configuration
│   └── server.js               # Server bootstrap and DB connection
│
├── frontend/
│   └── src/
│       ├── api/                # Axios instance and API wrappers
│       ├── components/
│       │   ├── auth/           # LoginForm, RegisterForm
│       │   ├── common/         # Button, Loader, Modal, Toast
│       │   ├── editor/         # CodeEditor, LanguageSelector, ReviewButton
│       │   ├── history/        # HistoryCard, HistorySidebar, Pagination
│       │   └── review/         # ExplanationPanel, ImprovedCode, IssueList, SuggestionPanel
│       ├── context/            # AuthContext, ReviewContext
│       ├── hooks/              # useAuth, useDebounce, useReview
│       ├── layouts/            # AuthLayout, DashboardLayout
│       ├── pages/              # Dashboard, Login, Register, ReviewDetail, NotFound
│       ├── routes/             # AppRoutes, ProtectedRoute
│       └── utils/              # formatDate, copyToClipboard, sanitizeHtml, constants
│
├── docker-compose.yml          # Full stack container orchestration
└── README.md
```
---

## 🌐 Live Demo

Frontend

https://code-whisper-red.vercel.app/

Backend

https://codewhisper-api-9hfy.onrender.com

------------------------------------------------------------------------

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas URI)
- Redis (local or Redis Cloud)
- Google Gemini API key
- Docker & Docker Compose (optional)

---

### Option 1 — Docker Compose (Recommended)

```bash
# Clone the repo
git clone https://github.com/Piyush467/CodeWhisper.git
cd CodeWhisper

# Add your environment variables (see below)
cp backend/.env.example backend/.env

# Start all 4 services: frontend, backend, MongoDB, Redis
docker-compose up --build
```

Frontend → `http://localhost:5173`
Backend → `http://localhost:5000`

---

### Option 2 — Manual Setup

**1. Configure Backend**

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/codewhisper
JWT_SECRET=your-super-secure-jwt-secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
COOKIE_SAMESITE=lax
GEMINI_API_KEY=your-google-gemini-api-key
GEMINI_MODEL=gemini-2.5-flash
REDIS_URL=redis://localhost:6379
```

**2. Run Backend**

```bash
cd backend
npm install
npm run dev
```

**3. Run Frontend**

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

Frontend → `http://localhost:5173`

---

## 🧪 Running Tests

```bash
cd backend
npm test
```

Test suite covers:

- Password hashing and verification
- JWT generation and validation
- Gemini JSON response parsing
- AI schema validation and fallback defaults
- Redis cache behavior
- Code sanitization edge cases
- Pagination formatting
- Input validators


------------------------------------------------------------------------

## 🐳 Docker

Run the complete project using Docker Compose:

``` bash
docker compose up --build
```

Services:

-   Frontend
-   Backend
-   Redis

------------------------------------------------------------------------

## 🔑 Environment Variables

Backend:

``` env
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
REDIS_URL=
NODE_ENV=production
FRONTEND_URL=
```

Frontend:

``` env
VITE_API_URL=https://codewhisper-api-9hfy.onrender.com
```

------------------------------------------------------------------------

## 🔒 Security

| Layer | Implementation |
|---|---|
| **Auth** | JWT in HttpOnly, SameSite cookies — no localStorage |
| **Passwords** | bcrypt with 10 salt rounds |
| **Rate Limiting** | 15 auth requests/15 min · 30 AI reviews/hour |
| **Input Sanitization** | Null byte stripping, control character removal, 50k char cap |
| **Prompt Injection** | Inputs wrapped in isolated enclosures with strict system instructions |
| **XSS** | Dynamic HTML encoding on AI output + React's built-in escaping |
| **CORS** | Configured to accept only allowed frontend origins |
| **AI Fallback** | Safe structured fallback if Gemini times out or returns invalid JSON |

------------------------------------------------------------------------

## ⚡ Performance

-   Redis caching for repeated reviews
-   Faster repeat responses
-   Reduced Gemini API usage
-   Optimized API responses

------------------------------------------------------------------------

## 📚 API

  Method   Endpoint
  -------- -----------------------------
  POST     /api/auth/register
  POST     /api/auth/login
  POST     /api/auth/logout
  GET      /api/auth/me
  POST     /api/review
  GET      /api/review-history/history
  GET      /api/review-history/:id
  DELETE   /api/review-history/:id

------------------------------------------------------------------------

## 🚀 Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Cache: Redis Cloud

------------------------------------------------------------------------

## 💡 Future Improvements

-   GitHub OAuth
-   Multiple AI providers
-   Team workspaces
-   Export review reports
-   Syntax highlighting themes

------------------------------------------------------------------------

## 👨‍💻 Author

**Piyush Mehrotra**

GitHub: https://github.com/Piyush467

If you found this project useful, consider giving it a ⭐.