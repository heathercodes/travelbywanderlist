import React, { createContext, useState } from 'react';
import { CurrentLocation } from '../utils/types';

export const CurrentLocationContext = createContext({});

export function CurrentLocationProvider({ children }: React.ReactNode): JSX.Element {
    const [currentLocation, setCurrentLocation] = useState<CurrentLocation | {}>({});
    const currentLocationsContext = {
        currentLocation,
        setCurrentLocation,
    };

    return (
        <CurrentLocationContext.Provider value={currentLocationsContext}>
            {children}
        </CurrentLocationContext.Provider>
    );
}
