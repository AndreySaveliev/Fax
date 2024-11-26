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
      ableToReask: false,
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
    createChatData: (state, action) => {
      state.chats[action.payload.id] = {
        messages: [],
        lastMessage: "",
        lastMessageTimeStamp: "",
        isPending: false,
        ableToReask: false,
      };
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
      let newState = state;
      newState.chats[action.meta.arg.id].isPending = true;
      newState.chats[action.meta.arg.id].ableToReask = false;
      state = newState;
    });
    builder.addCase(reAskLastQuestion.fulfilled, (state, action) => {
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
export const { increment, saveUserMessage, createChatData } =
  messagesSlice.actions;

export default messagesSlice.reducer;
