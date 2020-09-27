import { css } from '@emotion/core';
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

    input {
        border: none;
        background-color: transparent;
        border-bottom: 1px solid ${COLOURS.BLACK};
        padding: 0.5rem;
    }

    textarea {
        border: 1px solid gray;
        border-radius: 3px;
    }
`;

export const modalButtonStyles = css`
    position: absolute;
    right: 10px;
`;

export const topButtonStyles = css`
    top: 10px;
`;

export const bottomButtonStyles = css`
    bottom: 15px;
`;
