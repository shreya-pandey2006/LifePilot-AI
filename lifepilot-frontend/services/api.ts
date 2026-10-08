export interface ChatResponse {
  output: string;
}

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
  "https://lifepilot-n8n.onrender.com/webhook/chat";

const TIMEOUT_MS = 120_000; // covers a Render cold start

// Fire-and-forget ping so Render starts waking before the user types
export function wakeBackend() {
  try {
    fetch(new URL(WEBHOOK_URL).origin + "/healthz", { mode: "no-cors" }).catch(() => {});
  } catch {}
}

export async function sendMessageToLifePilot(
  userMessage: string,
  sessionId: string
): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatInput: userMessage, sessionId }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      return data[0].output || "No response received from LifePilot.";
    }
    if (data && typeof data === "object" && "output" in data) {
      return (data as ChatResponse).output;
    }
    return "Unexpected response format from LifePilot.";
  } finally {
    clearTimeout(timer);
  }
}