import { getConfig } from "../config/getConfig";

export function applyWidgetConfig(root: HTMLElement) {
  const config = getConfig();

  root.style.setProperty("--primaryColor", config.primaryColor);
  root.style.setProperty("--zIndex", String(config.zIndex));
}
