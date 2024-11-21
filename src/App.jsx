import "./App.css";
import { Mistral } from "@mistralai/mistralai";
import { useState } from "react";
function App() {
  // const apiKey = process.env.MISTRAL_API_KEY || 'your_api_key';
  const [promt, setPropmt] = useState("");
  const [res, setRes] = useState([]);
  const client = new Mistral({ apiKey: "PrY8ry7da9ajHmgBHHg3awLXpAobm4n6" });

  const handelClick = async () => {
    const resp = await client.agents.complete({
      agentId: "ag:e11a11ab:20241121:untitled-agent:b0b02cac",
      messages: [{ role: "user", content: promt }],
    });
    console.log(resp);
    setRes([resp.choices[0].message.content]);
  };

  return (
    <div>
      {res &&
        res.map((response) => {
          const newText = response.split("\n");
          return newText.map((line, index) => <p key={index}>{line}</p>);
        })}
      <input value={promt} onChange={(e) => setPropmt(e.target.value)} />
      <button onClick={handelClick}>say</button>
    </div>
  );
}

export default App;
