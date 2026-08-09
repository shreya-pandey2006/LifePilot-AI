import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const n8nWebhookUrl =
      process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL ||
      'https://lifepilot-n8n.onrender.com/webhook/chat';

    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`n8n responded with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy route error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to communicate with n8n backend';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}