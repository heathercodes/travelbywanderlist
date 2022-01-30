/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { Popup as MapGLPopup } from 'react-map-gl';
import { Location } from '../types';

export const popupStyles = css`
  width: 200px;
`;

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
