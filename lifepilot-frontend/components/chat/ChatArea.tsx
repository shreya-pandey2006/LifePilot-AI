"use client";

import { useState } from "react";
import Header from "../layout/Header";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { ChatMessage } from "@/types/chat";
import { sendMessage } from "@/services/api";

export default function ChatArea() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm LifePilot. How can I help you today?",
    },
  ]);

  async function handleSend() {
    if (!input.trim()) return;

    const userText = input;

    // Show user's message immediately
    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      content: userText,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Clear input
    setInput("");

    try {
      // Send message to n8n
      const response = await sendMessage(userText);

      console.log("API Response:", response);

      // Extract AI response
      const aiReply =
        response.output ||
        response.reply ||
        response.text ||
        response.message ||
        "No response received from LifePilot.";

      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: aiReply,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("API Error:", error);

      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "⚠️ Sorry, I couldn't connect to the LifePilot backend.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header />

      <MessageList messages={messages} />

      <ChatInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
      />
    </div>
  );
}