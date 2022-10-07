<template>
  <main
    class="w-full h-[calc(100%-110px)] flex flex-col p-5 space-y-4 bg-custom-chat-bg relative overflow-y-auto"
  >
    <Message v-for="message in messages" :message="message"></Message>
  </main>
</template>

<script setup lang="ts">
import { MessageModel } from "../models";
import Message from "./Message.vue";

interface Props {
  messages: MessageModel[];
}

defineProps<Props>();
</script>
