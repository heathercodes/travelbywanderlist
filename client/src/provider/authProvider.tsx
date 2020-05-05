import React, { createContext } from 'react';
import { useAuthHandler } from './hooks/useAuthHandler';
import { getStoredUserAuth } from '../utils/local-storage-helpers';
import * as constants from '../utils/constants';
import * as types from '../utils/types';

export const AuthContext = createContext({
    auth: constants.DEFAULT_USER_AUTH,
    setAuthStatus: null,
    setUnauthStatus: null,
});

export function AuthProvider({ children }: any): JSX.Element {
    const storedAuth = getStoredUserAuth();
    const authContext: types.UserAuthHandler = useAuthHandler(storedAuth);

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}
