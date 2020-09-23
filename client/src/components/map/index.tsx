/** @jsx jsx */
import React, { useState, useContext, useEffect } from 'react';
import { jsx } from '@emotion/core';
import ReactMapGL from 'react-map-gl';
import Marker from './components/Marker';
import Popup from './components/Popup';
import { Controls } from './components/Controls';
import { LocationEditor } from './components/LocationEditor';
import { WanderlistContext } from '../../provider/wanderlistProvider';
import { useViewport } from './hooks/useViewport';
import { useLocation } from './hooks/useLocation';

export function InteractiveMap(): JSX.Element {
    const { viewport, setViewport } = useViewport();
    const { locations, setLocations } = useLocation();
    const { wanderlists } = useContext(WanderlistContext);
    const currentLocation = useLocation();
    const [openPopup, handlePopup] = useState(false);
    const [openEditor, handleEditor] = useState(false);

    useEffect(() => {
        if (wanderlists.locations) {
            setLocations(wanderlists.locations);
        }
    }, [wanderlists.locations]);

    const closePopup = (): void => {
        handlePopup(false);
        currentLocation.setLocations([]);
    };

    const closeEditor = (): void => {
        handleEditor(false);
    };

    const getLocationDetails = (e): void => {
        const featureName = e.features[0].properties?.name
            ? e.features[0].properties.name
            : 'Unnamed Location';
        const [longitude, latitude] = e.lngLat;

        currentLocation.setLocations([
            {
                name: featureName,
                latitude,
                longitude,
            },
        ]);

        handlePopup(!openPopup);
    };

    const saveLocation = (): void => {
        setLocations((prevLocations) => [...currentLocation.locations, ...prevLocations]);

        closePopup();
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
            <Controls locations={locations} />
            {openPopup && (
                <Popup location={currentLocation.locations[0]} handleClose={closePopup}>
                    <h2>{currentLocation.locations[0].name}</h2>
                    <p>Add this location?</p>
                    <button type="button" onClick={saveLocation}>
                        Yes
                    </button>
                </Popup>
            )}
            {locations.length &&
                locations.map((loc) => (
                    <Marker
                        key={`${loc.longitude}-${loc.latitude}`}
                        location={loc}
                        openEditor={handleEditor}
                    />
                ))}
            {openEditor && <LocationEditor closeEditor={closeEditor} />}
        </ReactMapGL>
    );
}
