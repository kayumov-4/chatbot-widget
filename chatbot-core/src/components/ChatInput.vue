<template>
  <div class="input">
    <input
      v-model="value"
      placeholder="Do you have question?"
      @keydown.enter="submit"
    />
    <button @click="submit">➤</button>
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
  padding: 10px;
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
  background: #6c63ff;
  color: white;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
}
</style>
