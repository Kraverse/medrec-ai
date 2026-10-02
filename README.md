# MedRec-AI

**Grounded AI assistant for synthetic medical-record review.**

MedRec-AI is an educational healthcare AI demonstration that shows how an LLM can answer factual questions from a structured medical record while staying grounded in the supplied data and avoiding unsupported clinical conclusions.

<p align="center">
  <a href="https://medrec-ai-g31u.onrender.com"><strong>🚀 Live Demo</strong></a>
  &nbsp;•&nbsp;
  <a href="https://github.com/Kraverse/medrec-ai"><strong>💻 Source Code</strong></a>
</p>

<p align="center">
  <a href="https://medrec-ai-g31u.onrender.com">
    <img src="https://image.thum.io/get/width/1200/crop/800/https://medrec-ai-g31u.onrender.com" alt="Screenshot of the live MedRec-AI healthcare AI application." />
  </a>
</p>

## 📱 Live UI Preview

### Desktop

[![MedRec-AI desktop preview](https://image.thum.io/get/width/1200/crop/800/https://medrec-ai-g31u.onrender.com)](https://medrec-ai-g31u.onrender.com)

### Mobile

[![MedRec-AI mobile preview](https://image.thum.io/get/iphoneX/https://medrec-ai-g31u.onrender.com)](https://medrec-ai-g31u.onrender.com)

> The previews above are generated from the live deployment. Open the [Live Demo](https://medrec-ai-g31u.onrender.com) for the interactive application.

## 🎯 Project Goal

MedRec-AI demonstrates a practical AI-assisted healthcare workflow:

1. Start with a **synthetic medical record**.
2. Convert the record into structured context for the model.
3. Ask a natural-language question about the available record.
4. Send only the relevant record context plus a grounded safety prompt to the AI provider.
5. Return an answer based on the supplied information.
6. Clearly indicate when information is missing instead of inventing patient details.

## ✨ Features

- Synthetic medical-record demonstration
- Natural-language medical-record Q&A
- Grounded AI responses restricted to supplied record context
- Explicit handling of missing or unavailable information
- Server-side API-key handling
- OpenRouter integration with a free-model router
- Healthcare safety disclaimer
- Responsive healthcare-oriented UI
- TypeScript + React frontend
- Express + tRPC backend
- Production deployment on Render

## 🧠 AI Architecture

```text
┌──────────────────────────────┐
│      Synthetic Patient       │
│         Medical Record       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Structured Context     │
│   + Grounded Safety Prompt   │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Express / tRPC API     │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│         OpenRouter API       │
│       openrouter/free        │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Grounded AI Answer     │
│ + Missing-data safeguards    │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       React Healthcare UI    │
└──────────────────────────────┘
```

OpenRouter's `openrouter/free` router selects from currently available free models and supports text input/output through its OpenAI-compatible API. citeturn3search1turn3search3

## 🛠️ Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express
- tRPC
- Zod

### AI

- OpenRouter API
- `openrouter/free` model router
- Grounded prompting
- Structured medical-record context

### Deployment

- Render Web Service
- GitHub-based automatic deployment

OpenRouter currently lists 25+ free models on its free plan; its pricing page currently lists a 50 requests/day free-plan rate limit. Free-model availability can change over time. citeturn3search8turn3search0

## 🔐 Environment Variables

Create a local `.env` file for development, or configure the variables in your hosting provider.

```env
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_MODEL=openrouter/free
NODE_ENV=development
PORT=3000
```

**Never commit a real API key to GitHub.**

For production, the secret is configured server-side in Render and is not exposed to the browser.

## 🚀 Local Development

```bash
pnpm install
pnpm dev
```

Then open the local URL printed by the development server.

## 🧪 Production Validation

Run the project checks before deployment:

```bash
pnpm check
pnpm test
pnpm build
pnpm start
```

## ☁️ Production Deployment

MedRec-AI is deployed as a single Render Web Service connected to the `main` branch.

```text
GitHub main
     ↓
Render Web Service
     ↓
Node / Express
     ├── React/Vite frontend
     └── tRPC API
             ↓
        OpenRouter API
```

### Production environment

```text
OPENROUTER_API_KEY  → secret API credential
OPENROUTER_MODEL    → openrouter/free
NODE_ENV            → production
```

### Live URL

**https://medrec-ai-g31u.onrender.com**

## 🏥 Example Use Case

A user can select the synthetic medical record and ask questions such as:

- What symptoms are recorded for this patient?
- What medications are listed?
- What laboratory results are available?
- What information is missing from the record?

The assistant is designed to answer from the supplied record rather than inventing information.

## 🛡️ Safety & Limitations

MedRec-AI is an **educational demonstration using synthetic data**.

It is **not**:

- A diagnostic system
- A treatment recommendation system
- A prescription system
- A clinical decision-support system
- A replacement for a qualified healthcare professional

Do not upload real patient records, personally identifiable information, or confidential health information. Do not use generated output for real medical decisions.

## 📂 Repository

- **GitHub:** https://github.com/Kraverse/medrec-ai
- **Live application:** https://medrec-ai-g31u.onrender.com

## 🔒 Security Notes

- API credentials are kept on the server.
- `.env` files containing secrets should never be committed.
- `.env.example` contains variable names only.
- Synthetic data is used for demonstration purposes.

## 📌 Project Status

**Status: Live / Production Demo**

The application is deployed on Render and uses OpenRouter for AI inference through its free-model router. AI-provider availability and free-tier limits may change, so production behavior should be monitored accordingly. citeturn3search1turn3search8

## 📄 License

See the repository for the applicable project license and source-code terms.
