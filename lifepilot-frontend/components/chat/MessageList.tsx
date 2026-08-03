import Message from "./Message";
import { ChatMessage } from "@/types/chat";

type MessageListProps = {
  messages: ChatMessage[];
};

export default function MessageList({
  messages,
}: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-6 max-w-5xl w-full mx-auto">
      {messages.map((message) => (
        <Message
          key={message.id}
          role={message.role}
          content={message.content}
        />
      ))}
    </div>
  );
}