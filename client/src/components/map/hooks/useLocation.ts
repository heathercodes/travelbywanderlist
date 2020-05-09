import { useState } from 'react';
import { LocationState, Location } from '../../../utils/types';

const useLocation = (overrides: Partial<Location[]> = []): LocationState => {
    const defaultLocations = [];

    const [locations, setLocations] = useState<Location[] | {}>([
        ...defaultLocations,
        ...overrides,
    ]);

    return { locations, setLocations };
};

export { useLocation };
