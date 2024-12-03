import Input from "@/components/Input";
import { db } from "@/db";
import { messagesTable } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import React from "react";
import Image from "next/image";
import menuIcon from "./../../../public/menu.svg";
import Link from "next/link";
import MessagesContainer from "@/components/MessagesContainer";

export default async function ChatPage({ params }: { params: Promise<{ id: number }> }) {
  const id = (await params).id;

  const messages = await db.query.messagesTable.findMany({
    where: eq(messagesTable.chatId, id),
    orderBy: asc(messagesTable.createdAt),
  });

  return (
    <>
      <Link href="/" className="absolute top-4 left-4">
        <Image src={menuIcon} alt="menu" />
      </Link>
      <MessagesContainer messages={messages} />
      <Input  id={id} />
    </>
  );
}

// chats/c4debc96-e7e5-42a5-b245-cdb2d9220286
