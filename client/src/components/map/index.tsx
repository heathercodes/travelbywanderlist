/** @jsx jsx */
import {
    useState,
    Fragment,
    useContext,
    useEffect,
} from 'react';
import { jsx } from '@emotion/core';
import ReactMapGL from 'react-map-gl';
import Marker from './components/Marker';
import Popup from './components/Popup';
import { WanderlistContext } from '../../provider/wanderlistProvider';
import { useViewport } from './hooks/useViewport';
import { useLocation } from './hooks/useLocation';

export function InteractiveMap(): JSX.Element {
    const { viewport, setViewport } = useViewport();
    const { locations, setLocations } = useLocation();
    const { wanderlists } = useContext(WanderlistContext);
    const currentLocation = useLocation();
    const [togglePopup, setToggle] = useState();

    const handleToggle = (): void => {
        setToggle(!togglePopup);
    };

    useEffect(() => {
        if (wanderlists.locations) {
            setLocations(wanderlists.locations);
        }
    }, [wanderlists.locations]);

    const getLocationDetails = (e): void => {
        const featureName = e.features[0] ? e.features[0].properties.name : '';
        const [longitude, latitude] = e.lngLat;

        currentLocation.setLocations({
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
            ...currentLocation.locations,
        });

        currentLocation.setLocations({});
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
                    <Popup location={Object.values(currentLocation.location)}>
                        {
                            currentLocation.location ? (
                                <Fragment>
                                    <h2>{Object.keys(currentLocation.location)[0]}</h2>
                                    <p>Add this location?</p>
                                    <button type="button" onClick={saveLocation}>Yes</button>
                                </Fragment>
                            ) : (
                                <p>Zoom in to the map to find a location</p>
                            )
                        }
                    </Popup>
                )
            }
            {
                Object.values(locations).map((loc) => (
                    <Marker key={`loc-${loc.id}`} {...loc} />
                ))
            }
        </ReactMapGL>
    );
}
