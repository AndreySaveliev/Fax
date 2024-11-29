import Input from "@/components/Input";
import Message from "@/components/Message";
import { db } from "@/db";
import { messagesTable } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import React from "react";

export default async function ChatPage({ params }: { params: Promise<{ id: number }> }) {
  const id = (await params).id;
  console.log(id);

  const messages = await db.query.messagesTable.findMany({
    where: eq(messagesTable.chatId, id),
    orderBy: asc(messagesTable.createdAt),
  });

  console.log(messages);

  const handleSendMessage = async (text: string) => {
    "use server";
    const newMessage = {
      chatId: id,
      isUser: true,
      content: text,
      createdAt: new Date(),
    };

    await db.insert(messagesTable).values(newMessage);
    revalidatePath(`/chats${id}`);
  };

  return (
    <>
      <div className="mx-auto mb-6 flex h-full w-full flex-col items-end gap-4 overflow-scroll overflow-x-hidden px-5 lg:w-[60%] lg:px-0">
        {messages &&
          messages.map((msg) => (
            <Message key={msg.id} from={msg.isUser ? "user" : "bot"} message={msg.content} />
          ))}
      </div>
      <Input handleSendMessage={handleSendMessage} />
    </>
  );
}

// chats/c4debc96-e7e5-42a5-b245-cdb2d9220286
