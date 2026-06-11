# CodeWhisper—AI-Powered Code Review & Debugging Platform

CodeWhisper is an intelligent AI-based code review platform that helps developers analyze, debug, optimize, and improve their code using Generative AI. The platform detects bugs, security vulnerabilities, bad coding practices, and performance issues while providing smart suggestions and improved code solutions in real time.

Built using the MERN Stack, CodeWhisper aims to act like an AI coding mentor for developers, students, and teams.

---

##  Architectural Features & Highlights

- **Vibrant Glassmorphic Aesthetics**: Premium obsidian and indigo-cyber dark theme featuring custom fonts, glowing accent overlays, and dynamic interactive hover controls.
- **Side-by-Side Comparison Workspace**: High-performance, line-numbered comparison frames contrasting original code blocks against optimized Gemini-refactored recommendations.
- **Strict Schema-Locked AI Output**: Gemini API integration configured via strict system parameters and JSON MIME outputs to guarantee predictable payload returns.
- **Bulletproof Input Sanitization**: Defends against shell injection vectors, strips invalid control character payloads, and imposes character budget boundaries (max 50,000 chars) before AI parsing.
- **Advanced LRU Caching**: Seamlessly registers exact code reviews to bypass duplicate API execution calls, saving token quotas and speeding up client response times.
- **Secure Authentication Guarding**: Robust user login flows protected using custom salted `bcryptjs` passwords and JWT credentials stored in secure, read-blocked HttpOnly cookies.
- **Advanced Centralized Interceptors**: Centralized async controllers, global database error monitors, custom CORS configurations, and dual-layer rate limiting.

---

## 📂 Project Directory Structure

```text
AI code review/
│
├── backend/
│   ├── config/             # Database, CORS, & Gemini API clients
│   ├── controllers/        # Express handlers (Auth, Review, History)
│   ├── middlewares/        # Protections (AuthGuard, RateLimit, Sanitize, Validation, Error)
│   ├── models/             # Mongoose Schemas (User, Review)
│   ├── routes/             # Route mapping registers
│   ├── services/           # Decoupled Core Services (Gemini API, JWT, Password, Caching)
│   ├── utils/              # Reusable helper libraries (Logger, Sanitizer, Pagination)
│   ├── tests/              # Native Node.js Integration test suites
│   ├── .env                # Server configuration secrets
│   └── server.js           # Server initializer
│
├── frontend/
│   ├── src/
│   │   ├── api/            # API call managers (Axios mappings)
│   │   ├── components/     # UI modules (Forms, Editor, Diff Viewer, Sidebar, Modals)
│   │   ├── context/        # Auth & Review Global state pipelines
│   │   ├── hooks/          # Custom state hooks
│   │   ├── layouts/        # Screen wrapper layouts (Auth, Dashboard)
│   │   ├── pages/          # Primary pages (Login, Dashboard, Details, NotFound)
│   │   ├── routes/         # Guard and router switches
│   │   ├── utils/          # Helpers (Sanitizer, Date, Copy)
│   │   └── App.jsx         # App bootstrapping
│   ├── vite.config.js      # Vite compilation configurations
│   └── package.json        # Frontend dependencies
│
└── README.md               # Main instructions manual
```

---

## ⚙️ Set-Up & Installation Instructions

### 1. Prerequisite Requirements
Ensure that you have [Node.js](https://nodejs.org/) (version 18+ recommended) and a running instance of MongoDB (or a MongoDB Atlas connection URI) ready.

### 2. Configure Backend Parameters
Create the configuration file at `backend/.env` (a fully commented template is already initialized in `backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/syntactic-reviewer
JWT_SECRET=super-secure-production-signing-key-for-token-integrity
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
GEMINI_API_KEY=AIzaSy... # Your Google Gemini API Key
GEMINI_MODEL=gemini-1.5-flash
```

### 3. Install & Start Backend Services
```bash
cd backend
npm install
npm run dev
```

### 4. Execute Backend Integration Tests
Run our native, built-in test suite (testing auth, tokens, caching, parser sanitization, and defaults):
```bash
cd backend
npm test
```

### 5. Install & Start Frontend Assets
Open a separate terminal window and start the Vite dev server (requests to `/api` will be proxied automatically to `http://localhost:5000` via our Vite server setup):
```bash
cd frontend
npm install
npm run dev
```
Open your browser to `http://localhost:5173`.

---

## 🔒 Production Security Protocols

- **Password Salt Hashing**: User authentication passwords are encrypted using standard 10-round salt cycles before saving to Mongo databases.
- **Cross-Site Scripting (XSS) Shielding**: Implemented dynamic HTML encoders inside dynamic AI summaries, alongside React's standard element escape templates, blocking browser injections.
- **Cross-Site Request Forgery (CSRF) Shields**: Tokens are isolated within `HttpOnly`, `SameSite: strict` (in production) cookies, shutting down client-side JavaScript access vectors.
- **System Injection Protection**: Prompt assembler wraps inputs in isolated enclosures with strict system instructions, blocking attempts to override rules.
