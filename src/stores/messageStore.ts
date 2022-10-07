import { defineStore } from "pinia";
import { getMessages } from "../api/database";
import { MessageModel } from "../models";

interface State {
  messages: MessageModel[];
}

export const useMessageStore = defineStore("messageStore", {
  state: () => {
    return { messages: [] } as State;
  },
  actions: {
    async getMessages(groupId: string) {
      this.messages = await getMessages(groupId);
    },
    onMessageReceived(message: MessageModel) {
      this.messages.push(message);
      console.log(this.messages);
    },
  },
  getters: {
    messagesForGroup: (state) => {
      return (groupId: string) => {
        return state.messages.filter((message) => message.groupId === groupId);
      };
    },
  },
});
