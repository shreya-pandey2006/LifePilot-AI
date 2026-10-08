"use client";

import { useState } from "react";
import Header from "../layout/Header";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { Chat, ChatMessage } from "@/types/chat";
import { sendMessageToLifePilot } from "@/services/api";

type ChatAreaProps = {
  chat: Chat;
  onAddMessage: (chatId: string, message: ChatMessage) => void;
};

export default function ChatArea({ chat, onAddMessage }: ChatAreaProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const chatId = chat.id; // captured so the reply lands in the right chat
    const userText = input;

    onAddMessage(chatId, { id: Date.now(), role: "user", content: userText });
    setInput("");
    setIsLoading(true);

    try {
      const aiReply = await sendMessageToLifePilot(userText, chatId);
      onAddMessage(chatId, { id: Date.now() + 1, role: "assistant", content: aiReply });
    } catch (error) {
      console.error("API Error:", error);
      const timedOut = error instanceof DOMException && error.name === "AbortError";
      onAddMessage(chatId, {
        id: Date.now() + 1,
        role: "assistant",
        content: timedOut
          ? "⚠️ LifePilot is taking too long. The server may be waking up, so please try again in a minute."
          : "⚠️ Sorry, I couldn't connect to the LifePilot backend.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col h-full">
      <Header />
      <MessageList messages={chat.messages} />
      {isLoading && (
        <p className="px-6 pb-2 text-sm text-zinc-500">LifePilot is thinking…</p>
      )}
      <ChatInput input={input} setInput={setInput} onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}