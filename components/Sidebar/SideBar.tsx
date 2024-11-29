import React from "react";
import { db } from "@/db";
import { chatsTable } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import SidebarEl from "./SidebarEl";
async function SideBar({}: {}) {
  const chats = await db.query.chatsTable.findMany({
    where: eq(chatsTable.userId, 1),
    orderBy: desc(chatsTable.lastMessageTimeStamp),
  });
  console.log(chats);

  return (
    <div
      className={`absolute z-10 top-0 left-0 flex h-screen w-[150px] flex-col gap-8 bg-accent rounded-r-3xl py-4 `}
    >
      <h2 className="mx-auto text-3xl">Chats</h2>
      <div className="mx-2 flex flex-col gap-2 rounded-md px-2">
        {chats && chats.map((chat) => <SidebarEl chat={chat} />)}
        {/* <button className="mt-3 rounded-md border-2 border-text p-3" onClick={handleCreateChat}>
          Create new chat
        </button> */}
      </div>
    </div>
  );
}

export default SideBar;
