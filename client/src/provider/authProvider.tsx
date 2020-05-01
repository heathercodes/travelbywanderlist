import React, { createContext } from 'react';
import { useAuthHandler } from './hooks/useAuthHandler';
import { getStoredUserAuth, constants, types } from '../utils';

export const AuthContext = createContext({
    auth: constants.DEFAULT_USER_AUTH,
    setAuthStatus: null,
    setUnauthStatus: null,
});

export function AuthProvider({ children }: React.ReactNode): types.UserAuthHandler {
    const storedAuth = getStoredUserAuth();
    const authContext = useAuthHandler(storedAuth);

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}
