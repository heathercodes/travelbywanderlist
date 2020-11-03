/* eslint-disable react/button-has-type */
/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
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
  type,
  text,
  onClick,
  disabled,
  styles,
  isSecondary,
}: ButtonProps): React.ReactElement {
  const classes = isSecondary ? secondaryButtonStyles : primaryButtonStyles;

  return (
    <button type={type} onClick={onClick} css={[buttonStyles, classes, styles]} disabled={disabled}>
      {text}
    </button>
  );
}
