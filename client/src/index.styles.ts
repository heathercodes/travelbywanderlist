import { css } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import { COLOURS } from './constants';

export const bodyStyles = css`
  ${emotionNormalize}
  html,
    body {
    background-color: ${COLOURS.BASE_SECONDARY};
    font-family: 'Catamaran', sans-serif;
    font-size: 62.5%;
  }

  h3 {
    font-size: 2.2rem;
  }

  p,
  span,
  input,
  label,
  button {
    font-size: 1.6rem;
  }

  textarea {
    border: 1px solid gray;
    border-radius: 3px;
  }
`;
