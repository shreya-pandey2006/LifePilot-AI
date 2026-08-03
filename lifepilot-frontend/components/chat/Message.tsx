type MessageProps = {
  role: "user" | "assistant";
  content: string;
};

export default function Message({ role, content }: MessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex mb-6 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xl rounded-2xl px-5 py-3 ${
          isUser
            ? "bg-white text-black"
            : "bg-zinc-900 text-white"
        }`}
      >
        {content}
      </div>
    </div>
  );
}