import React, { createContext, useState } from 'react';
import { types } from '../utils';

export const WanderlistContext = createContext({});

export function WanderlistProvider({ children }: React.ReactNode): types.Wanderlist {
    const [wanderlists, setWanderlists] = useState<types.Wanderlist | {}>({});
    const wanderlistsContext = {
        wanderlists,
        setWanderlists,
    };

    return (
        <WanderlistContext.Provider value={wanderlistsContext}>
            {children}
        </WanderlistContext.Provider>
    );
}
