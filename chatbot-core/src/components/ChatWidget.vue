<template>
  <div class="widget" :class="position">
    <ChatHeader />
    <ChatMessages :messages="messages" />
    <ChatInput @send="sendMessage" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import ChatHeader from "./ChatHeader.vue";
import ChatMessages from "./ChatMessages.vue";
import ChatInput from "./ChatInput.vue";
import type { ChatMessage } from "../entities/chat/interfaces/charMessage";
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
    text: config.welcomeMessage,
  });
});
const messages = ref<ChatMessage[]>([]);
function sendMessage(text: string) {
  messages.value.push({
    id: Date.now(),
    role: "user",
    text,
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
  height: 480px;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  overflow: hidden;
  background: #f7f7fb;
  box-shadow: 0 16px 40px #00000040;
  bottom: 24px;
  right: v-bind(right);
  left: v-bind(left);
  z-index: v-bind(zIndex);
}

.header {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, v-bind(primaryColor), white 20%),
    v-bind(primaryColor)
  );
}

.widget.right {
  right: 24px;
}
.widget.left {
  left: 24px;
}
</style>
