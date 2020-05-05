/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { Popup } from 'react-map-gl';
import * as types from '../../../utils/types';

interface PopupProps {
  location: types.LocationDetails;
}

export default function MapPopup(
  { location, children }: React.PropsWithChildren<PopupProps>,
): JSX.Element {
  return (
      <Popup
          longitude={location.longitude}
          latitude={location.latitude}
          closeOnClick
          tipSize={7}
      >
        <div>
          { children }
        </div>
      </Popup>
  );
}
