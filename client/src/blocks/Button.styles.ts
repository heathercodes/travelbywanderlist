import { css } from '@emotion/core';
import { COLOURS } from '../constants';

export const buttonStyles = css`
  padding: 10px 18px 8px;
  font-size: 1.6rem;
  border-radius: 30px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

export const primaryButtonStyles = css`
  background: ${COLOURS.ACCENT_PRIMARY};
  color: ${COLOURS.BLACK};
  border: 2px solid ${COLOURS.ACCENT_PRIMARY};

  &:disabled {
    color: grey;
    background: ${COLOURS.MAIN_PRIMARY};
  }
`;

export const secondaryButtonStyles = css`
  background: transparent;
  color: ${COLOURS.ACCENT_SECONDARY};
  border: 2px solid ${COLOURS.ACCENT_SECONDARY};

  &:disabled {
    color: ${COLOURS.MAIN_SECONDARY};
    border: 2px solid ${COLOURS.MAIN_SECONDARY};
  }
`;
