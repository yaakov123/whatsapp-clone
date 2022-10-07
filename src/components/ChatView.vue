<template>
  <main class="h-full w-full">
    <header class="w-full bg-gray-100 h-[55px] flex items-center px-2">
      <Avatar />
      <div class="ml-5">{{ groupStore.currentGroup?.name }}</div>
    </header>
    <ChatHistory :messages="messages"></ChatHistory>
    <ChatInput></ChatInput>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGroupStore } from "../stores/groupStore";
import { useMessageStore } from "../stores/messageStore";
import Avatar from "./Avatar.vue";
import ChatHistory from "./ChatHistory.vue";
import ChatInput from "./ChatInput.vue";
const groupStore = useGroupStore();
const messageStore = useMessageStore();

const messages = computed(() => {
  const groupId = groupStore.currentGroup?.$id;
  if (!groupId) return [];

  return messageStore.messagesForGroup(groupId);
});
</script>
