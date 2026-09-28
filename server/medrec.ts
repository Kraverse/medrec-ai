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
} as const;

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

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
  }>;
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
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured. Add a Gemini API key to the server environment.");
  }

  const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Synthetic medical record:\n${JSON.stringify(record, null, 2)}\n\nUser question:\n${question}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 500,
      },
    }),
  });

  const data = (await response.json()) as GeminiResponse;
  if (!response.ok) {
    throw new Error(data.error?.message || `Gemini request failed with HTTP ${response.status}.`);
  }

  const text = data.candidates?.[0]?.content?.parts?.map(part => part.text || "").join("").trim();
  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  return { answer: text, model };
}
