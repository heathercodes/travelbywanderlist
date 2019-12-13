import React from 'react';
import { Marker } from 'react-map-gl';

interface Coordinates {
    lat: number;
    lng: number;
}

export default function MapMarker(location: [string, Coordinates]): JSX.Element {
    return (
		<Marker
			longitude={location[1].lng}
			latitude={location[1].lat}
			offsetLeft={-20}
			offsetTop={-35}
		>
			<div>
                {location[0]}
				<img src="../deps/marker.png" alt="map marker" />
			</div>
		</Marker>
    );
}
