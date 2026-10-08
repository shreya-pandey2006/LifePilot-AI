"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import ChatArea from "@/components/chat/ChatArea";
import { Chat, ChatMessage } from "@/types/chat";
import { wakeBackend } from "@/services/api";

const createChat = (): Chat => ({
  id: crypto.randomUUID(),
  title: "New chat",
  messages: [
    { id: 1, role: "assistant", content: "Hello! I'm LifePilot. How can I help you today?" },
  ],
});

export default function Home() {
  const [chats, setChats] = useState<Chat[]>(() => [createChat()]);
  const [activeId, setActiveId] = useState(() => chats[0].id);

  useEffect(() => {
    wakeBackend();
  }, []);

  const active = chats.find((c) => c.id === activeId) ?? chats[0];

  function startNewChat() {
    const c = createChat();
    setChats((prev) => [c, ...prev]);
    setActiveId(c.id);
  }

  function addMessage(chatId: string, message: ChatMessage) {
    setChats((prev) =>
      prev.map((c) =>
        c.id !== chatId
          ? c
          : {
              ...c,
              title:
                c.title === "New chat" && message.role === "user"
                  ? message.content.slice(0, 30)
                  : c.title,
              messages: [...c.messages, message],
            }
      )
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar chats={chats} activeId={activeId} onSelect={setActiveId} onNewChat={startNewChat} />
      <ChatArea key={active.id} chat={active} onAddMessage={addMessage} />
    </div>
  );
}