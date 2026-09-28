# MedRec-AI

**Grounded AI assistant for synthetic medical-record review.**

MedRec-AI is an educational healthcare AI demonstration showing how an LLM can answer factual questions from a structured medical record while explicitly avoiding invented patient information and unsupported clinical conclusions.

## Current workflow

```text
Synthetic medical record
        ↓
Structured context
        ↓
Gemini
        ↓
Grounded answer
        ↓
Review with healthcare disclaimer
```

## Features

- Synthetic medical-record demo
- Gemini-powered question answering
- Server-side API-key handling
- Grounded prompts that restrict the model to supplied record data
- Explicit handling of missing information
- Healthcare safety disclaimer
- Responsive healthcare-oriented UI
- TypeScript + React + Vite frontend
- Express + tRPC backend

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Express
- tRPC
- Zod
- Gemini API

## Gemini setup

Create a Gemini API key in Google AI Studio and set it as `GEMINI_API_KEY` in the server environment. Never commit the real key to GitHub.

Optional model override:

```text
GEMINI_MODEL=gemini-3.8-flash
```

The application defaults to `gemini-3.8-flash` and sends the key only from the server to the Gemini API.

## Local development

```bash
pnpm install
pnpm dev
```

Then open the local URL printed by the server.

## Production build

```bash
pnpm check
pnpm test
pnpm build
pnpm start
```

## Safety and limitations

MedRec-AI is an educational demonstration using synthetic data. It is not a diagnostic system, treatment system, prescription tool, or clinical decision-support system. Do not upload real patient records or confidential health information, and do not use generated output for medical decisions.

## Repository

https://github.com/Kraverse/medrec-ai

## Deployment

A production deployment is the next validation step. The application requires `GEMINI_API_KEY` to be configured in the hosting provider before the AI query flow can operate.
