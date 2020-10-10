import React from "react";
import { ErrorHandler } from "../../types";

function useErrorHandler(initialState: string): ErrorHandler {
  const [error, setError] = React.useState(initialState);

  const showError = (errorMessage: string): void => {
    setError(errorMessage);

    window.setTimeout(() => {
      setError("");
    }, 3000);
  };

  return { error, showError };
}

export { useErrorHandler };
