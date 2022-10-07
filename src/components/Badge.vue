<template>
  <span
    class="inline-flex items-center py-0.5 pl-2 pr-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
  >
    {{ text }}
    <button
      type="button"
      class="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-500"
      @click="emit('click')"
    >
      <span class="sr-only">Remove</span>
      <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
        <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
      </svg>
    </button>
  </span>
</template>

<script setup lang="ts">
interface Props {
  text: string;
}

defineProps<Props>();
const emit = defineEmits(["click"]);
</script>
