"use server";

import { db } from "@/db";
import { chatsTable, messagesTable, usersTable } from "@/db/schema";
import { verifySession } from "@/lib/dal";
import { createSession } from "@/lib/session";
import { Mistral } from "@mistralai/mistralai";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const handleSendMessage = async (text: string, id: number | null) => {
  const user = await verifySession();
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
      userId: user.userId,
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
    const answer = await handleAskAi(text);
    const botResponse = {
      chatId: id,
      isUser: false,
      content: answer,
      createdAt: new Date(),
    };
    await db.insert(messagesTable).values(botResponse);
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

export type FormState =
  | {
      field: string;
      errorMessage: string;
    }
  | undefined;

export const handleSignin = async (state: FormState, formData: FormData) => {
  if ((formData.get("name") as string) == "") {
    return {
      field: "name",
      errorMessage: "Please enter a valid name",
    };
  }
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.name, formData.get("name") as string),
  });
  if (user) {
    await createSession(user.id);
    redirect(`/`);
  } else {
    const newUser = {
      name: formData.get("name") as string,
    };
    const newUserData = await db
      .insert(usersTable)
      .values(newUser)
      .returning({ id: usersTable.id });
    await createSession(newUserData[0].id);
    redirect(`/`);
  }
};

export const fetchUserChats = async () => {
  const data = await verifySession();
  const chats = await db.query.chatsTable.findMany({
    where: eq(chatsTable.userId, data.userId),
    orderBy: desc(chatsTable.lastMessageTimeStamp),
  });
  return chats;
};

export const handleLogOut = async () => {
  (await cookies()).delete("session");
  redirect("/signup");
};
