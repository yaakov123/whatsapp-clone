<template>
  <main
    class="w-full h-[55px] bg-gray-100 flex items-center justify-between px-5"
  >
    <Input
      type="text"
      v-model="messageText"
      class="w-10/12 flex-1"
      placeholder="Type a message"
      @keyup.enter="sendMessage"
    />
    <div class="flex items-center h-full ml-4">
      <PaperAirplaneIcon class="h-6 w-6 cursor-pointer" @click="sendMessage" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
import { account } from "../api";
import { createMessage } from "../api/database";
import { useGroupStore } from "../stores/groupStore";
import Input from "./Input.vue";

const messageText = ref("");

const groupStore = useGroupStore();

async function sendMessage() {
  const groupId = groupStore.currentGroup?.$id;
  if (!groupId) return;

  const session = await account.getSession("current");
  const currentAccount = await account.get();

  await createMessage({
    user_id: session.userId,
    email: currentAccount.email,
    group_id: groupId,
    contents: messageText.value,
  });

  messageText.value = "";
}
</script>
