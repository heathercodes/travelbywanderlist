/** @jsx jsx */
import React, { useState, useContext, useEffect } from 'react';
import { jsx } from '@emotion/core';
import { GlobalContext } from '../provider/GlobalProvider';
import { ErrorMessage, useErrorHandler, Button, Input, TextArea } from '../blocks';
import { fetchAPI } from '../utils/fetch';
import { Location } from '../types';
import {
    editorOverlayStyles,
    editorStyles,
    labelContainerStyles,
    upperLabelStyles,
    lowerLabelStyles,
} from './LocationEditor.styles';

import { modalButtonStyles, topButtonStyles, bottomButtonStyles } from '../index.styles';

interface LocationEditorProps {
    closeEditor(): void;
}

export function LocationEditor({ closeEditor }: LocationEditorProps): React.ReactElement {
    const { error, showError } = useErrorHandler(null);
    const {
        updateWanderlist,
        updateCurrentLocation,
        currentLocation,
        ui: { isFetching },
        setIsFetching,
    } = useContext(GlobalContext);
    const [editedLocation, setLocation] = useState<Location>(currentLocation);

    useEffect(() => {
        setLocation(currentLocation);
    }, [currentLocation, setLocation]);

    const onChangeName = (name): void => {
        setLocation((prevState) => {
            return {
                ...prevState,
                name,
            };
        });
    };

    const onChangeDetails = (details): void => {
        setLocation((prevState) => {
            return {
                ...prevState,
                description: details,
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
        <div css={editorOverlayStyles}>
            <section css={editorStyles}>
                <Button
                    type="button"
                    onClick={closeEditor}
                    text="X"
                    styles={[modalButtonStyles, topButtonStyles]}
                />

                <Input
                    id="location-name"
                    labelText="Edit location name"
                    type="text"
                    onChange={(e): void => onChangeName(e.target.value)}
                    value={editedLocation.name || ''}
                    styles={[labelContainerStyles, upperLabelStyles]}
                />

                <TextArea
                    id="location-description"
                    labelText="Add Details"
                    onChange={(e): void => onChangeDetails(e.target.value)}
                    value={editedLocation.description || ''}
                    styles={[labelContainerStyles, lowerLabelStyles]}
                    placeholder="Tell us about this location"
                    rows={5}
                />

                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isFetching}
                    text="Save Location"
                    styles={[modalButtonStyles, bottomButtonStyles]}
                />

                {error && <ErrorMessage errorMessage={error} />}
            </section>
        </div>
    );
}
