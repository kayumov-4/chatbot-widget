<template>
  <div
    class="widget"
    :class="[position, { open: isOpen }]"
    :style="{ zIndex: zIndex }"
  >
    <ChatHeader
      @toggle="toggle"
      :primaryColor="primaryColor"
      :isOpen="isOpen"
    />
    <div class="widget-body">
      <ChatMessages :messages="messages" />
      <ChatInput @send="sendMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import ChatHeader from "./ChatHeader.vue";
import ChatMessages from "./ChatMessages.vue";
import ChatInput from "./ChatInput.vue";
import type { ChatMessage } from "../entities/chat/interfaces/chatMessage";
import { getConfig } from "../config/getConfig";

const props = defineProps({
  title: { type: String, default: "Chatbot" },
  primaryColor: { type: String, default: "#6c63ff" },
  position: { type: String, default: "right" },
  zIndex: { type: String, default: "9999" },
});

onMounted(() => {
  const config = getConfig();
  messages.value.push({
    id: Date.now(),
    role: "bot",
    author: "Bot",
    text: config.welcomeMessage,
    createdAt: Date.now(),
  });
});
const isOpen = ref(false);
const messages = ref<ChatMessage[]>([]);
function toggle() {
  isOpen.value = !isOpen.value;
}
function sendMessage(text: string) {
  messages.value.push({
    id: Date.now(),
    role: "user",
    text,
    createdAt: Date.now(),
    author: "Siz",
  });
}

const right = computed(() => (props.position === "right" ? "24px" : "auto"));
const left = computed(() => (props.position === "left" ? "24px" : "auto"));
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Google Sans", sans-serif;
}
.widget {
  position: fixed;
  width: 320px;
  height: 56px;
  display: flex;
  flex-direction: column;
  border-radius: 18px 18px 0 0;
  overflow: hidden;
  background: #f7f7fb;
  box-shadow: 0 16px 40px #00000040;
  bottom: 0;
  right: v-bind(right);
  left: v-bind(left);
  transition: height 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s;
}
.widget.open {
  height: 480px;
}

.widget-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.widget.open .widget-body {
  opacity: 1;
  transform: translateY(0);
  overflow-y: auto;
}

.widget.right {
  right: 24px;
}
.widget.left {
  left: 24px;
}
</style>
