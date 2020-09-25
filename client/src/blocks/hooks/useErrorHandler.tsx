import React from 'react';
import { ErrorHandler } from '../../types';

function useErrorHandler(initialState: string | null): ErrorHandler {
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
