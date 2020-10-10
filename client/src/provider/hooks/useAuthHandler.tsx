import React from "react";
import { DEFAULT_USER_AUTH } from "../../utils/constants";
import { UserAuthState, UserAuthHandler } from "../../types";

export function useAuthHandler(initialState: UserAuthState): UserAuthHandler {
  const [auth, setAuth] = React.useState(initialState);

  const setAuthStatus = (userAuth: UserAuthState): void => {
    window.localStorage.setItem("UserAuth", JSON.stringify(userAuth));
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

// import React, { createContext } from 'react';
// import { useAuthHandler } from './hooks/useAuthHandler';
// import { getStoredUserAuth } from '../utils/local-storage-helpers';
// import { DEFAULT_USER_AUTH } from '../utils/constants';
// import { UserAuthHandler } from '../types';

// export const AuthContext = createContext({
//     auth: DEFAULT_USER_AUTH,
//     setAuthStatus: null,
//     setUnauthStatus: null,
// });

// export function AuthProvider({ children }: any): React.FC {
//     const storedAuth = getStoredUserAuth();
//     const authContext: UserAuthHandler = useAuthHandler(storedAuth);

//     return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
// }
