/** @jsxImportSource @emotion/react */
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../provider/GlobalProvider';
import { ErrorMessage, useErrorHandler, Button, Input, TextArea } from '../blocks';
import { put } from '../utils/fetch';
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
  const { error, showError } = useErrorHandler('');
  const {
    currentLocation,
    updateLocation,
    ui: { isFetching },
    setIsFetching,
  } = useContext(GlobalContext);
  const [location, setLocation] = useState<any>(currentLocation);

  useEffect(() => {
    setLocation(currentLocation);
  }, [currentLocation, setLocation]);

  const onChangeName = (name: string): void => {
    setLocation({
      ...location,
      name,
    });
  };

  const onChangeDetails = (details: string): void => {
    setLocation({
      ...location,
      description: details,
    });
  };

  const saveLocationDetails = async (): Promise<void> => {
    try {
      setIsFetching(true);

      const updatedLocation = await put(`location/${location.id}`, location);

      updateLocation(updatedLocation.data);

      setIsFetching(false);
    } catch (err: any) {
      setIsFetching(false);
      showError(err.message);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    await saveLocationDetails();
    closeEditor();
  };

  return (
    <div css={editorOverlayStyles}>
      <section css={editorStyles}>
        <Button
          type="button"
          onClick={closeEditor}
          text="x"
          isSecondary
          styles={[modalButtonStyles, topButtonStyles]}
        />

        <Input
          id="location-name"
          labelText="Edit location name"
          type="text"
          isSecondary
          labelIsHidden
          onChange={(e: any): void => onChangeName(e.target.value)}
          value={location.name || ''}
          styles={[labelContainerStyles, upperLabelStyles]}
        />

        <TextArea
          id="location-description"
          labelText="Add Details"
          isSecondary
          labelIsHidden
          onChange={(e: any): void => onChangeDetails(e.target.value)}
          value={location.description || ''}
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
