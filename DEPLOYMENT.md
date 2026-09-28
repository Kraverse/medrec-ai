# MedRec-AI Deployment

## Recommended architecture

MedRec-AI is deployed as one Node.js web service. The Express server serves the built Vite React frontend and exposes the tRPC API from the same origin.

```text
Browser
  |
  v
Render Web Service
  |
  +-- Express
  |    +-- Static Vite build
  |    +-- /api/trpc
  |    +-- /api/health
  |
  +-- Gemini API
```

This keeps the portfolio deployment simple and avoids a separate frontend/backend service and CORS configuration.

## Render configuration

The repository includes `render.yaml`.

Equivalent dashboard configuration:

- Service type: Web Service
- Runtime: Node
- Branch: `main`
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Health check: `/api/health`
- Plan: Free for demo/hobby use

Render requires a public web service to listen on `0.0.0.0` and the `PORT` environment variable. The server is configured accordingly.

## Environment variables

Set these in the Render service dashboard:

```text
GEMINI_API_KEY=<your Gemini API key>
GEMINI_MODEL=gemini-3.8-flash
NODE_ENV=production
```

Never commit the real Gemini API key to GitHub.

## Local production test

```bash
npm install
npm run check
npm run test
npm run build
NODE_ENV=production GEMINI_MODEL=gemini-3.8-flash npm start
```

Then open:

```text
http://localhost:3000/api/health
```

Expected response:

```json
{"status":"ok","service":"medrec-ai"}
```

## Deployment verification

After deployment, verify:

1. `/api/health` returns HTTP 200.
2. The home page loads.
3. Synthetic demo data loads.
4. The AI assistant accepts a question.
5. The server calls Gemini successfully when `GEMINI_API_KEY` is configured.
6. Missing API-key errors are shown safely without exposing secrets.
7. No localhost API URL is used in production.

## Free-tier limitations

Render's free web services are intended for testing, hobby projects, and previews. They spin down after inactivity and may take about a minute to wake up. The local filesystem is ephemeral, so this application should not rely on local files for persistent patient data.

MedRec-AI is a portfolio/educational demonstration and should not be used with real patient records or confidential clinical information.
