import React from 'react';
import { Marker } from 'react-map-gl';
import markerImage from '../images/marker.png';

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
			<div>
				<img src={markerImage} alt="map marker" />
			</div>
		</Marker>
    );
}
