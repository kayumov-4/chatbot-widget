<template>
  <div class="messages" ref="chatContainer">
    <div v-for="day in groupedMessages" :key="day.label" class="day-group">
      <div class="day-separator">
        <span>{{ day.label }}</span>
      </div>

      <div
        v-for="group in day.groups"
        :key="group.id"
        :class="['message-group', group.role]"
      >
        <ChatMessageItem
          v-for="msg in group.messages"
          :key="msg.id"
          :role="msg.role"
          :text="msg.text"
          :created-at="msg.createdAt"
        />

        <div class="meta">
          <span class="author">{{ group.author }}</span>
          <span class="time">
            {{
              new Date(group.createdAt).toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </span>
        </div>
      </div>
    </div>
    <!-- <div v-if="isTyping" class="message-group bot">
      <div class="bubble">...</div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import ChatMessageItem from "./ChatMessageItem.vue";
import type { ChatMessage } from "../entities/chat/interfaces/chatMessage";
import { getDayLabel } from "../utils/date";
import { groupMessages } from "../utils/groupMessages";

import { nextTick } from "vue";
const chatContainer = ref<HTMLDivElement | null>(null);

const props = defineProps<{
  messages: ChatMessage[];
  isTyping?: boolean;
}>();

watch(props.messages, async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
});

const groupedMessages = computed(() => {
  const days: Record<string, ChatMessage[]> = {};

  for (const msg of props.messages) {
    const label = getDayLabel(msg.createdAt);

    if (!days[label]) {
      days[label] = [];
    }

    days[label].push(msg);
  }

  return Object.entries(days).map(([label, msgs]) => ({
    label,
    groups: groupMessages(msgs),
  }));
});
</script>

<style scoped>
.messages {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}

.day-separator {
  display: flex;
  justify-content: center;
  margin: 12px 0;
}

.day-separator span {
  background: #e5e7eb;
  color: #555;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
}

.message-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
}

.message-group.user {
  align-items: flex-end;
}

.message-group.bot {
  align-items: flex-start;
}

.meta {
  display: flex;
  gap: 6px;
  margin-top: 4px;
  font-size: 11px;
  color: #888;
}

.message-group.user .meta {
  justify-content: flex-end;
}
</style>
