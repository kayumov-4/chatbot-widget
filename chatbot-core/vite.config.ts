import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      customElement: true,
    }),
  ],
  define: {
    "process.env.NODE_ENV": '"production"',
    "process.env": {},
  },
  build: {
    lib: {
      entry: "src/widget/index.ts",
      name: "Chatbot",
      formats: ["iife"],
      fileName: () => "chatbot.js",
    },
  },
});
