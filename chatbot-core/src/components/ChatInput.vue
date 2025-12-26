<template>
  <div class="input">
    <input
      v-model="value"
      placeholder="Qandaydir savolingiz bormi?"
      @keydown.enter="submit"
    />
    <button @click="submit">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.770095 6.79025H9.37205L5.61399 10.6467C5.31365 10.9549 5.31365 11.4607 5.61399 11.7689C5.91433 12.077 6.39949 12.077 6.69982 11.7689L11.7747 6.56108C12.0751 6.25288 12.0751 5.75502 11.7747 5.44682L6.70752 0.231149C6.40719 -0.0770497 5.92203 -0.0770497 5.62169 0.231149C5.32135 0.539348 5.32135 1.03721 5.62169 1.34541L9.37205 5.20975H0.770095C0.346543 5.20975 0 5.56536 0 6C0 6.43464 0.346543 6.79025 0.770095 6.79025Z"
          fill="#fff"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["send"]);
const value = ref("");

function submit() {
  if (!value.value.trim()) return;
  emit("send", value.value);
  value.value = "";
}
</script>

<style scoped>
.input {
  display: flex;
  padding: 5px 10px;
  border-top: 1px solid #eee;
  background: white;
}

.input input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
}

.input button {
  border: none;
  background: var(--primaryColor);
  color: white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
}
</style>
