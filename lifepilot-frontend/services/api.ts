export async function sendMessageToLifePilot(message: string) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ chatInput: message }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch response from API');
  }

  return await response.json();
}