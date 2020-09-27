import { css } from '@emotion/core';
import { COLOURS } from '../constants';

export const buttonStyles = css`
    border: none;
    background: ${COLOURS.BASE_PRIMARY};
    border: 1px solid ${COLOURS.MAIN_PRIMARY};
    padding: 0.7rem 1rem;
    border-radius: 3px;
    cursor: pointer;

    &:disabled {
        color: grey;
        border: 1px solid grey;
        cursor: not-allowed;
    }
`;
