import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormatDate } from "../hooks/useFormatDate";
import { useNavigate } from "react-router";
import { createChat } from "../redux/chatSlice";
import { createChatData } from "../redux/messagesSlice";
function SideBar({ showSide, handleShowSideBar }) {
  const { chats } = useSelector((state) => state.chats);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSelectChat = (id) => {
    navigate(`../chats/${id}`, { replace: true });
    handleShowSideBar();
  };

  const handleCreateChat = () => {
    let id = crypto.randomUUID().toString();
    dispatch(createChat({ id }));
    dispatch(createChatData({ id }));
    navigate(`../chats/${id}`, { replace: true });
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
        <button
          className="mt-3 rounded-md border-2 border-text p-3"
          onClick={handleCreateChat}
        >
          Create new chat
        </button>
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
