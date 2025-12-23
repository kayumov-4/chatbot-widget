<template>
  <div :class="['bubble', role]">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import type { ChatRole } from "../entities/chat/types/chatRole";

defineProps<{
  role: ChatRole;
  text: string;
}>();
</script>

<style scoped>
.bubble {
  max-width: 75%;
  padding: 10px 14px;
  border-radius: 16px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.4;
}

.user {
  margin-left: auto;
  background: #6c63ff;
  color: white;
  border-bottom-right-radius: 4px;
}

.bot {
  background: #ffffff;
  color: #333;
  border-bottom-left-radius: 4px;
}
</style>
