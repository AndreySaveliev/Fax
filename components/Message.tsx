import React from "react";
import Markdown from "react-markdown";
function Message({ from, message }: { from: string; message: string | null }) {
  // console.log(message.split("\n"));
  // \*\*.+\*\*  regexp для форматирования строк **Treaty of Versailles (1919)** **Hitler's Rise to Power (1933)**
  // ###.+ ### Resources for Fact-Checking:
  // \[.+\]
  // \(.+\)
  // [BBC History - World War Two](https://www.bbc.co.uk/history/worldwars/wwtwo/)"
  return (
    <div
      className={`${
        from == "user" ? "bg-white" : "self-start bg-accent"
      } flex flex-col gap-3 rounded-xl p-3`}
    >
      <Markdown>{message}</Markdown>
    </div>
  );
}

export default Message;
