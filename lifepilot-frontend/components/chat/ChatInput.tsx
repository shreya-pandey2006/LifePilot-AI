type ChatInputProps = {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
};

export default function ChatInput({
  input,
  setInput,
  onSend,
  isLoading,
}: ChatInputProps) {
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="flex items-center rounded-3xl bg-zinc-900 border border-zinc-800 p-3">
        <input
          type="text"
          placeholder={
            isLoading ? "Waiting for LifePilot..." : "Ask LifePilot anything..."
          }
          value={input}
          disabled={isLoading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSend();
          }}
          className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-500 disabled:opacity-50"
        />

        <button
          onClick={onSend}
          disabled={isLoading || !input.trim()}
          className="ml-3 rounded-xl bg-white text-black px-4 py-2 font-medium hover:bg-zinc-200 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
        >
          {isLoading ? "Sending…" : "Send"}
        </button>
      </div>
    </div>
  );
}
