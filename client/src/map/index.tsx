import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import MapMarker from '../marker';
import MapPopup from '../popup';

import useViewport from './deps/useViewport';
import useLocation from './deps/useLocation';
import useCurrentLocation from './deps/useCurrentLocation';

export default function WanderlistMap(): JSX.Element {
    const { viewport, setViewport } = useViewport();
    const { locations, setLocations } = useLocation();
    const { currentLocation, setCurrentLocation } = useCurrentLocation();

    const [togglePopup, setToggle] = useState();

    const handleToggle = (): void => {
        setToggle(!togglePopup);
    };

    const getLocationDetails = (e): void => {
        const featureName = e.features[0] ? e.features[0].properties.name : '';

        setCurrentLocation({
			[featureName]: {
                name: featureName,
				lat: e.lngLat[1],
				lng: e.lngLat[0],
			},
        });

        handleToggle();
    };

    const saveLocation = (): void => {
        setLocations({
            ...locations,
			...currentLocation,
        });
    };

    return (
        <ReactMapGL
            {...viewport}
            width={window.innerWidth}
			height={window.innerHeight}
            onViewportChange={(e): void => setViewport(e)}
            mapStyle={process.env.MAPBOX_STYLES}
            mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
            onClick={getLocationDetails}
        >
            {
                togglePopup && (
                    <MapPopup handleClose={handleToggle} location={Object.values(currentLocation)}>
                        {
                            currentLocation ? (
                                <>
                                    <h2>{currentLocation.name}</h2>
                                        <p>Add this location?</p>
                                    <button type="submit" onClick={saveLocation}>Yes</button>
                                </>
                            ) : (
                                <p>Zoom in to the map to find a location</p>
                            )
                        }
                    </MapPopup>
                )
            }
            {
                Object.values(locations).map((loc, index) => (
                    <MapMarker key={`loc-${index}`} {...loc} />
                ))
            }
        </ReactMapGL>
    );
}
