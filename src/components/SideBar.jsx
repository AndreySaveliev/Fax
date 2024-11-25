import React from "react";
import { useSelector } from "react-redux";
import { useFormatDate } from "../hooks/useFormatDate";
import { useNavigate } from "react-router";
function SideBar({ showSide, handleShowSideBar }) {
  const { chats } = useSelector((state) => state.chats);
  const navigate = useNavigate();
  const handleSelectChat = (id) => {
    navigate(`../${id}`, { replace: true });
    handleShowSideBar();
  };

  return (
    <div
      className={`absolute z-10 flex h-screen w-screen flex-col gap-8 bg-background py-4 ${showSide ? "block" : "hidden"}`}
    >
      <h2 className="mx-auto text-3xl">Chats</h2>
      <div className="mx-2 flex flex-col gap-2 rounded-md px-2">
        {chats &&
          chats.map((chat) => (
            <div
              className="bg-accent p-2"
              key={chat.chatId}
              onClick={() => handleSelectChat(chat.chatId)}
            >
              <p className="text-xl text-text">{chat.name}</p>
              <p className="text-sm">
                {useFormatDate(chat.lastMessageTimeStamp)}
              </p>
            </div>
          ))}
      </div>
      <button
        onClick={handleShowSideBar}
        className="absolute right-5 top-4 text-4xl"
      >
        x
      </button>
    </div>
  );
}

export default SideBar;
