import { Dispatch, SetStateAction } from 'react';

export interface UserAuthState {
    id: number;
    email: string;
}

export interface UserAuthHandler {
    auth: UserAuthState;
    setAuthStatus(status: string): void;
    setUnauthStatus(): void;
}

export interface ErrorHandler {
    error: string;
    showError(msg: string): void;
}

export interface LocationDetails {
	name: string;
    lat: number;
    lng: number;
    imageUrl?: string;
    description?: string;
}

export interface Location {
    [name: string]: LocationDetails;
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

export interface Wanderlist {
    id: number;
    name: string;
    locations?: Location[];
}
