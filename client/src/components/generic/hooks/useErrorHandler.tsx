import React from 'react';
import { types } from '../../../utils';

function useErrorHandler(initialState: string | null): types.ErrorHandler {
    const [error, setError] = React.useState(initialState);

    const showError = (errorMessage: string | null): void => {
        setError(errorMessage);

        window.setTimeout(() => {
            setError(null);
        }, 3000);
    };

    return { error, showError };
}

export { useErrorHandler };
