import React from 'react';
import { Popup as MapGLPopup } from 'react-map-gl';
import { Location } from '../types';

interface PopupProps {
  location: Location;
  handleClose(): void;
}

export function Popup({
  location,
  handleClose,
  children,
}: React.PropsWithChildren<PopupProps>): React.ReactElement {
  return (
    <MapGLPopup
      closeOnClick={false}
      captureClick
      onClose={handleClose}
      longitude={location.longitude}
      latitude={location.latitude}
      tipSize={7}
    >
      {children}
    </MapGLPopup>
  );
}
