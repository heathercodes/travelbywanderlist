/** @jsxImportSource @emotion/react */
import React from 'react';
import { Popup as MapGLPopup } from 'react-map-gl';
import { Button } from '../blocks';
import { Location } from '../types';
import { popupStyles } from './Popup.styles';
import { modalButtonStyles, topButtonStyles } from '../index.styles';

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
      closeButton={false}
      longitude={location.longitude}
      latitude={location.latitude}
      tipSize={7}
      captureDrag
      captureScroll
      captureClick
    >
      <div css={popupStyles}>
        <Button
          type="button"
          isSecondary
          onClick={handleClose}
          text="x"
          styles={[modalButtonStyles, topButtonStyles]}
        />
        {children}
      </div>
    </MapGLPopup>
  );
}
