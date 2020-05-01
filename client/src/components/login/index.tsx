/** @jsx jsx */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { jsx } from '@emotion/core';
import { ErrorMessage } from '../generic/ErrorMessage';
import { useErrorHandler } from '../generic/hooks/useErrorHandler';
import { WanderlistContext } from '../../provider/wanderlistProvider';
import { fetchAPI, validateLoginForm } from '../../utils';

export function Login(): JSX.Element {
    const [wanderlistId, setWanderlistId] = useState('');
    const [loading, setLoading] = useState(false);
    const { error, showError } = useErrorHandler(null);
    const { setWanderlists } = useContext(WanderlistContext);
    const history = useHistory();

    const authHandler = async (): void => {
        try {
            setLoading(true);

            const wanderlist = await fetchAPI(
                `${process.env.API_URL}/collection/${wanderlistId}`,
                'get',
            );

            history.push(`/map/${wanderlistId}`);
            setWanderlists(wanderlist.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    };

    const handleSubmit = (e): void => {
        e.preventDefault();
        if (validateLoginForm(wanderlistId, showError)) {
            authHandler();
        }
    };

    return (
        <section>
            <h2>Welcome to Travel, by Wanderlist</h2>

            <p>To login, please input your Wanderlist ID</p>

            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    onChange={(e): void => setWanderlistId(e.target.value)}
                    value={wanderlistId}
                />

                {loading ? null : <input type="submit" disabled={loading} />}
            </form>

            {error && <ErrorMessage errorMessage={error} />}
        </section>
    );
}
