import React, { useCallback, useEffect, useState } from "react";
import sendIcon from "./../assets/message-send.svg";
import reload from "./../assets/reload.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  reAskLastQuestion,
  saveUserMessage,
  sendMessage,
} from "../redux/messagesSlice";
import { useParams } from "react-router";
import { addName } from "../redux/chatSlice";
function Input() {
  const [promt, setPropmt] = useState("");
  let params = useParams();
  const { isPending, ableToReask, lastMessage, messages } = useSelector(
    (state) => state.messages.chats[params.uuid],
  );
  const [isDis, setDis] = useState(false);
  const dispatch = useDispatch();
  const handleClickSend = () => {
    if (messages.length == 0) {
      dispatch(addName({ name: promt, id: params.uuid }));
    }
    dispatch(saveUserMessage({ promt, id: params.uuid }));
    dispatch(sendMessage({ message: promt, id: params.uuid }));
    setPropmt("");
  };

  const handleReaskLastQuestion = () => {
    dispatch(saveUserMessage({ promt: lastMessage, id: params.uuid }));
    dispatch(reAskLastQuestion({ message: lastMessage, id: params.uuid }));
  };

  useEffect(() => {
    if (promt.length > 0) {
      setDis(false);
    } else {
      setDis(true);
    }
  }, [promt]);

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
          disabled={isDis}
        >
          <img
            className={`${isPending ? "disabled:opacity-25" : ""}`}
            src={sendIcon}
          />
        </button>
      </div>
      {ableToReask && (
        <button
          onClick={handleReaskLastQuestion}
          className="h-14 w-14 justify-items-center rounded-xl bg-black hover:scale-95"
        >
          <img src={reload} />
        </button>
      )}
    </div>
  );
}

export default Input;
