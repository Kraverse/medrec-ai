import { z } from "zod";

export const demoRecord = {
  id: "demo-001",
  patient: "Alex Morgan",
  age: 42,
  status: "Synthetic demo record",
  reasonForVisit: "Persistent cough and fatigue",
  symptoms: ["Persistent cough", "Fatigue"],
  history: "No additional history provided in this synthetic demonstration.",
  medications: ["No medication information recorded"],
  allergies: ["No allergy information recorded"],
  observations: ["No vital signs or examination findings recorded"],
  plan: "No treatment plan is provided by this demonstration record.",
};

export const medrecQueryInput = z.object({
  question: z.string().trim().min(2).max(1200),
  record: z
    .object({
      patient: z.string(),
      age: z.number(),
      status: z.string(),
      reasonForVisit: z.string(),
      symptoms: z.array(z.string()),
      history: z.string(),
      medications: z.array(z.string()),
      allergies: z.array(z.string()),
      observations: z.array(z.string()),
      plan: z.string(),
    })
    .optional(),
});

type OpenRouterResponse = {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message?: string };
};

const SYSTEM_INSTRUCTION = `You are MedRec-AI, an educational healthcare-record assistant.

Use ONLY the supplied synthetic medical record. Do not invent facts or fill missing fields with assumptions.
Do not diagnose, prescribe, or provide definitive medical advice.
If the requested information is absent, say that it is not available in the record.
Keep answers concise and easy to review.
Begin medical answers with "AI-generated information for review." when appropriate.
Remind the user that medical decisions require a qualified healthcare professional when the question asks for diagnosis or treatment.`;

export async function answerMedicalQuestion(question: string, record = demoRecord) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured. Add an OpenRouter API key to the server environment.");
  }

  const model = process.env.OPENROUTER_MODEL || "openrouter/free";
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://medrec-ai-g31u.onrender.com",
      "X-Title": "MedRec-AI",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: SYSTEM_INSTRUCTION },
        {
          role: "user",
          content: `Synthetic medical record:\n${JSON.stringify(record, null, 2)}\n\nUser question:\n${question}`,
        },
      ],
      temperature: 0.2,
      max_tokens: 500,
    }),
  });

  const data = (await response.json()) as OpenRouterResponse;
  if (!response.ok) {
    throw new Error(data.error?.message || `OpenRouter request failed with HTTP ${response.status}.`);
  }

  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("OpenRouter returned an empty response.");
  return { answer: text, model };
}
