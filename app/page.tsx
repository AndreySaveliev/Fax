import { fetchUserChats, handleLogOut, handleSendMessage } from "@/actions/actions";
import Input from "@/components/Input";
import SidebarEl from "@/components/SidebarEl";

export default async function Home() {
  const chats = await fetchUserChats();
  return (
    <div className="flex flex-col pt-4 text-2xl h-full">
      <h2 className="mx-auto">Select existing chat</h2>
      {chats && chats.map((chat) => <SidebarEl key={chat.id} chat={chat} />)}
      <button className="text-sm underline" onClick={handleLogOut}>
        logout
      </button>
      <div className="mx-auto flex flex-col justify-end flex-1 gap-5 w-full">
        <h2 className="text-center">Or create new chat</h2>
        <Input id={null} />
        
      </div>
    </div>
  );
}
