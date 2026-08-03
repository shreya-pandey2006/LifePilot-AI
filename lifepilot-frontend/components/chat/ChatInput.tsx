type ChatInputProps = {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
};

export default function ChatInput({
  input,
  setInput,
  onSend,
}: ChatInputProps) {
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="flex items-center rounded-3xl bg-zinc-900 border border-zinc-800 p-3">
        <input
          type="text"
          placeholder="Ask LifePilot anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSend();
          }}
          className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-500"
        />

        <button
          onClick={onSend}
          className="ml-3 rounded-xl bg-white text-black px-4 py-2 font-medium hover:bg-zinc-200 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}