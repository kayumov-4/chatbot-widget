<template>
  <div class="header">
    <span class="logo">▲</span>
    <span class="title">Attmosfire</span>
    <div class="actions">
      <span>⚙️</span>
      <span>🔔</span>
    </div>
  </div>
</template>

<style scoped>
.header {
  height: 56px;
  background: linear-gradient(135deg, #8f7bff, #6c63ff);
  color: white;
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-weight: 600;
}

.logo {
  margin-right: 8px;
}

.title {
  flex: 1;
}

.actions span {
  margin-left: 10px;
  cursor: pointer;
}
</style>
