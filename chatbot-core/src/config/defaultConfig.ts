import type { WidgetConfig } from "../entities/widget/interfaces/widgetConfig";

export const defaultConfig: Required<WidgetConfig> = {
  projectId: "default",
  title: "Chatbot",
  primaryColor: "#6c63ff",
  position: "right",
  welcomeMessage: "Hello 👋 How can I help you?",
  zIndex: 9999,
};
