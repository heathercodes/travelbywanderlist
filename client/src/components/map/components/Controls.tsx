/** @jsx jsx */
import React, { useState, useContext } from 'react';
import { jsx, css } from '@emotion/core';
import { WanderlistContext } from '../../../provider/wanderlistProvider';
import { ErrorMessage } from '../../generic/ErrorMessage';
import { useErrorHandler } from '../../generic/hooks/useErrorHandler';
import { fetchAPI } from '../../../utils/fetch';
import { Location } from '../../../utils/types';

const editorStyles = css`
    position: fixed;
    top: 0;
    right: 0;
    margin: 20px;
`;

interface WanderlistEditorProps {
    locations: Location[];
}

export function Controls({ locations }: WanderlistEditorProps): JSX.Element {
    const [saving, setSaving] = useState(false);
    const { error, showError } = useErrorHandler(null);
    const { wanderlists, setWanderlists } = useContext(WanderlistContext);

    const saveWanderlist = async (): void => {
        try {
            setSaving(true);

            const updatedWanderlist = await fetchAPI('collection', 'put', {
                ...wanderlists,
                locations,
            });

            setWanderlists(updatedWanderlist.data);

            setSaving(false);
        } catch (err) {
            setSaving(false);
            showError(err.message);
        }
    };

    const handleSubmit = (e): void => {
        e.preventDefault();
        saveWanderlist();
    };

    return (
        <div css={editorStyles}>
            <button type="button" onClick={handleSubmit} disabled={saving}>
                Save Wanderlist
            </button>
            {error && <ErrorMessage errorMessage={error} />}
        </div>
    );
}
