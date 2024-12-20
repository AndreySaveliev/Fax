"use client";
import React, { useState } from "react";
import sendIcon from "./../public/message-send.svg";
import Image from "next/image";
import { handleSendMessage } from "@/actions/actions";

function Input({ id }: { id: number | null }) {
  const [promt, setPropmt] = useState("");

  const handleClickSend = () => {
    handleSendMessage(promt, id);
    setPropmt("");
  };

  return (
    <div className="mx-auto flex w-full flex-row gap-3 px-5 lg:w-[60%]">
      <div className="relative mb-8 flex flex-1 flex-row bg-white">
        <textarea
          className="h-12 flex-1 rounded-xl px-5 py-3 pr-14 text-[17px] focus:outline-none"
          value={promt}
          placeholder="Ask me anything..."
          onChange={(e) => setPropmt(e.target.value)}
        />
        <button
          className="absolute right-[16px] top-[50%] -translate-y-[50%] hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          onClick={handleClickSend}
          type="submit"
        >
          <Image src={sendIcon} alt="send text" />
        </button>
      </div>
    </div>
  );
}

export default Input;
