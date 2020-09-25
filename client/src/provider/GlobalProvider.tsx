import React, { createContext, useReducer } from 'react';
import { reducer, initialState, ACTIONS } from './reducer';
import { GlobalContextTypes } from '../types';

export const GlobalContext = createContext<Partial<GlobalContextTypes> | null>(initialState);

export function GlobalProvider({ children }: any): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState);

    function updateWanderlist(wanderlist) {
        dispatch({
            type: ACTIONS.UPDATE_WANDERLIST,
            payload: {
                wanderlist,
            },
        });
    }

    function updateCurrentLocation(location) {
        dispatch({
            type: ACTIONS.UPDATE_CURRENT_LOCATION,
            payload: {
                location,
            },
        });
    }

    function setIsFetching(isFetching) {
        dispatch({
            type: ACTIONS.SET_IS_FETCHING,
            payload: {
                isFetching,
            },
        });
    }

    return (
        <GlobalContext.Provider
            value={{
                wanderlist: state.wanderlist,
                currentLocation: state.currentLocation,
                ui: state.ui,
                updateWanderlist,
                updateCurrentLocation,
                setIsFetching,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
