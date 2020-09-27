import { GlobalState } from '../types';

export enum ACTIONS {
    UPDATE_WANDERLIST = 'UPDATE_WANDERLIST',
    UPDATE_CURRENT_LOCATION = 'UPDATE_CURRENT_LOCATION',
    SET_IS_FETCHING = 'SET_IS_FETCHING',
}

export const initialState: GlobalState = {
    wanderlist: {
        collection: null,
        locations: null,
    },
    currentLocation: {
        name: null,
        latitude: null,
        longitude: null,
    },
    ui: {
        isFetching: false,
        isError: false,
    },
};

export const reducer = (state: GlobalState, action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_WANDERLIST:
            return {
                ...state,
                wanderlist: {
                    ...state.wanderlist,
                    ...action.payload.wanderlist,
                },
            };
        case ACTIONS.UPDATE_CURRENT_LOCATION:
            return {
                ...state,
                currentLocation: {
                    ...state.currentLocation,
                    ...action.payload.location,
                },
            };

        case ACTIONS.SET_IS_FETCHING:
            return {
                ...state,
                ui: {
                    ...state.ui,
                    isFetching: action.payload.isFetching,
                },
            };

        default:
            return state;
    }
};
