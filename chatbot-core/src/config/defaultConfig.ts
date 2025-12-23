import type { WidgetConfig } from "../entities/widget/interfaces/widgetConfig";

export const defaultConfig: Required<WidgetConfig> = {
  projectId: "default",
  title: "Chatbot",
  primaryColor: "#6c63ff",
  position: "right",
  welcomeMessage: "Salom, qanday yordam bera olaman?",
  zIndex: 9999,
  isDraggable: true,
};
