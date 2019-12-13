import React from 'react';
import { Popup } from 'react-map-gl';

interface LocationDetails {
  name: string;
  lat: number;
  lng: number;
}

interface PopupProps {
  location: LocationDetails[];
  handleClose(): void;
}

export default function MapPopup(
  { location, handleClose, children }: React.PropsWithChildren<PopupProps>,
): JSX.Element {
  return (
      <Popup
          longitude={location[0].lat}
          latitude={location[0].lng}
          onClose={handleClose}
          tipSize={7}
      >
          { children }
      </Popup>
  );
}
