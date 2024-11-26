import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [
    {
      chatId: "c4debc96-e7e5-42a5-b245-cdb2d9220286",
      timeStamp: 1732359360316,
      name: "ww2 started?",
    },
    {
      chatId: "ab7d1e85-d474-4077-9665-4ef83e716829",
      timeStamp: 1732359360316,
      name: "how r u?",
    },
  ],
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    createChat: (state, action) => {
      state.chats.push({
        chatId: action.payload.id,
        timeStamp: null,
        name: null,
      });
    },
    addName: (state, action) => {
      let newState = state;
      newState.chats.forEach((chat) => {
        if (chat.chatId == action.payload.id) {
          chat.name = action.payload.name;
          chat.timeStamp = Date.now();
        }
      });
      state = newState;
    },
  },
});
export const { createChat, addName } = chatSlice.actions;

export default chatSlice.reducer;
