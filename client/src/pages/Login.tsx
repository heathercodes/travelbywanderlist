import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorMessage } from '../blocks/ErrorMessage';
import { useErrorHandler } from '../blocks/hooks/useErrorHandler';
import { GlobalContext } from '../provider/GlobalProvider';
import { fetchAPI } from '../utils/fetch';
import { validateRegisterForm, validateLoginForm } from '../utils/login-validation';

export function Login(): React.ReactElement {
    const [request, setRequest] = useState({});
    const [wanderlistId, setWanderlistId] = useState('');
    const [wanderlistName, setWanderlistName] = useState('');
    const { error, showError } = useErrorHandler(null);
    const {
        updateWanderlist,
        setIsFetching,
        ui: { isFetching },
    } = useContext(GlobalContext);
    const history = useHistory();

    useEffect(() => {
        const loginRequest = {
            method: 'get',
            url: `collection/${wanderlistId}`,
        };

        setRequest(loginRequest);
    }, [wanderlistId]);

    useEffect(() => {
        const registerRequest = {
            method: 'post',
            url: 'collection',
            body: { collection: { name: wanderlistName } },
        };

        setRequest(registerRequest);
    }, [wanderlistName]);

    const authHandler = async (req): Promise<() => void> => {
        try {
            setIsFetching(true);

            const wanderlist = await fetchAPI(req);
            updateWanderlist(wanderlist.data);

            history.push(`/map/${wanderlistId}`);
            return (): void => setIsFetching(false);
        } catch (err) {
            showError(err.message);
            return (): void => setIsFetching(false);
        }
    };

    const handleSubmit = (e): void => {
        e.preventDefault();

        if (wanderlistId && validateLoginForm(wanderlistId, showError)) {
            authHandler(request);
        }

        if (wanderlistName && validateRegisterForm(wanderlistName, showError)) {
            authHandler(request);
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
                            disabled={Boolean(wanderlistName)}
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
                            disabled={Boolean(wanderlistId)}
                        />
                    </label>
                </div>

                {isFetching ? null : (
                    <input type="submit" disabled={Boolean(isFetching || error)} />
                )}
            </form>

            {error && <ErrorMessage errorMessage={error} />}
        </section>
    );
}
