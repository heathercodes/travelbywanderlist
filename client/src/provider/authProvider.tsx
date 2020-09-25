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
