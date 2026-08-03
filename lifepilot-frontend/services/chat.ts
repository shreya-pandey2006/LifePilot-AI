export async function sendMessage(message: string) {
  const response = await fetch(
    "YOUR_N8N_WEBHOOK_URL",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send message");
  }

  return response.json();
}