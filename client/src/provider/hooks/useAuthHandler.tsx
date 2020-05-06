import React from 'react';
import { DEFAULT_USER_AUTH } from '../../utils/constants';
import { UserAuthState, UserAuthHandler } from '../../utils/types';

export function useAuthHandler(initialState: UserAuthState): UserAuthHandler {
    const [auth, setAuth] = React.useState(initialState);

    const setAuthStatus = (userAuth: UserAuthState): void => {
        window.localStorage.setItem('UserAuth', JSON.stringify(userAuth));
        setAuth(userAuth);
    };

    const setUnauthStatus = (): void => {
        window.localStorage.clear();
        setAuth(DEFAULT_USER_AUTH);
    };

    return {
        auth,
        setAuthStatus,
        setUnauthStatus,
    };
}
