/** @jsxImportSource @emotion/react */
import React from 'react';
import { errorMessageStyles } from './ErrorMessage.styles';

function ErrorMessage({ errorMessage }: { errorMessage: string }): React.ReactElement {
  return <p css={errorMessageStyles}>{errorMessage}</p>;
}

export { ErrorMessage };
