/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { Popup } from 'react-map-gl';
import { types } from '../../../utils';

interface PopupProps {
  location: types.LocationDetails[];
}

export default function MapPopup(
  { location, children }: React.PropsWithChildren<PopupProps>,
): JSX.Element {
  return (
      <Popup
          longitude={location[0].lng}
          latitude={location[0].lat}
          closeOnClick
          tipSize={7}
      >
        <div>
          { children }
        </div>
      </Popup>
  );
}
