# Backend

The Express API server lives at `../server.ts`.

## Endpoints

| Method | Route                     | Description                            |
|--------|---------------------------|----------------------------------------|
| POST   | `/api/analyze`            | Runs Gemini AI legal case analysis     |
| POST   | `/api/webhook-dispatch`   | Dispatches JSON payload to webhook URL |

**Tech:** Node.js, Express, TypeScript, Gemini 2.5 Flash, dotenv

## Run
```bash
npm run dev   # development (tsx server.ts)
npm start     # production (node dist/server.cjs)
```
