import { useState } from 'react';
import { types } from '../../../utils';

const useLocation = (overrides: Partial<types.Location[]> = []): types.LocationState => {
    const defaultLocations = [];

    const [locations, setLocations] = useState<types.Location[] | {}>(
      [...defaultLocations, ...overrides],
    );

    return { locations, setLocations };
};

export { useLocation };
