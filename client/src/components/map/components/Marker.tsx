import React from 'react';
import { Marker } from 'react-map-gl';
import { types } from '../../../utils';
import marker from '../../../images/marker.png';

export default function MapMarker({ latitude, longitude }: types.LocationDetails): JSX.Element {
    return (
		<Marker
			longitude={longitude}
			latitude={latitude}
			offsetLeft={-20}
			offsetTop={-35}
		>
			<img src={marker} alt="map marker" />
		</Marker>
    );
}
