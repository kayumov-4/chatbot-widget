<template>
  <div
    class="widget"
    :class="[
      position,
      { open: isOpen },
      visibilityType === 'sidebar' ? 'mode-sidebar' : 'mode-floating',
    ]"
    :style="widgetStyle"
  >
    <ChatHeader
      @toggle="toggle"
      @visibility-change="onVisibilityChange"
      :isOpen="isOpen"
      :isDraggable="config.isDraggable"
      @dragStart="onMouseDown"
    />
    <div class="widget-body">
      <ChatMessages :messages="messages" :isTyping="isTyping" />
      <ChatInput @send="sendMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import ChatHeader from "./Header/Header.vue";
import ChatMessages from "./ChatMessages.vue";
import ChatInput from "./ChatInput.vue";
import type { ChatMessage } from "../entities/chat/interfaces/chatMessage";
import { getConfig } from "../config/getConfig";
import { connectCentrifugo, subscribeChannel } from "../socket/centrifugo";
import { getSessionChannel } from "../utils/getSessionChannel";
import { sendQuestion } from "../api/chat";
import type { VisibilityType } from "../entities/chat/types/visibilityType";

const messages = ref<ChatMessage[]>([]);
const isTyping = ref(false);
const channel = getSessionChannel();
let sub: any = null;
let centrifuge: any = null;

const props = defineProps({
  title: { type: String, default: "Chatbot" },
  primaryColor: { type: String, default: "#6c63ff" },
  position: { type: String, default: "right" },
  zIndex: { type: String, default: "9999" },
});

onMounted(async () => {
  messages.value.push({
    id: Date.now(),
    role: "bot",
    text: getConfig().welcomeMessage || "Salom! Qanday yordam bera olaman?",
    author: "Bot",
    createdAt: Date.now(),
  });
  centrifuge = await connectCentrifugo();

  const handleMessage = (data: any) => {
    const chunk = data?.text;
    if (!chunk) return;

    const last = messages.value[messages.value.length - 1];

    if (last && last.role === "bot") {
      last.text += chunk;
    } else {
      messages.value.push({
        id: Date.now(),
        role: "bot",
        text: chunk,
        author: "Bot",
        createdAt: Date.now(),
      });
    }
  };

  sub = subscribeChannel(channel, handleMessage);

  centrifuge.on("connected", () => {
    console.log("🟢 Reconnected");
    sub = subscribeChannel(channel, handleMessage);
  });

  centrifuge.on("disconnected", () => {
    console.warn("🔴 Disconnected, trying to reconnect...");
  });
});

onBeforeUnmount(() => {
  if (sub) {
    sub.unsubscribe();
  }
  if (centrifuge) {
    centrifuge.disconnect();
  }
});

const isOpen = ref(false);
const config = getConfig();

const isDragging = ref(false);
const offset = reactive({ x: 0, y: 0 });
const dimensions = reactive({ height: 480 });
const startPos = { x: 0, y: 0, h: 0 };

const visibilityType = ref<VisibilityType>("floating");

const widgetStyle = computed(() => ({
  transform: `translateX(${
    visibilityType.value === "sidebar" ? 0 : offset.x
  }px)`,
  height: isOpen.value ? `${dimensions.height}px` : "48px",
  zIndex: props.zIndex,
  transition: isDragging.value
    ? "none"
    : "height 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease",
}));

function onMouseDown(e: MouseEvent) {
  if (!config.isDraggable) return;
  isDragging.value = true;
  startPos.x = e.clientX - offset.x;
  startPos.y = e.clientY;
  startPos.h = dimensions.height;
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
  document.body.style.userSelect = "none";
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging.value) return;
  offset.x = e.clientX - startPos.x;
  const deltaY = startPos.y - e.clientY;
  const nextHeight = startPos.h + deltaY;
  const maxHeight = window.innerHeight * 0.7;
  dimensions.height = Math.min(Math.max(nextHeight, 300), maxHeight);
}

function onMouseUp() {
  isDragging.value = false;
  document.body.style.userSelect = "";
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
}

function toggle() {
  isOpen.value = !isOpen.value;
}
async function sendMessage(text: string) {
  messages.value.push({
    id: Date.now(),
    role: "user",
    text,
    author: "Siz",
    createdAt: Date.now(),
  });

  await sendQuestion(text);
}

const right = computed(() => (props.position === "right" ? "24px" : "auto"));
const left = computed(() => (props.position === "left" ? "24px" : "auto"));

const onVisibilityChange = (type: VisibilityType) => {
  visibilityType.value = type;
};
</script>

<style scoped>
.widget {
  position: fixed;
  width: 320px;
  height: 48px;
  display: flex;
  flex-direction: column;
  border-radius: 18px 18px 0 0;
  background: #f7f7fb;
  box-shadow: 0 16px 48px #00000040;
  bottom: 0;
  right: v-bind(right);
  left: v-bind(left);
  transition: height 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s;
  max-height: 70vh;
  will-change: transform, height;
  touch-action: none;
}

.widget.mode-floating.open {
  height: 480px;
  border-radius: 18px;
}

.widget.mode-sidebar {
  top: 0 !important;
  right: 0 !important;
  height: 100vh !important;
  max-height: 100vh !important;
  width: 360px;
  border-radius: 0 !important;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
}

.widget.mode-sidebar .widget-body {
  opacity: 1 !important;
  transform: none !important;
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
.widget.mode-sidebar .header {
  border-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
</style>
