<template>
  <main class="w-full h-full flex">
    <Sidebar>
      <ContactsSidebar v-if="sidebarView === SidebarView.CONTACTS" />
      <NewChatSidebar v-if="sidebarView === SidebarView.NEW_CHAT" />
      <NewGroupParticipantsSidebar
        v-if="sidebarView === SidebarView.NEW_GROUP_PARTICIPANTS"
      />
      <NewGroupInfoSidebar v-if="sidebarView === SidebarView.NEW_GROUP_INFO" />
    </Sidebar>
    <ChatView v-if="groupStore.currentGroup"></ChatView>
  </main>
</template>

<script setup lang="ts">
import Sidebar from "../components/sidebar/Sidebar.vue";
import ContactsSidebar from "../components/sidebar/ContactsSidebar.vue";
import { SidebarView, useGlobalStore } from "../stores/globalStore";
import { computed } from "vue";
import NewChatSidebar from "../components/sidebar/NewChatSidebar.vue";
import NewGroupParticipantsSidebar from "../components/sidebar/NewGroupParticipantsSidebar.vue";
import NewGroupInfoSidebar from "../components/sidebar/NewGroupInfoSidebar.vue";
import ChatView from "../components/ChatView.vue";
import { useGroupStore } from "../stores/groupStore";
import { client } from "../api";
import { useMessageStore } from "../stores/messageStore";

const globalStore = useGlobalStore();
const groupStore = useGroupStore();
const messageStore = useMessageStore();
const sidebarView = computed(() => globalStore.sidebarView);

client.subscribe(
  "databases.whatsapp.collections.messages.documents",
  (event) => {
    const payload: any = event.payload;

    messageStore.onMessageReceived({
      id: payload.$id,
      contents: payload.contents,
      userId: payload.user_id,
      groupId: payload.group_id,
      email: payload.email,
    });
  }
);
</script>
