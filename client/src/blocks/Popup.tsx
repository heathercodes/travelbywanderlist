import React from 'react';
import { Popup } from 'react-map-gl';
import { Location } from '../types';

interface PopupProps {
    location: Location;
    handleClose(): void;
}

export default function MapPopup({
    location,
    handleClose,
    children,
}: React.PropsWithChildren<PopupProps>): React.ReactElement {
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
