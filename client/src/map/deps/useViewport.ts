import { useState, Dispatch, SetStateAction } from 'react';

interface Viewport {
    latitude: number;
    longitude: number;
    zoom: number;
}

interface ViewportState {
    viewport: Viewport;
    setViewport: Dispatch<SetStateAction<Viewport>>;
}

const useViewport = (overrides?: Partial<Viewport>): ViewportState => {
    const defaultViewport: Viewport = {
        latitude: 57.2142,
        longitude: -6.1450,
        zoom: 5,
    };

    const [viewport, setViewport] = useState<Viewport>({
      ...defaultViewport,
      ...overrides,
    });

    return { viewport, setViewport };
};

export default useViewport;
