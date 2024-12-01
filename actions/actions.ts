"use server";

import { db } from "@/db";
import { chatsTable, messagesTable } from "@/db/schema";
import { Mistral } from "@mistralai/mistralai";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export const handleSendMessage = async (text: string, id: number | null) => {
  if (id != null) {
    const newMessage = {
      chatId: id,
      isUser: true,
      content: text,
      createdAt: new Date(),
    };

    await db.insert(messagesTable).values(newMessage);
    revalidatePath(`/chats${id}`);
    const answer = await handleAskAi(text);
    const botResponse = {
      chatId: id,
      isUser: false,
      content: answer,
      createdAt: new Date(),
    };
    await db.insert(messagesTable).values(botResponse);
    revalidatePath(`/chats${id}`);
  } else {
    const newChat = {
      name: text,
      lastMessageTimeStamp: new Date(),
      userId: 1,
    };
    const newChatData = await db
      .insert(chatsTable)
      .values(newChat)
      .returning({ id: chatsTable.id });
    const newMessage = {
      chatId: newChatData[0].id,
      isUser: true,
      content: text,
      createdAt: new Date(),
    };
    await db.insert(messagesTable).values(newMessage);
    redirect(`/chats/${newChatData[0].id}`);
  }
};

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey: apiKey });
const agentId = "ag:e11a11ab:20241121:untitled-agent:b0b02cac";

export const handleAskAi = async (text: string): Promise<string | undefined> => {
  const response = await client.agents.complete({
    agentId: agentId,
    messages: [{ role: "user", content: text }],
  });
  if (response.choices != undefined) {
    return response.choices[0].message.content as string;
  }
};

export const handleCreateChat = async () => {};
