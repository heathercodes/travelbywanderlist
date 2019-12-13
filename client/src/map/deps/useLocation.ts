import { useState, Dispatch, SetStateAction } from 'react';

interface Location {
    [name: string]: LocationDetails;
}

interface LocationDetails {
    name: string;
    lat: number;
    lng: number;
}

interface LocationState {
    locations: Location;
    setLocations: Dispatch<SetStateAction<Location>>;
}

const useLocation = (overrides?: Partial<Location>): LocationState => {
    const defaultLocation = {};

    const [locations, setLocations] = useState<Location | {}>({
      ...defaultLocation,
      ...overrides,
    });

    return { locations, setLocations };
};

export default useLocation;
