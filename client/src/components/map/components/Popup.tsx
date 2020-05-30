/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { Popup } from 'react-map-gl';
import { Location } from '../../../utils/types';

interface PopupProps {
    location: Location;
    handleClose(open: boolean): void;
}

export default function MapPopup({
    location,
    handleClose,
    children,
}: React.PropsWithChildren<PopupProps>): JSX.Element {
    return (
        <Popup
            closeButton={false}
            longitude={location.longitude}
            latitude={location.latitude}
            tipSize={7}
        >
            <div>
                <button type="button" onClick={(): void => handleClose()}>
                    Close
                </button>
                {children}
            </div>
        </Popup>
    );
}
