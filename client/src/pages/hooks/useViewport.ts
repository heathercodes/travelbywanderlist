import { useState } from "react";
import { ViewportState, Viewport } from "../../types";

const useViewport = (overrides?: Partial<Viewport>): ViewportState => {
  const defaultViewport: Viewport = {
    latitude: 57.2142,
    longitude: -6.145,
    zoom: 2,
  };

  const [viewport, setViewport] = useState<Viewport>({
    ...defaultViewport,
    ...overrides,
  });

  return { viewport, setViewport };
};

export { useViewport };
