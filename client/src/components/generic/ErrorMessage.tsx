/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/core';

const error = css`
  text-align: center;
  margin-top: 10px;
  color: #ff0000;
`;

function ErrorMessage({ errorMessage }: string): React.FC {
  return <p styles={error}>{errorMessage}</p>;
}

export { ErrorMessage };
