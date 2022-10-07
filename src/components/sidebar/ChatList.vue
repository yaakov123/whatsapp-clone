<template>
  <main class="divide-y overflow-y-auto">
    <ChatItem
      v-for="chat in chats"
      :chat="chat"
      @click="onChatSelected(chat)"
    ></ChatItem>
  </main>
</template>
<script setup lang="ts">
import { Models } from "appwrite";
import { useGroupStore } from "../../stores/groupStore";
import { useMessageStore } from "../../stores/messageStore";
import ChatItem from "./ChatItem.vue";

interface Props {
  chats: Models.Team[];
}

defineProps<Props>();
const groupStore = useGroupStore();
const messageStore = useMessageStore();

function onChatSelected(chat: Models.Team) {
  groupStore.currentGroup = chat;
  messageStore.getMessages(chat.$id);
}
</script>
