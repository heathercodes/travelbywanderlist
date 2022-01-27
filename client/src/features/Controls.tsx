/** @jsxImportSource @emotion/react */
import React, { useContext } from 'react';
import { GlobalContext } from '../provider/GlobalProvider';
import { ErrorMessage, useErrorHandler, Button } from '../blocks';
import { put } from '../utils/fetch';
import { Location } from '../types';
import { controlStyles } from './Controls.styles';

interface WanderlistEditorProps {
  locations: Location[];
}

export function Controls({ locations }: WanderlistEditorProps): React.ReactElement {
  const { error, showError } = useErrorHandler('');
  const {
    wanderlist,
    updateWanderlist,
    ui: { isFetching },
    setIsFetching,
  } = useContext(GlobalContext);

  const saveWanderlist = async (): Promise<void> => {
    try {
      setIsFetching(true);

      const updatedWanderlist = await put('collection', {
        ...wanderlist,
        locations,
      });

      updateWanderlist(updatedWanderlist.data);

      setIsFetching(false);
    } catch (err: any) {
      setIsFetching(false);
      showError(err.message);
    }
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    saveWanderlist();
  };

  return (
    <div css={controlStyles}>
      <Button type="button" onClick={handleSubmit} disabled={isFetching} text="Save Wanderlist" />
      {error && <ErrorMessage errorMessage={error} />}
    </div>
  );
}
