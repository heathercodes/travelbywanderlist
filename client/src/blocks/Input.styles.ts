import { css } from '@emotion/core';
import { COLOURS } from '../constants';

export const inputStyles = css`
  border: none;
  padding: 0;
  display: block;
  appearance: none;
  padding: 12px 25px 10px;
  border-radius: 8px;
  font-size: 1.8rem;
`;

export const primaryInputStyles = css`
  background: ${COLOURS.ACCENT_SECONDARY};
  border: 2px solid ${COLOURS.ACCENT_SECONDARY};
  color: #fff;
  ::placeholder {
    color: #fff;
  }
`;

export const secondaryInputStyles = css`
  background: ${COLOURS.MAIN_SECONDARY};
  border: 2px solid ${COLOURS.ACCENT_SECONDARY};
  color: #fff;
  ::placeholder {
    color: #fff;
  }
`;

export const labelStyles = css`
  display: block;
`;

export const fieldsetStyles = css`
  border: 0;
  margin: 0;
  padding: 0;
  display: flex;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

export const accessiblyHiddenStyles = css`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1;
  margin: -1;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1;
`;
