"use client";
import { useRouter } from "next/navigation";
import { useFormatDate } from "../../lib/useFormatDate";

function SidebarEl({
  chat,
}: {
  chat: {
    id: number;
    name: string;
    lastMessageTimeStamp: Date | null;
    userId: number | null;
  };
}) {
  const router = useRouter();

  return (
    <div
      className="bg-accent p-2 cursor-pointer"
      key={chat.id}
      onClick={() => router.push(`/chats/${chat.id}`)}
    >
      <p className="text-xl text-text">{chat.name}</p>
      <p className="text-sm">{useFormatDate(chat.lastMessageTimeStamp)}</p>
    </div>
  );
}

export default SidebarEl;
