/** @jsx jsx */
import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { jsx } from '@emotion/core';
import { ErrorMessage, useErrorHandler, Button, Input } from '../blocks';
import { GlobalContext } from '../provider/GlobalProvider';
import { fetchAPI } from '../utils/fetch';
import { validateRegisterForm, validateLoginForm } from '../utils/login-validation';
import { labelStyles, formStyles, inputContainer, submitContainer } from './Login.styles';

export function Login(): React.ReactElement {
    const [request, setRequest] = useState({});
    const [wanderlistId, setWanderlistId] = useState('');
    const [wanderlistName, setWanderlistName] = useState('');
    const [openLogin, toggleOpenLogin] = useState(false);
    const [openSignUp, toggleOpenSignUp] = useState(false);
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
            return;
        }

        if (wanderlistName && validateRegisterForm(wanderlistName, showError)) {
            authHandler(request);
        }
    };

    return (
        <React.Fragment>
            <form css={formStyles} name="login">
                <div css={inputContainer}>
                    {openLogin && !openSignUp && (
                        <Input
                            id="wanderlist-id"
                            styles={labelStyles}
                            labelText="Please enter your Wanderlist ID"
                            type="number"
                            onChange={(e): void => setWanderlistId(e.target.value)}
                            value={wanderlistId}
                        />
                    )}
                    {!openSignUp && !openLogin && (
                        <Button
                            type="button"
                            text="Login"
                            onClick={(): void => toggleOpenLogin(true)}
                        />
                    )}
                </div>

                <div css={inputContainer}>
                    {openSignUp && !openLogin && (
                        <Input
                            id="wanderlist-name"
                            styles={labelStyles}
                            labelText="Enter the name of your next trip"
                            type="text"
                            onChange={(e): void => setWanderlistName(e.target.value)}
                            value={wanderlistName}
                        />
                    )}
                    {!openLogin && !openSignUp && (
                        <Button
                            type="button"
                            text="Sign up"
                            onClick={(): void => toggleOpenSignUp(true)}
                        />
                    )}
                </div>

                <div css={[inputContainer, submitContainer]}>
                    {(openSignUp || openLogin) && (
                        <React.Fragment>
                            <Button
                                type="button"
                                text="Back"
                                onClick={(): void => {
                                    toggleOpenSignUp(false);
                                    toggleOpenLogin(false);
                                }}
                            />

                            <Button
                                type="submit"
                                disabled={Boolean(isFetching || error)}
                                text="Submit"
                                onClick={handleSubmit}
                            />
                        </React.Fragment>
                    )}

                    {error && <ErrorMessage errorMessage={error} />}
                </div>
            </form>
        </React.Fragment>
    );
}
