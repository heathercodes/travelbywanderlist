/** @jsx jsx */
import React, { useState, useContext, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import { WanderlistContext } from '../../../provider/wanderlistProvider';
import { CurrentLocationContext } from '../../../provider/currentLocationProvider';
import { ErrorMessage } from '../../generic/ErrorMessage';
import { useErrorHandler } from '../../generic/hooks/useErrorHandler';
import { fetchAPI } from '../../../utils/fetch';
import { Location, Wanderlist } from '../../../utils/types';

const editLocationStyles = css`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: white;
    margin: 20px;
`;

interface LocationEditorProps {
    closeEditor(): void;
}

export function LocationEditor({ closeEditor }: EditLocationProps): JSX.Element {
    const [saving, setSaving] = useState(false);
    const [editedLocation, setLocation] = useState<Location | {}>({});
    const { error, showError } = useErrorHandler(null);
    const { setWanderlists } = useContext(WanderlistContext);
    const { currentLocation, setCurrentLocation } = useContext(CurrentLocationContext);

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

    const saveLocation = async (): void => {
        try {
            setSaving(true);

            const updatedLocations = await fetchAPI(
                `location/${editedLocation.id}`,
                'put',
                editedLocation
            );

            setWanderlists((prevData: Wanderlist) => {
                return {
                    ...prevData,
                    locations: [...prevData.locations, updatedLocations.data],
                };
            });

            setSaving(false);
        } catch (err) {
            setSaving(false);
            showError(err.message);
        }
    };

    const handleSubmit = (e): void => {
        e.preventDefault();
        saveLocation();
        setCurrentLocation({});
    };

    return (
        <div css={editLocationStyles}>
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
                <textarea id="location-description" type="text" />
            </label>

            {/* <label htmlFor="location-photo">
                <span>Add photo:</span>
                <input id="location-photo" type="file" />
            </label> */}

            <button type="button" onClick={handleSubmit} disabled={saving}>
                Save Location
            </button>
            {error && <ErrorMessage errorMessage={error} />}
        </div>
    );
}
