<template>
  <header
    class="w-full h-28 bg-custom-whatsapp-2 flex items-end p-4 text-white"
  >
    <div class="flex items-center">
      <ArrowLeftIcon class="w-6 cursor-pointer" @click="onBack" />
      <div class="font-semibold text-lg ml-4">Add group participants</div>
    </div>
  </header>
  <div class="w-full flex mt-10 items-center justify-center">
    <div
      class="w-44 h-44 bg-gray-500 rounded-full flex items-center justify-center relative"
    >
      <div
        class="flex flex-col items-center justify-center text-center text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <CameraIcon class="w-6" />
        <div>Add Group Icon</div>
      </div>
      <UserGroupIcon class="text-gray-300 w-28 opacity-10" />
    </div>
  </div>
  <section class="p-2 mt-4">
    <Input
      type="text"
      v-model="groupStore.newGroup.name"
      placeholder="Group name...."
    />
  </section>
  <section
    v-if="groupStore.newGroup.name.length > 0"
    class="flex w-full justify-center mt-20"
  >
    <div
      class="bg-custom-whatsapp-1 w-12 h-12 rounded-full text-white flex items-center justify-center cursor-pointer"
    >
      <CheckIcon class="w-6" @click="createGroup" />
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  CameraIcon,
  UserGroupIcon,
  ArrowLeftIcon,
  CheckIcon,
} from "@heroicons/vue/24/solid";
import { SidebarView, useGlobalStore } from "../../stores/globalStore";
import { useGroupStore } from "../../stores/groupStore";
import Input from "../Input.vue";

const groupStore = useGroupStore();
const globalStore = useGlobalStore();

function onBack() {
  globalStore.showSidebarView(SidebarView.NEW_GROUP_PARTICIPANTS);
}

async function createGroup() {
  await groupStore.createGroup();
  globalStore.showSidebarView(SidebarView.CONTACTS);
}
</script>
