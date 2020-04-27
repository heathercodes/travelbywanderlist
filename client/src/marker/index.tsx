import React from 'react';
import { Marker } from 'react-map-gl';
import marker from '../images/marker.png';

interface LocationDetails {
	name: string;
    lat: number;
    lng: number;
}

export default function MapMarker(location: LocationDetails): JSX.Element {
    return (
		<Marker
			longitude={location.lng}
			latitude={location.lat}
			offsetLeft={-20}
			offsetTop={-35}
		>
			<img src={marker} alt="map marker" />
		</Marker>
    );
}
