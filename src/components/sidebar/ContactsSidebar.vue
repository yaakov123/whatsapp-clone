<template>
  <header
    class="w-full bg-gray-100 h-16 flex items-center justify-between px-2"
  >
    <Avatar />
    <section class="flex items-center space-x-4 text-gray-500">
      <ClockIcon class="w-6 h-6 cursor-pointer" />
      <PlusIcon class="w-6 h-6 cursor-pointer" @click="showNewChatView" />
      <EllipsisHorizontalIcon class="w-6 h-6 cursor-pointer" />
    </section>
  </header>
  <section class="p-2 border-b border-b-gray-300">
    <Input
      type="text"
      placeholder="Search or start new chat"
      v-model="search"
    />
  </section>
  <ChatList class="h-full" :chats="chats" />
</template>
<script setup lang="ts">
import {
  ClockIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/vue/24/solid";
import { Models } from "appwrite";
import { ref, onMounted } from "vue";
import { getGroups } from "../../api/teams";
import { SidebarView, useGlobalStore } from "../../stores/globalStore";
import Avatar from "../Avatar.vue";
import Input from "../Input.vue";
import ChatList from "./ChatList.vue";

const globalStore = useGlobalStore();
const search = ref("");
const chats = ref<Models.Team[]>([]);

function showNewChatView() {
  globalStore.showSidebarView(SidebarView.NEW_CHAT);
}

onMounted(async () => {
  chats.value = await getGroups();
});
</script>
