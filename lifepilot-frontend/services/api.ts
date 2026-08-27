export interface ChatResponse {
  output: string;
}

// Configurable per-environment instead of hardcoded, so the same build
// works in dev, staging, and on whatever platform you deploy to.
// Set NEXT_PUBLIC_N8N_WEBHOOK_URL in your .env.local / hosting dashboard.
const N8N_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ??
  "http://localhost:5678/webhook/chat";

const REQUEST_TIMEOUT_MS = 30_000;

export const sendMessageToLifePilot = async (
  userMessage: string
): Promise<string> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatInput: userMessage,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const data = await response.json();

    // Safely parse output whether n8n returns an array or an object
    if (Array.isArray(data) && data.length > 0) {
      return typeof data[0]?.output === "string"
        ? data[0].output
        : "No response received from LifePilot.";
    }

    if (data && typeof data === "object" && "output" in data) {
      const output = (data as ChatResponse).output;
      return typeof output === "string" ? output : "Unexpected response format from LifePilot.";
    }

    return "Unexpected response format from LifePilot.";
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("LifePilot took too long to respond. Please try again.");
    }
    console.error("Error communicating with LifePilot webhook:", error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};
