# Legal Assister — Project Structure

## Classification

```
Legal-Assister/
│
├── 📁 FRONTEND  (src/)
│   ├── src/
│   │   ├── main.tsx           ← React app entry point
│   │   ├── App.tsx            ← Root component + routing logic
│   │   ├── index.css          ← Global styles (Tailwind)
│   │   ├── types.ts           ← Shared TypeScript types
│   │   ├── components/        ← All UI components
│   │   │   ├── LandingPage.tsx
│   │   │   ├── AuthModal.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── HomeDashboard.tsx
│   │   │   ├── NewCaseWizard.tsx
│   │   │   ├── AiAnalysisPipeline.tsx
│   │   │   ├── ResultPage.tsx
│   │   │   ├── CasesPage.tsx
│   │   │   ├── CampaignsPage.tsx
│   │   │   ├── DocumentsPage.tsx
│   │   │   ├── SettingsPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   └── BoomerangVideoBg.tsx
│   │   └── data/
│   │       └── indianGeography.ts
│   └── index.html             ← Vite HTML entry
│
├── 📁 BACKEND  (server.ts)
│   └── server.ts              ← Express server + /api/analyze + /api/webhook-dispatch
│
├── 📁 DATABASE  (src/lib/)
│   └── src/lib/supabase.ts    ← Supabase client + DB helpers
│
├── readme.md                  ← Project overview
├── .env.example               ← Environment variable template
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Layer Responsibilities

### Frontend (src/)
- Built with React + TypeScript + Vite + Tailwind CSS
- Handles all UI rendering, routing between pages, and user interactions
- Communicates with the backend via fetch("/api/analyze") and fetch("/api/webhook-dispatch")

### Backend (server.ts)
- Built with Node.js + Express + TypeScript
- Exposes REST API endpoints:
  - POST /api/analyze — runs Gemini AI legal analysis
  - POST /api/webhook-dispatch — dispatches case payload to configured webhook URL

### Database (src/lib/supabase.ts)
- Built with Supabase (PostgreSQL)
- Functions:
  - upsertUserProfile(user) — create/update user record
  - saveCaseToSupabase(caseData, email) — persist case analysis results
  - fetchUserCasesFromSupabase(email) — load user's case history

## Tech Stack

| Layer    | Technology                                    |
|----------|-----------------------------------------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4   |
| Backend  | Node.js, Express, Gemini 2.5 Flash AI         |
| Database | Supabase (PostgreSQL)                         |
| Auth     | Custom (Supabase session)                     |
