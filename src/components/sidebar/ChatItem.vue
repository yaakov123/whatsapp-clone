<template>
  <div
    class="flex items-center px-2 hover:bg-gray-100 py-4 cursor-pointer relative"
  >
    <Avatar />
    <div class="flex flex-col ml-3">
      <div>{{ chat.name }}</div>
      <div class="text-xs text-gray-500">There are no messages yet</div>
    </div>
    <span class="text-xs text-gray-400 absolute top-5 right-4">
      {{ createdAt }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { Models } from "appwrite";
import { computed } from "vue";
import Avatar from "../Avatar.vue";

interface Props {
  chat: Models.Team;
}

const props = defineProps<Props>();

const createdAt = computed(() => {
  const date = new Date(props.chat.$createdAt);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
});
</script>
