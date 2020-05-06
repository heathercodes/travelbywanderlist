import React, { createContext, useState } from 'react';
import { Wanderlist } from '../utils/types';

export const WanderlistContext = createContext({
    collection: {},
    locations: [],
});

export function WanderlistProvider({ children }: React.ReactNode): JSX.Element {
    const [wanderlists, setWanderlists] = useState<Wanderlist | {}>({});
    const wanderlistsContext: Wanderlist = {
        wanderlists,
        setWanderlists,
    };

    return (
        <WanderlistContext.Provider value={wanderlistsContext}>
            {children}
        </WanderlistContext.Provider>
    );
}
