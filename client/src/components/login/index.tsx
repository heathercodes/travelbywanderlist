/** @jsx jsx */
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { jsx } from '@emotion/core';
import { ErrorMessage } from '../generic/ErrorMessage';
import { useErrorHandler } from '../generic/hooks/useErrorHandler';
import { WanderlistContext } from '../../provider/wanderlistProvider';
import { fetchAPI } from '../../utils/fetch';
import { validateRegisterForm, validateLoginForm } from '../../utils/login-validation';

export function LandingPage(): JSX.Element {
    const [loading, setLoading] = useState(false);
    const [request, setRequest] = useState({});
    const [wanderlistId, setWanderlistId] = useState('');
    const [wanderlistName, setWanderlistName] = useState('');
    const { error, showError } = useErrorHandler(null);
    const { setWanderlists } = useContext(WanderlistContext);
    const history = useHistory();

    useEffect(() => {
        const loginRequest = {
            method: 'get',
            url: `${process.env.API_URL}/collection/${wanderlistId}`,
        };

        setRequest(loginRequest);
    }, [wanderlistId]);

    useEffect(() => {
        const registerRequest = {
            method: 'post',
            url: `${process.env.API_URL}/collection`,
            body: { collection: { name: wanderlistName } },
        };

        setRequest(registerRequest);
    }, [wanderlistName]);

    const authHandler = async (): void => { // eslint-disable-line
        try {
            setLoading(true);

            const wanderlist = await fetchAPI(request);
            history.push(`/map/${wanderlist.data.collection.id}`);
            setWanderlists(wanderlist.data);

            return (): void => setLoading(false);
        } catch (err) {
            setLoading(false);
            showError(err.message);
        }
    };

    const handleSubmit = (e): void => {
        e.preventDefault();

        if (wanderlistId && validateLoginForm(wanderlistId, showError)) {
            authHandler();
        }

        if (wanderlistName && validateRegisterForm(wanderlistName, showError)) {
            authHandler();
        }
    };

    return (
        <section>
            <h2>Welcome to Travel, by Wanderlist</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="wanderlist-id">
                        <span>To login, please input your Wanderlist ID</span>
                        <input
                            id="wanderlist-id"
                            type="number"
                            onChange={(e): void => setWanderlistId(e.target.value)}
                            value={wanderlistId}
                            disabled={wanderlistName}
                        />
                    </label>
                </div>

                <div>
                    <label htmlFor="wanderlist-name">
                        <span>Or sign up by inputting the name of your next trip</span>

                        <input
                            id="wanderlist-name"
                            type="text"
                            onChange={(e): void => setWanderlistName(e.target.value)}
                            value={wanderlistName}
                            disabled={wanderlistId}
                        />
                    </label>
                </div>

                {loading ? null : <input type="submit" disabled={loading || error} />}
            </form>

            {error && <ErrorMessage errorMessage={error} />}
        </section>
    );
}
