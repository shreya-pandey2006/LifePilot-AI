import Sidebar from "@/components/layout/Sidebar";
import ChatArea from "@/components/chat/ChatArea";

export default function Home() {
  return (
    <main className="flex h-screen bg-zinc-950 text-white">
      <Sidebar />
      <ChatArea />
    </main>
  );
}