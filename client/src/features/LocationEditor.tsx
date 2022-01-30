/** @jsxImportSource @emotion/react */
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Input } from 'antd';
import { GlobalContext } from '../provider/GlobalProvider';
import { ErrorMessage, useErrorHandler } from '../blocks';
import { put } from '../utils/fetch';

interface LocationEditorProps {
  closeEditor(): void;
  visible: boolean;
}

export function LocationEditor({ closeEditor, visible }: LocationEditorProps): React.ReactElement {
  const { error, showError } = useErrorHandler('');
  const { currentLocation, updateLocation, setIsFetching } = useContext(GlobalContext);
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

      const updatedLocation = await put(`/api/location/${location.id}`, location);

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
    <Modal
      okText="Save Location"
      onOk={handleSubmit}
      destroyOnClose
      visible={visible}
      onCancel={closeEditor}
    >
      <Input
        allowClear
        id="location-name"
        onChange={(e: any): void => onChangeName(e.target.value)}
        value={location.name || ''}
      />
      <label htmlFor="location-name">Edit location name</label>

      <Input.TextArea
        allowClear
        id="location-description"
        onChange={(e: any): void => onChangeDetails(e.target.value)}
        value={location.description || ''}
        placeholder="Tell us about this location"
        rows={5}
      />
      <label htmlFor="location-description">Add Details</label>

      {error && <ErrorMessage errorMessage={error} />}
    </Modal>
  );
}
