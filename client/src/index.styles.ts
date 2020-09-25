import { css } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';

export const bodyStyles = css`
    ${emotionNormalize}
    html,
    body {
        font-family: 'Josefin Sans', sans-serif;
        background-color: #f8f4ed;
    }
`;
