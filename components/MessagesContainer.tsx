"use client";

import { useEffect, useRef } from "react";
import Message from "./Message";

function MessagesContainer({
  messages,
}: {
  messages: {
    id: number;
    isUser: boolean | null;
    content: string | null;
    createdAt: Date | null;
    chatId: number | null;
  }[];
}) {
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (messages && ref.current != undefined) {
      ref.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  return (
    <div className="mx-auto mb-6 flex h-[80%] w-full flex-col items-end gap-4 overflow-scroll overflow-x-hidden px-2 lg:w-[60%] lg:px-0">
      {messages &&
        messages.map((msg) => (
          <Message key={msg.id} from={msg.isUser ? "user" : "bot"} message={msg.content} />
        ))}
      <div ref={ref}></div>
    </div>
  );
}

export default MessagesContainer;
