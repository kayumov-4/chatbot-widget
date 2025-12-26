<template>
  <button class="actions-type-btn" @click.stop="onTypeChangeClick">
    <svg
      aria-hidden="true"
      role="graphics-symbol"
      viewBox="0 0 20 20"
      style="
        width: 24px;
        height: 24px;
        display: block;
        fill: white;
        flex-shrink: 0;
        color: white;
      "
    >
      <path
        d="M11.93 9.125a.5.5 0 0 0-.5.5v3.75a.5.5 0 0 0 .5.5h3.145a.5.5 0 0 0 .5-.5v-3.75a.5.5 0 0 0-.5-.5z"
      ></path>
      <path
        d="M4.5 4.125A2.125 2.125 0 0 0 2.375 6.25v7.5c0 1.174.951 2.125 2.125 2.125h11a2.125 2.125 0 0 0 2.125-2.125v-7.5A2.125 2.125 0 0 0 15.5 4.125zM3.625 6.25c0-.483.392-.875.875-.875h11c.483 0 .875.392.875.875v7.5a.875.875 0 0 1-.875.875h-11a.875.875 0 0 1-.875-.875z"
      ></path>
    </svg>
  </button>
  <div
    class="header-actions-type"
    :class="{
      opened: isVisibilityTypesOpened && isOpen,
      onTop: isVisibilityTypesOpened && !isOpen,
    }"
  >
    <div
      class="header-actions-menuitem"
      :class="{ active: selectedType === 'sidebar' }"
      @click="selectType('sidebar')"
    >
      <div
        bis_skin_checked="1"
        style="
          display: flex;
          align-items: center;
          gap: 8px;
          line-height: 120%;
          width: 100%;
          user-select: none;
          min-height: 28px;
          font-size: 14px;
          padding-inline: 8px;
        "
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 24px;
            min-height: 24px;
          "
        >
          <svg
            viewBox="0 0 20 20"
            class="peekSide directional-icon"
            style="
              width: 24px;
              height: 24px;
              display: block;
              fill: rgb(170 166 166);
              flex-shrink: 0;
              color: rgb(170 166 166);
            "
          >
            <path
              d="M10.392 6.125a.5.5 0 0 0-.5.5v6.75a.5.5 0 0 0 .5.5h4.683a.5.5 0 0 0 .5-.5v-6.75a.5.5 0 0 0-.5-.5z"
            ></path>
            <path
              d="M4.5 4.125A2.125 2.125 0 0 0 2.375 6.25v7.5c0 1.174.951 2.125 2.125 2.125h11a2.125 2.125 0 0 0 2.125-2.125v-7.5A2.125 2.125 0 0 0 15.5 4.125zM3.625 6.25c0-.483.392-.875.875-.875h11c.483 0 .875.392.875.875v7.5a.875.875 0 0 1-.875.875h-11a.875.875 0 0 1-.875-.875z"
            ></path>
          </svg>
        </div>
        <div>Sidebar</div>
        <svg
          aria-hidden="true"
          role="graphics-symbol"
          viewBox="0 0 16 16"
          class="checkmarkSmall"
          style="
            width: 16px;
            height: 16px;
            display: block;
            fill: black;
            flex-shrink: 0;
            color: black;
          "
          :style="{ opacity: selectedType === 'sidebar' ? 1 : 0 }"
        >
          <path
            d="M11.834 3.309a.625.625 0 0 1 1.072.642l-5.244 8.74a.625.625 0 0 1-1.01.085L3.155 8.699a.626.626 0 0 1 .95-.813l2.93 3.419z"
          ></path>
        </svg>
      </div>
    </div>
    <div
      class="header-actions-menuitem"
      :class="{ active: selectedType === 'floating' }"
      @click="selectType('floating')"
    >
      <div
        style="
          display: flex;
          align-items: center;
          gap: 8px;
          line-height: 120%;
          width: 100%;
          user-select: none;
          min-height: 28px;
          font-size: 14px;
          padding-inline: 8px;
        "
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 24px;
            min-height: 24px;
          "
        >
          <svg
            viewBox="0 0 20 20"
            class="peekCorner directional-icon"
            style="
              width: 24px;
              height: 24px;
              display: block;
              fill: rgb(170 166 166);
              flex-shrink: 0;
              color: rgb(170 166 166);
            "
          >
            <path
              d="M11.93 9.125a.5.5 0 0 0-.5.5v3.75a.5.5 0 0 0 .5.5h3.145a.5.5 0 0 0 .5-.5v-3.75a.5.5 0 0 0-.5-.5z"
            ></path>
            <path
              d="M4.5 4.125A2.125 2.125 0 0 0 2.375 6.25v7.5c0 1.174.951 2.125 2.125 2.125h11a2.125 2.125 0 0 0 2.125-2.125v-7.5A2.125 2.125 0 0 0 15.5 4.125zM3.625 6.25c0-.483.392-.875.875-.875h11c.483 0 .875.392.875.875v7.5a.875.875 0 0 1-.875.875h-11a.875.875 0 0 1-.875-.875z"
            ></path>
          </svg>
        </div>
        <div>Floating</div>
        <svg
          aria-hidden="true"
          role="graphics-symbol"
          viewBox="0 0 16 16"
          class="checkmarkSmall"
          style="
            width: 16px;
            height: 16px;
            display: block;
            fill: black;
            flex-shrink: 0;
            color: black;
          "
          :style="{ opacity: selectedType === 'floating' ? 1 : 0 }"
        >
          <path
            d="M11.834 3.309a.625.625 0 0 1 1.072.642l-5.244 8.74a.625.625 0 0 1-1.01.085L3.155 8.699a.626.626 0 0 1 .95-.813l2.93 3.419z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { VisibilityType } from "../../entities/chat/types/visibilityType";

const emit = defineEmits<{
  (e: "on-action-change", type: VisibilityType): void;
}>();
const props = defineProps<{
  isOpen: boolean;
}>();

const isVisibilityTypesOpened = ref(false);

const selectedType = ref<VisibilityType>("floating");

const selectType = (type: VisibilityType) => {
  selectedType.value = type;
  emit("on-action-change", type);
  isVisibilityTypesOpened.value = false;
};
const onTypeChangeClick = () => {
  isVisibilityTypesOpened.value = !isVisibilityTypesOpened.value;
};
</script>

<style>
.header-actions-type {
  gap: 1px;
  position: relative;
  padding: 4px;
  flex-direction: column;
  background: white;
  box-shadow: 0 4px 16px #00000020;
  border-radius: 8px;
  display: none;
  z-index: 50;
}
.actions-type-btn {
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}
.header-actions-type.opened {
  display: flex;
  position: absolute;
  opacity: 1;
  top: 48px;
  bottom: auto;
  right: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  z-index: 10;
}
.header-actions-type.onTop {
  display: flex;
  position: absolute;
  opacity: 1;
  right: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  z-index: 10;
  top: auto;
  bottom: 48px;
}

.header:has(.header-actions-type.onTop) {
  border-top-right-radius: 0 !important;
}

.header-actions-menuitem {
  color: #000;
  background: #fff;
  user-select: none;
  transition: background 20ms ease-in;
  cursor: pointer;
  width: 100%;
  display: flex;
  border-radius: 6px;
}
.header-actions-menuitem:hover {
  background: #f1f1f1;
}
.header-actions-menuitem.active {
  background: #f1f1f1;
}
</style>
