/** @jsx jsx */
import React, { useState, Fragment } from 'react';
import { css, jsx } from '@emotion/core';
import ReactMapGL from 'react-map-gl';
import MapMarker from '../marker';
import MapPopup from '../popup';

import useViewport from './deps/useViewport';
import useLocation from './deps/useLocation';
import useCurrentLocation from './deps/useCurrentLocation';

const mapWidth = css`
  width: 100vw;
`;

const mapHeight = css`
  height: 100vh;
`;

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
        const [longitude, latitude] = e.lngLat;

        setCurrentLocation({
			[featureName]: {
                name: featureName,
				lat: latitude,
				lng: longitude,
			},
        });

        handleToggle();
    };

    const saveLocation = (): void => {
        setLocations({
            ...locations,
			...currentLocation,
        });

        setCurrentLocation({});
        handleToggle();
    };

    return (
        <ReactMapGL
            {...viewport}
            width="100vw"
			height="100vh"
            onViewportChange={(e): void => setViewport(e)}
            mapStyle={process.env.MAPBOX_STYLES}
            mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
            onClick={getLocationDetails}
        >
            {
                togglePopup && (
                    <MapPopup location={Object.values(currentLocation)}>
                        {
                            currentLocation ? (
                                <Fragment>
                                    <h2>{Object.keys(currentLocation)[0]}</h2>
                                    <p>Add this location?</p>
                                    <button type="button" onClick={saveLocation}>Yes</button>
                                </Fragment>
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
