<template>
  <div class="header" @click="$emit('toggle')">
    <span class="title">Call24</span>
    <div class="actions">
      <button>
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

      <button>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.2217 15.2681L16.6817 14.9781C16.0717 14.9081 15.4717 15.1181 15.0417 15.5481L13.2017 17.3881C10.3717 15.9481 8.05174 13.6381 6.61174 10.7981L8.46174 8.94807C8.89174 8.51807 9.10174 7.91807 9.03174 7.30807L8.74174 4.78807C8.62174 3.77807 7.77174 3.01807 6.75174 3.01807H5.02174C3.89174 3.01807 2.95174 3.95807 3.02174 5.08807C3.55174 13.6281 10.3817 20.4481 18.9117 20.9781C20.0417 21.0481 20.9817 20.1081 20.9817 18.9781V17.2481C20.9917 16.2381 20.2317 15.3881 19.2217 15.2681Z"
            fill="#fff"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  primaryColor: { type: String, default: "#6c63ff" },
  isOpen: { type: Boolean, default: false },
});
</script>

<style scoped>
.header {
  min-height: 56px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, v-bind(primaryColor), white 20%),
    v-bind(primaryColor)
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  cursor: pointer;
}

.title {
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
  cursor: pointer;
  padding: 0;
}
.actions button:hover svg path {
  fill: color-mix(in srgb, white, black 10%);
}
</style>
