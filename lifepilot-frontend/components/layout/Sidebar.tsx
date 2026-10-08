"use client";

import { Chat } from "@/types/chat";

type SidebarProps = {
  chats: Chat[];
  activeId: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
};

export default function Sidebar({ chats, activeId, onSelect, onNewChat }: SidebarProps) {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-900">
      <div className="p-5">
        <h2 className="text-2xl font-bold text-white">🚀 LifePilot</h2>

        <button
          type="button"
          onClick={onNewChat}
          className="mt-6 w-full rounded-xl bg-zinc-800 p-3 text-left transition hover:bg-zinc-700"
        >
          + New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        <p className="mb-4 text-sm text-zinc-500">Recent Chats</p>

        <div className="space-y-2">
          {chats.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect(c.id)}
              className={`w-full truncate rounded-lg p-2 text-left hover:bg-zinc-800 ${
                c.id === activeId ? "bg-zinc-800" : ""
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-zinc-800 p-5 text-sm text-zinc-500">LifePilot AI</div>
    </aside>
  );
}