import { handleSendMessage } from "@/actions/actions";
import Input from "@/components/Input";
import SidebarEl from "@/components/SidebarEl";
import { db } from "@/db";
import { chatsTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export default async function Home() {
  const chats = await db.query.chatsTable.findMany({
    where: eq(chatsTable.userId, 1),
    orderBy: desc(chatsTable.lastMessageTimeStamp),
  });
  return (
    <div className="flex flex-col py-4 text-2xl h-full">
      <h2 className="mx-auto">Select existing chat</h2>
      {chats && chats.map((chat) => <SidebarEl key={chat.id} chat={chat} />)}
      <div className="mx-auto flex flex-col justify-end flex-1 gap-5">
        <h2 className="text-center">Or create new chat</h2>
        <Input handleSendMessage={handleSendMessage} id={null} />
      </div>
    </div>
  );
}
