import { DEFAULT_USER_AUTH } from './constants';
import { UserAuthState } from '../types';

export const getStoredUserAuth = (): UserAuthState => {
    const auth = window.localStorage.getItem('UserAuth');
    if (auth) {
        return JSON.parse(auth);
    }

    return DEFAULT_USER_AUTH;
};
