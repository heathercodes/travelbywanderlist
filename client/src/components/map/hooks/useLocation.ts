import { useState } from 'react';
import { types } from '../../../utils';

const useLocation = (overrides?: Partial<types.Location>): types.LocationState => {
    const defaultLocation = {};

    const [locations, setLocations] = useState<types.Location | {}>({
      ...defaultLocation,
      ...overrides,
    });

    return { locations, setLocations };
};

export { useLocation };
