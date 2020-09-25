import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../provider/GlobalProvider';
import { ErrorMessage } from '../blocks/ErrorMessage';
import { useErrorHandler } from '../blocks/hooks/useErrorHandler';
import { fetchAPI } from '../utils/fetch';
import { Location } from '../types';

import './LocationEditor.scss';

interface LocationEditorProps {
    closeEditor(): void;
}

export function LocationEditor({ closeEditor }: LocationEditorProps): React.ReactElement {
    const [editedLocation, setLocation] = useState<Location | null>(null);
    const { error, showError } = useErrorHandler(null);
    const {
        updateWanderlist,
        updateCurrentLocation,
        currentLocation,
        ui: { isFetching },
        setIsFetching,
    } = useContext(GlobalContext);

    useEffect(() => {
        setLocation(currentLocation);
    }, [currentLocation]);

    const onChangeName = (name): void => {
        setLocation((prevState) => {
            return {
                ...prevState,
                name,
            };
        });
    };

    const saveLocation = async (): Promise<void> => {
        try {
            setIsFetching(true);

            const updatedLocations = await fetchAPI({
                url: `location/${editedLocation.id}`,
                method: 'put',
                body: { editedLocation },
            });

            updateWanderlist(updatedLocations.data);

            setIsFetching(false);
        } catch (err) {
            setIsFetching(false);
            showError(err.message);
        }
    };

    const handleSubmit = (e): void => {
        e.preventDefault();
        saveLocation();
        updateCurrentLocation({
            name: null,
            latitude: null,
            longitude: null,
        });
    };

    return (
        <div className="locationEditor">
            <button type="button" onClick={closeEditor}>
                X
            </button>

            <label htmlFor="location-name">
                <span>Edit location name:</span>
                <input
                    id="location-name"
                    type="text"
                    value={editedLocation.name || ''}
                    onChange={(e): void => onChangeName(e.target.value)}
                />
            </label>

            <label htmlFor="location-description">
                <span>Add details:</span>
                <textarea id="location-description" />
            </label>

            {/* <label htmlFor="location-photo">
                <span>Add photo:</span>
                <input id="location-photo" type="file" />
            </label> */}

            <button type="button" onClick={handleSubmit} disabled={isFetching}>
                Save Location
            </button>
            {error && <ErrorMessage errorMessage={error} />}
        </div>
    );
}
