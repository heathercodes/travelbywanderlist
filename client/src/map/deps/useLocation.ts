import { useState, Dispatch, SetStateAction } from 'react';

interface Location {
    [name: string]: Coordinates;
}

interface Coordinates {
    lat: number;
    lng: number;
}

interface LocationState {
    locations: Location;
    setLocation: Dispatch<SetStateAction<Location>>;
}

const useLocation = (overrides?: Partial<Location>): LocationState => {
    const defaultLocation = {};

    const [locations, setLocation] = useState<Location | {}>({
      ...defaultLocation,
      ...overrides,
    });

    return { locations, setLocation };
};

export default useLocation;
