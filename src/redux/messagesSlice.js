import { Mistral } from "@mistralai/mistralai";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const client = new Mistral({ apiKey: "PrY8ry7da9ajHmgBHHg3awLXpAobm4n6" });
const agentId = "ag:e11a11ab:20241121:untitled-agent:b0b02cac";

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async (payload) => {
    const response = await client.agents.complete({
      agentId: agentId,
      messages: [{ role: "user", content: payload.message }],
    });
    return { response, id: payload.id };
  },
);

export const reAskLastQuestion = createAsyncThunk(
  "message/reAskLastQuestion",
  async (payload) => {
    const response = await client.agents.complete({
      agentId: agentId,
      messages: [{ role: "user", content: payload.message }],
    });
    return { response, id: payload.id };
  },
);

const initialState = {
  chats: {
    "c4debc96-e7e5-42a5-b245-cdb2d9220286": {
      messages: [
        {
          text: "ww2 started?",
          from: "user",
        },
        {
          text: "World War II began on September 1, 1939, when Germany, under the leadership of Adolf Hitler, invaded Poland. The invasion triggered declarations of war from France and the United Kingdom, which were allied with Poland. Here's a brief timeline of events leading up to the war:\n\n1. **Treaty of Versailles (1919)**: The end of World War I left Germany with heavy reparations and political humiliation, which fueled resentment and contributed to the rise of Adolf Hitler.\n2. **Hitler's Rise to Power (1933)**: Hitler became Chancellor of Germany and began implementing aggressive foreign policies.\n3. **Anschluss (1938)**: Germany annexed Austria without significant international opposition.\n4. **Munich Agreement (1938)**: Britain and France agreed to Hitler's demands to annex the Sudetenland region of Czechoslovakia, believing it would prevent a larger war.\n5. **Invasion of Poland (1939)**: On September 1, 1939, Germany invaded Poland, marking the beginning of World War II.\n\n### Resources for Fact-Checking:\n1. **Books**:\n   - 'The Rise and Fall of the Third Reich' by William L. Shirer\n   - 'The Origins of The Second World War in Europe' by P.M.H. Bell\n\n2. **Websites**:\n   - [BBC History - World War Two](https://www.bbc.co.uk/history/worldwars/wwtwo/)\n   - [History.com - World War II](https://www.history.com/topics/world-war-ii/world-war-ii-history)\n\n3. **Documentaries**:\n   - 'The World at War' (1973-1974) - A comprehensive documentary series on World War II.\n\n4. **Academic Journals**:\n   - 'Journal of Contemporary History'\n   - 'Journal of Military History'\n\nThese resources should provide a thorough understanding of the events leading up to World War II and the war itself.",
          from: "bot",
        },
      ],
      lastMessage: "weather 2 weeks ago?",
      lastMessageTimeStamp: "1732359360316",
      isPending: null,
      ableToReask: true,
    },
    "ab7d1e85-d474-4077-9665-4ef83e716829": {
      messages: [
        {
          text: "how r u?",
          from: "user",
        },
        {
          text: "im ok",
          from: "bot",
        },
      ],
      lastMessage: "",
      lastMessageTimeStamp: "1732359360316",
      isPending: null,
      ableToReask: false,
    },
  },
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    increment: (state) => {
      state.messageCount += 1;
    },
    saveUserMessage: (state, action) => {
      let newState = state;
      newState.chats[action.payload.id].messages.push({
        text: action.payload.promt,
        from: "user",
      });
      state = newState;
      // работает !!
      // state = state.chats[action.payload.id].messages.push({
      //   text: action.payload.promt,
      //   from: "user",
      // });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state, action) => {
      let newState = state;
      newState.chats[action.meta.arg.id].isPending = true;
      newState.chats[action.meta.arg.id].ableToReask = false;
      state = newState;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      let newState = state;
      newState.chats[action.payload.id].messages.push({
        text: action.payload.response.choices[0].message.content,
        from: "bot",
      });
      newState.chats[action.meta.arg.id].lastMessage = action.meta.arg.message;
      newState.chats[action.meta.arg.id].isPending = false;
      newState.chats[action.meta.arg.id].lastMessageTimeStamp = Date.now();
      newState.chats[action.meta.arg.id].ableToReask = true;
      state = newState;
    });
    builder.addCase(reAskLastQuestion.pending, (state, action) => {
      console.log(action, "pending");
      let newState = state;
      newState.chats[action.meta.arg.id].isPending = true;
      newState.chats[action.meta.arg.id].ableToReask = false;
      state = newState;
    });
    builder.addCase(reAskLastQuestion.fulfilled, (state, action) => {
      console.log(action, "full");
      let newState = state;
      newState.chats[action.meta.arg.id].messages.push({
        text: action.payload.response.choices[0].message.content,
        from: "bot",
      });
      newState.chats[action.meta.arg.id].isPending = false;
      newState.chats[action.meta.arg.id].lastMessageTimeStamp = Date.now();
      newState.chats[action.meta.arg.id].ableToReask = false;
      state = newState;
    });
  },
});
export const { increment, saveUserMessage } = messagesSlice.actions;

export default messagesSlice.reducer;

// {
//   "type": "message/reAskLastQuestion/fulfilled",
//   "payload": {
//       "response": {
//           "id": "630fd72eb0b0405d8e62da949e302d9c",
//           "object": "chat.completion",
//           "model": "mistral-large-2411",
//           "usage": {
//               "promptTokens": 28,
//               "completionTokens": 358,
//               "totalTokens": 386
//           },
//           "created": 1732538023,
//           "choices": [
//               {
//                   "index": 0,
//                   "message": {
//                       "content": "To find out the weather from two weeks ago, you'll need to use historical weather data resources. Here are some reliable sources where you can find this information:\n\n1. **Weather Underground**: This website offers historical weather data for locations worldwide. You can enter the specific date and location to get detailed weather information.\n   - Website: [Weather Underground](https://www.wunderground.com/)\n\n2. **AccuWeather**: AccuWeather provides historical weather data, including temperature, precipitation, and other metrics.\n   - Website: [AccuWeather](https://www.accuweather.com/)\n\n3. **The Weather Channel**: This popular weather service also offers historical weather data. You can search by date and location.\n   - Website: [The Weather Channel](https://weather.com/)\n\n4. **National Weather Service (NWS)**: For the United States, the NWS provides historical weather data through their Climate Data Online (CDO) service.\n   - Website: [National Weather Service](https://www.weather.gov/)\n\n5. **MeteoBlue**: This Swiss-based weather service provides historical weather data for locations around the world.\n   - Website: [MeteoBlue](https://www.meteoblue.com/)\n\n6. **World Weather Online**: This service offers historical weather data for various locations globally.\n   - Website: [World Weather Online](https://www.worldweatheronline.com/)\n\nTo fact-check the information, you can cross-reference data from multiple sources to ensure accuracy.",
//                       "toolCalls": null,
//                       "prefix": false,
//                       "role": "assistant"
//                   },
//                   "finishReason": "stop"
//               }
//           ]
//       },
//       "id": "c4debc96-e7e5-42a5-b245-cdb2d9220286"
//   },
//   "meta": {
//       "arg": {
//           "message": "weather 2 weeks ago?",
//           "id": "c4debc96-e7e5-42a5-b245-cdb2d9220286"
//       },
//       "requestId": "QjTrUyGjfo1KpwBU_qU-3",
//       "requestStatus": "fulfilled"
//   }
// }