import { useState } from "react";
import { SettingsState, MapSettings } from "../../types";

const useSettings = (overrides?: Partial<MapSettings>): SettingsState => {
  const defaultSettings: MapSettings = {
    dragPan: true,
    dragRotate: false,
    scrollZoom: true,
    touchZoom: true,
    touchRotate: false,
    keyboard: false,
    doubleClickZoom: true,
  };

  const [settings, setSettings] = useState<MapSettings>({
    ...defaultSettings,
    ...overrides,
  });

  return { settings, setSettings };
};

export { useSettings };
