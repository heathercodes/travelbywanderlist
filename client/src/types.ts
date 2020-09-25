import { Dispatch, SetStateAction } from 'react';

export interface GlobalState {
    wanderlist: Wanderlist;
    currentLocation: Location;
    ui: {
        isFetching: boolean;
        isError: boolean;
    };
}

export interface GlobalContextTypes extends GlobalState {
    setIsFetching(value: boolean): void;
    updateWanderlist(wanderlist: Wanderlist): void;
    updateCurrentLocation(location: Location): void;
}

export interface UserAuthState {
    id: number;
    email: string;
}

export interface UserAuthHandler {
    auth: UserAuthState;
    setAuthStatus: ((authState: UserAuthState) => void) | null;
    setUnauthStatus: (() => void) | null;
}

export interface ErrorHandler {
    error: string;
    showError(msg: string): void;
}

export interface Location {
    id?: number;
    name: string;
    latitude: number;
    longitude: number;
    imageUrl?: string;
    description?: string;
}

export interface LocationState {
    locations: Location[];
    setLocations: Dispatch<SetStateAction<Location[]>>;
}

export interface Viewport {
    latitude: number;
    longitude: number;
    zoom: number;
}

export interface ViewportState {
    viewport: Viewport;
    setViewport: Dispatch<SetStateAction<Viewport>>;
}

export interface Collection {
    id: number;
    name: string;
}

export interface Wanderlist {
    collection: Collection;
    locations?: Location[];
}
