import React, { createContext, useReducer } from 'react';
import { reducer, initialState, ACTIONS } from './reducer';
import { GlobalContextTypes, Wanderlist, Location } from '../types';

export const GlobalContext = createContext<GlobalContextTypes>(initialState as GlobalContextTypes);

export function GlobalProvider({ children }: any): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  function updateWanderlist(wanderlist: Wanderlist): void {
    dispatch({
      type: ACTIONS.UPDATE_WANDERLIST,
      payload: {
        wanderlist,
      },
    });
  }

  function updateLocation(location: Location): void {
    dispatch({
      type: ACTIONS.UPDATE_LOCATION,
      payload: {
        location,
      },
    });
  }

  function updateCurrentLocation(location: Location | null): void {
    dispatch({
      type: ACTIONS.UPDATE_CURRENT_LOCATION,
      payload: {
        location,
      },
    });
  }

  function setIsFetching(isFetching: boolean): void {
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
        updateLocation,
        setIsFetching,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
