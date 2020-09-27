import React, { useState, useContext, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import { Button } from '../blocks';
import { Controls, LocationEditor, Marker, Popup } from '../features';
import { GlobalContext } from '../provider/GlobalProvider';
import { useViewport } from './hooks/useViewport';
import { useLocation } from './hooks/useLocation';
import { Location } from '../types';

import { modalButtonStyles, bottomButtonStyles } from '../index.styles';

export function InteractiveMap(): React.ReactElement {
    const { viewport, setViewport } = useViewport();
    const { locations, setLocations } = useLocation();
    const { wanderlist } = useContext(GlobalContext);
    const currentLocation = useLocation();
    const [openPopup, handlePopup] = useState(false);
    const [openEditor, handleEditor] = useState(false);

    useEffect(() => {
        if (wanderlist.locations) {
            setLocations(wanderlist.locations);
        }
    }, [wanderlist.locations]);

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

    console.log(locations);

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
                    <h3>{currentLocation.locations[0].name}</h3>
                    <p>Add this location?</p>
                    <Button
                        type="button"
                        onClick={saveLocation}
                        text="Yes"
                        styles={[modalButtonStyles, bottomButtonStyles]}
                    />
                </Popup>
            )}
            {locations.length &&
                locations.map(
                    (loc: Location): JSX.Element => (
                        <Marker
                            key={`${loc.longitude}-${loc.latitude}`}
                            location={loc}
                            openEditor={handleEditor}
                        />
                    )
                )}
            {openEditor && <LocationEditor closeEditor={closeEditor} />}
        </ReactMapGL>
    );
}
