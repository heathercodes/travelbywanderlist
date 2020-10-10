import { useState } from "react";
import { LocationState, Location } from "../../types";

const useLocation = (overrides: Partial<Location[]> = []): LocationState => {
  const defaultLocations: any = [];

  const [locations, setLocations] = useState<Location[]>([
    ...defaultLocations,
    ...overrides,
  ]);

  return { locations, setLocations };
};

export { useLocation };
