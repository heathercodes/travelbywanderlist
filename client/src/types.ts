import { Dispatch, SetStateAction } from 'react';

export interface Collection {
  id: number;
  name: string;
}

export interface Location {
  id?: number;
  name: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  description?: string;
}

export interface Wanderlist {
  collection: Collection;
  locations?: Location[];
}

export interface UserState {
  id: number;
  email: string;
  name: string;
}

export interface GlobalState {
  wanderlist: Wanderlist;
  currentLocation: Location;
  ui: {
    isFetching: boolean;
    isError: boolean;
  };
  user: {
    id: number;
    email: string;
    name: string;
  };
}

export interface GlobalContextTypes extends GlobalState {
  setIsFetching(value: boolean): void;
  updateWanderlist(wanderlist: Wanderlist): void;
  updateCurrentLocation(location: Location): void;
  updateLocation(location: Location): void;
  setUser(user: UserState): void;
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

export interface MapSettings {
  dragPan?: boolean;
  dragRotate?: boolean;
  scrollZoom?: boolean;
  touchZoom?: boolean;
  touchRotate?: boolean;
  keyboard?: boolean;
  doubleClickZoom?: boolean;
}

export interface SettingsState {
  settings: MapSettings;
  setSettings: Dispatch<SetStateAction<MapSettings>>;
}
