<template>
  <div :class="['message-item', role]">
    <div class="bubble">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ChatRole } from "../entities/chat/types/chatRole";

const props = defineProps<{
  role: ChatRole;
  text: string;
  author?: string;
  createdAt: number;
}>();
</script>

<style scoped>
.message-item {
  display: flex;
  flex-direction: column;
  max-width: 75%;
  margin-bottom: 5px;
  font-size: 14px;
  line-break: auto;
}

.message-item.user {
  margin-left: auto;
  align-items: flex-end;
}

.message-item.bot {
  align-items: flex-start;
}

.bubble {
  padding: 10px 14px;
  border-radius: 16px;
  line-height: 1.4;
}

.user .bubble {
  background: #6c63ff;
  color: white;
  border-bottom-right-radius: 4px;
}

.bot .bubble {
  background: #ffffff;
  color: #333;
  border-bottom-left-radius: 4px;
}

.meta {
  font-size: 11px;
  color: #888;
  display: flex;
  gap: 6px;
}

.author {
  font-weight: 500;
}
</style>
