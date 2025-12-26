<template>
  <div class="header">
    <span class="title">Savolingizni yo'llang!</span>

    <div class="actions">
      <button class="drag-handle" title="Move" @mousedown.stop="emitDrag">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.85 3.85L17.3 5.3L15.12 7.46C14.73 7.85 14.73 8.49 15.12 8.88C15.51 9.27 16.15 9.27 16.54 8.88L18.7 6.7L20.15 8.15C20.46 8.46 21 8.24 21 7.79V3.5C21 3.22 20.78 3 20.5 3H16.21C15.76 3 15.54 3.54 15.85 3.85ZM3.85 8.15L5.3 6.7L7.46 8.88C7.85 9.27 8.49 9.27 8.88 8.88C9.27 8.49 9.27 7.85 8.88 7.46L6.7 5.3L8.15 3.85C8.46 3.54 8.24 3 7.79 3H3.5C3.22 3 3 3.22 3 3.5V7.79C3 8.24 3.54 8.46 3.85 8.15ZM8.15 20.15L6.7 18.7L8.88 16.54C9.27 16.15 9.27 15.51 8.88 15.12C8.49 14.73 7.85 14.73 7.46 15.12L5.3 17.3L3.85 15.85C3.54 15.54 3 15.76 3 16.21V20.5C3 20.78 3.22 21 3.5 21H7.79C8.24 21 8.46 20.46 8.15 20.15ZM20.15 15.85L18.7 17.3L16.54 15.12C16.15 14.73 15.51 14.73 15.12 15.12C14.73 15.51 14.73 16.15 15.12 16.54L17.3 18.7L15.85 20.15C15.54 20.46 15.76 21 16.21 21H20.5C20.78 21 21 20.78 21 20.5V16.21C21 15.76 20.46 15.54 20.15 15.85Z"
            fill="#333333"
          />
        </svg>
      </button>

      <button @click.stop="emitToggle">
        <svg
          v-if="isOpen"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z"
            fill="#fff"
          />
        </svg>
        <svg
          v-else
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22ZM11 12V16H13V12H16L12 8L8 12H11Z"
            fill="#fff"
          />
        </svg>
      </button>

      <ChatHeaderVisibilityType
        :isOpen="isOpen"
        @on-action-change="onVisibilityTypeChange"
      />

      <button @click.stop>
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            d="M19.22 15.27l-2.54-.29a1.5 1.5 0 0 0-1.64.57l-1.84 1.84a14.9 14.9 0 0 1-6.59-6.59l1.85-1.85a1.5 1.5 0 0 0 .57-1.64l-.29-2.54A1.5 1.5 0 0 0 6.75 3H5.02a1.5 1.5 0 0 0-1.5 1.6c.53 8.54 7.36 15.37 15.9 15.9a1.5 1.5 0 0 0 1.6-1.5v-1.73a1.5 1.5 0 0 0-1.8-1.99Z"
            fill="#fff"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ChatHeaderVisibilityType from "./VisibilityType.vue";
import type { VisibilityType } from "../../entities/chat/types/visibilityType";
const visibilityType = ref<VisibilityType>("floating");
const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle"): void;
  (e: "dragStart", ev: MouseEvent): void;
  (e: "visibility-change", type: VisibilityType): void;
}>();

const emitToggle = () => {
  emit("toggle");
};

const emitDrag = (e: MouseEvent) => {
  emit("dragStart", e);
};
const onVisibilityTypeChange = (type: VisibilityType) => {
  visibilityType.value = type;
  emit("visibility-change", type);
};
</script>

<style scoped>
.header {
  min-height: 48px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--primaryColor), white 20%),
    var(--primaryColor)
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  user-select: none;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  transition: all 0.3s ease;
}

.title {
  font-size: 14px;
  font-weight: 600;
  flex: 1;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.actions button {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.drag-handle {
  cursor: grab;
  position: absolute;
  top: 4px;
  left: -44px;
  background: white !important;
  box-shadow: 0 16px 40px #00000040;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  width: 36px;
  height: 36px;
}

.drag-handle:active {
  cursor: grabbing;
}

.actions button:hover svg path {
  fill: color-mix(in srgb, white, black 10%);
}

.drag-handle:hover svg path {
  fill: #333 !important;
}
.widget.mode-sidebar .header .drag-handle {
  display: none !important;
}
</style>
