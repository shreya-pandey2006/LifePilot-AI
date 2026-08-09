export interface ChatResponse {
  output: string;
}

export const sendMessageToLifePilot = async (userMessage: string): Promise<string> => {
  try {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://lifepilot-n8n.onrender.com/webhook/lifepilot-ai';

const response = await fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    chatInput: userMessage,
  }),
});

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const data = await response.json();

    // Safely parse output whether n8n returns an array or an object
    if (Array.isArray(data) && data.length > 0) {
      return data[0].output || 'No response received from LifePilot.';
    } else if (data && typeof data === 'object' && 'output' in data) {
      return (data as ChatResponse).output;
    }

    return 'Unexpected response format from LifePilot.';
  } catch (error) {
    console.error('Error communicating with LifePilot webhook:', error);
    throw error;
  }
};