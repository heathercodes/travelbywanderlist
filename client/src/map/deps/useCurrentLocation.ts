import { useState, Dispatch, SetStateAction } from 'react';

interface CurrentLocation {
    [name: string]: LocationDetails;
}

interface LocationDetails {
    name: string;
    lat: number;
    lng: number;
}

interface CurrentLocationState {
    currentLocation: CurrentLocation;
    setCurrentLocation: Dispatch<SetStateAction<CurrentLocation>>;
}

const useCurrentLocation = (overrides?: Partial<CurrentLocation>): CurrentLocationState => {
    const defaultLocation = {};

    const [currentLocation, setCurrentLocation] = useState<CurrentLocation | {}>({
      ...defaultLocation,
      ...overrides,
    });

    return { currentLocation, setCurrentLocation };
};

export default useCurrentLocation;
