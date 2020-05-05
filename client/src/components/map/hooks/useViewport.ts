import { useState } from 'react';
import * as types from '../../../utils/types';

const useViewport = (overrides?: Partial<types.Viewport>): types.ViewportState => {
    const defaultViewport: types.Viewport = {
        latitude: 57.2142,
        longitude: -6.1450,
        zoom: 2,
    };

    const [viewport, setViewport] = useState<types.Viewport>({
      ...defaultViewport,
      ...overrides,
    });

    return { viewport, setViewport };
};

export { useViewport };
