import React, { useContext } from 'react';
import { Button } from 'antd';
import { GlobalContext } from '../provider/GlobalProvider';
import { ErrorMessage, useErrorHandler } from '../blocks';
import { put } from '../utils/fetch';
import { Location } from '../types';

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

      const updatedWanderlist = await put('/api/collection', {
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
    <div className="fixed top-0 right-0 m-20">
      <Button type="primary" onClick={handleSubmit} disabled={isFetching}>
        Save Wanderlist
      </Button>
      {error && <ErrorMessage errorMessage={error} />}
    </div>
  );
}
