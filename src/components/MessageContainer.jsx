import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import PendingStateComponent from "./PendingStateComponent";

function MessageContainer() {
  let params = useParams();
  let chatData = useSelector((state) => state.messages.chats[params.uuid]);
  const scroll = useRef(null);

  useEffect(() => {
    if (chatData) {
      scroll.current.scrollIntoView({ behavior: "auto" });
    }
  }, [chatData, chatData.messages]);

  return (
    <div className="mx-auto mb-6 flex h-full w-full flex-col items-end gap-4 overflow-scroll overflow-x-hidden px-5 lg:w-[60%] lg:px-0">
      {chatData &&
        chatData.messages.map((message, index) => (
          <Message key={index} from={message.from} message={message.text} />
        ))}
      {chatData.isPending && <PendingStateComponent />}
      <div ref={scroll}></div>
    </div>
  );
}

export default MessageContainer;
