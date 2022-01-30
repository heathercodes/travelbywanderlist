/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { COLOURS } from '../constants';

export const errorMessageStyles = css`
  text-align: center;
  margin-top: 10px;
  color: ${COLOURS.RED};
`;

function ErrorMessage({ errorMessage }: { errorMessage: string }): React.ReactElement {
  return <p css={errorMessageStyles}>{errorMessage}</p>;
}

export { ErrorMessage };
