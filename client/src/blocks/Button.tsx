/** @jsxImportSource @emotion/react */
import React from 'react';
import { buttonStyles, primaryButtonStyles, secondaryButtonStyles } from './Button.styles';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  onClick(value?: any): void;
  text: string;
  disabled?: boolean;
  styles?: any;
  isSecondary?: boolean;
}

export function Button({
  type = 'button',
  text,
  onClick,
  disabled,
  styles,
  isSecondary,
}: ButtonProps): React.ReactElement {
  const classes = isSecondary ? secondaryButtonStyles : primaryButtonStyles;

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} onClick={onClick} css={[buttonStyles, classes, styles]} disabled={disabled}>
      {text}
    </button>
  );
}
