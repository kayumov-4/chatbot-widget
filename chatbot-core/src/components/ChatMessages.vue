<template>
  <div class="messages">
    <ChatBubble
      v-for="msg in messages"
      :key="msg.id"
      :role="msg.role"
      :text="msg.text"
    />
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from "../entities/chat/interfaces/charMessage";
import ChatBubble from "./ChatBubble.vue";

defineProps<{
  messages: ChatMessage[];
}>();
</script>

<style scoped>
.messages {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}
</style>
