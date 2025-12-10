import { useEffect } from "react";
import { useTitle } from "@/hooks";
import { Content, Header, SendMessage } from "../components";

export default function ChatPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Conversación - La base");
  }, []);
  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-4xl mx-auto px-4 pt-10 pb-16">
      <Header />
      <Content />
      <SendMessage />
    </div>
  );
}
