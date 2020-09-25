import React, { useContext } from 'react';
import { GlobalContext } from '../provider/GlobalProvider';
import { ErrorMessage } from '../blocks/ErrorMessage';
import { useErrorHandler } from '../blocks/hooks/useErrorHandler';
import { fetchAPI } from '../utils/fetch';
import { Location } from '../types';

import './Controls.scss';

interface WanderlistEditorProps {
    locations: Location[];
}

export function Controls({ locations }: WanderlistEditorProps): React.ReactElement {
    const { error, showError } = useErrorHandler(null);
    const {
        wanderlist,
        updateWanderlist,
        ui: { isFetching },
        setIsFetching,
    } = useContext(GlobalContext);

    const saveWanderlist = async (): Promise<void> => {
        try {
            setIsFetching(true);

            const updatedWanderlist = await fetchAPI({
                url: 'collection',
                method: 'put',
                body: {
                    ...wanderlist,
                    locations,
                },
            });

            updateWanderlist(updatedWanderlist.data);

            setIsFetching(false);
        } catch (err) {
            setIsFetching(false);
            showError(err.message);
        }
    };

    const handleSubmit = (e): void => {
        e.preventDefault();
        saveWanderlist();
    };

    return (
        <div className="controls">
            <button type="button" onClick={handleSubmit} disabled={isFetching}>
                Save Wanderlist
            </button>
            {error && <ErrorMessage errorMessage={error} />}
        </div>
    );
}
