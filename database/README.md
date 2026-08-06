# Database

The Supabase client and all database helpers live at `../src/lib/supabase.ts`.

## Functions

| Function                              | Description                              |
|---------------------------------------|------------------------------------------|
| `upsertUserProfile(user)`             | Create or update a user profile record   |
| `saveCaseToSupabase(caseData, email)` | Persist an AI-analyzed case to the DB    |
| `fetchUserCasesFromSupabase(email)`   | Fetch all cases belonging to a user      |

**Tech:** Supabase JS SDK v2, PostgreSQL

## Setup
Copy `.env.example` → `.env` and fill in your Supabase project URL and anon key:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```
