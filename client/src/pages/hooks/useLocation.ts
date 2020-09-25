import { useState } from 'react';
import { LocationState, Location } from '../../types';

const useLocation = (overrides: Partial<Location[]> = []): LocationState => {
    const defaultLocations = [];

    const [locations, setLocations] = useState<Location[] | null>([
        ...defaultLocations,
        ...overrides,
    ]);

    return { locations, setLocations };
};

export { useLocation };
