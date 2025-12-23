<template>
  <div class="messages">
    <ChatMessageItem
      v-for="msg in messages"
      :key="msg.id"
      :role="msg.role"
      :text="msg.text"
      :author="msg.author"
      :createdAt="msg.createdAt"
    />
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from "../entities/chat/interfaces/chatMessage";
import ChatMessageItem from "./ChatMessageItem.vue";

const props = defineProps<{
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
