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
    addChat: (state, payload) => {
      state.chats += 1;
    },
    deleteChat: (state, payload) => {
      state.chats = state.chats.filter(
        (chat) => chat.chatId !== payload.chatId,
      );
    },
  },
});
export const { addChat } = chatSlice.actions;

export default chatSlice.reducer;
