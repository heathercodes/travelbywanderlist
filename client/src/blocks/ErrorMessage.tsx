/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { errorMessageStyles } from './ErrorMessage.styles';

function ErrorMessage(message): React.ReactElement {
    return <p css={errorMessageStyles}>{message}</p>;
}

export { ErrorMessage };
