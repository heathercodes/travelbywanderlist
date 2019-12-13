import React from 'react';
import ReactMapGL from 'react-map-gl';
import MapMarker from '../marker';
import useViewport from './deps/useViewport';
import useLocation from './deps/useLocation';

export default function WanderlistMap(): JSX.Element {
    const { viewport, setViewport } = useViewport();
    const { locations, setLocation } = useLocation();

    const getPosition = (e): void => {
        const featureName = e.features[0] ? e.features[0].properties.name : '';

        setLocation({
            ...locations,
			[featureName]: {
				lat: e.lngLat[1],
				lng: e.lngLat[0],
			},
        });
    };

    const getViewport = (e): void => {
        const { latitude, longitude, zoom } = e;
        setViewport({ latitude, longitude, zoom });
    };

    return (
        <ReactMapGL
            {...viewport}
            width={window.innerWidth}
			height={window.innerHeight}
            onViewportChange={getViewport}
            mapStyle={process.env.MAPBOX_STYLES}
            mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
            onClick={getPosition}
        >
            {
                Object.entries(locations).map((loc) => (
                    <MapMarker {...loc} />
                ))
            }
        </ReactMapGL>
    );
}
