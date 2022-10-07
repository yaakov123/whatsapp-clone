<template>
  <main class="divide-y">
    <ContactItem
      v-for="contact in contacts"
      :contact="contact"
      @click="emit('selected', contact.email)"
    ></ContactItem>
  </main>
</template>

<script setup lang="ts">
import { Contact } from "../../api/database";
import ContactItem from "./ContactItem.vue";

interface Props {
  contacts: Contact[];
}

defineProps<Props>();

const emit = defineEmits(["selected"]);
</script>
