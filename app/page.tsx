import { db } from "@/db";
import { messagesTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export default async function Home() {
  // await db.insert(usersTable).values({ name: "Andrew" });
  // const dron = await db.select().from(usersTable).where(eq(usersTable.id, 1));
  // console.log(dron);
  // await db
  //   .insert(messagesTable)
  //   .values({ content: "lololo", createdAt: new Date(Date.now()), chatId: 1, isUser: true });
  const messages = await db.query.messagesTable.findMany({
    where: eq(messagesTable.chatId, 1),
    orderBy: desc(messagesTable.createdAt),
  });
  console.log(messages);
  return (
    <>
      <h1>Select Chat</h1>
    </>
  );
}
