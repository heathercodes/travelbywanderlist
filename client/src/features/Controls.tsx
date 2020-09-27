/** @jsx jsx */
import React, { useContext } from 'react';
import { jsx } from '@emotion/core';
import { GlobalContext } from '../provider/GlobalProvider';
import { ErrorMessage, useErrorHandler, Button } from '../blocks';
import { fetchAPI } from '../utils/fetch';
import { Location } from '../types';
import { controlStyles } from './Controls.styles';

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
        <div css={controlStyles}>
            <Button
                type="button"
                onClick={handleSubmit}
                disabled={!isFetching}
                text="Save Wanderlist"
            />
            {error && <ErrorMessage errorMessage={error} />}
        </div>
    );
}
