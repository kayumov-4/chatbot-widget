<template>
  <div class="wrapper">
    <button class="fab" @click="open = !open">💬</button>

    <div v-if="open" class="window">
      <div class="header">Assistant</div>
      <div class="body">
        <div class="msg bot">Hello 👋</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const open = ref(false);
</script>

<style>
.wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
}

.fab {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: #6c63ff;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.window {
  width: 320px;
  height: 420px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
  margin-bottom: 12px;
}
</style>
