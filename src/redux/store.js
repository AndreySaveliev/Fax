import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./messagesSlice";
import chatsReducer from "./chatSlice";

export const store = configureStore({
  reducer: {
    chats: chatsReducer,
    messages: messageReducer,
  },
});
