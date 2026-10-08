export type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export type Chat = {
  id: string; // also used as the n8n session ID
  title: string;
  messages: ChatMessage[];
};