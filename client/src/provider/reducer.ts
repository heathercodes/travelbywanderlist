import { GlobalState } from '../types';

// eslint-disable-next-line no-shadow
export enum ACTIONS {
  UPDATE_WANDERLIST = 'UPDATE_WANDERLIST',
  UPDATE_LOCATION = 'UPDATE_LOCATION',
  UPDATE_COLLECTION = 'UPDATE_COLLECTION',
  UPDATE_CURRENT_LOCATION = 'UPDATE_CURRENT_LOCATION',
  SET_IS_FETCHING = 'SET_IS_FETCHING',
}

export const initialState: GlobalState = {
  wanderlist: {
    collection: {
      id: 0,
      name: '',
    },
    locations: [],
  },
  currentLocation: {
    id: 0,
    name: '',
    latitude: 0,
    longitude: 0,
  },
  ui: {
    isFetching: false,
    isError: false,
  },
};

export const reducer = (state: GlobalState, action: any) => {
  switch (action.type) {
    case ACTIONS.UPDATE_WANDERLIST:
      return {
        ...state,
        wanderlist: {
          ...state.wanderlist,
          ...action.payload.wanderlist,
        },
      };

    case ACTIONS.UPDATE_LOCATION: {
      const updatedLocation = state.wanderlist.locations?.map((loc) => {
        if (loc.id === action.payload.location.id) {
          return {
            ...loc,
            ...action.payload.location,
          };
        }

        return loc;
      });

      return {
        ...state,
        wanderlist: {
          ...state.wanderlist,
          locations: updatedLocation,
        },
      };
    }

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
