import type { WidgetConfig } from "../entities/widget/interfaces/widgetConfig";
import { defaultConfig } from "./defaultConfig";

export function getConfig(): Required<WidgetConfig> {
  const globalConfig = (window as any).ChatbotConfig as
    | WidgetConfig
    | undefined;

  return {
    ...defaultConfig,
    ...globalConfig,
  };
}
