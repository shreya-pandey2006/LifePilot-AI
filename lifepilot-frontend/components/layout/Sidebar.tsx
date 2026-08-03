export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-zinc-800 bg-zinc-900">
      <div className="p-5">
        <h2 className="text-2xl font-bold text-white">
          🚀 LifePilot
        </h2>

        <button className="mt-6 w-full rounded-xl bg-zinc-800 p-3 text-left transition hover:bg-zinc-700">
          + New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        <p className="mb-4 text-sm text-zinc-500">
          Recent Chats
        </p>

        <div className="space-y-2">
          <button className="w-full rounded-lg p-2 text-left hover:bg-zinc-800">
            Welcome Chat
          </button>

          <button className="w-full rounded-lg p-2 text-left hover:bg-zinc-800">
            Productivity Tips
          </button>
        </div>
      </div>

      <div className="border-t border-zinc-800 p-5 text-sm text-zinc-500">
        LifePilot AI
      </div>
    </aside>
  );
}