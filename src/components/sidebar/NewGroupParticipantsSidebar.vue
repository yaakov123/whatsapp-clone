<template>
  <main class="h-full w-full relative">
    <header
      class="w-full h-28 bg-custom-whatsapp-2 flex items-end p-4 text-white"
    >
      <div class="flex items-center">
        <ArrowLeftIcon class="w-6 cursor-pointer" @click="onBack" />
        <div class="font-semibold text-lg ml-4">Add group participants</div>
      </div>
    </header>
    <section class="px-4 py-2 border-b border-b-gray-300">
      <div class="mb-2 space-x-2 space-y-2">
        <Badge
          v-for="invitee in groupStore.newGroup.invitees"
          :text="invitee"
          @click="groupStore.removeNewGroupInvitee(invitee)"
        />
      </div>
      <Input
        type="text"
        placeholder="Type contact name"
        @keyup.enter="onEnter"
        v-model="email"
      />
    </section>
    <section
      class="absolute bottom-0 w-full h-28 bg-gray-100 flex items-center justify-center"
    >
      <div
        class="bg-custom-whatsapp-1 w-12 h-12 rounded-full text-white flex items-center justify-center cursor-pointer"
      >
        <ArrowRightIcon class="w-6" @click="showGroupInfoView" />
      </div>
    </section>
    <ContactList :contacts="contacts" @selected="onSelected"></ContactList>
  </main>
</template>

<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/solid";
import { ref, onMounted } from "vue";
import { SidebarView, useGlobalStore } from "../../stores/globalStore";
import { useGroupStore } from "../../stores/groupStore";
import Input from "../Input.vue";
import Badge from "../Badge.vue";
import ContactList from "./ContactList.vue";
import { Models } from "appwrite";
import { Contact, getContacts } from "../../api/database";
import { account } from "../../api";
const globalStore = useGlobalStore();
const groupStore = useGroupStore();

function onBack() {
  globalStore.showSidebarView(SidebarView.NEW_CHAT);
}

const email = ref("");
const session = ref<Models.Session | undefined>();
const contacts = ref<Contact[]>([]);

function onEnter() {
  groupStore.addNewGroupInvitee(email.value);
  email.value = "";
}

function showGroupInfoView() {
  globalStore.showSidebarView(SidebarView.NEW_GROUP_INFO);
}

function onSelected(member: string) {
  groupStore.addNewGroupInvitee(member);
  email.value = "";
}

onMounted(async () => {
  session.value = await account.getSession("current");

  if (session.value) {
    contacts.value = (await getContacts(session.value.userId)) || [];
  }
});
</script>
