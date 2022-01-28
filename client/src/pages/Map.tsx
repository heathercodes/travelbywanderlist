import React, { useState, useContext, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import { Button } from '../blocks';
import { Controls, LocationEditor, Marker, Popup } from '../features';
import { GlobalContext } from '../provider/GlobalProvider';
import { useViewport } from './hooks/useViewport';
import { useLocation } from './hooks/useLocation';
import { useSettings } from './hooks/useSettings';
import { Location } from '../types';

import { modalButtonStyles, bottomButtonStyles } from '../index.styles';

export function InteractiveMap(): React.ReactElement {
  const { viewport, setViewport } = useViewport();
  const { locations, setLocations } = useLocation();
  const { settings, setSettings } = useSettings();
  const { wanderlist } = useContext(GlobalContext);

  const [tempLocation, setTempLocation] = useState<Location>({} as Location);
  const [openPopup, handlePopup] = useState(false);
  const [openEditor, handleEditor] = useState(false);

  useEffect(() => {
    if (wanderlist.locations) {
      setLocations(wanderlist.locations);
    }
  }, [setLocations, wanderlist.locations]);

  useEffect(() => {
    if (openPopup || openEditor) {
      setSettings({
        dragPan: false,
        scrollZoom: false,
        touchZoom: false,
        doubleClickZoom: false,
      });
    } else {
      setSettings({
        dragPan: true,
        scrollZoom: true,
        touchZoom: true,
        doubleClickZoom: true,
      });
    }
  }, [openPopup, openEditor, setSettings]);

  const closePopup = (): void => {
    handlePopup(false);
    setTempLocation({} as Location);
  };

  const closeEditor = (): void => {
    handleEditor(false);
  };

  const getLocationDetails = (e: any): void => {
    const featureName = e.features[0].properties?.name_en
      ? e.features[0].properties.name_en
      : 'Unknown Location';
    const [longitude, latitude] = e.lngLat;

    setTempLocation({ name: featureName, latitude, longitude });

    handlePopup(!openPopup);
  };

  const saveLocation = (): void => {
    setLocations([tempLocation, ...locations]);

    closePopup();
  };

  return (
    <React.Fragment>
      <ReactMapGL
        {...viewport}
        {...settings}
        width="100vw"
        height="100vh"
        onViewportChange={(e: any): void => setViewport(e)}
        mapStyle={process.env.REACT_APP_MAPBOX_STYLES}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onClick={getLocationDetails}
      >
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
        {openPopup && (
          <Popup location={tempLocation} handleClose={closePopup}>
            <h3>{tempLocation.name}</h3>
            <p>Add this location?</p>
            <Button
              type="button"
              onClick={saveLocation}
              text="Yes"
              styles={[modalButtonStyles, bottomButtonStyles]}
            />
          </Popup>
        )}
      </ReactMapGL>

      <Controls locations={locations} />
      {openEditor && <LocationEditor closeEditor={closeEditor} />}
    </React.Fragment>
  );
}
