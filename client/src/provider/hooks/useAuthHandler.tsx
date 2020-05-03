import React from 'react';
import { types, constants } from '../../utils';

export function useAuthHandler(initialState: types.UserAuthState): types.UserAuthHandler {
    const [auth, setAuth] = React.useState(initialState);

    const setAuthStatus = (userAuth: types.UserAuthState): void => {
        window.localStorage.setItem('UserAuth', JSON.stringify(userAuth));
        setAuth(userAuth);
    };

    const setUnauthStatus = (): void => {
        window.localStorage.clear();
        setAuth(constants.DEFAULT_USER_AUTH);
    };

    return {
        auth,
        setAuthStatus,
        setUnauthStatus,
    };
}
