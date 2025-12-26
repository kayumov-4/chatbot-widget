export interface WidgetConfig {
  projectId?: string;
  title?: string;
  primaryColor?: string;
  position?: "right" | "left";
  welcomeMessage?: string;
  zIndex?: number;
  isDraggable?: boolean;
  apiUrl?: string;
  websocketUrl?: string;
}
